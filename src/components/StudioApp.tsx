"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { HTML_REFERENCE } from "@/data/htmlReference";
import { CSS_REFERENCE } from "@/data/cssReference";
import { JS_REFERENCE } from "@/data/jsReference";
import { buildSandboxSrcDoc } from "@/lib/sandbox";
import {
  CodeBundle,
  ConsoleLogEntry,
  EditorTab,
  Lang,
  ReferenceItem,
} from "@/types/lesson";
import LessonSidebar from "./LessonSidebar";
import CodeEditorPane from "./CodeEditorPane";
import OutputPanel from "./OutputPanel";
import { BookOpen, Code2, Eye, Globe, Sparkles } from "lucide-react";

const STORAGE_WORKSPACE_KEY = "codepulse_autosave_workspace_v3";
const STORAGE_ACTIVE_ITEM_KEY = "codepulse_active_item_v3";
const STORAGE_GUIDE_TAB_KEY = "codepulse_guide_tab_v3";
const STORAGE_LANG_KEY = "codepulse_lang_v3";
const STORAGE_LEARNED_KEY = "codepulse_learned_v1";

const ALL_REFERENCES: ReferenceItem[] = [
  ...HTML_REFERENCE,
  ...CSS_REFERENCE,
  ...JS_REFERENCE,
];

function readJsonStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function readStringStorage(key: string, fallback: string): string {
  if (typeof window === "undefined") return fallback;
  try {
    return window.localStorage.getItem(key) || fallback;
  } catch {
    return fallback;
  }
}

