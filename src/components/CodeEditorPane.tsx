"use client";

import React, { useMemo, useState } from "react";
import CodeMirror, { EditorView } from "@uiw/react-codemirror";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";
import { CodeBundle, EditorTab, Lang } from "@/types/lesson";
import {
  CheckCircle2,
  Columns3,
  Eraser,
  FileCode2,
  Play,
  RotateCcw,
  WrapText,
} from "lucide-react";

interface CodeEditorPaneProps {
  code: CodeBundle;
  activeTab: EditorTab;
  onChangeTab: (tab: EditorTab) => void;
  onChange: (tab: EditorTab, value: string) => void;
  onRunNow: () => void;
  onReset: () => void;
  onClearAll: () => void;
  lang: Lang;
  activeItemName: string;
  lastSavedText: string;
}

export default function CodeEditorPane({
  code,
  activeTab,
  onChangeTab,
  onChange,
  onRunNow,
  onReset,
  onClearAll,
  lang,
  activeItemName,
  lastSavedText,
}: CodeEditorPaneProps) {
  const [stackedMode, setStackedMode] = useState(false);
  const [wordWrap, setWordWrap] = useState(true);
  const [fontSize, setFontSize] = useState(13);

  const extensionsMap = useMemo(() => {
    const wrapExt = wordWrap ? [EditorView.lineWrapping] : [];
    const fontExt = EditorView.theme({
      "&": { fontSize: `${fontSize}px` },
      ".cm-content": { fontSize: `${fontSize}px` },
    });
    return {
      html: [html(), ...wrapExt, fontExt],
      css: [css(), ...wrapExt, fontExt],
      js: [javascript({ jsx: false }), ...wrapExt, fontExt],
    };
  }, [wordWrap, fontSize]);

  const tabs: { id: EditorTab; label: string; dotColor: string }[] = [
    { id: "html", label: "HTML", dotColor: "bg-orange-400" },
    { id: "css", label: "CSS", dotColor: "bg-sky-400" },
    { id: "js", label: "JavaScript", dotColor: "bg-amber-400" },
  ];

  return (
    <section className="flex h-full min-h-0 min-w-0 flex-col overflow-hidden bg-slate-950">
      {/* Editor Header Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-1.5 border-b border-slate-800 bg-slate-900/90 px-3 py-2">
        <div className="flex items-center gap-1">
          {!stackedMode &&
            tabs.map((t) => {
              const active = activeTab === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => onChangeTab(t.id)}
                  className={`flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-semibold transition ${
                    active
                      ? "bg-slate-800 text-white border border-slate-700 shadow-sm"
                      : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 border border-transparent"
                  }`}
                >
                  <span className={`h-2 w-2 rounded-full ${t.dotColor}`} />
                  {t.label}
                </button>
              );
            })}

          {stackedMode && (
            <span className="flex items-center gap-1.5 px-1 text-xs font-semibold text-sky-300">
              <FileCode2 className="h-4 w-4" />
              HTML + CSS + JS
            </span>
          )}

          <button
            type="button"
            onClick={() => setStackedMode((v) => !v)}
            title={
              lang === "bn"
                ? "একসাথে ৩টি কোড দেখুন"
                : "Toggle stacked 3-editor view"
            }
            className={`ml-0.5 flex items-center gap-1 rounded-lg border px-2 py-1.5 text-[11px] font-medium transition ${
              stackedMode
                ? "border-sky-500/40 bg-sky-500/15 text-sky-300"
                : "border-slate-800 bg-slate-950 text-slate-400 hover:text-slate-200"
            }`}
          >
            <Columns3 className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">
              {lang === "bn" ? "৩টি একসাথে" : "All 3"}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setWordWrap((v) => !v)}
            title={lang === "bn" ? "লাইন র‍্যাপ অন/অফ" : "Toggle word wrap"}
            className={`flex items-center gap-1 rounded-lg border px-2 py-1.5 text-[11px] font-medium transition ${
              wordWrap
                ? "border-sky-500/30 bg-sky-500/10 text-sky-300"
                : "border-slate-800 bg-slate-950 text-slate-400 hover:text-slate-200"
            }`}
          >
            <WrapText className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Auto-Saved Status & Controls */}
        <div className="flex items-center gap-1">
          <div className="hidden xl:flex items-center rounded-lg border border-slate-800 bg-slate-950 px-1 py-0.5 text-[10px] text-slate-300">
            <button
              type="button"
              onClick={() => setFontSize((s) => Math.max(11, s - 1))}
              title={lang === "bn" ? "ফন্ট ছোট করুন" : "Decrease font size"}
              className="px-1.5 py-0.5 hover:text-white"
            >
              A-
            </button>
            <span className="text-slate-600">|</span>
            <button
              type="button"
              onClick={() => setFontSize((s) => Math.min(18, s + 1))}
              title={lang === "bn" ? "ফন্ট বড় করুন" : "Increase font size"}
              className="px-1.5 py-0.5 hover:text-white"
            >
              A+
            </button>
          </div>

          <span
            title={
              lang === "bn"
                ? "আপনার লেখা সব কোড ব্রাউজারে অটোমেটিক সেভ হচ্ছে"
                : "Your code is automatically saved locally"
            }
            className="flex items-center gap-1 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-2 py-1 text-[11px] font-medium text-emerald-300"
          >
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span>{lang === "bn" ? "অটো-সেভড" : "Auto-Saved"}</span>
            {lastSavedText && (
              <span className="hidden 2xl:inline text-[10px] text-emerald-400/80">
                ({lastSavedText})
              </span>
            )}
          </span>

          <button
            type="button"
            onClick={onRunNow}
            title={lang === "bn" ? "পুনরায় রান করুন" : "Re-run code"}
            className="flex items-center gap-1 rounded-lg bg-sky-500 px-2 py-1.5 text-[11px] font-bold text-slate-950 hover:bg-sky-400 transition"
          >
            <Play className="h-3 w-3 fill-current" />
            <span className="hidden sm:inline">
              {lang === "bn" ? "রান" : "Run"}
            </span>
          </button>

          <button
            type="button"
            onClick={onReset}
            title={lang === "bn" ? "উদাহরণে রিসেট করুন" : "Reset to example"}
            className="flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-900 px-2 py-1.5 text-[11px] font-medium text-slate-300 hover:bg-slate-800 transition"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>

          <button
            type="button"
            onClick={onClearAll}
            title={lang === "bn" ? "কোড খালি করুন" : "Clear code"}
            className="flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-900 px-2 py-1.5 text-[11px] font-medium text-slate-300 hover:bg-slate-800 transition"
          >
            <Eraser className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Active Topic Indicator Strip */}
      <div className="flex items-center justify-between gap-2 border-b border-slate-800/80 bg-slate-900/40 px-3 py-1.5 text-[11px]">
        <span className="text-slate-400 truncate">
          {lang === "bn" ? "প্র্যাকটিস কনসোল:" : "Practice Console:"}{" "}
          <strong className="font-mono text-sky-300">{activeItemName}</strong>
        </span>
        <span className="shrink-0 text-[10px] text-slate-500">
          {lang === "bn"
            ? "লিখলেই ডান পাশে লাইভ প্রিভিউ দেখাবে"
            : "Live preview updates automatically"}
        </span>
      </div>

      {/* CodeMirror Surface */}
      <div className="flex-1 min-h-0 min-w-0 overflow-y-auto overflow-x-hidden">
        {!stackedMode ? (
          <CodeMirror
            value={code[activeTab]}
            height="100%"
            theme={oneDark}
            extensions={extensionsMap[activeTab]}
            onChange={(val) => onChange(activeTab, val)}
            className="h-full"
            basicSetup={{
              lineNumbers: true,
              highlightActiveLineGutter: true,
              foldGutter: true,
              autocompletion: true,
              bracketMatching: true,
              closeBrackets: true,
            }}
          />
        ) : (
          <div className="grid grid-cols-1 divide-y divide-slate-800">
            {tabs.map((t) => (
              <div key={t.id} className="flex flex-col">
                <div className="flex items-center gap-1.5 bg-slate-900/90 px-3 py-1 text-[11px] font-semibold text-slate-300">
                  <span className={`h-2 w-2 rounded-full ${t.dotColor}`} />
                  {t.label}
                </div>
                <CodeMirror
                  value={code[t.id]}
                  minHeight="165px"
                  maxHeight="260px"
                  theme={oneDark}
                  extensions={extensionsMap[t.id]}
                  onChange={(val) => onChange(t.id, val)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
