import React from "react";

export function Card({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}): JSX.Element {
  return (
    <div className="border p-4 rounded-3xl">
      <h1 className="text-3xl border-b pb-2">{title}</h1>
      <div className="p-2">{children}</div>
    </div>
  );
}
