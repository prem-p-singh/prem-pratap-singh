import type { ReactNode, SVGProps } from "react";

export type IconProps = Omit<SVGProps<SVGSVGElement>, "children" | "viewBox"> & {
  size?: number | string;
  title?: string;
};

// One base for the whole set. Every glyph sits on a 24 unit grid with a 20 unit
// live area and is a solid pictogram: filled shapes, with detail cut out of the
// fill (evenodd) rather than drawn on top. Parts that are lines in life (a wire,
// a stem, an axis) are heavy 2.5 unit strokes so they carry the same weight.
// Colour comes from currentColor.
function Icon({ size = 24, title, className, children, ...rest }: IconProps & { children: ReactNode }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      stroke="none"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      focusable={title ? undefined : false}
      className={className}
      {...rest}
    >
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  );
}

// The heavy stroke used for parts that are lines in life.
const line = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

const LEAF =
  "M12 15.5C13.5 21 22 21.5 18.5 13L21.5 8L15.5 7L12 2L8.5 7L2.5 8L5.5 13C2 21.5 10.5 21 12 15.5Z";

// A round hole of radius 1.9 centred on (cx, cy), for evenodd cutouts.
const well = (cx: number, cy: number) =>
  `M${cx - 1.9} ${cy}a1.9 1.9 0 1 0 3.8 0a1.9 1.9 0 1 0 -3.8 0Z`;

// Trellised vine row seen from the side: two posts, a wire, a trunk and two leaves.
export function FieldIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path {...line} d="M3 4V20.5M21 4V20.5M3 10H21M12 20.5V10" />
      <path d="M5.5 9.5C5.5 5.5 7.5 3.5 11.5 3C11.5 7 9.5 9 5.5 9.5Z" />
      <path d="M12.5 9.5C12.5 5.5 14.5 3.5 18.5 3C18.5 7 16.5 9 12.5 9.5Z" />
    </Icon>
  );
}

// Digital PCR plate seen from above: six wells, two of them positive.
export function BenchIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path
        fillRule="evenodd"
        d={`M4.5 4H19.5A2.5 2.5 0 0 1 22 6.5V17.5A2.5 2.5 0 0 1 19.5 20H4.5A2.5 2.5 0 0 1 2 17.5V6.5A2.5 2.5 0 0 1 4.5 4Z${well(7, 9.5)}${well(12, 9.5)}${well(17, 9.5)}${well(7, 14.5)}${well(12, 14.5)}${well(17, 14.5)}`}
      />
      <circle cx="12" cy="9.5" r="0.95" />
      <circle cx="17" cy="14.5" r="0.95" />
    </Icon>
  );
}

// Sequencing reads stacked under one long reference.
export function AnalysisIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path {...line} d="M3 4.5H21" />
      <path {...line} d="M3 9.5H9M13 9.5H20" />
      <path {...line} d="M5.5 14.5H13.5M17.5 14.5H21" />
      <path {...line} d="M3 19.5H7M11 19.5H18" />
    </Icon>
  );
}

// Grape cluster with a short stem and one leaf.
export function CropIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path {...line} strokeWidth={2} d="M12 7.5V5.5H8.5" />
      <path d="M12.5 6C13.5 3 16.5 1.8 20.5 2.3C20 6 16.5 7.6 12.5 6Z" />
      <circle cx="7" cy="10.7" r="2.2" />
      <circle cx="12" cy="10.7" r="2.2" />
      <circle cx="17" cy="10.7" r="2.2" />
      <circle cx="9.5" cy="14.9" r="2.2" />
      <circle cx="14.5" cy="14.9" r="2.2" />
      <circle cx="12" cy="19.1" r="2.2" />
    </Icon>
  );
}

// Grape leaf with lesions cut out of the blade.
export function CropBiologyIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path
        fillRule="evenodd"
        d={`${LEAF}M14.2 10.5a1.3 1.3 0 1 0 2.6 0a1.3 1.3 0 1 0 -2.6 0ZM14.7 14.6a1.3 1.3 0 1 0 2.6 0a1.3 1.3 0 1 0 -2.6 0ZM7.2 11.5a1.3 1.3 0 1 0 2.6 0a1.3 1.3 0 1 0 -2.6 0Z`}
      />
      <path {...line} strokeWidth={2} d="M12 21.5V17" />
    </Icon>
  );
}

// Micropipette releasing a droplet into a well.
export function DiagnosticsIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M10 1.5H14A1 1 0 0 1 14 3.5H13V4.5H11V3.5H10A1 1 0 0 1 10 1.5Z" />
      <path d="M10 4.5H14A1.5 1.5 0 0 1 15.5 6V9A1.5 1.5 0 0 1 14 10.5L13 14.5H11L10 10.5A1.5 1.5 0 0 1 8.5 9V6A1.5 1.5 0 0 1 10 4.5Z" />
      <path {...line} strokeWidth={2} d="M16.5 6.5H18.5V9" />
      <path d="M12 15.4C13 16.7 13.5 17.4 13.5 18.1A1.5 1.5 0 0 1 10.5 18.1C10.5 17.4 11 16.7 12 15.4Z" />
      <path {...line} d="M3.5 18H6.5V19.5A2 2 0 0 0 8.5 21.5H15.5A2 2 0 0 0 17.5 19.5V18H20.5" />
    </Icon>
  );
}

// Chromatogram: three solid peaks on one baseline.
export function OmicsIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M2 22V20C4.5 20 4.5 11 6.5 11C8.5 11 8.5 20 9.8 20C11 20 10.8 3 12.3 3C13.8 3 13.6 20 14.8 20C16 20 16 14 17.8 14C19.6 14 19.6 20 22 20V22Z" />
    </Icon>
  );
}

// Scatter of points with a fitted line.
export function DataScienceIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path {...line} d="M3.5 3V20.5H21" />
      <path {...line} d="M7.5 17L20.5 5.5" />
      <circle cx="8" cy="9.5" r="1.6" />
      <circle cx="14" cy="16.5" r="1.6" />
      <circle cx="13" cy="6" r="1.6" />
      <circle cx="19.5" cy="12" r="1.6" />
    </Icon>
  );
}

// Bound notebook: a spine and a page, with two ruled lines and a check cut out.
export function ResearchDeliveryIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M6 2H7V22H6A2 2 0 0 1 4 20V4A2 2 0 0 1 6 2Z" />
      <path
        fillRule="evenodd"
        d="M8.4 2H18A2 2 0 0 1 20 4V20A2 2 0 0 1 18 22H8.4ZM11 6.3H17V7.7H11ZM11 10.3H17V11.7H11ZM10.6 16.6L11.7 15.5L13 16.8L16.3 13.5L17.4 14.6L13 19Z"
      />
    </Icon>
  );
}

// Site mark: a solid grape leaf with its midvein cut out.
export function SiteMark(props: IconProps) {
  return (
    <Icon {...props}>
      <path fillRule="evenodd" d={`${LEAF}M11.4 6H12.6V14.5H11.4Z`} />
      <path {...line} strokeWidth={2} d="M12 21.5V17" />
    </Icon>
  );
}
