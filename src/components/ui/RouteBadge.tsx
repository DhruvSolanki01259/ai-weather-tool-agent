export function RouteBadge({ type }: { type: "direct" | "weather" }) {
  const config = {
    direct: {
      label: "Direct",
      className: "bg-gray-100 text-gray-700 border-gray-200",
    },
    weather: {
      label: "Weather",
      className: "bg-blue-100 text-blue-700 border-blue-200",
    },
  };

  const { label, className } = config[type];

  return (
    <span
      className={`px-2 py-0.5 text-[11px] rounded-full border font-medium ${className}`}
    >
      {label}
    </span>
  );
}