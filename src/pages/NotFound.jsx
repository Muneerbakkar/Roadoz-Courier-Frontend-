import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";

export function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-dashboard-bg text-text-main text-center p-6 transition-colors duration-300">
      <h1 className="text-9xl font-bold text-primary">404</h1>
      <h2 className="text-3xl font-semibold mt-4">Page Not Found</h2>
      <p className="text-text-muted mt-2 max-w-md">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link to="/" className="mt-8">
        <Button size="lg">Back to Dashboard</Button>
      </Link>
    </div>
  );
}
