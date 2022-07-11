export function WithTopBar(Component: () => React.ReactElement, title: string) {
  return () => (
    <div className="w-full">
      <div
        className="h-16 w-full bg-blue-500 flex items-center pl-6"
        style={{ boxShadow: "4px 2px 4px rgba(0, 0, 0, 0.2)" }}
      >
        <h1 className="text-neutral-50 font-bold tracking-wide">
          {title.toUpperCase()}
        </h1>
      </div>
      <Component />
    </div>
  );
}
