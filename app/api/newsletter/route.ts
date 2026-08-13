import { NextResponse } from "next/server";

const BUTTONDOWN_SUBSCRIBERS_URL = "https://api.buttondown.com/v1/subscribers";
const TURNSTILE_VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TURNSTILE_ACTION = "newsletter_signup";
const PRODUCTION_HOSTNAMES = new Set(["prempsingh.com", "www.prempsingh.com"]);

type SubscribeBody = {
  email?: unknown;
  turnstileToken?: unknown;
  website?: unknown;
};

type TurnstileVerification = {
  action?: string;
  hostname?: string;
  success?: boolean;
};

type ButtondownError = {
  code?: string;
  detail?: unknown;
};

export async function POST(request: Request) {
  let body: SubscribeBody;

  try {
    body = (await request.json()) as SubscribeBody;
  } catch {
    return NextResponse.json(
      { message: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  // Hidden honeypot field: return a normal response without storing bot traffic.
  if (typeof body.website === "string" && body.website.trim()) {
    return NextResponse.json(
      { message: "Check your inbox to confirm your subscription." },
      { status: 201 }
    );
  }

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";

  if (!email || email.length > 254 || !EMAIL_PATTERN.test(email)) {
    return NextResponse.json(
      { message: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  const apiKey = process.env.BUTTONDOWN_API_KEY;
  const turnstileSecretKey = process.env.TURNSTILE_SECRET_KEY;
  const turnstileToken =
    typeof body.turnstileToken === "string" ? body.turnstileToken.trim() : "";

  if (!apiKey || !turnstileSecretKey) {
    console.error(
      `Newsletter signup is missing ${!apiKey ? "BUTTONDOWN_API_KEY" : "TURNSTILE_SECRET_KEY"}.`
    );
    return NextResponse.json(
      { message: "Newsletter signup is temporarily unavailable. Please try again soon." },
      { status: 503 }
    );
  }

  const forwardedFor = request.headers.get("x-forwarded-for");
  const ipAddress = forwardedFor?.split(",")[0]?.trim();
  const referrerUrl = request.headers.get("referer") ?? undefined;

  if (!turnstileToken) {
    return NextResponse.json(
      { message: "Please complete the security check and try again." },
      { status: 400 }
    );
  }

  try {
    const verificationResponse = await fetch(TURNSTILE_VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret: turnstileSecretKey,
        response: turnstileToken,
        ...(ipAddress ? { remoteip: ipAddress } : {}),
      }),
      cache: "no-store",
    });

    if (!verificationResponse.ok) {
      console.error(`Turnstile verification failed with status ${verificationResponse.status}.`);
      return NextResponse.json(
        { message: "The security check is temporarily unavailable. Please try again soon." },
        { status: 502 }
      );
    }

    const verification = (await verificationResponse.json()) as TurnstileVerification;
    const requestHostname = new URL(request.url).hostname;
    const hostnameIsAllowed =
      (typeof verification.hostname === "string" &&
        PRODUCTION_HOSTNAMES.has(verification.hostname)) ||
      (process.env.NODE_ENV !== "production" && verification.hostname === requestHostname);

    if (
      !verification.success ||
      verification.action !== TURNSTILE_ACTION ||
      !hostnameIsAllowed
    ) {
      console.warn("Newsletter signup failed Turnstile verification.", {
        action: verification.action,
        hostname: verification.hostname,
      });
      return NextResponse.json(
        { message: "The security check expired or failed. Please try again." },
        { status: 403 }
      );
    }

    const subscriberPayload = JSON.stringify({
      email_address: email,
      ...(ipAddress ? { ip_address: ipAddress } : {}),
      ...(referrerUrl ? { referrer_url: referrerUrl } : {}),
    });

    const createSubscriber = (bypassFirewall = false) =>
      fetch(BUTTONDOWN_SUBSCRIBERS_URL, {
        method: "POST",
        headers: {
          Authorization: `Token ${apiKey}`,
          "Content-Type": "application/json",
          ...(bypassFirewall ? { "X-Buttondown-Bypass-Firewall": "true" } : {}),
        },
        body: subscriberPayload,
        cache: "no-store",
      });

    let response = await createSubscriber();

    if (response.ok) {
      return NextResponse.json(
        { message: "Check your inbox to confirm your subscription." },
        { status: 201 }
      );
    }

    let buttondownError = (await response.json().catch(() => ({}))) as ButtondownError;

    if (buttondownError.code === "subscriber_blocked") {
      // Turnstile already verified this visitor. Retry only the blocked request
      // with Buttondown's tightly rate-limited firewall bypass instead of using
      // the bypass for every public signup.
      response = await createSubscriber(true);

      if (response.ok) {
        return NextResponse.json(
          { message: "Check your inbox to confirm your subscription." },
          { status: 201 }
        );
      }

      buttondownError = (await response.json().catch(() => ({}))) as ButtondownError;

      if (buttondownError.code === "subscriber_blocked") {
        console.warn("Buttondown blocked a Turnstile-verified newsletter signup.");
        return NextResponse.json(
          { message: "The newsletter service could not accept this address. Please contact me directly." },
          { status: 422 }
        );
      }
    }

    if (
      buttondownError.code === "email_invalid" ||
      buttondownError.code === "email_invalid_status"
    ) {
      return NextResponse.json(
        { message: "Please check the email address and try again." },
        { status: 400 }
      );
    }

    // Avoid turning the public form into an email-address lookup. Existing or
    // pending subscribers receive the same neutral confirmation response.
    if (response.status === 400 || response.status === 409) {
      return NextResponse.json({
        message: "If this address can be subscribed, a confirmation email is on its way.",
      });
    }

    if (response.status === 422) {
      return NextResponse.json(
        { message: "Please check the email address and try again." },
        { status: 400 }
      );
    }

    if (response.status === 429) {
      return NextResponse.json(
        { message: "Too many signup attempts. Please try again in a little while." },
        { status: 429 }
      );
    }

    console.error(`Buttondown subscriber request failed with status ${response.status}.`);
    return NextResponse.json(
      { message: "We could not save your subscription. Please try again soon." },
      { status: 502 }
    );
  } catch (error) {
    console.error("Buttondown subscriber request failed.", error);
    return NextResponse.json(
      { message: "We could not save your subscription. Please try again soon." },
      { status: 502 }
    );
  }
}
