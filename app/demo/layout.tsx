import type { ReactNode } from "react";
import "./demo.css";

export default function DemoLayout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
