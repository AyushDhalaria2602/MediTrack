import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="not-found">
      <p className="not-found__code">404</p>
      <h1>This ward doesn&apos;t exist</h1>
      <p>The page you&apos;re looking for was moved, discharged, or never admitted.</p>
      <Link className="btn btn--primary" to="/app">
        Back to Dashboard
      </Link>
    </section>
  );
}
