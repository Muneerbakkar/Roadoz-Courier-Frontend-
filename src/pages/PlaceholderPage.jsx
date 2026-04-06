export function PlaceholderPage({ title }) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
      <h1 className="text-4xl font-bold text-text-main">{title}</h1>
      <p className="text-text-muted max-w-md">
        This page is currently under development. Please check back later for updates.
      </p>
    </div>
  );
}
