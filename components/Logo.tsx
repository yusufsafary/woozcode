export default function Logo({ size = 28, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-label="woozcode logo"
    >
      <rect width="32" height="32" rx="9" fill="#5B3DF5" />
      {/* Signal compression: flat → zigzag (compressed) → flat */}
      <path
        d="M4 16 L9 16 L10.5 10 L13 22 L16 10 L19 22 L21.5 16 L28 16"
        stroke="white"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  )
}
