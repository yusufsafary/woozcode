export default function Logo({ size = 26, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} aria-label="woozcode">
      <rect width="32" height="32" rx="8" fill="#0a0a0a" />
      <path
        d="M5 16 L10 16 L11.5 10 L14 22 L16 10 L18 22 L20.5 16 L27 16"
        stroke="white"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  )
}
