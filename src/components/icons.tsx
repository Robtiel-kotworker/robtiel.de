export function SoundcloudIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M1.8 13.3c-.2 0-.3.2-.3.4l.5 2.4c0 .2.2.3.3.3s.3-.1.3-.3l.4-2.4c0-.2-.1-.4-.3-.4zm2.2-.9c-.2 0-.4.2-.4.4v4.2c0 .2.2.4.4.4s.4-.2.4-.4v-4.2c0-.2-.2-.4-.4-.4zm2.3-.8c-.2 0-.4.2-.4.4v5.8c0 .2.2.4.4.4s.4-.2.4-.4v-5.8c0-.2-.2-.4-.4-.4zm2.3-1.6c-.3 0-.5.2-.5.5v7.3c0 .3.2.5.5.5s.5-.2.5-.5V10.4c0-.3-.2-.5-.5-.5zm11.2 1.1c-1.1 0-2.1.4-2.8 1.1-.3-2.5-2.5-4.4-5.1-4.4-.5 0-1 .1-1.5.2-.2.1-.3.2-.3.5v8.3c0 .3.2.5.5.5h8.2c2.4 0 4.3-1.8 4.3-4.1 0-2.2-1.9-4.1-4.3-4.1z" />
    </svg>
  );
}

export function TwitchIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M4.3 2 2 6.5v13.2h4.5V22l4.5-2.3h3.6L22 13.2V2H4.3zm15.4 10.4-3.2 3.2h-3.6l-3.2 2.3v-2.3H6.5V3.8h13.2v8.6z" />
      <path d="M16.1 6.3h1.8v5.4h-1.8zm-4.5 0H13.4v5.4h-1.8z" />
    </svg>
  );
}

export function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.2C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.4A3 3 0 0 0 .5 6.2 32 32 0 0 0 0 12a32 32 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.2c1.9.4 9.4.4 9.4.4s7.5 0 9.4-.4a3 3 0 0 0 2.1-2.2A32 32 0 0 0 24 12a32 32 0 0 0-.5-5.8zM9.6 15.6V8.4L15.8 12l-6.2 3.6z" />
    </svg>
  );
}

export function HazardMarks({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 12" className={className} aria-hidden="true" fill="currentColor">
      <rect x="0" y="1" width="3" height="10" transform="skewX(-22)" />
      <rect x="8" y="1" width="3" height="10" transform="skewX(-22)" />
      <rect x="16" y="1" width="3" height="10" transform="skewX(-22)" />
      <rect x="24" y="1" width="3" height="10" transform="skewX(-22)" />
    </svg>
  );
}

export function DiamondMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={className} aria-hidden="true">
      <path
        d="M10 1.5 18.5 10 10 18.5 1.5 10Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path d="M10 6.2 13.8 10 10 13.8 6.2 10Z" fill="currentColor" />
    </svg>
  );
}
