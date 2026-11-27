export type Lang = "bn" | "en";

export type EditorTab = "html" | "css" | "js";

export interface BilingualText {
  bn: string;
  en: string;
}

export interface KeyPartItem {
  token: string;
  meaning: BilingualText;
}

export interface SymbolAnatomyItem {
  symbol: string;
  meaning: BilingualText;
}

export interface SkillLevels {
  beginner: BilingualText;
  intermediate: BilingualText;
  advanced: BilingualText;
}

export interface CodeBundle {
  html: string;
  css: string;
  js: string;
}

export interface ReferenceItem {
  id: string;
  language: EditorTab;
  category: BilingualText;
  name: string;
  summary: BilingualText;
  syntax: string;
  whatItDoes: BilingualText;
  symbolAnatomy: SymbolAnatomyItem[];
  whereToUse: BilingualText;
  whyToUse: BilingualText;
  ifUsed: BilingualText;
  ifNotUsed: BilingualText;
  keyParts: KeyPartItem[];
  useCases: BilingualText[];
  levels: SkillLevels;
  tip: BilingualText;
  exampleCode: CodeBundle;
}

export interface ConsoleLogEntry {
  id: string;
  level: "log" | "info" | "warn" | "error" | "table";
  args: string[];
  timestamp: string;
}
