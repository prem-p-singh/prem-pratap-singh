import type { ReactNode, SVGProps } from "react";

export type IconProps = Omit<SVGProps<SVGSVGElement>, "children" | "viewBox"> & {
  size?: number | string;
  title?: string;
};

// One base for the whole set. Every glyph sits on a 24 unit grid with a 20 unit
// live area and is drawn in stroke only: 1.5 wide, round caps and joins. Solid
// dots have radius 1. Colour comes from currentColor.
function Icon({ size = 24, title, className, children, ...rest }: IconProps & { children: ReactNode }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
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

// Trellised vine row seen from the side: two posts, a wire, a trained trunk and two leaves.
export function FieldIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M2 21H22M3 4V21M21 4V21M3 9H21" />
      <path d="M10 21V14C10 11 11.5 9 14.5 9" />
      <path d="M7 9C7 6 8.5 4.5 11 4C11 7 9.5 8.5 7 9Z" />
      <path d="M14 9C14 6 15.5 4.5 18 4C18 7 16.5 8.5 14 9Z" />
    </Icon>
  );
}

// Digital PCR plate seen from above: six wells, two of them positive.
export function BenchIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="2" y="4.5" width="20" height="15" rx="1.5" />
      <path d="M8 9A1.5 1.5 0 1 0 5 9A1.5 1.5 0 1 0 8 9M13.5 9A1.5 1.5 0 1 0 10.5 9A1.5 1.5 0 1 0 13.5 9M19 9A1.5 1.5 0 1 0 16 9A1.5 1.5 0 1 0 19 9" />
      <path d="M8 15A1.5 1.5 0 1 0 5 15A1.5 1.5 0 1 0 8 15M13.5 15A1.5 1.5 0 1 0 10.5 15A1.5 1.5 0 1 0 13.5 15M19 15A1.5 1.5 0 1 0 16 15A1.5 1.5 0 1 0 19 15" />
      <circle cx="12" cy="9" r="1" fill="currentColor" stroke="none" />
      <circle cx="17.5" cy="15" r="1" fill="currentColor" stroke="none" />
    </Icon>
  );
}

// Sequencing reads stacked under one long reference.
export function AnalysisIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M2 4H22" />
      <path d="M2 8H9M12 8H20" />
      <path d="M5 12H14M17 12H22" />
      <path d="M2 16H6M9 16H19" />
      <path d="M4 20H11M14 20H21" />
    </Icon>
  );
}

// Grape cluster with a short stem and one leaf.
export function CropIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M7 6H12V10" />
      <path d="M12 6C13 3 16.5 2 20 2.5C19.5 6 16 7.5 12 6Z" />
      <circle cx="8" cy="12" r="2" />
      <circle cx="12" cy="12" r="2" />
      <circle cx="16" cy="12" r="2" />
      <circle cx="10" cy="15.5" r="2" />
      <circle cx="14" cy="15.5" r="2" />
      <circle cx="12" cy="19" r="2" />
    </Icon>
  );
}

// Grape leaf with lesions on the blade.
export function CropBiologyIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 15.5C13.5 21 22 21.5 18.5 13L21.5 8L15.5 7L12 2L8.5 7L2.5 8L5.5 13C2 21.5 10.5 21 12 15.5Z" />
      <path d="M12 22V9" />
      <circle cx="15.5" cy="10.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="16" cy="14.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="8.5" cy="11.5" r="1" fill="currentColor" stroke="none" />
    </Icon>
  );
}

// Pipette tip releasing a droplet into a tube.
export function DiagnosticsIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M17.5 2L12.5 8.5L13.5 9.5L20.5 5Z" />
      <path d="M19 3.5L20.5 2" />
      <circle cx="11" cy="11.5" r="1" fill="currentColor" stroke="none" />
      <path d="M6 14H16M7.5 14V18L11 22L14.5 18V14" />
      <path d="M7.5 18H14.5" />
    </Icon>
  );
}

// Chromatogram trace with three peaks on one baseline.
export function OmicsIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M2 20H3C5 20 5 12 6 12C7 12 7 20 9 20C11 20 11 4 12 4C13 4 13 20 15 20C17 20 17 15 18 15C19 15 19 20 21 20H22" />
    </Icon>
  );
}

// Scatter of points with a fitted line.
export function DataScienceIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M3 3V21H21" />
      <path d="M6 18L21 5" />
      <circle cx="8.5" cy="12.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="11.5" cy="16.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="14.5" cy="7.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="18" cy="11" r="1" fill="currentColor" stroke="none" />
    </Icon>
  );
}

// Bound notebook page with ruled lines and a check.
export function ResearchDeliveryIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="4" y="2" width="16" height="20" rx="1.5" />
      <path d="M8 2V22" />
      <path d="M11 7H17" />
      <path d="M11 11H17" />
      <path d="M11 16.5L13 18.5L17 14.5" />
    </Icon>
  );
}

// Site mark: a grape leaf outline with one vein.
export function SiteMark(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 15.5C13.5 21 22 21.5 18.5 13L21.5 8L15.5 7L12 2L8.5 7L2.5 8L5.5 13C2 21.5 10.5 21 12 15.5Z" />
      <path d="M12 22V9" />
    </Icon>
  );
}
