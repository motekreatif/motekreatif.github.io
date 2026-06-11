"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { ArrowUpRight, BookOpen, ChevronDown, Check } from "lucide-react";
import { motion } from "framer-motion";
import {
  BOOKS,
  BOOK_CATEGORIES,
  type Book,
  type BookCategory,
} from "@/lib/books";

type Filter = "all" | BookCategory;

function BookCard({ book, large = false }: { book: Book; large?: boolean }) {
  const hasUrl = book.url.trim().length > 0;
  const Wrapper = hasUrl ? "a" : "div";
  const wrapperProps = hasUrl
    ? {
        href: book.url,
        target: "_blank",
        rel: "sponsored noopener noreferrer",
      }
    : {};

  return (
    <Wrapper
      {...wrapperProps}
      className={`card-soft group/card overflow-hidden flex flex-col h-full ${
        hasUrl ? "cursor-pointer" : "cursor-default opacity-95"
      }`}
    >
      <div className="relative aspect-[2/3] overflow-hidden bg-[#06243B]/[0.04]">
        {book.cover ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={book.cover}
            alt={`Sampul buku ${book.title} oleh ${book.author}`}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover/card:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 text-center">
            <BookOpen className="h-7 w-7 text-[#06243B]/30" />
            <span className="text-xs font-bold leading-tight text-[#06243B]/60">
              {book.title}
            </span>
          </div>
        )}

        {book.featured && (
          <span className="absolute left-2 top-2 rounded-full bg-[#BDF24A] px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide text-[#06243B] shadow-sm">
            🔥 Bestseller
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1 p-3.5">
        <h3
          className={`font-extrabold leading-snug text-[#06243B] ${
            large ? "text-base" : "text-sm"
          } line-clamp-2`}
        >
          {book.title}
        </h3>
        <p className="text-xs text-[#3D4F60]">{book.author}</p>
        {/* Hook selalu tampil (mobile tak punya hover) — ini copy konversinya */}
        <p className="mt-1 text-[11px] leading-snug text-[#3D4F60]/75 line-clamp-2">
          {book.hook}
        </p>
        {hasUrl && (
          <span className="mt-auto inline-flex items-center gap-1 pt-2 text-[11px] font-bold text-[#FF7E00]">
            Lihat di Shopee
            <ArrowUpRight className="h-3 w-3" />
          </span>
        )}
      </div>
    </Wrapper>
  );
}

export function BookGallery() {
  const [filter, setFilter] = useState<Filter>("all");

  const featured = useMemo(() => BOOKS.filter((b) => b.featured), []);

  const counts = useMemo(() => {
    const c: Record<string, number> = {};
    for (const b of BOOKS) c[b.category] = (c[b.category] ?? 0) + 1;
    return c;
  }, []);

  const sections = useMemo(() => {
    const cats =
      filter === "all"
        ? BOOK_CATEGORIES
        : BOOK_CATEGORIES.filter((c) => c.key === filter);
    return cats.map((cat) => ({
      ...cat,
      books: BOOKS.filter((b) => b.category === cat.key),
    }));
  }, [filter]);

  return (
    <div>
      {/* Featured row */}
      {filter === "all" && featured.length > 0 && (
        <div className="mb-14">
          <div className="mb-5 flex items-center gap-2">
            <span className="text-lg">🔥</span>
            <h2 className="text-lg font-extrabold text-[#06243B]">
              Paling Dicari
            </h2>
            <span className="text-sm text-[#3D4F60]">
              — mulai dari sini kalau bingung
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {featured.map((b) => (
              <BookCard key={b.title} book={b} large />
            ))}
          </div>
        </div>
      )}

      {/* Sticky category filter — dropdown, offset di bawah header fixed (h-16/h-20) */}
      <div className="sticky top-16 md:top-20 z-20 -mx-4 mb-10 bg-[#F7F4EE]/95 px-4 py-3 backdrop-blur supports-[backdrop-filter]:bg-[#F7F4EE]/80">
        <CategoryDropdown
          filter={filter}
          counts={counts}
          total={BOOKS.length}
          onChange={setFilter}
        />
      </div>

      {/* Sections */}
      <div className="flex flex-col gap-14">
        {sections.map((sec) => (
          <section key={sec.key} id={`kat-${sec.key}`} className="scroll-mt-32">
            <div className="mb-5 flex items-baseline gap-3">
              <h2 className="text-xl font-extrabold text-[#06243B]">
                {sec.label}
              </h2>
              <span className="text-sm font-semibold text-[#FF7E00]">
                {sec.books.length} buku
              </span>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5"
            >
              {sec.books.map((b) => (
                <BookCard key={b.title} book={b} />
              ))}
            </motion.div>
          </section>
        ))}
      </div>
    </div>
  );
}

function CategoryDropdown({
  filter,
  counts,
  total,
  onChange,
}: {
  filter: Filter;
  counts: Record<string, number>;
  total: number;
  onChange: (f: Filter) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const options: { key: Filter; label: string; count: number }[] = [
    { key: "all", label: "Semua Kategori", count: total },
    ...BOOK_CATEGORIES.map((c) => ({
      key: c.key as Filter,
      label: c.label,
      count: counts[c.key] ?? 0,
    })),
  ];
  const current = options.find((o) => o.key === filter) ?? options[0];

  // Tutup saat klik di luar atau tekan Escape
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative w-full sm:max-w-xs">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-3 rounded-full bg-[#06243B] px-5 py-3 text-left text-sm font-bold text-white transition-colors hover:bg-[#0E3450]"
      >
        <span className="flex items-center gap-2">
          <span className="text-white/60">Kategori:</span>
          <span>{current.label}</span>
          <span className="text-[#BDF24A]">{current.count}</span>
        </span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-[#BDF24A] transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute left-0 right-0 z-30 mt-2 max-h-[60vh] overflow-y-auto rounded-2xl border border-[#06243B]/10 bg-white p-1.5 shadow-[0_18px_40px_-18px_rgba(6,36,59,0.4)]"
        >
          {options.map((o) => {
            const active = o.key === filter;
            return (
              <li key={o.key}>
                <button
                  type="button"
                  role="option"
                  aria-selected={active}
                  onClick={() => {
                    onChange(o.key);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center justify-between gap-3 rounded-xl px-4 py-2.5 text-left text-sm font-semibold transition-colors ${
                    active
                      ? "bg-[#06243B] text-white"
                      : "text-[#06243B] hover:bg-[#F7F4EE]"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {active && <Check className="h-4 w-4 text-[#BDF24A]" />}
                    <span className={active ? "" : "pl-6"}>{o.label}</span>
                  </span>
                  <span
                    className={`text-xs ${active ? "text-[#BDF24A]" : "text-[#FF7E00]"}`}
                  >
                    {o.count}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