export default function StudioApp() {
  const [lang, setLang] = useState<Lang>(() => {
    const v = readStringStorage(STORAGE_LANG_KEY, "bn");
    return v === "en" || v === "bn" ? v : "bn";
  });

  const [activeGuideTab, setActiveGuideTab] = useState<EditorTab>(() => {
    const v = readStringStorage(STORAGE_GUIDE_TAB_KEY, "html");
    return v === "html" || v === "css" || v === "js" ? v : "html";
  });

  const [activeEditorTab, setActiveEditorTab] = useState<EditorTab>(() => {
    const v = readStringStorage(STORAGE_GUIDE_TAB_KEY, "html");
    return v === "html" || v === "css" || v === "js" ? v : "html";
  });

  const [activeItemId, setActiveItemId] = useState<string>(() =>
    readStringStorage(STORAGE_ACTIVE_ITEM_KEY, HTML_REFERENCE[0].id)
  );

  const activeItem = useMemo(
    () =>
      ALL_REFERENCES.find((item) => item.id === activeItemId) ?? HTML_REFERENCE[0],
    [activeItemId]
  );

  const [code, setCode] = useState<CodeBundle>(() =>
    readJsonStorage<CodeBundle>(
      STORAGE_WORKSPACE_KEY,
      HTML_REFERENCE[0].exampleCode
    )
  );

  const [learnedIds, setLearnedIds] = useState<string[]>(() =>
    readJsonStorage<string[]>(STORAGE_LEARNED_KEY, [])
  );

  const [lastSavedText, setLastSavedText] = useState<string>("");
  const [runId, setRunId] = useState(1);
  const activeRunIdRef = useRef(1);
  const isFirstMountRef = useRef(true);
  const [executedCode, setExecutedCode] = useState<CodeBundle>(() => code);

  const [logs, setLogs] = useState<ConsoleLogEntry[]>([]);
  const [runtimeError, setRuntimeError] = useState<{
    message: string;
    line: number | null;
  } | null>(null);

  const [mobilePane, setMobilePane] = useState<"guide" | "editor" | "output">(
    "editor"
  );
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  // Default Auto-Save to localStorage on every code change
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_WORKSPACE_KEY, JSON.stringify(code));
      window.localStorage.setItem(STORAGE_ACTIVE_ITEM_KEY, activeItemId);
      window.localStorage.setItem(STORAGE_GUIDE_TAB_KEY, activeGuideTab);
      window.localStorage.setItem(STORAGE_LANG_KEY, lang);
      window.localStorage.setItem(STORAGE_LEARNED_KEY, JSON.stringify(learnedIds));
    } catch {
      // Ignore storage quota errors
    }
  }, [code, activeItemId, activeGuideTab, lang, learnedIds]);

  const triggerRun = useCallback((codeToRun: CodeBundle) => {
    setLogs([]);
    setRuntimeError(null);
    setRunId((prev) => {
      const next = prev + 1;
      activeRunIdRef.current = next;
      return next;
    });
    setExecutedCode(codeToRun);
  }, []);

  // Real-time automatic preview update (skip initial mount to avoid double-run)
  useEffect(() => {
    if (isFirstMountRef.current) {
      isFirstMountRef.current = false;
      return;
    }
    const timer = setTimeout(() => {
      triggerRun(code);
    }, 220);
    return () => clearTimeout(timer);
  }, [code, triggerRun]);

  // Receive Console & Runtime errors from sandboxed iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const data = event.data;
      if (!data || data.source !== "codepulse-sandbox") return;
      if (data.runId !== activeRunIdRef.current) return;

      if (data.type === "console") {
        const entry = data.payload as Omit<ConsoleLogEntry, "id">;
        setLogs((prev) => [
          ...prev.slice(-100),
          {
            ...entry,
            id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          },
        ]);
      } else if (data.type === "runtime-error") {
        setRuntimeError(data.payload);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const stampSaved = () => {
    setLastSavedText(
      new Date().toLocaleTimeString([], {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
    );
  };

  const handleCodeChange = (tab: EditorTab, value: string) => {
    setCode((prev) => ({
      ...prev,
      [tab]: value,
    }));
    stampSaved();
  };

  const handleSelectReference = (item: ReferenceItem) => {
    setActiveItemId(item.id);
    setActiveGuideTab(item.language);
    setActiveEditorTab(item.language);
    setCode(item.exampleCode);
    stampSaved();
    triggerRun(item.exampleCode);
  };

  const handleResetToExample = () => {
    setCode(activeItem.exampleCode);
    stampSaved();
    triggerRun(activeItem.exampleCode);
  };

  const handleClearAll = () => {
    const empty: CodeBundle = { html: "", css: "", js: "" };
    setCode(empty);
    stampSaved();
    triggerRun(empty);
  };

  const srcDoc = useMemo(
    () => buildSandboxSrcDoc(executedCode, runId),
    [executedCode, runId]
  );

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-slate-950 text-slate-100">
      {/* Top Navigation Bar */}
      <header className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-b border-slate-800 bg-slate-900 px-4 py-2.5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-sky-400 to-emerald-400 text-slate-950 shadow-md shadow-sky-500/20">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-extrabold tracking-tight text-white">
                CodePulse Studio
              </h1>
              <span className="hidden sm:inline-flex rounded-full border border-sky-500/30 bg-sky-500/10 px-2 py-0.5 text-[10px] font-semibold text-sky-300">
                HTML • CSS • JavaScript
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              {lang === "bn"
                ? "বামে সব ট্যাগ ও কাজের লিস্ট • মাঝে অটো-সেভ কোড কনসোল • ডানে লাইভ প্রিভিউ ও কনসোল"
                : "Left: Full Tag & API Guide • Center: Auto-Save Practice Console • Right: Live Preview & Console"}
            </p>
          </div>
        </div>

        {/* Language Switcher */}
        <div className="flex items-center rounded-xl border border-slate-700 bg-slate-950 p-0.5">
          <Globe className="mx-1.5 h-3.5 w-3.5 text-slate-400" />
          <button
            type="button"
            onClick={() => setLang("bn")}
            className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition ${
              lang === "bn"
                ? "bg-sky-500 text-slate-950"
                : "text-slate-400 hover:text-white"
            }`}
          >
            বাংলা
          </button>
          <button
            type="button"
            onClick={() => setLang("en")}
            className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition ${
              lang === "en"
                ? "bg-sky-500 text-slate-950"
                : "text-slate-400 hover:text-white"
            }`}
          >
            EN
          </button>
        </div>
      </header>

      {/* Mobile Pane Switcher */}
      <div className="grid grid-cols-3 border-b border-slate-800 bg-slate-900/90 lg:hidden">
        {(
          [
            {
              id: "guide",
              labelBn: "ট্যাগ লিস্ট",
              labelEn: "Reference",
              icon: BookOpen,
            },
            {
              id: "editor",
              labelBn: "প্র্যাকটিস",
              labelEn: "Practice",
              icon: Code2,
            },
            {
              id: "output",
              labelBn: "প্রিভিউ ও কনসোল",
              labelEn: "Preview",
              icon: Eye,
            },
          ] as const
        ).map((item) => {
          const Icon = item.icon;
          const active = mobilePane === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setMobilePane(item.id)}
              className={`flex items-center justify-center gap-1.5 py-2 text-xs font-semibold border-b-2 transition ${
                active
                  ? "border-sky-400 text-sky-300 bg-slate-800/50"
                  : "border-transparent text-slate-400"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              {lang === "bn" ? item.labelBn : item.labelEn}
            </button>
          );
        })}
      </div>

      {/* 3-Panel Real-Time Workspace */}
      <main className="flex-1 min-h-0 min-w-0 w-full overflow-hidden grid grid-cols-1 lg:grid-cols-[330px_minmax(0,1fr)_390px] xl:grid-cols-[360px_minmax(0,1fr)_440px] 2xl:grid-cols-[380px_minmax(0,1fr)_480px]">
        {/* Left: HTML | CSS | JavaScript Tabbed Tag & Feature Catalog */}
        <div
          className={`min-h-0 min-w-0 overflow-hidden ${
            mobilePane === "guide" ? "block h-full" : "hidden"
          } lg:block`}
        >
          <LessonSidebar
            activeGuideTab={activeGuideTab}
            onChangeGuideTab={(tab) => {
              setActiveGuideTab(tab);
              setActiveEditorTab(tab);
            }}
            activeItemId={activeItemId}
            learnedIds={learnedIds}
            onToggleLearned={(id) =>
              setLearnedIds((prev) =>
                prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
              )
            }
            onSelectReference={handleSelectReference}
            lang={lang}
          />
        </div>

        {/* Center: Practice Code Console (Auto-Save + Real-Time) */}
        <div
          className={`min-h-0 min-w-0 overflow-hidden ${
            mobilePane === "editor" ? "block h-full" : "hidden"
          } lg:block`}
        >
          <CodeEditorPane
            code={code}
            activeTab={activeEditorTab}
            onChangeTab={setActiveEditorTab}
            onChange={handleCodeChange}
            onRunNow={() => triggerRun(code)}
            onReset={handleResetToExample}
            onClearAll={handleClearAll}
            lang={lang}
            activeItemName={activeItem.name}
            lastSavedText={lastSavedText}
          />
        </div>

        {/* Right: ONLY Preview & Console */}
        <div
          className={`min-h-0 min-w-0 overflow-hidden ${
            mobilePane === "output" ? "block h-full" : "hidden"
          } lg:block`}
        >
          <OutputPanel
            srcDoc={srcDoc}
            iframeRef={iframeRef}
            logs={logs}
            runtimeError={runtimeError}
            onClearConsole={() => setLogs([])}
            onReloadPreview={() => triggerRun(code)}
            lang={lang}
            runCount={runId}
          />
        </div>
      </main>
    </div>
  );
}
