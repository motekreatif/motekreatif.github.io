"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, MessageCircle } from "lucide-react";
import { CONTACT } from "@/lib/constants";
import { cn } from "@/lib/cn";

const services = [
  "Digital Marketing Full (DM)",
  "Social Media & Marketplace (SMMO)",
  "TDMO — Team Development",
  "Brand Growth (BG)",
  "Campaign Activation (CA)",
  "Produk Digital",
  "Lainnya",
];

export function ContactForm({ className }: { className?: string }) {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") ?? "");
    const email = String(fd.get("email") ?? "");
    const wa = String(fd.get("whatsapp") ?? "");
    const service = String(fd.get("service") ?? "");
    const message = String(fd.get("message") ?? "");

    const text = `Halo MOTE, saya ${name}.\n\nEmail: ${email}\nWA: ${wa}\nLayanan: ${service}\n\n${message}`;
    const url = `${CONTACT.whatsappLink}?text=${encodeURIComponent(text)}`;

    console.log("[contact] submitted", { name, email, wa, service, message });
    setSubmitted(true);
    setSubmitting(false);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <form onSubmit={onSubmit} className={cn("flex flex-col gap-4", className)}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Nama" name="name" placeholder="Nama lengkap" required />
        <Field
          label="Email"
          name="email"
          type="email"
          placeholder="kamu@email.com"
          required
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field
          label="WhatsApp"
          name="whatsapp"
          placeholder="08xxxxxxxxxx"
          required
        />
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold uppercase tracking-widest text-[#06243B]/60">
            Layanan
          </label>
          <select
            name="service"
            required
            defaultValue=""
            className="px-4 py-3 rounded-xl border border-black/10 bg-white text-[#06243B] focus:outline-none focus:ring-2 focus:ring-[#06243B]/30"
          >
            <option value="" disabled>
              Pilih layanan
            </option>
            {services.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-bold uppercase tracking-widest text-[#06243B]/60">
          Pesan
        </label>
        <textarea
          name="message"
          rows={5}
          required
          placeholder="Ceritakan konteks bisnis dan apa yang kamu cari…"
          className="px-4 py-3 rounded-xl border border-black/10 bg-white text-[#06243B] focus:outline-none focus:ring-2 focus:ring-[#06243B]/30 resize-y"
        />
      </div>
      <button
        type="submit"
        disabled={submitting}
        className="btn btn-primary group self-start mt-2 disabled:opacity-60"
      >
        <MessageCircle className="h-4 w-4" />
        Kirim via WhatsApp
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </button>
      {submitted && (
        <p className="text-sm text-[#06243B]/70">
          Membuka WhatsApp… kalau jendela baru tidak terbuka, izinkan popup atau{" "}
          <a
            href={CONTACT.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="underline font-semibold"
          >
            chat langsung di sini
          </a>
          .
        </p>
      )}
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={name}
        className="text-xs font-bold uppercase tracking-widest text-[#06243B]/60"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="px-4 py-3 rounded-xl border border-black/10 bg-white text-[#06243B] placeholder:text-[#06243B]/40 focus:outline-none focus:ring-2 focus:ring-[#06243B]/30"
      />
    </div>
  );
}
