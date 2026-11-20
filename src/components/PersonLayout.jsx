export default function PersonLayout({
  avatar,
  heading,
  role,
  hidden = false,
  children,
}) {
  return (
    <div
      className="person-layout"
      aria-hidden={hidden || undefined}
    >
      <div className="person-hero">
        {avatar}

        <div className="person-heading">
          {heading}
          {role}
        </div>
      </div>

      {children}
    </div>
  );
}
