import { company } from "@/lib/content";

/** Ikon sosial media clickable (Instagram, Facebook, TikTok) — warna ikut currentColor. */

function InstagramIcon({ size = 17 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon({ size = 17 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14C17.17 2.1 15.97 2 14.7 2 12.06 2 10.5 3.66 10.5 6.7v2.8H8v4h2.5V22h3.5v-8.5z" />
    </svg>
  );
}

function TikTokIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 1 1-2.31-2.83v-3.5a6.37 6.37 0 1 0 5.76 6.33V8.69a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.12z" />
    </svg>
  );
}

export function WhatsAppIcon({ size = 17 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49 0 1.47 1.07 2.89 1.22 3.09.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2-1.41.25-.69.25-1.28.17-1.41-.07-.13-.27-.2-.57-.35zM12.04 21.5h-.01a9.42 9.42 0 0 1-4.8-1.32l-.34-.2-3.57.94.95-3.48-.22-.36a9.4 9.4 0 0 1-1.44-5.01c0-5.2 4.23-9.43 9.44-9.43 2.52 0 4.89.98 6.67 2.77a9.36 9.36 0 0 1 2.76 6.67c0 5.2-4.23 9.43-9.43 9.43zm8.03-17.46A11.34 11.34 0 0 0 12.04.71C5.78.71.69 5.8.69 12.05c0 2 .52 3.95 1.52 5.68L.6 23.5l5.9-1.55a11.32 11.32 0 0 0 5.42 1.38h.01c6.26 0 11.35-5.09 11.35-11.34 0-3.03-1.18-5.88-3.32-8.02z" />
    </svg>
  );
}

type SocialLinksProps = {
  className?: string;
  size?: number;
};

export default function SocialLinks({ className = "", size }: SocialLinksProps) {
  const socials = [
    { label: "Instagram", href: company.instagramLink, Icon: InstagramIcon },
    { label: "Facebook", href: company.facebookLink, Icon: FacebookIcon },
    { label: "TikTok", href: company.tiktokLink, Icon: TikTokIcon },
  ];

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {socials.map(({ label, href, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${company.nama} di ${label}`}
          className="text-paper/70 transition-colors duration-300 hover:text-gold-soft"
        >
          <Icon size={size} />
        </a>
      ))}
    </div>
  );
}
