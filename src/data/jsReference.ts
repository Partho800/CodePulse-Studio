import { ReferenceItem } from "@/types/lesson";
import { JS_CORE_ITEMS } from "./jsSymbolsAndCore";
import { JS_METHODS_ITEMS } from "./jsMethodsAndDom";

export const JS_REFERENCE: ReferenceItem[] = [
  ...JS_CORE_ITEMS,
  ...JS_METHODS_ITEMS,
];
