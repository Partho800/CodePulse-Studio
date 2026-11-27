"use client";

import React, { useMemo, useState } from "react";
import { EditorTab, Lang, ReferenceItem } from "@/types/lesson";
import { HTML_REFERENCE } from "@/data/htmlReference";
import { CSS_REFERENCE } from "@/data/cssReference";
import { JS_REFERENCE } from "@/data/jsReference";
import {
  AlertCircle,
  ArrowRight,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Code2,
  Compass,
  Copy,
  Layers,
  Lightbulb,
  ListChecks,
  Play,
  Puzzle,
  Rocket,
  Search,
} from "lucide-react";

interface LessonSidebarProps {
  activeGuideTab: EditorTab;
  onChangeGuideTab: (tab: EditorTab) => void;
  activeItemId: string;
  learnedIds: string[];
  onToggleLearned: (id: string) => void;
  onSelectReference: (item: ReferenceItem) => void;
  lang: Lang;
}

export default function LessonSidebar({
  activeGuideTab,
  onChangeGuideTab,
  activeItemId,
  learnedIds,
  onToggleLearned,
  onSelectReference,
  lang,
}: LessonSidebarProps) {
  const [query, setQuery] = useState("");
  const [expandedId, setExpandedId] = useState<string>(HTML_REFERENCE[0].id);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const activeList = useMemo(() => {
    if (activeGuideTab === "html") return HTML_REFERENCE;
    if (activeGuideTab === "css") return CSS_REFERENCE;
    return JS_REFERENCE;
  }, [activeGuideTab]);

  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return activeList;
    return activeList.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.summary.bn.toLowerCase().includes(q) ||
        item.summary.en.toLowerCase().includes(q) ||
        item.whatItDoes.bn.toLowerCase().includes(q) ||
        item.whatItDoes.en.toLowerCase().includes(q) ||
        item.whyToUse.bn.toLowerCase().includes(q) ||
        item.whyToUse.en.toLowerCase().includes(q)
    );
  }, [activeList, query]);

  const grouped = useMemo(() => {
    const map = new Map<string, ReferenceItem[]>();
    for (const item of filteredItems) {
      const cat = item.category[lang];
      if (!map.has(cat)) map.set(cat, []);
      map.get(cat)!.push(item);
    }
    return Array.from(map.entries());
  }, [filteredItems, lang]);

  const learnedInTab = useMemo(
    () => activeList.filter((item) => learnedIds.includes(item.id)).length,
    [activeList, learnedIds]
  );

  const tabs: {
    id: EditorTab;
    label: string;
    count: number;
    activeClass: string;
  }[] = [
    {
      id: "html",
      label: "HTML",
      count: HTML_REFERENCE.length,
      activeClass: "border-orange-400 bg-orange-500/15 text-orange-300",
    },
    {
      id: "css",
      label: "CSS",
      count: CSS_REFERENCE.length,
      activeClass: "border-sky-400 bg-sky-500/15 text-sky-300",
    },
    {
      id: "js",
      label: "JavaScript",
      count: JS_REFERENCE.length,
      activeClass: "border-amber-400 bg-amber-500/15 text-amber-300",
    },
  ];

  const handleCopySyntax = async (id: string, syntax: string) => {
    try {
      await navigator.clipboard.writeText(syntax);
      setCopiedId(id);
      setTimeout(() => setCopiedId((cur) => (cur === id ? null : cur)), 1500);
    } catch {}
  };

  const handleGoNext = (currentId: string) => {
    const idx = activeList.findIndex((x) => x.id === currentId);
    const nextItem = activeList[idx + 1] ?? activeList[0];
    if (!nextItem) return;
    setExpandedId(nextItem.id);
    onSelectReference(nextItem);
  };

  return (
    <aside className="flex h-full min-h-0 min-w-0 flex-col border-r border-slate-800 bg-slate-900/95">
      {/* Top 3 Language Tabs: HTML | CSS | JavaScript */}
      <div className="border-b border-slate-800 p-2.5 space-y-2">
        <div className="grid grid-cols-3 gap-1.5">
          {tabs.map((tab) => {
            const isActive = activeGuideTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  onChangeGuideTab(tab.id);
                  setQuery("");
                  const first =
                    tab.id === "html"
                      ? HTML_REFERENCE[0]
                      : tab.id === "css"
                      ? CSS_REFERENCE[0]
                      : JS_REFERENCE[0];
                  if (first) setExpandedId(first.id);
                }}
                className={`flex items-center justify-center gap-1 rounded-lg border px-2 py-2 text-xs font-bold transition ${
                  isActive
                    ? tab.activeClass
                    : "border-slate-800 bg-slate-950/70 text-slate-400 hover:text-slate-200"
                }`}
              >
                <span>{tab.label}</span>
                <span className="rounded bg-slate-900/90 px-1 py-0.2 text-[10px] text-slate-400">
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Tab Learning Progress Bar */}
        <div className="flex items-center gap-2 px-0.5 text-[10px] text-slate-400">
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-full bg-gradient-to-r from-sky-400 to-emerald-400 transition-all duration-300"
              style={{
                width: `${Math.round((learnedInTab / Math.max(1, activeList.length)) * 100)}%`,
              }}
            />
          </div>
          <span className="shrink-0 font-semibold text-emerald-300">
            {learnedInTab}/{activeList.length}{" "}
            {lang === "bn" ? "শিখেছেন" : "learned"}
          </span>
        </div>

        {/* Search inside active tab */}
        <div className="relative">
          <Search className="pointer-events-none absolute left-2.5 top-2 h-3.5 w-3.5 text-slate-500" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              lang === "bn"
                ? `${activeGuideTab.toUpperCase()} ট্যাগ, ডট, ব্র্যাকেট বা কাজ খুঁজুন...`
                : `Search ${activeGuideTab.toUpperCase()} tag, symbol, or topic...`
            }
            className="w-full rounded-lg border border-slate-800 bg-slate-950 py-1.5 pl-8 pr-3 text-xs text-slate-100 placeholder:text-slate-500 focus:border-sky-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Single-Item Categorized Reference List */}
      <div className="flex-1 min-h-0 overflow-y-auto p-2.5 space-y-4">
        {grouped.length === 0 ? (
          <p className="py-6 text-center text-xs text-slate-500">
            {lang === "bn" ? "কোনো আইটেম পাওয়া যায়নি" : "No matching items"}
          </p>
        ) : (
          grouped.map(([categoryTitle, items]) => (
            <div key={categoryTitle} className="space-y-1.5">
              <div className="sticky top-0 z-10 rounded-md bg-slate-900/95 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 backdrop-blur">
                {categoryTitle}
              </div>

              <div className="space-y-1.5">
                {items.map((item) => {
                  const isExpanded = expandedId === item.id;
                  const isLoaded = activeItemId === item.id;
                  const isLearned = learnedIds.includes(item.id);

                  return (
                    <div
                      key={item.id}
                      className={`rounded-xl border transition ${
                        isLoaded
                          ? "border-sky-500/50 bg-slate-950/90"
                          : isExpanded
                          ? "border-slate-700 bg-slate-950/75"
                          : "border-slate-800/80 bg-slate-950/40 hover:border-slate-700"
                      }`}
                    >
                      {/* Collapsed Row: Single Tag/Symbol Name + 1-Line Summary */}
                      <button
                        type="button"
                        onClick={() => setExpandedId(isExpanded ? "" : item.id)}
                        className="flex w-full items-start justify-between gap-2 px-3 py-2.5 text-left"
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5">
                            {isLearned && (
                              <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
                            )}
                            <span className="truncate font-mono text-xs font-bold text-white">
                              {item.name}
                            </span>
                            {isLoaded && (
                              <span className="shrink-0 rounded bg-sky-500/20 px-1.5 py-0.5 text-[9px] font-semibold text-sky-300">
                                {lang === "bn" ? "চালু" : "Active"}
                              </span>
                            )}
                          </div>
                          <p className="mt-0.5 text-[11px] leading-snug text-slate-400">
                            {item.summary[lang]}
                          </p>
                        </div>
                        {isExpanded ? (
                          <ChevronDown className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                        ) : (
                          <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" />
                        )}
                      </button>

                      {/* Expanded Deep Line-by-Line Guide */}
                      {isExpanded && (
                        <div className="border-t border-slate-800/80 px-3 pb-3 pt-3 space-y-3">
                          {/* 1. Syntax + Copy */}
                          <div className="space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="flex items-center gap-1.5 text-[11px] font-bold text-amber-300">
                                <Code2 className="h-3.5 w-3.5" />
                                {lang === "bn"
                                  ? "১. লেখার নিয়ম (Syntax)"
                                  : "1. Syntax"}
                              </span>
                              <button
                                type="button"
                                onClick={() => handleCopySyntax(item.id, item.syntax)}
                                className="flex items-center gap-1 rounded border border-slate-700 bg-slate-900 px-1.5 py-0.5 text-[10px] text-slate-300 hover:text-white"
                              >
                                {copiedId === item.id ? (
                                  <>
                                    <Check className="h-3 w-3 text-emerald-400" />
                                    <span>{lang === "bn" ? "কপি হয়েছে" : "Copied"}</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="h-3 w-3" />
                                    <span>{lang === "bn" ? "কপি" : "Copy"}</span>
                                  </>
                                )}
                              </button>
                            </div>
                            <pre className="overflow-x-auto rounded-lg border border-slate-800 bg-slate-900 p-2.5 font-mono text-[11px] leading-relaxed text-amber-200">
                              {item.syntax}
                            </pre>
                          </div>

                          {/* 2. What it does */}
                          <div className="space-y-1 rounded-lg border border-slate-800/70 bg-slate-900/40 p-2.5">
                            <div className="flex items-center gap-1.5 text-[11px] font-bold text-sky-300">
                              <BookOpen className="h-3.5 w-3.5" />
                              {lang === "bn"
                                ? "২. সহজ ভাষায় কী কাজ করে"
                                : "2. What It Does (Simple)"}
                            </div>
                            <p className="text-xs leading-relaxed text-slate-200">
                              {item.whatItDoes[lang]}
                            </p>
                          </div>

                          {/* 3. Symbol & Dot/Bracket Anatomy */}
                          {item.symbolAnatomy.length > 0 && (
                            <div className="space-y-1.5 rounded-lg border border-indigo-500/25 bg-indigo-950/20 p-2.5">
                              <div className="flex items-center gap-1.5 text-[11px] font-bold text-indigo-300">
                                <Puzzle className="h-3.5 w-3.5" />
                                {lang === "bn"
                                  ? "৩. ডট, ব্র্যাকেট ও চিহ্ন বিশ্লেষণ (কোনটা কেন?)"
                                  : "3. Symbol & Punctuation Anatomy"}
                              </div>
                              <div className="space-y-1.5">
                                {item.symbolAnatomy.map((sym, idx) => (
                                  <div
                                    key={idx}
                                    className="rounded-md border border-slate-800/70 bg-slate-950/75 px-2.5 py-1.5"
                                  >
                                    <code className="block font-mono text-[11px] font-bold text-indigo-200">
                                      {sym.symbol}
                                    </code>
                                    <p className="mt-0.5 text-[11px] leading-relaxed text-slate-300">
                                      {sym.meaning[lang]}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* 4. Where & Why */}
                          <div className="space-y-2 rounded-lg border border-slate-800/70 bg-slate-900/40 p-2.5">
                            <div className="flex items-center gap-1.5 text-[11px] font-bold text-cyan-300">
                              <Compass className="h-3.5 w-3.5" />
                              {lang === "bn"
                                ? "৪. কোথায় ও কেন ব্যবহার করবেন"
                                : "4. Where & Why to Use"}
                            </div>
                            <div className="space-y-1.5">
                              <div className="rounded-md bg-slate-950/60 p-2">
                                <span className="block text-[10px] font-bold text-cyan-300">
                                  {lang === "bn" ? "কোথায় ব্যবহার করবেন:" : "Where:"}
                                </span>
                                <p className="mt-0.5 text-[11px] leading-relaxed text-slate-200">
                                  {item.whereToUse[lang]}
                                </p>
                              </div>
                              <div className="rounded-md bg-slate-950/60 p-2">
                                <span className="block text-[10px] font-bold text-cyan-300">
                                  {lang === "bn" ? "কেন ব্যবহার করতে হবে:" : "Why:"}
                                </span>
                                <p className="mt-0.5 text-[11px] leading-relaxed text-slate-200">
                                  {item.whyToUse[lang]}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* 5. If Used vs If NOT Used */}
                          <div className="space-y-1.5">
                            <div className="flex items-start gap-2 rounded-lg border border-emerald-500/25 bg-emerald-950/20 p-2.5">
                              <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />
                              <div className="text-[11px] leading-relaxed text-slate-200">
                                <strong className="block text-emerald-300">
                                  {lang === "bn"
                                    ? "৫. ব্যবহার করলে কী হবে:"
                                    : "5. If You Use It:"}
                                </strong>
                                {item.ifUsed[lang]}
                              </div>
                            </div>
                            <div className="flex items-start gap-2 rounded-lg border border-rose-500/25 bg-rose-950/20 p-2.5">
                              <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-rose-400" />
                              <div className="text-[11px] leading-relaxed text-slate-200">
                                <strong className="block text-rose-300">
                                  {lang === "bn"
                                    ? "ব্যবহার না করলে কী হবে:"
                                    : "If You Don't Use It:"}
                                </strong>
                                {item.ifNotUsed[lang]}
                              </div>
                            </div>
                          </div>

                          {/* 6. Key Parts */}
                          {item.keyParts.length > 0 && (
                            <div className="space-y-1.5 rounded-lg border border-slate-800/70 bg-slate-900/40 p-2.5">
                              <div className="flex items-center gap-1.5 text-[11px] font-bold text-purple-300">
                                <ListChecks className="h-3.5 w-3.5" />
                                {lang === "bn"
                                  ? "৬. গুরুত্বপূর্ণ অংশসমূহ"
                                  : "6. Key Parts & Options"}
                              </div>
                              <div className="space-y-1.5">
                                {item.keyParts.map((kp, idx) => (
                                  <div
                                    key={idx}
                                    className="rounded-md border border-slate-800/60 bg-slate-950/70 px-2.5 py-1.5"
                                  >
                                    <code className="block font-mono text-[11px] font-semibold text-purple-200">
                                      {kp.token}
                                    </code>
                                    <p className="mt-0.5 text-[11px] leading-relaxed text-slate-300">
                                      {kp.meaning[lang]}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* 7. Beginner -> Intermediate -> Advanced */}
                          <div className="space-y-1.5 rounded-lg border border-slate-800/70 bg-slate-900/40 p-2.5">
                            <div className="flex items-center gap-1.5 text-[11px] font-bold text-teal-300">
                              <Layers className="h-3.5 w-3.5" />
                              {lang === "bn"
                                ? "৭. Beginner থেকে Advanced ধাপ"
                                : "7. Beginner to Advanced Path"}
                            </div>
                            <div className="space-y-1.5 text-[11px] leading-relaxed">
                              <div className="rounded-md bg-slate-950/70 p-2">
                                <span className="font-bold text-emerald-300">Beginner: </span>
                                <span className="text-slate-200">{item.levels.beginner[lang]}</span>
                              </div>
                              <div className="rounded-md bg-slate-950/70 p-2">
                                <span className="font-bold text-sky-300">Intermediate: </span>
                                <span className="text-slate-200">{item.levels.intermediate[lang]}</span>
                              </div>
                              <div className="rounded-md bg-slate-950/70 p-2">
                                <span className="font-bold text-amber-300">Advanced: </span>
                                <span className="text-slate-200">{item.levels.advanced[lang]}</span>
                              </div>
                            </div>
                          </div>

                          {/* 8. Use Cases */}
                          <div className="space-y-1.5 rounded-lg border border-slate-800/70 bg-slate-900/40 p-2.5">
                            <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-300">
                              <Rocket className="h-3.5 w-3.5" />
                              {lang === "bn"
                                ? "৮. এটি দিয়ে কী কী করা যায়"
                                : "8. Real-World Uses"}
                            </div>
                            <ul className="space-y-1.5">
                              {item.useCases.map((uc, idx) => (
                                <li
                                  key={idx}
                                  className="flex items-start gap-2 text-xs leading-relaxed text-slate-200"
                                >
                                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                                  <span>{uc[lang]}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Quick Tip */}
                          <div className="flex items-start gap-2 rounded-lg border border-amber-500/25 bg-amber-500/5 p-2.5">
                            <Lightbulb className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-400" />
                            <div className="text-[11px] leading-relaxed text-amber-100">
                              <strong className="text-amber-300">
                                {lang === "bn" ? "সহজ টিপস: " : "Tip: "}
                              </strong>
                              {item.tip[lang]}
                            </div>
                          </div>

                          {/* Action Buttons: Practice + Mark Learned + Next */}
                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => onSelectReference(item)}
                              className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-sky-500 px-3 py-2 text-xs font-bold text-slate-950 hover:bg-sky-400 transition"
                            >
                              <Play className="h-3.5 w-3.5 fill-current" />
                              {lang === "bn" ? "প্র্যাকটিস" : "Practice"}
                            </button>

                            <button
                              type="button"
                              onClick={() => onToggleLearned(item.id)}
                              title={
                                lang === "bn"
                                  ? "শিখেছি হিসেবে চিহ্নিত করুন"
                                  : "Toggle learned"
                              }
                              className={`flex items-center gap-1 rounded-lg border px-2.5 py-2 text-xs font-semibold transition ${
                                isLearned
                                  ? "border-emerald-500/50 bg-emerald-500/15 text-emerald-300"
                                  : "border-slate-700 bg-slate-900 text-slate-300 hover:text-white"
                              }`}
                            >
                              <CheckCircle2 className="h-3.5 w-3.5" />
                              <span>{lang === "bn" ? "শিখেছি" : "Done"}</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => handleGoNext(item.id)}
                              title={lang === "bn" ? "পরের টপিক" : "Next topic"}
                              className="flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-900 px-2.5 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-800 transition"
                            >
                              <ArrowRight className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>
    </aside>
  );
}
