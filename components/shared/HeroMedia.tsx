"use client";
import { useEffect, useRef, useState } from "react";
import { useVideoAllowed } from "@/lib/useVideoAllowed";

export function HeroMedia({
  poster,
  posterMobile,
  posterAlt,
  webm,
  mp4,
  className = "",
}: {
  poster: string;
  posterMobile: string;
  posterAlt: string;
  webm?: string;
  mp4?: string;
  className?: string;
}) {
  const allowed = useVideoAllowed();
  const [mount, setMount] = useState(false);
  const [ready, setReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hasVideo = Boolean(webm || mp4);

  useEffect(() => {
    if (!allowed || !hasVideo) {
      setMount(false);
      setReady(false);
      return;
    }
    let idle: number | undefined;
    const go = () => {
      const w = window as Window & { requestIdleCallback?: (cb: () => void) => number };
      idle = w.requestIdleCallback
        ? w.requestIdleCallback(() => setMount(true))
        : window.setTimeout(() => setMount(true), 200);
    };
    if (document.readyState === "complete") go();
    else window.addEventListener("load", go, { once: true });
    return () => {
      window.removeEventListener("load", go);
      if (idle) window.clearTimeout(idle);
    };
  }, [allowed, hasVideo]);

  useEffect(() => {
    const v = videoRef.current;
    if (!mount || !v) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.intersectionRatio < 0.1) v.pause();
        else v.play().catch(() => {});
      },
      { threshold: [0, 0.1] },
    );
    io.observe(v);
    v.play().catch(() => {});
    return () => io.disconnect();
  }, [mount]);

  return (
    <div
      className={`relative w-full border border-[#06243B] aspect-[3/2] lg:aspect-[3/4] overflow-hidden ${className}`}
    >
      <picture>
        <source media="(min-width: 1024px)" srcSet={poster} width={720} height={960} />
        <img
          src={posterMobile}
          alt={posterAlt}
          width={720}
          height={480}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </picture>
      {mount && (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          aria-hidden
          onCanPlay={() => setReady(true)}
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ease-[cubic-bezier(0.2,0,0,1)]"
          style={{ opacity: ready ? 1 : 0 }}
        >
          {webm && <source src={webm} type="video/webm" />}
          {mp4 && <source src={mp4} type="video/mp4" />}
        </video>
      )}
    </div>
  );
}
