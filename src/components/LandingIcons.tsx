import type { ReactNode, SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

function BaseIcon({ children, ...props }: IconProps & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  )
}

export function ThermometerIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M14 14.76V3.5a2 2 0 1 0-4 0v11.26a4 4 0 1 0 4 0Z" />
      <path d="M10 9h4" />
    </BaseIcon>
  )
}

export function FactoryIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M3 21h18" />
      <path d="M5 21V11l5 3V9l5 3V7l4 2v12" />
      <path d="M9 21v-4" />
      <path d="M15 21v-3" />
      <path d="M18 5c0-1.1.9-2 2-2" />
      <path d="M16.5 7a2.5 2.5 0 0 1 2.5-2.5" />
    </BaseIcon>
  )
}

export function AnchorIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M12 22V7" />
      <path d="M8 22a4 4 0 0 1-4-4h4" />
      <path d="M16 22a4 4 0 0 0 4-4h-4" />
      <path d="M5 18a7 7 0 0 0 14 0" />
      <circle cx="12" cy="4" r="2" />
    </BaseIcon>
  )
}

export function BadgeDollarIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="m12 3 2.6 1.7 3.1.2 1.1 2.9 2 2.4-1.3 2.8.2 3.1-2.7 1.5-1.5 2.7-3.1-.2L12 21l-2.6-1.7-3.1-.2-1.1-2.9-2-2.4 1.3-2.8-.2-3.1 2.7-1.5 1.5-2.7 3.1.2L12 3Z" />
      <path d="M12 8v8" />
      <path d="M14.5 10.5c0-1.1-1.1-2-2.5-2s-2.5.9-2.5 2 1.1 1.8 2.5 2 2.5.9 2.5 2-1.1 2-2.5 2-2.5-.9-2.5-2" />
    </BaseIcon>
  )
}

export function DatabaseIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <ellipse cx="12" cy="5" rx="7" ry="3" />
      <path d="M5 5v6c0 1.7 3.1 3 7 3s7-1.3 7-3V5" />
      <path d="M5 11v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" />
    </BaseIcon>
  )
}

export function ActivitySquareIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <path d="M7 12h2l1.5-3 3 6 1.5-3H17" />
    </BaseIcon>
  )
}

export function ShieldCheckIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="m12 3 7 3v5c0 5-3.4 8.3-7 10-3.6-1.7-7-5-7-10V6l7-3Z" />
      <path d="m9.5 12.5 1.8 1.8 3.7-4" />
    </BaseIcon>
  )
}
