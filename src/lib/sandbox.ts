import { CodeBundle } from "@/types/lesson";

export function buildSandboxSrcDoc(code: CodeBundle, runId: number): string {
  const safeCss = code.css.replace(/<\/style>/gi, "<\\/style>");
  const safeJs = code.js.replace(/<\/script>/gi, "<\\/script>");

  const prefixHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>${safeCss}</style>
</head>
<body>
  ${code.html}
  <script>
    (function () {
      const RUN_ID = ${runId};

      function serializeArg(val) {
        if (val === undefined) return "undefined";
        if (val === null) return "null";
        if (typeof val === "function") return "[Function: " + (val.name || "anonymous") + "]";
        if (val instanceof Error) return val.name + ": " + val.message;
        if (typeof val === "object") {
          try {
            return JSON.stringify(val, null, 2);
          } catch (e) {
            return String(val);
          }
        }
        return String(val);
      }

      function send(type, payload) {
        try {
          window.parent.postMessage({
            source: "codepulse-sandbox",
            runId: RUN_ID,
            type,
            payload
          }, "*");
        } catch (err) {}
      }

      // Safe in-memory localStorage fallback when running in opaque sandbox iframe
      try {
        window.localStorage.setItem("__probe__", "1");
        window.localStorage.removeItem("__probe__");
      } catch (storageErr) {
        const memStore = Object.create(null);
        Object.defineProperty(window, "localStorage", {
          configurable: true,
          value: {
            getItem: function (k) { return Object.prototype.hasOwnProperty.call(memStore, k) ? memStore[k] : null; },
            setItem: function (k, v) { memStore[String(k)] = String(v); },
            removeItem: function (k) { delete memStore[String(k)]; },
            clear: function () { Object.keys(memStore).forEach(function (k) { delete memStore[k]; }); },
            key: function (i) { return Object.keys(memStore)[i] ?? null; },
            get length() { return Object.keys(memStore).length; }
          }
        });
      }

      ["log", "info", "warn", "error", "table"].forEach(function (level) {
        const orig = console[level] ? console[level].bind(console) : console.log.bind(console);
        console[level] = function () {
          const rawArgs = Array.from(arguments);
          send("console", {
            level: level,
            args: rawArgs.map(serializeArg),
            timestamp: new Date().toLocaleTimeString([], { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" })
          });
          try { orig.apply(console, rawArgs); } catch (e) {}
        };
      });

      window.__CODEPULSE_LINE_OFFSET__ = 0;

      window.addEventListener("error", function (event) {
        const rawLine = event.lineno || null;
        const userLine = rawLine && window.__CODEPULSE_LINE_OFFSET__
          ? Math.max(1, rawLine - window.__CODEPULSE_LINE_OFFSET__)
          : rawLine;
        send("runtime-error", {
          message: event.message || "Script error",
          line: userLine
        });
      });

      window.addEventListener("unhandledrejection", function (event) {
        const reason = event.reason;
        send("runtime-error", {
          message: reason && reason.message ? reason.message : String(reason),
          line: null
        });
      });
    })();
  <\/script>
  <script>`;

  const offsetLines = prefixHtml.split("\n").length - 1;

  return `${prefixHtml.replace(
    "window.__CODEPULSE_LINE_OFFSET__ = 0;",
    `window.__CODEPULSE_LINE_OFFSET__ = ${offsetLines};`
  )}
${safeJs}
  <\/script>
</body>
</html>`;
}
