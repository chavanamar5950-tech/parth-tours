import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="section">
      <div className="wrap max-w-xl text-center">
        <p className="eyebrow">Error 404</p>
        <h1 className="text-4xl font-semibold">Page not found</h1>
        <p className="lead mx-auto">The page you are looking for does not exist or has moved.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/" className="btn btn-navy">Back to home</Link>
          <Link to="/#routes" className="btn btn-outline">Browse routes</Link>
        </div>
      </div>
    </section>
  );
}
