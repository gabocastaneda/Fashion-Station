import React from "react";

export default function page(params: any) {
  const prenda = decodeURIComponent(params.params.title);
  return <div>{prenda}</div>;
}
