"use client";

import dynamic from "next/dynamic";

const StudioApp = dynamic(() => import("./StudioApp"), {
  ssr: false,
  loading: () => (
    <div className="flex h-screen w-screen items-center justify-center bg-slate-950 text-slate-300">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-sky-400 border-t-transparent" />
        <p className="text-xs font-medium tracking-wide text-slate-400">
          Loading CodePulse Lab...
        </p>
      </div>
    </div>
  ),
});

export default function StudioLoader() {
  return <StudioApp />;
}
