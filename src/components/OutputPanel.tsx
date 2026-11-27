"use client";

import React, { useState } from "react";
import { ConsoleLogEntry, Lang } from "@/types/lesson";
import {
  AlertTriangle,
  Columns2,
  Eye,
  RotateCw,
  Terminal,
  Trash2,
} from "lucide-react";

type OutputMode = "split" | "preview" | "console";

interface OutputPanelProps {
  srcDoc: string;
  iframeRef: React.RefObject<HTMLIFrameElement | null>;
  logs: ConsoleLogEntry[];
  runtimeError: { message: string; line: number | null } | null;
  onClearConsole: () => void;
  onReloadPreview: () => void;
  lang: Lang;
  runCount: number;
}

export default function OutputPanel({
  srcDoc,
  iframeRef,
  logs,
  runtimeError,
  onClearConsole,
  onReloadPreview,
  lang,
  runCount,
}: OutputPanelProps) {
  const [mode, setMode] = useState<OutputMode>("split");

  const tabs: {
    id: OutputMode;
    labelBn: string;
    labelEn: string;
    icon: React.ComponentType<{ className?: string }>;
  }[] = [
    { id: "split", labelBn: "প্রিভিউ + কনসোল", labelEn: "Preview + Console", icon: Columns2 },
    { id: "preview", labelBn: "শুধু প্রিভিউ", labelEn: "Preview", icon: Eye },
    { id: "console", labelBn: "শুধু কনসোল", labelEn: "Console", icon: Terminal },
  ];

  const showPreview = mode === "split" || mode === "preview";
  const showConsole = mode === "split" || mode === "console";

  return (
    <section className="flex h-full min-h-0 min-w-0 flex-col border-l border-slate-800 bg-slate-950">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 bg-slate-900/90 px-3 py-2">
        <div className="flex items-center gap-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const active = mode === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setMode(tab.id)}
                className={`flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-[11px] font-semibold transition ${
                  active
                    ? "bg-sky-500/20 text-sky-300 border border-sky-500/40"
                    : "text-slate-400 hover:bg-slate-800/70 hover:text-slate-200 border border-transparent"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{lang === "bn" ? tab.labelBn : tab.labelEn}</span>
                {tab.id === "console" && logs.length > 0 && (
                  <span className="rounded-full bg-slate-800 px-1.5 text-[9px] text-slate-300">
                    {logs.length}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-1.5 text-[11px]">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <span className="font-mono text-[10px] text-slate-400">
            Live #{runCount}
          </span>
        </div>
      </div>

      {/* Syntax / Runtime Error Banner */}
      {runtimeError && (
        <div className="flex items-start gap-2 border-b border-rose-500/40 bg-rose-950/60 px-3 py-2 text-xs text-rose-200">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-rose-400" />
          <div className="font-mono text-[11px] break-words">
            <span className="font-bold">Error: </span>
            {runtimeError.message}
            {runtimeError.line ? ` (line ${runtimeError.line})` : ""}
          </div>
        </div>
      )}

      {/* Preview + Console Stacked Cleanly */}
      <div className="flex flex-1 min-h-0 flex-col gap-3 p-3 overflow-hidden">
        {showPreview && (
          <div
            className={`flex min-h-0 flex-col overflow-hidden rounded-xl border border-slate-800 bg-slate-900 ${
              mode === "split" ? "flex-[3]" : "flex-1"
            }`}
          >
            <div className="flex shrink-0 items-center justify-between border-b border-slate-800 bg-slate-900/90 px-3 py-1.5">
              <span className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-300">
                <Eye className="h-3.5 w-3.5 text-sky-400" />
                {lang === "bn" ? "লাইভ প্রিভিউ" : "Live Preview"}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-slate-500">HTML + CSS + JS</span>
                <button
                  type="button"
                  onClick={onReloadPreview}
                  title={lang === "bn" ? "প্রিভিউ রিলোড" : "Reload preview"}
                  className="rounded p-0.5 text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition"
                >
                  <RotateCw className="h-3 w-3" />
                </button>
              </div>
            </div>
            <iframe
              ref={iframeRef}
              title="Live Sandbox Preview"
              sandbox="allow-scripts"
              srcDoc={srcDoc}
              className="h-full w-full flex-1 bg-slate-950"
            />
          </div>
        )}

        {showConsole && (
          <div
            className={`flex min-h-0 flex-col overflow-hidden rounded-xl border border-slate-800 bg-slate-900/70 ${
              mode === "split" ? "flex-[2]" : "flex-1"
            }`}
          >
            <div className="flex shrink-0 items-center justify-between border-b border-slate-800 px-3 py-1.5">
              <span className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-200">
                <Terminal className="h-3.5 w-3.5 text-amber-400" />
                {lang === "bn" ? "কনসোল আউটপুট" : "Console Output"}
                {logs.length > 0 && (
                  <span className="rounded bg-slate-800 px-1.5 py-0.2 text-[10px] text-slate-300">
                    {logs.length}
                  </span>
                )}
              </span>
              {logs.length > 0 && (
                <button
                  type="button"
                  onClick={onClearConsole}
                  className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-slate-200"
                >
                  <Trash2 className="h-3 w-3" />
                  {lang === "bn" ? "মুছুন" : "Clear"}
                </button>
              )}
            </div>

            <div className="flex-1 min-h-0 overflow-y-auto p-2.5 space-y-1.5 font-mono text-[11px]">
              {logs.length === 0 ? (
                <p className="py-2 text-slate-500">
                  {lang === "bn"
                    ? "console.log(...) লিখলে আউটপুট এখানে দেখাবে।"
                    : "console.log(...) output appears here."}
                </p>
              ) : (
                logs.map((log) => (
                  <div
                    key={log.id}
                    className={`flex items-start justify-between gap-2 rounded-md px-2 py-1.5 ${
                      log.level === "error"
                        ? "bg-rose-950/60 text-rose-200"
                        : log.level === "warn"
                        ? "bg-amber-950/50 text-amber-200"
                        : "bg-slate-950/80 text-slate-200"
                    }`}
                  >
                    <span className="whitespace-pre-wrap break-all">
                      <span className="mr-1.5 text-slate-500">&gt;</span>
                      {log.level === "error" && (
                        <span className="mr-1.5 rounded bg-rose-500/20 px-1 text-[9px] font-bold text-rose-300">
                          ERR
                        </span>
                      )}
                      {log.level === "warn" && (
                        <span className="mr-1.5 rounded bg-amber-500/20 px-1 text-[9px] font-bold text-amber-300">
                          WARN
                        </span>
                      )}
                      {log.args.join(" ")}
                    </span>
                    <span className="shrink-0 text-[9px] text-slate-500">
                      {log.timestamp}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
