import { ReferenceItem } from "@/types/lesson";
import { JS_DEMO_CSS } from "./refHelpers";

const CAT_SYM = { bn: "০. JS চিহ্ন, ডট ও ব্র্যাকেট (., [ ], ?., { }, ())", en: "0. JS Symbols, Dots & Brackets" };
const CAT_VAR = { bn: "১. ভেরিয়েবল ও ডেটা", en: "1. Variables & Data" };
const CAT_LOGIC = { bn: "২. কন্ডিশন ও লুপ", en: "2. Conditions & Loops" };
const CAT_FN = { bn: "৩. ফাংশন", en: "3. Functions" };

export const JS_CORE_ITEMS: ReferenceItem[] = [
  // 0. Symbols, Dots & Brackets
  {
    id: "js-dot-operator",
    language: "js",
    category: CAT_SYM,
    name: ". (ডট অপারেটর — Dot Notation)",
    summary: { bn: "কোনো অবজেক্ট, পেজ বা অ্যারের ভেতরের প্রোপার্টি বা মেথড বের করে আনে", en: "Accesses a property or method inside an object, element, or document" },
    syntax: `document.title\nuser.name\nprices.length`,
    whatItDoes: {
      bn: "ডট (`.`) মানে হলো **'এর ভেতরের'**! যেমন `document.body` মানে হলো `document` (পুরো পেজ)-এর ভেতরের `body`; আর `user.name` মানে `user` অবজেক্টের ভেতরের `name`।",
      en: "The dot (`.`) reaches inside an object to read a property or call a method on it.",
    },
    symbolAnatomy: [
      { symbol: "বামের অংশ (Object)", meaning: { bn: "যার ভেতরে ঢুকতে চান (যেমন `document`, `console`, `user`)।", en: "The parent object or element." } },
      { symbol: ". (ডট)", meaning: { bn: "সংযোগকারী সেতু—'এর ভেতরের' নির্দেশ করে।", en: "Property/method access connector." } },
      { symbol: "ডানের অংশ (Property/Method)", meaning: { bn: "যা নিতে বা চালাতে চান (যেমন `getElementById`, `log`, `value`)।", en: "The field or function inside it." } },
    ],
    whereToUse: {
      bn: "`document.getElementById()`, `console.log()`, `el.textContent`, `arr.map()`, `user.name`—জাভাস্ক্রিপ্টের প্রায় প্রতিটি লাইনেই ডট ব্যবহৃত হয়।",
      en: "Everywhere you access properties (`obj.key`) or call methods (`arr.map()`).",
    },
    whyToUse: {
      bn: "হাজার হাজার বিল্ট-ইন ও কাস্টম ফিচার এক জায়গায় গুছিয়ে রাখার পর সেগুলোর ভেতর থেকে নির্দিষ্ট কাজটি বেছে নেওয়ার জন্য।",
      en: "Cleanly navigates nested objects and built-in APIs.",
    },
    ifUsed: {
      bn: "স্পষ্ট ও পঠনযোগ্যভাবে যেকোনো ডেটা বা ফাংশন অ্যাক্সেস করা যায় (`el.style.color`)।",
      en: "Readable chaining like `el.style.color` works seamlessly.",
    },
    ifNotUsed: {
      bn: "ডট না দিলে JavaScript জানতেই পারবে না `log` বা `textContent` কার ভেতরের অংশ—SyntaxError বা ReferenceError হবে!",
      en: "Without `.`, JS throws SyntaxError or ReferenceError.",
    },
    keyParts: [
      { token: "Chaining (a.b.c)", meaning: { bn: "একাধিক ডট দিয়ে ধাপে ধাপে ভেতরে যাওয়া যায় (`document.body.style.color`)।", en: "Multiple dots drill deeper step by step." } },
    ],
    useCases: [{ bn: "DOM কন্ট্রোল, অবজেক্ট ডেটা পড়া ও অ্যারে মেথড চালানো", en: "DOM APIs, object fields, and array methods" }],
    levels: {
      beginner: { bn: "`console.log()`-এ ডট মানে `console` টুলের ভেতরের `log` কাজটি চালাও।", en: "`console.log` means run `log` inside `console`." },
      intermediate: { bn: "যেখানে ডটের বামের মান `null` হতে পারে, সেখানে `.`-এর বদলে `?.` দিন।", en: "Switch `.` to `?.` if the left side might be `null`." },
      advanced: { bn: "যদি প্রোপার্টির নামে স্পেস, হাইফেন থাকে বা নামটি ভেরিয়েবলে থাকে, তখন ডট কাজ করে না—সেখানে ব্র্যাকেট `obj[key]` ব্যবহার করতে হয়।", en: "When keys are dynamic variables or have spaces/hyphens, use `[key]` instead of `.key`." },
    },
    tip: { bn: "কোড পড়ার সময় ডট দেখলেই মনে মনে পড়বেন: 'এর ভেতরের'!", en: "Read `.` aloud as \"'s\" or \"inside of\"." },
    exampleCode: {
      html: `<div class="box" id="dotBox">Dot Operator Demo</div>`,
      css: JS_DEMO_CSS,
      js: `const user = { name: "Rafi", profile: { city: "Dhaka" } };
document.getElementById("dotBox").textContent = user.name + " from " + user.profile.city;
console.log("Chained via dots:", user.profile.city);`,
    },
  },
  {
    id: "js-square-brackets",
    language: "js",
    category: CAT_SYM,
    name: "[ ] (স্কয়ার ব্র্যাকেট — Array & Dynamic Key)",
    summary: { bn: "অ্যারে তৈরি করতে, ইনডেক্স [0] পড়তে বা ডায়নামিক অবজেক্ট কী ধরতে বসে", en: "Defines arrays, reads [index], or accesses dynamic object keys" },
    syntax: `const arr = ["A", "B"];\narr[0]       // "A"\nobj[keyVar]  // dynamic key`,
    whatItDoes: {
      bn: "১) লিস্ট/অ্যারে তৈরি করতে `[...]` বসে। ২) অ্যারের নির্দিষ্ট অবস্থানের আইটেম (`arr[0]`) আনতে বসে। ৩) অবজেক্টের প্রোপার্টি নাম কোনো ভেরিয়েবলে থাকলে `obj[varName]` লিখতে হয় (এখানে ডট কাজ করে না)।",
      en: "Creates array literals, accesses numeric indices (`arr[0]`), and reads computed object keys (`obj[key]`).",
    },
    symbolAnatomy: [
      { symbol: "[10, 20, 30]", meaning: { bn: "একাধিক মান লিস্ট (Array) হিসেবে রাখে।", en: "Creates an Array literal." } },
      { symbol: "arr[0]", meaning: { bn: "প্রথম আইটেম (JavaScript-এ গণনা `0` থেকে শুরু হয়!)।", en: "Reads index 0 (first item)." } },
      { symbol: "obj[dynamicKey]", meaning: { bn: "ভেরিয়েবলের মান দিয়ে অবজেক্টের প্রোপার্টি খোঁজে।", en: "Looks up property using a variable's value." } },
    ],
    whereToUse: {
      bn: "অ্যারে তৈরি ও পড়া, এবং ইউজারের নির্বাচিত কী (`obj[selectedLang]`) ডায়নামিকভাবে পড়তে।",
      en: "Arrays, index lookups, and dynamic object property lookups.",
    },
    whyToUse: {
      bn: "যদি `lang = 'bn'` হয়, তাহলে `text.lang` লিখলে JS `'lang'` নামের প্রোপার্টি খুঁজবে—`'bn'` নয়! `text[lang]` লিখলে ঠিক `'bn'` খুঁজবে।",
      en: "`obj.key` always looks up literal `'key'`; `obj[key]` evaluates the variable `key`.",
    },
    ifUsed: {
      bn: "তালিকা, ইনডেক্স এবং ডায়নামিক ডেটা ম্যাপ (যেমন বাংলা/EN সুইচ) নির্ভুল কাজ করে।",
      en: "Lists and dynamic lookup tables work cleanly.",
    },
    ifNotUsed: {
      bn: "ডায়নামিক কী-তে ডট দিলে `undefined` আসবে বা ভুল প্রোপার্টি পড়বে।",
      en: "Using `.` with a variable name returns `undefined` instead of evaluating the variable.",
    },
    keyParts: [
      { token: "0-indexed", meaning: { bn: "১ম আইটেম `[0]`, ২য় `[1]`।", en: "Indices start at 0." } },
    ],
    useCases: [{ bn: "ভাষা সুইচার (`title[lang]`), কার্ট লিস্ট ও ডেটা টেবিল", en: "Language maps, shopping carts, and dynamic keys" }],
    levels: {
      beginner: { bn: "লিস্ট বানাতে `[\"HTML\", \"CSS\"]` ও প্রথমটি নিতে `list[0]` ব্যবহার করুন।", en: "Build lists with `[...]` and read items via `list[0]`." },
      intermediate: { bn: "অবজেক্ট থেকে ডায়নামিক কী পড়তে `labels[lang]` ব্যবহার করুন।", en: "Use `obj[variableKey]` for dynamic lookups." },
      advanced: { bn: "শেষ আইটেম পড়তে আধুনিক JS-এ `arr.at(-1)` ব্যবহার করা `arr[arr.length - 1]`-এর চেয়েও সহজ!", en: "Use `arr.at(-1)` to safely read the last element." },
    },
    tip: { bn: "কখন `.` আর কখন `[ ]`? স্থির নাম হলে ডট (`user.name`), ভেরিয়েবল/সংখ্যা/স্পেস হলে ব্র্যাকেট (`arr[0]`, `user[key]`)!", en: "Fixed identifier -> `.key`; index or variable -> `[key]`." },
    exampleCode: {
      html: `<div class="box" id="brOut"></div>`,
      css: JS_DEMO_CSS,
      js: `const greeting = { bn: "স্বাগতম!", en: "Welcome!" };
const currentLang = "bn";

// greeting.currentLang would be undefined! Use [currentLang]:
document.getElementById("brOut").textContent = greeting[currentLang];
console.log("Dynamic lookup:", greeting[currentLang]);`,
    },
  },
  {
    id: "js-optional-chaining",
    language: "js",
    category: CAT_SYM,
    name: "?. (প্রশ্নবোধক চিহ্ন + ডট — Optional Chaining)",
    summary: { bn: "এলিমেন্ট বা ডেটা না পেলে (null/undefined) কোড ক্র্যাশ হওয়া আটকায়", en: "Safely stops and returns undefined if left side is null/undefined" },
    syntax: `document.getElementById("btn")?.addEventListener("click", fn);\nuser?.profile?.city`,
    whatItDoes: {
      bn: "সাধারণ `.` (ডট) ব্যবহার করার সময় যদি বামের জিনিসটা `null` বা `undefined` হয়, তবে পুরো কোড লাল এরর দিয়ে ক্র্যাশ করে। `?.` লিখলে JS আগে চেক করে—জিনিসটা থাকলে তবেই পরের ধাপে যাবে, না থাকলে ক্র্যাশ না করে চুপচাপ থেমে যাবে!",
      en: "Checks if the left side exists before accessing `.property` or calling `.method()`; prevents null crashes.",
    },
    symbolAnatomy: [
      { symbol: "?", meaning: { bn: "প্রশ্নবোধক চিহ্ন: 'এটি কি আদৌ আছে (null/undefined নয় তো)?'", en: "Question mark: 'Does it actually exist?'" } },
      { symbol: ".", meaning: { bn: "থাকলে তবেই ডট দিয়ে ভেতরের প্রোপার্টি বা মেথডে ঢোকে।", en: "Proceeds to access property/method only if non-null." } },
    ],
    whereToUse: {
      bn: "`document.getElementById(\"...\")?.textContent`, API থেকে আসা নেস্টেড ডেটা (`data?.user?.name`) পড়ার সময়।",
      en: "DOM queries (`getElementById()?.`) and optional nested API responses.",
    },
    whyToUse: {
      bn: "`Cannot read properties of null`—জাভাস্ক্রিপ্টের সবচেয়ে বেশি হওয়া ক্র্যাশ থেকে বাঁচার জন্য।",
      en: "Eliminates the #1 JS runtime crash: reading properties of `null`/`undefined`.",
    },
    ifUsed: {
      bn: "কোনো HTML ট্যাগ বা ডেটা অনুপস্থিত থাকলেও ওয়েবসাইটের বাকি অংশ নিরাপদে চলতে থাকে।",
      en: "Graceful fallback (`undefined`) with zero runtime crash.",
    },
    ifNotUsed: {
      bn: "যদি কোনো কারণে ওই ID বা ডেটা না থাকে, সাথে সাথে TypeError দিয়ে পুরো স্ক্রিপ্ট বন্ধ হয়ে যাবে!",
      en: "Throws `TypeError: Cannot read properties of null` and halts script execution!",
    },
    keyParts: [
      { token: "a?.b ?? 'Default'", meaning: { bn: "`??` (Nullish Coalescing) সাথে দিলে না পেলে ডিফল্ট মান বসানো যায়।", en: "Combine with `??` for a clean default fallback." } },
    ],
    useCases: [{ bn: "সেফ DOM ইভেন্ট বাইন্ডিং ও API JSON পড়া", en: "Safe DOM access and API response parsing" }],
    levels: {
      beginner: { bn: "`document.getElementById('x')?.textContent` পড়ুন—থাকলে মান দেবে, না থাকলে ক্র্যাশ করবে না।", en: "Use `?.` when reading optional properties." },
      intermediate: { bn: "নোট: `el?.textContent = 'hi'` (বাম পাশে অ্যাসাইনমেন্ট)-এ `?.` কাজ করে না; সেক্ষেত্রে `if (el) el.textContent = 'hi'` লিখুন।", en: "You cannot assign onto `?.` (`a?.b = 1` is invalid); use `if (el)` for writes." },
      advanced: { bn: "ফাংশন কল ও অ্যারেতেও কাজ করে: `onSave?.()` এবং `arr?.[0]`।", en: "Works for function calls `fn?.()` and bracket lookups `arr?.[0]`." },
    },
    tip: { bn: "মনে রাখবেন: পড়া বা মেথড কল করায় `?.` দারুণ, কিন্তু মান সেট (`=`) করতে `if (el)` ব্যবহার করবেন।", en: "Use `?.` for reading/calling; use `if (el)` before assigning `el.textContent = ...`." },
    exampleCode: {
      html: `<div class="box" id="realBox">I exist!</div>`,
      css: JS_DEMO_CSS,
      js: `const missing = document.getElementById("notHere");
// Without ?. -> missing.textContent would CRASH!
console.log("Safe read with ?. ->", missing?.textContent ?? "Not found (No crash!)");

const real = document.getElementById("realBox");
console.log("Real box:", real?.textContent);`,
    },
  },
  {
    id: "js-parentheses",
    language: "js",
    category: CAT_SYM,
    name: "( ) (ফার্স্ট ব্র্যাকেট — Parentheses)",
    summary: { bn: "ফাংশন চালানোর (Call) ও ইনপুট (Argument) পাঠানোর চিহ্ন", en: "Calls functions, passes arguments, and groups math logic" },
    syntax: `greet("Ayan");\n(2 + 3) * 4`,
    whatItDoes: {
      bn: "১) ফাংশনের নামের শেষে `()` দিলে সেই ফাংশনটি **এখনই রান হয়**। ২) ভেতরে ইনপুট ডেটা (`(\"title\")`) পাঠানো হয়। ৩) অঙ্ক ও `if (...)` শর্ত ঘেরার জন্য বসে।",
      en: "Invokes functions, carries parameters/arguments, wraps `if`/`for` conditions, and groups math.",
    },
    symbolAnatomy: [
      { symbol: "fn()", meaning: { bn: "`()` দিলে ফাংশনটি সাথে সাথে চলে; `()` না দিলে শুধু ফাংশনের রেফারেন্স বোঝায়।", en: "`()` executes the function; omitting `()` passes the function reference." } },
      { symbol: '("title")', meaning: { bn: "ফাংশনের ভেতরে পাঠানো ইনপুট (Argument)।", en: "Argument passed into the function." } },
    ],
    whereToUse: { bn: "প্রতিটি ফাংশন কল (`console.log()`, `getElementById()`) ও `if (...)` শর্তে।", en: "Every function call, definition, and control condition." },
    whyToUse: { bn: "`()` ছাড়া JavaScript বুঝতে পারবে না আপনি ফাংশনটি চালাতে চাচ্ছেন নাকি শুধু নাম বলছেন।", en: "Tells JS to execute a function rather than just reference it." },
    ifUsed: { bn: "ফাংশনটি সঠিকভাবে ইনপুট নিয়ে কাজ সম্পন্ন করে।", en: "Executes the function with given arguments." },
    ifNotUsed: { bn: "`btn.addEventListener('click', handleClick)`-এ `()` না দেওয়াই সঠিক, কিন্তু `document.getElementById`-এ `()` না দিলে ফাংশনটি রানই হবে না!", en: "Forgetting `()` prevents execution; adding `()` inside `addEventListener` runs it too early!" },
    keyParts: [
      { token: "fn vs fn()", meaning: { bn: "ইভেন্ট লিসেনারে নাম (`fn`), সরাসরি চালাতে `fn()`।", en: "Pass `fn` as callback; write `fn()` to invoke now." } },
    ],
    useCases: [{ bn: "সব মেথড কল, ফাংশন প্যারামিটার ও গাণিতিক গ্রুপিং", en: "All function calls and expressions" }],
    levels: {
      beginner: { bn: "কোনো কাজ চালাতে নামের শেষে `()` দিন।", en: "Add `()` to call a function." },
      intermediate: { bn: "`addEventListener('click', myFn)`-এ `myFn()` না লিখে শুধু `myFn` লিখুন যাতে ক্লিক করলেই চলে।", en: "Don't add `()` when passing callbacks like `addEventListener('click', fn)`." },
      advanced: { bn: "Arrow function-এ অবজেক্ট সরাসরি রিটার্ন করতে `() => ({ a: 1 })` বাইরে `()` দিতে হয়।", en: "Wrap implicit arrow object returns in `({ ... })`." },
    },
    tip: { bn: "`setTimeout(sayHi, 1000)`—এখানে `sayHi()` দিলে ১ সেকেন্ড অপেক্ষা না করেই সাথে সাথে চলে যাবে!", en: "Pass `sayHi` without `()` to `setTimeout` or `addEventListener`." },
    exampleCode: {
      html: `<button id="pBtn">Run Function on Click</button>`,
      css: JS_DEMO_CSS,
      js: `function sayHello(name) {
  console.log("Hello,", name + "!");
}
sayHello("Now"); // runs immediately because of ()
document.getElementById("pBtn")?.addEventListener("click", () => sayHello("Clicked"));`,
    },
  },
  {
    id: "js-curly-braces",
    language: "js",
    category: CAT_SYM,
    name: "{ } (সেকেন্ড ব্র্যাকেট — Curly Braces)",
    summary: { bn: "কোড ব্লক তৈরি করতে, Object বানাতে ও ${} বসাতে ব্যবহৃত হয়", en: "Defines code blocks, Object literals, and ${} interpolation" },
    syntax: `if (ok) { ... }\nconst obj = { a: 1 };`,
    whatItDoes: {
      bn: "১) `if`, `for`, `function`-এর কোডের সীমানা নির্ধারণ করে। ২) `{ key: value }` দিয়ে Object বানায়। ৩) Template Literal-এ `${...}`-এর ভেতরে বসে।",
      en: "Scopes statement blocks (`if`, `for`, `function`), creates Objects, and wraps destructuring.",
    },
    symbolAnatomy: [
      { symbol: "{ code }", meaning: { bn: "একটি ব্লক—ভেতরের `const`/`let` বাইরের কোডে দেখা যায় না (Block Scope)।", en: "Block scope isolating `const`/`let` variables." } },
      { symbol: "{ key: val }", meaning: { bn: "Object ডেটা স্ট্রাকচার তৈরি করে।", en: "Object literal syntax." } },
    ],
    whereToUse: { bn: "ফাংশন বডি, কন্ডিশন/লুপ ব্লক, Object ও `import { ... }` স্টেটমেন্টে।", en: "Functions, loops, conditionals, objects, and destructuring." },
    whyToUse: { bn: "কোন কোড কোন ফাংশন বা শর্তের অধীনে চলবে তা স্পষ্টভাবে সীমাবদ্ধ করতে।", en: "Groups multi-line statements and structures object data." },
    ifUsed: { bn: "ভেরিয়েবলগুলো নিজ নিজ ব্লকের ভেতরে সুরক্ষিত থাকে।", en: "Clean block scoping and object literals." },
    ifNotUsed: { bn: "একটি `{` বা `}` মিস করলে পুরো ফাইলে `Unexpected end of input` SyntaxError হবে!", en: "Unmatched `{` or `}` breaks the entire JS script." },
    keyParts: [{ token: "Scope", meaning: { bn: "`{}`-এর ভেতরের `let`/`const` বাইরে পাওয়া যায় না।", en: "`let`/`const` stay local inside `{}`." } }],
    useCases: [{ bn: "ফাংশন, অবজেক্ট এবং Destructuring (`const { name } = user`)", en: "Blocks, objects, and destructuring" }],
    levels: {
      beginner: { bn: "প্রতিটি `{` খোলার সাথে `}` বন্ধ নিশ্চিত করুন।", en: "Always match opening `{` with closing `}`." },
      intermediate: { bn: "Block Scope বুঝুন—`if`-এর ভেতরের `const x` বাইরে ব্যবহার করা যায় না।", en: "Understand block scope for `let` and `const`." },
      advanced: { bn: "ES Modules-এ `import { useState } from 'react'` Named Import-এ `{}` ব্যবহৃত হয়।", en: "Named imports/exports also use `{}`." },
    },
    tip: { bn: "স্ট্রিংয়ের ভেতরে `${x}` লিখলে `$` আর `{}` একসাথে কাজ করে, শুধু ব্যাকটিক `` ` ``-এর ভেতরে।", en: "`${...}` only works inside backticks `` `...` ``." },
    exampleCode: {
      html: `<div class="box" id="cbOut"></div>`,
      css: JS_DEMO_CSS,
      js: `const product = { title: "Laptop", price: 65000 };
if (product.price > 50000) {
  const label = "Premium";
  document.getElementById("cbOut").textContent = \`\${product.title} (\${label})\`;
}
// console.log(label); -> Error because label lives inside { }!
console.log("Product:", product);`,
    },
  },

  // 1. Variables & Data
  {
    id: "js-const",
    language: "js",
    category: CAT_VAR,
    name: "const",
    summary: { bn: "স্থির ভেরিয়েবল তৈরি করে (মান রি-অ্যাসাইন করা যায় না)", en: "Declares a block-scoped constant variable" },
    syntax: `const title = document.getElementById("title");`,
    whatItDoes: {
      bn: "মেমরিতে এমন একটি ভেরিয়েবল তৈরি করে যা পরে `=` দিয়ে নতুন মান দিয়ে বদলানো যাবে না।",
      en: "Creates a read-only binding that prevents accidental reassignment.",
    },
    symbolAnatomy: [
      { symbol: "const", meaning: { bn: "কীওয়ার্ড—জানায় এটি ধ্রুবক রেফারেন্স।", en: "Constant declaration keyword." } },
      { symbol: "=", meaning: { bn: "ডান পাশের মানটি বাম পাশের নামে জমা রাখে।", en: "Assignment operator." } },
    ],
    whereToUse: { bn: "DOM এলিমেন্ট ধরে রাখা (`const btn = ...`), ফাংশন ও স্থির মানে।", en: "DOM references, arrow functions, and config constants." },
    whyToUse: { bn: "অনিচ্ছাকৃতভাবে ভেরিয়েবলের মান বদলে গিয়ে বাগ তৈরি হওয়া ঠেকাতে।", en: "Prevents accidental bugs from variable reassignment." },
    ifUsed: { bn: "কোড নিরাপদ ও সহজে বোঝার উপযোগী থাকে।", en: "Predictable, bug-resistant code." },
    ifNotUsed: { bn: "কীওয়ার্ড ছাড়া `x = 5` লিখলে গ্লোবাল ভেরিয়েবল লিক তৈরি হয় (Strict Mode-এ এরর দেয়)।", en: "Omitting `const`/`let` leaks globals or throws in strict mode." },
    keyParts: [{ token: "const obj = {}", meaning: { bn: "`obj.name = 'X'` করা যায়, কিন্তু `obj = {}` করা যায় না।", en: "Object properties can mutate, binding cannot." } }],
    useCases: [{ bn: "৯০% ভেরিয়েবলে `const` ব্যবহার হয়", en: "Default choice for variables" }],
    levels: {
      beginner: { bn: "সবসময় `const` দিয়ে শুরু করুন।", en: "Start with `const`." },
      intermediate: { bn: "মান বদলাতে হলে `let` ব্যবহার করুন।", en: "Switch to `let` only when reassigning." },
      advanced: { bn: "অবজেক্ট পুরোপুরি ফ্রিজ করতে `Object.freeze(obj)` ব্যবহার করা যায়।", en: "Use `Object.freeze()` for shallow immutability." },
    },
    tip: { bn: "আধুনিক JS-এ পুরোনো `var` আর ব্যবহার করবেন না।", en: "Never use legacy `var`." },
    exampleCode: {
      html: `<div class="box" id="cOut"></div>`,
      css: JS_DEMO_CSS,
      js: `const taxRate = 0.05;\nconst price = 1000;\ndocument.getElementById("cOut").textContent = "Total: ৳" + (price + price * taxRate);\nconsole.log("Tax:", price * taxRate);`,
    },
  },
  {
    id: "js-let",
    language: "js",
    category: CAT_VAR,
    name: "let",
    summary: { bn: "যে ভেরিয়েবলের মান পরে বদলাবে (যেমন কাউন্টার/স্কোর) তার জন্য", en: "Declares a reassignable variable like counters or state" },
    syntax: `let count = 0;\ncount = count + 1;`,
    whatItDoes: {
      bn: "প্রোগ্রাম চলার সময় যে ডেটা বারবার পরিবর্তিত হবে (যেমন ক্লিক সংখ্যা, লুপ `i`, টাইমার) তা `let` দিয়ে রাখা হয়।",
      en: "Stores mutable bindings that get updated during execution.",
    },
    symbolAnatomy: [
      { symbol: "let", meaning: { bn: "পরিবর্তনযোগ্য ভেরিয়েবল ঘোষণা।", en: "Mutable block-scoped binding." } },
      { symbol: "++ / +=", meaning: { bn: "মান ১ বা নির্দিষ্ট সংখ্যা বাড়ানোর শর্টকাট।", en: "Increment shorthands." } },
    ],
    whereToUse: { bn: "স্কোর, কাউন্টার, `for` লুপ ও টগল স্টেটে।", en: "Counters, loop indices, and mutable flags." },
    whyToUse: { bn: "`const` দিলে `count++` করলে TypeError হবে, তাই বদলানো মানের জন্য `let` জরুরি।", en: "Allows clean reassignment where `const` would throw." },
    ifUsed: { bn: "যেকোনো সময় নতুন মান সেট করা যায়।", en: "Updates smoothly over time." },
    ifNotUsed: { bn: "`const` দিয়ে কাউন্টার বাড়ালে `Assignment to constant variable` এরর দেবে।", en: "Reassigning a `const` throws `TypeError`." },
    keyParts: [{ token: "let x;", meaning: { bn: "মান ছাড়া শুরু করে পরে মান দেওয়া যায়।", en: "Can be declared before initialization." } }],
    useCases: [{ bn: "লাইক বাটন কাউন্টার ও গেম স্কোর", en: "Counters and game scores" }],
    levels: {
      beginner: { bn: "যে মান পরে বদলাবে তা `let` দিয়ে লিখুন।", en: "Use `let` for changing values." },
      intermediate: { bn: "একই নামে একই ব্লকে দুবার `let` লেখা যায় না।", en: "Cannot redeclare the same `let` in the same scope." },
      advanced: { bn: "TDZ (Temporal Dead Zone)-এর কারণে ঘোষণার আগে `let` পড়লে ReferenceError দেয়—তাই সবসময় ব্যবহারের আগে লিখুন।", en: "Declare before use to avoid Temporal Dead Zone ReferenceErrors." },
    },
    tip: { bn: "কাউন্টার ১ বাড়াতে `count++` এবং ১০ বাড়াতে `count += 10` লিখুন।", en: "Use `count++` or `count += 10`." },
    exampleCode: {
      html: `<button id="upBtn">Count: <span id="num">0</span></button>`,
      css: JS_DEMO_CSS,
      js: `let count = 0;\ndocument.getElementById("upBtn")?.addEventListener("click", () => {\n  count++;\n  document.getElementById("num").textContent = count;\n  console.log("Count:", count);\n});`,
    },
  },
  {
    id: "js-if-else",
    language: "js",
    category: CAT_LOGIC,
    name: "if / else ও === (তুলনা)",
    summary: { bn: "শর্ত সত্য না মিথ্যা দেখে সিদ্ধান্ত নেয়; === দিয়ে নিখুঁত মিল যাচাই করে", en: "Branches code on boolean conditions using strict === checks" },
    syntax: `if (score >= 80) {\n  ...\n} else {\n  ...\n}`,
    whatItDoes: {
      bn: "প্রোগ্রামকে সিদ্ধান্ত নেওয়ার ক্ষমতা দেয়। `=` হলো মান রাখা, আর `===` হলো সমান কি না তা প্রশ্ন করা!",
      en: "Executes code conditionally; `===` checks strict equality of value AND type.",
    },
    symbolAnatomy: [
      { symbol: "=", meaning: { bn: "মান বসানো (`let x = 5`)।", en: "Assignment." } },
      { symbol: "===", meaning: { bn: "তুলনা করা (`x === 5` -> `true`/`false`)।", en: "Strict equality comparison." } },
      { symbol: "&& / ||", meaning: { bn: "`&&` = দুটিই সত্য হতে হবে; `||` = যেকোনো একটি সত্য হলেই হবে।", en: "Logical AND / OR." } },
    ],
    whereToUse: { bn: "পাস/ফেল, লগইন স্ট্যাটাস, ফর্ম ভ্যালিডেশন ও Null চেকিংয়ে।", en: "Auth checks, grading, form validation, and null guards." },
    whyToUse: { bn: "অ্যাপের আচরণ পরিস্থিতি অনুযায়ী পরিবর্তন করতে।", en: "Controls program flow based on data." },
    ifUsed: { bn: "নিখুঁত লজিক ও বাগ-মুক্ত শর্ত যাচাই হয়।", en: "Accurate branching without type-coercion bugs." },
    ifNotUsed: { bn: "`if`-এ `=` দিলে এরর বা অ্যাসাইনমেন্ট বাগ হবে; আর `==` দিলে `\"5\" == 5` true হয়ে অপ্রত্যাশিত ভুল হতে পারে।", en: "`==` causes loose coercion bugs (`0 == \"\"` is true!)." },
    keyParts: [{ token: "!== / >= / <=", meaning: { bn: "সমান নয়, বড় বা সমান, ছোট বা সমান।", en: "Not equal, greater/less than or equal." } }],
    useCases: [{ bn: "গ্রেড ক্যালকুলেটর, পাসওয়ার্ড চেক ও ডিসকাউন্ট লজিক", en: "Graders and validation" }],
    levels: {
      beginner: { bn: "সবসময় তুলনায় `===` এবং অসমানতায় `!==` ব্যবহার করুন।", en: "Always use `===` and `!==`." },
      intermediate: { bn: "নেস্টেড `if` কমাতে ফাংশনে Early Return (`if (!user) return;`) ব্যবহার করুন।", en: "Use early returns to keep nesting shallow." },
      advanced: { bn: "JavaScript-এ ৬টি Falsy মান আছে: `false, 0, \"\", null, undefined, NaN`—বাকি সব Truthy!", en: "Master the 6 falsy values: `false, 0, \"\", null, undefined, NaN`." },
    },
    tip: { bn: "`if (x = 5)` ভুল! তুলনা করতে `if (x === 5)` লিখুন।", en: "Remember: 1 `=` assigns; 3 `===` compares!" },
    exampleCode: {
      html: `<div class="box" id="ifOut"></div>`,
      css: JS_DEMO_CSS,
      js: `const age = 20;\nconst hasTicket = true;\nif (age >= 18 && hasTicket) {\n  document.getElementById("ifOut").textContent = "✅ Entry Allowed";\n} else {\n  document.getElementById("ifOut").textContent = "❌ Entry Denied";\n}`,
    },
  },
  {
    id: "js-ternary",
    language: "js",
    category: CAT_LOGIC,
    name: "? : (Ternary Operator)",
    summary: { bn: "এক লাইনে ছোট if / else লেখার শর্টকাট", en: "Single-line shorthand for simple if/else values" },
    syntax: `const text = isOnline ? "Online" : "Offline";`,
    whatItDoes: {
      bn: "প্রশ্নবোধক চিহ্নের (`?`) আগে শর্ত থাকে; সত্য হলে `:`-এর বামের মান, মিথ্যা হলে ডানের মান রিটার্ন হয়।",
      en: "Returns one of two expressions based on a boolean condition.",
    },
    symbolAnatomy: [
      { symbol: "?", meaning: { bn: "শর্তটি কি সত্য? (প্রশ্ন করে)", en: "Separates condition from truthy result." } },
      { symbol: ":", meaning: { bn: "নয়তো (else) — মিথ্যা হলে পরের মানটি নেয়।", en: "Separates truthy result from falsy fallback." } },
    ],
    whereToUse: { bn: "ভেরিয়েবলে মান সেট করতে, Template Literal `` `${ok ? 'Yes' : 'No'}` `` ও React JSX-এ।", en: "Inline conditional strings, assignments, and JSX." },
    whyToUse: { bn: "ছোট কাজের জন্য ৫ লাইনের `if/else` না লিখে ১ লাইনে পরিষ্কার কোড লিখতে।", en: "Concise inline expression." },
    ifUsed: { bn: "কোড সংক্ষিপ্ত ও পঠনযোগ্য হয়।", en: "Clean, expressive 1-liners." },
    ifNotUsed: { bn: "হবে না এমন না—`if/else` দিয়েও করা যাবে, তবে `const` ভেরিয়েবলে সরাসরি মান বসাতে Ternary খুব কাজের।", en: "You'd need `let` + multi-line `if/else`." },
    keyParts: [{ token: "cond ? A : B", meaning: { bn: "৩টি অংশ থাকায় একে Ternary বলে।", en: "Takes 3 operands." } }],
    useCases: [{ bn: "Dark/Light লেবেল ও স্টক স্ট্যাটাস ব্যাজ", en: "Dynamic labels and badges" }],
    levels: {
      beginner: { bn: "সহজ ২-বিকল্পে `cond ? 'Yes' : 'No'` লিখুন।", en: "Use for simple 2-way values." },
      intermediate: { bn: "Template string-এর ভেতরে `${score >= 40 ? 'Pass' : 'Fail'}` ব্যবহার করুন।", en: "Embed inside template literals." },
      advanced: { bn: "কখনোই একটার ভেতর আরেকটা Ternary (`a ? b : c ? d : e`) নেস্ট করবেন না—পড়তে খুব কষ্ট হয়!", en: "Avoid nested ternaries; use `if/else` or lookup objects instead." },
    },
    tip: { bn: "শুধু ২টি সহজ বিকল্প থাকলেই `? :` ব্যবহার করুন।", en: "Keep ternaries flat and simple." },
    exampleCode: {
      html: `<div class="box" id="ternOut"></div>`,
      css: JS_DEMO_CSS,
      js: `const items = 3;\ndocument.getElementById("ternOut").textContent = items > 0 ? \`Cart (\${items})\` : "Empty";\nconsole.log("Items:", items);`,
    },
  },
  {
    id: "js-for-loop",
    language: "js",
    category: CAT_LOGIC,
    name: "for ও for...of লুপ",
    summary: { bn: "একই কাজ বারবার চালাতে বা অ্যারের প্রতিটি আইটেম পড়তে", en: "Repeats code N times (for) or iterates arrays (for...of)" },
    syntax: `for (let i = 1; i <= 5; i++) { ... }\nfor (const x of arr) { ... }`,
    whatItDoes: {
      bn: "হাতে ১০০ বার কোড না লিখে একটি লুপের ভেতরে লিখে দিলে কম্পিউটার নিজেই বারবার কাজটি করে দেয়।",
      en: "Automates repetition over ranges (`for`) or collections (`for...of`).",
    },
    symbolAnatomy: [
      { symbol: "(let i = 1; i <= 5; i++)", meaning: { bn: "শুরু; শর্ত; প্রতিবার ১ বৃদ্ধি — দুটি `;` দিয়ে ভাগ করা।", en: "Init; condition; increment separated by semicolons." } },
    ],
    whereToUse: { bn: "তালিকা থেকে HTML কার্ড তৈরি, গণনা এবং অ্যারে প্রসেসিংয়ে।", en: "Repeating tasks, sequences, and iterating lists." },
    whyToUse: { bn: "একই কাজ বারবার কোড কপি-পেস্ট করা বন্ধ করতে।", en: "Eliminates repetitive manual code." },
    ifUsed: { bn: "১০টি বা ১০,০০০টি আইটেম একই ৩ লাইনের কোডে হ্যান্ডেল করা যায়।", en: "Handles any number of items effortlessly." },
    ifNotUsed: { bn: "প্রতিটি আইটেমের জন্য আলাদা কোড লিখতে হবে।", en: "Impossible to process dynamic-length lists." },
    keyParts: [{ token: "break / continue", meaning: { bn: "`break` লুপ থামায়; `continue` ওই ধাপ স্কিপ করে।", en: "`break` exits loop; `continue` skips current step." } }],
    useCases: [{ bn: "নামতা, ডায়নামিক লিস্ট ও যোগফল নির্ণয়", en: "Lists, tables, and totals" }],
    levels: {
      beginner: { bn: "`for (let i = 1; i <= 5; i++)` দিয়ে ১–৫ প্রিন্ট করুন।", en: "Count with `for`." },
      intermediate: { bn: "অ্যারে পড়তে `for (const item of items)` ব্যবহার করুন।", en: "Prefer `for...of` for arrays." },
      advanced: { bn: "`async/await` লুপের ভেতরে ধাপে ধাপে চালাতে `for...of` কাজ করে (`.forEach` করে না!)।", en: "`for...of` works properly with `await` inside loops." },
    },
    tip: { bn: "`i++` না দিলে লুপ অনন্তকাল চলতে থাকবে (Infinite Loop)!", en: "Ensure your counter moves toward ending the loop." },
    exampleCode: {
      html: `<ul class="box" id="lOut"></ul>`,
      css: JS_DEMO_CSS,
      js: `const ul = document.getElementById("lOut");\nfor (const tech of ["HTML", "CSS", "JavaScript"]) {\n  const li = document.createElement("li");\n  li.textContent = "Master " + tech;\n  ul?.appendChild(li);\n}`,
    },
  },
  {
    id: "js-functions",
    language: "js",
    category: CAT_FN,
    name: "function ও Arrow Function (=>)",
    summary: { bn: "একবার কোড লিখে বারবার কল করার পুনর্ব্যবহারযোগ্য ব্লক", en: "Reusable logic blocks using function or arrow => syntax" },
    syntax: `const add = (a, b) => a + b;`,
    whatItDoes: {
      bn: "কাজের একটি অংশ আলাদা নাম দিয়ে সেভ রাখে যাতে প্যারামিটার পাঠিয়ে বারবার উত্তর (`return`) নেওয়া যায়।",
      en: "Packages logic to run on demand with inputs and a return value.",
    },
    symbolAnatomy: [
      { symbol: "(a, b)", meaning: { bn: "ইনপুট প্যারামিটার।", en: "Input parameters." } },
      { symbol: "=>", meaning: { bn: "অ্যারো ফাংশন চিহ্ন ('goes to' / returns)।", en: "Arrow function token." } },
    ],
    whereToUse: { bn: "বাটন ক্লিক হ্যান্ডলার, ক্যালকুলেশন ও অ্যারে কলব্যাকে।", en: "Event handlers, helpers, and callbacks." },
    whyToUse: { bn: "একই কোড বারবার না লিখে DRY (Don't Repeat Yourself) কোড লিখতে।", en: "Promotes modular, reusable code." },
    ifUsed: { bn: "কোড পরিষ্কার, টেস্টযোগ্য ও মেইনটেইন করা সহজ হয়।", en: "Clean, modular architecture." },
    ifNotUsed: { bn: "পুরো কোড একটানা গ্লোবাল স্কোপে জট পাকিয়ে যাবে।", en: "Messy duplicated global scripts." },
    keyParts: [{ token: "return value", meaning: { bn: "আউটপুট ফেরত দেয়।", en: "Returns computed output." } }],
    useCases: [{ bn: "ট্যাক্স ক্যালকুলেটর, ফরম্যাটার ও ইভেন্ট হ্যান্ডলার", en: "Utilities and callbacks" }],
    levels: {
      beginner: { bn: "`function greet(name) { return 'Hi ' + name; }` লিখুন।", en: "Write basic named functions." },
      intermediate: { bn: "`const greet = (name) => 'Hi ' + name;` অ্যারো সিনট্যাক্স ব্যবহার করুন।", en: "Use arrow functions for concise callbacks." },
      advanced: { bn: "Closure: বাইরের ফাংশনের ভেরিয়েবল ভেতরের ফাংশন মনে রাখতে পারে—যা স্টেট তৈরিতে কাজে লাগে।", en: "Understand closures and lexical `this` binding in arrow functions." },
    },
    tip: { bn: "অ্যারো ফাংশনে `{}` দিলে `return` লিখতে হবে; `{}` না দিলে অটো রিটার্ন হয়।", en: "Braces `{}` require explicit `return`." },
    exampleCode: {
      html: `<div class="box" id="fnOut"></div>`,
      css: JS_DEMO_CSS,
      js: `const calcDiscount = (price, pct = 10) => price - (price * pct) / 100;\ndocument.getElementById("fnOut").textContent = "After 10% off: ৳" + calcDiscount(500);\nconsole.log("Result:", calcDiscount(500));`,
    },
  },
];
