"use client";

import { useEffect, useId, useRef, useState } from "react";
import mermaid from "mermaid";

type Palette = {
  fg: string;
  bg: string;
  bgAlt: string;
  accent: string;
  scheme: "light" | "dark";
};

function readPalette(): Palette {
  const cs = getComputedStyle(document.documentElement);
  const trim = (v: string, fallback: string) => {
    const t = v.trim();
    return t.length > 0 ? t : fallback;
  };
  const fg = trim(cs.getPropertyValue("--text-color"), "#000");
  const bg = trim(cs.getPropertyValue("--background-color"), "#fff");
  const bgAlt = trim(cs.getPropertyValue("--background-color-alt"), "#eee");
  const accent = trim(cs.getPropertyValue("--text-color-alt"), "#666");
  const scheme: Palette["scheme"] =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  return { fg, bg, bgAlt, accent, scheme };
}

function initMermaid(p: Palette) {
  mermaid.initialize({
    startOnLoad: false,
    theme: "neutral",
    securityLevel: "loose",
    fontFamily: '"JetBrains Mono", monospace',
    themeVariables: {
      fontFamily: '"JetBrains Mono", monospace',
      fontSize: "13px",
      background: p.bg,
      primaryColor: "transparent",
      primaryTextColor: p.fg,
      primaryBorderColor: p.fg,
      secondaryColor: p.bgAlt,
      secondaryTextColor: p.fg,
      secondaryBorderColor: p.fg,
      tertiaryColor: p.bgAlt,
      tertiaryTextColor: p.fg,
      tertiaryBorderColor: p.fg,
      lineColor: p.fg,
      textColor: p.fg,
      mainBkg: p.bgAlt,
      secondBkg: p.bgAlt,
      tertiaryBkg: p.bgAlt,
      clusterBkg: "transparent",
      clusterBorder: p.fg,
      edgeLabelBackground: p.bg,
      nodeBorder: p.fg,
      noteBkgColor: p.bgAlt,
      noteTextColor: p.fg,
      noteBorderColor: p.fg,
      activationBorderColor: p.fg,
      activationBkgColor: p.bgAlt,
      labelBackground: p.bg,
      labelBoxBkgColor: p.bg,
      labelBoxBorderColor: p.fg,
    },
    flowchart: {
      curve: "basis",
      nodeSpacing: 30,
      rankSpacing: 30,
      padding: 6,
    },
    sequence: {
      diagramMarginX: 12,
      diagramMarginY: 12,
      actorMargin: 36,
      width: 120,
      height: 32,
      boxMargin: 6,
      boxTextMargin: 4,
      noteMargin: 8,
      messageMargin: 28,
      mirrorActors: true,
      bottomMarginAdj: 1,
      useMaxWidth: true,
    },
    xyChart: {
      width: 720,
      height: 220,
      showTitle: true,
      titlePadding: 8,
      showLegend: false,
      // @ts-expect-error: plotColorPalette is a runtime theme variable read by mermaid at chart-build time
      plotColorPalette: p.fg,
    },
  });
}

type MermaidProps = {
  chart: string;
  caption?: string;
  className?: string;
  ariaLabel?: string;
};

export default function Mermaid({
  chart,
  caption,
  className,
  ariaLabel,
}: MermaidProps) {
  const rawId = useId();
  const ref = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [scheme, setScheme] = useState<"light" | "dark" | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => setScheme(mq.matches ? "dark" : "light");
    handler();
    if (typeof mq.addEventListener === "function") {
      mq.addEventListener("change", handler);
      return () => mq.removeEventListener("change", handler);
    }
    return undefined;
  }, []);

  useEffect(() => {
    if (scheme === null) return;
    const palette = readPalette();
    initMermaid(palette);

    const id = `mmd-${rawId.replace(/[^a-zA-Z0-9]/g, "")}`;

    let cancelled = false;
    mermaid
      .render(id, chart)
      .then(({ svg }) => {
        if (cancelled || !ref.current) return;
        ref.current.innerHTML = svg;
        setError(null);
      })
      .catch((err: Error) => {
        if (cancelled) return;
        setError(err.message ?? String(err));
      });

    return () => {
      cancelled = true;
    };
  }, [chart, rawId, scheme]);

  return (
    <figure className={className} aria-label={ariaLabel ?? caption}>
      <div className="mermaid-figure" ref={ref} />
      {error ? (
        <pre className="ascii-figure" role="alert">
          {`[mermaid render error]\n\n${error}\n\n${chart}`}
        </pre>
      ) : null}
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}
