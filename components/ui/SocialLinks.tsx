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
