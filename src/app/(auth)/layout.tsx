import { ReactNode } from "react";

export default function Layout({ children }: Readonly<{
    children: ReactNode;
  }>) {
  return (
    <div className="w-screen h-screen bg-[#042D44]">
      {children}
    </div>
  )
}