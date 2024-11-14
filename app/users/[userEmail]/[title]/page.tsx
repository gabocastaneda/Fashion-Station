import React from "react";

export default function page(params: any) {
  const prenda = decodeURIComponent(params.params.title);
  return (
    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
      {prenda}
    </h3>
  );
}
