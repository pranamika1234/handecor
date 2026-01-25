import React from "react";

export default function SourceBadge({ status, label }) {
  const dotColor =
    status === "live"
      ? "bg-green-500"
      : status === "cache"
        ? "bg-amber-500"
        : "bg-gray-400";

  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 text-gray-700">
      <span className={`h-2 w-2 rounded-full ${dotColor}`} />
      {label}
    </span>
  );
}
