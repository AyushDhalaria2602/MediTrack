/**
 * A single "vitals strip" stat card.
 * When `onClick` is supplied it renders as a real <button> — keyboard and
 * screen-reader accessible, with a hover/press state defined in CSS —
 * so stats double as quick filters (e.g. "Critical" jumps to the filtered
 * patient list). Without `onClick` it stays a plain, static <article>.
 */
export default function StatCard({ label, value, tone = "default", hint, onClick }) {
  const content = (
    <>
      <p className="stat-card__label">{label}</p>
      <p className="stat-card__value">{value}</p>
      {hint && <p className="stat-card__hint">{hint}</p>}
    </>
  );

  if (onClick) {
    return (
      <button
        type="button"
        className={`stat-card stat-card--${tone} stat-card--clickable`}
        onClick={onClick}
      >
        {content}
      </button>
    );
  }

  return <article className={`stat-card stat-card--${tone}`}>{content}</article>;
}
