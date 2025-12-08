// Philippine Flag SVG Component - works on all devices/browsers
export default function PhFlag({ className = "w-5 h-4" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 36 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Philippine Flag"
    >
      {/* Blue stripe */}
      <rect width="36" height="12" fill="#0038A8" />
      {/* Red stripe */}
      <rect y="12" width="36" height="12" fill="#CE1126" />
      {/* White triangle */}
      <polygon points="0,0 16,12 0,24" fill="#FFFFFF" />
      {/* Sun - golden yellow */}
      <circle cx="6" cy="12" r="2.5" fill="#FCD116" />
      {/* Sun rays */}
      <g fill="#FCD116">
        {/* 8 rays */}
        <polygon points="6,8 5.5,9.5 6.5,9.5" />
        <polygon points="6,16 5.5,14.5 6.5,14.5" />
        <polygon points="2,12 3.5,11.5 3.5,12.5" />
        <polygon points="10,12 8.5,11.5 8.5,12.5" />
        <polygon points="3.2,9.2 4.2,10 4.8,9.4" />
        <polygon points="8.8,9.2 7.8,10 7.2,9.4" />
        <polygon points="3.2,14.8 4.2,14 4.8,14.6" />
        <polygon points="8.8,14.8 7.8,14 7.2,14.6" />
      </g>
      {/* 3 stars */}
      <g fill="#FCD116">
        {/* Top star */}
        <polygon
          points="6,4 5.7,5 4.7,5 5.5,5.6 5.2,6.5 6,6 6.8,6.5 6.5,5.6 7.3,5 6.3,5"
          transform="scale(0.6) translate(2, 2)"
        />
        {/* Bottom left star */}
        <polygon
          points="2.5,18 2.2,19 1.2,19 2,19.6 1.7,20.5 2.5,20 3.3,20.5 3,19.6 3.8,19 2.8,19"
          transform="scale(0.6) translate(-0.5, 2)"
        />
        {/* Bottom right star */}
        <polygon
          points="9.5,18 9.2,19 8.2,19 9,19.6 8.7,20.5 9.5,20 10.3,20.5 10,19.6 10.8,19 9.8,19"
          transform="scale(0.6) translate(4, 2)"
        />
      </g>
    </svg>
  );
}

// Inline version for smaller uses
export function PhFlagInline({ className = "w-4 h-3 inline-block" }) {
  return <PhFlag className={className} />;
}
