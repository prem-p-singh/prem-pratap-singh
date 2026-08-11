import { NextResponse } from "next/server";

const BUTTONDOWN_SUBSCRIBERS_URL = "https://api.buttondown.com/v1/subscribers";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type SubscribeBody = {
  email?: unknown;
  website?: unknown;
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

  if (!apiKey) {
    console.error("Newsletter signup is missing BUTTONDOWN_API_KEY.");
    return NextResponse.json(
      { message: "Newsletter signup is temporarily unavailable. Please try again soon." },
      { status: 503 }
    );
  }

  const forwardedFor = request.headers.get("x-forwarded-for");
  const ipAddress = forwardedFor?.split(",")[0]?.trim();
  const referrerUrl = request.headers.get("referer") ?? undefined;

  try {
    const response = await fetch(BUTTONDOWN_SUBSCRIBERS_URL, {
      method: "POST",
      headers: {
        Authorization: `Token ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email_address: email,
        ...(ipAddress ? { ip_address: ipAddress } : {}),
        ...(referrerUrl ? { referrer_url: referrerUrl } : {}),
      }),
      cache: "no-store",
    });

    if (response.ok) {
      return NextResponse.json(
        { message: "Check your inbox to confirm your subscription." },
        { status: 201 }
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
