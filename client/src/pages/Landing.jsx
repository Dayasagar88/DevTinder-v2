import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import {
  HiSparkles,
  HiArrowRight,
  HiHeart,
  HiXMark,
  HiOutlineMapPin,
} from "react-icons/hi2";
import { TbBrandGithub, TbCalendar, TbBriefcase } from "react-icons/tb";
import {
  SiReact,
  SiNodedotjs,
  SiTypescript,
  SiPython,
  SiDocker,
  SiNextdotjs,
} from "react-icons/si";

/* ── Skill pill (matches DeveloperCard exactly) ── */
const SKILL_META = {
  React: { icon: SiReact, color: "#38bdf8" },
  "Node.js": { icon: SiNodedotjs, color: "#4ade80" },
  TypeScript: { icon: SiTypescript, color: "#60a5fa" },
  Python: { icon: SiPython, color: "#facc15" },
  Docker: { icon: SiDocker, color: "#60a5fa" },
  "Next.js": { icon: SiNextdotjs, color: "#e2e8f0" },
};

function SkillPill({ label }) {
  const meta = SKILL_META[label];
  const Icon = meta?.icon;
  const color = meta?.color ?? "#94a3b8";
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium shrink-0"
      style={{
        background: `${color}14`,
        border: `1px solid ${color}28`,
        color,
      }}
    >
      {Icon && <Icon style={{ fontSize: "10px" }} />}
      {label}
    </span>
  );
}

/* ── Mock DeveloperCard — pixel-identical to real card but static ── */
function MockDeveloperCard() {
  return (
    <div
      className="w-[340px] rounded-3xl flex flex-col overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg,rgba(255,255,255,0.07) 0%,rgba(255,255,255,0.025) 100%)",
        backdropFilter: "blur(22px)",
        WebkitBackdropFilter: "blur(22px)",
        border: "1px solid rgba(255,255,255,0.1)",
        boxShadow:
          "0 20px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(124,58,237,0.1), inset 0 1px 0 rgba(255,255,255,0.08)",
      }}
    >
      {/* Top shimmer */}
      <div
        className="h-px w-full shrink-0"
        style={{
          background:
            "linear-gradient(90deg,transparent,rgba(124,58,237,0.7),rgba(13,148,136,0.5),transparent)",
        }}
      />

      {/* Photo section */}
      <div
        className="relative shrink-0 overflow-hidden"
        style={{ height: "196px" }}
      >
        {/* Gradient placeholder photo */}
        <div
          className="w-full h-full flex items-center justify-center"
          style={{
            background:
              "linear-gradient(135deg,rgba(124,58,237,0.35) 0%,rgba(79,70,229,0.25) 40%,rgba(13,148,136,0.3) 100%)",
          }}
        >
          {/* Abstract avatar shape */}
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-black"
            style={{
              background: "linear-gradient(135deg,#7c3aed,#0d9488)",
              boxShadow: "0 8px 32px rgba(124,58,237,0.4)",
              color: "#fff",
              fontFamily: "'Syne',sans-serif",
            }}
          >
            A
          </div>
        </div>

        {/* Gradient vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom,rgba(0,0,0,0.02) 0%,rgba(8,8,16,0.82) 100%)",
          }}
        />

        {/* CONNECT stamp (faint, pre-shown as preview) */}
        <div
          className="absolute top-4 left-4 px-3 py-1 rounded-xl border-2 font-black text-xs uppercase tracking-wider pointer-events-none"
          style={{
            opacity: 0.25,
            borderColor: "#4ade80",
            color: "#4ade80",
            background: "rgba(74,222,128,0.12)",
            transform: "rotate(-12deg)",
          }}
        >
          ✓ Connect
        </div>

        {/* Online dot */}
        <div
          className="absolute top-3.5 right-3.5 w-2.5 h-2.5 rounded-full"
          style={{
            background: "#22c55e",
            boxShadow: "0 0 7px #22c55e, 0 0 16px rgba(34,197,94,0.45)",
          }}
        />

        {/* Name overlay */}
        <div className="absolute bottom-3 left-4 right-4">
          <div className="flex items-end justify-between gap-2">
            <div>
              <h3
                className="text-[19px] font-extrabold leading-tight"
                style={{
                  color: "#f1f5f9",
                  fontFamily: "'Syne',sans-serif",
                  textShadow: "0 2px 12px rgba(0,0,0,0.55)",
                }}
              >
                Alex Chen
              </h3>
              <p
                className="text-[11px] mt-0.5"
                style={{ color: "rgba(203,213,225,0.72)" }}
              >
                Full-Stack · San Francisco
              </p>
            </div>
            <span
              className="shrink-0 px-2 py-0.5 rounded-lg text-[10px] font-bold"
              style={{
                background: "#60a5fa18",
                border: "1px solid #60a5fa35",
                color: "#60a5fa",
              }}
            >
              Intermediate
            </span>
          </div>
        </div>
      </div>

      {/* ── About slide ── */}
      <div className="px-4 pt-3 pb-1">
        <p
          className="text-[9px] font-bold uppercase tracking-widest mb-2"
          style={{ color: "rgba(100,116,139,0.5)" }}
        >
          About
        </p>
        <p
          className="text-xs leading-relaxed"
          style={{
            color: "rgba(148,163,184,0.8)",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          Building a B2B SaaS for dev teams. Looking for a co-founder with ML
          experience. YC alum.
        </p>
        <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2">
          <span
            className="flex items-center gap-1 text-[11px]"
            style={{ color: "rgba(100,116,139,0.65)" }}
          >
            <HiOutlineMapPin style={{ fontSize: "11px" }} />
            San Francisco
          </span>
          <span
            className="flex items-center gap-1 text-[11px]"
            style={{ color: "rgba(100,116,139,0.65)" }}
          >
            <TbCalendar style={{ fontSize: "11px" }} />5 yrs exp
          </span>
          <span
            className="flex items-center gap-1 text-[11px]"
            style={{ color: "#60a5fa" }}
          >
            <TbBriefcase style={{ fontSize: "11px" }} />
            Intermediate
          </span>
        </div>

        {/* Slide dots */}
        <div className="flex items-center justify-center gap-[5px] mt-3 mb-1">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                width: i === 0 ? "20px" : "6px",
                height: "6px",
                borderRadius: "3px",
                background:
                  i === 0
                    ? "linear-gradient(90deg,#7c3aed,#4f46e5)"
                    : "rgba(255,255,255,0.15)",
              }}
            />
          ))}
        </div>
      </div>

      {/* Skills row (peek of slide 2) */}
      <div className="px-4 pb-2">
        <p
          className="text-[9px] font-bold uppercase tracking-widest mb-1.5"
          style={{ color: "rgba(100,116,139,0.5)" }}
        >
          Skills
        </p>
        <div className="flex flex-wrap gap-1.5">
          {[
            "React",
            "Node.js",
            "TypeScript",
            "Python",
            "Next.js",
            "Docker",
          ].map((s) => (
            <SkillPill key={s} label={s} />
          ))}
        </div>
      </div>

      {/* Divider */}
      <div
        className="mx-4 h-px shrink-0"
        style={{ background: "rgba(255,255,255,0.055)" }}
      />

      {/* Action buttons */}
      <div className="px-4 py-3 flex items-center gap-3 shrink-0">
        <button
          className="w-12 h-11 flex items-center justify-center rounded-2xl"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "rgba(148,163,184,0.75)",
          }}
        >
          <HiXMark style={{ fontSize: "20px" }} />
        </button>
        <button
          className="flex-1 h-11 flex items-center justify-center gap-2 rounded-2xl text-sm font-bold"
          style={{
            background: "linear-gradient(135deg,#7c3aed,#4f46e5)",
            border: "1px solid rgba(124,58,237,0.4)",
            color: "#fff",
            boxShadow:
              "0 0 16px rgba(124,58,237,0.28), inset 0 1px 0 rgba(255,255,255,0.12)",
          }}
        >
          <HiHeart style={{ fontSize: "15px" }} />
          Connect
        </button>
      </div>
    </div>
  );
}

/* ── Stats ── */
const STATS = [
  { value: "12k+", label: "Developers" },
  { value: "3.4k", label: "Matches made" },
  { value: "840", label: "Projects launched" },
];

/* ── Feature cards ── */
const FEATURES = [
  {
    emoji: "⚡",
    title: "Instant Matching",
    desc: "Swipe through vetted developers filtered by stack, experience, and what they're building.",
    accent: "#7c3aed",
  },
  {
    emoji: "🤝",
    title: "Real Connections",
    desc: "Match only when both sides like each other. No spam, no cold messages.",
    accent: "#0d9488",
  },
  {
    emoji: "🚀",
    title: "Ship Together",
    desc: "From first match to first commit. Built-in chat and project discovery.",
    accent: "#4f46e5",
  },
];

export default function Landing() {
  const cardSectionRef = useInView(useRef(null), {
    once: true,
    margin: "-100px",
  });
  const cardRef = useRef(null);
  const cardInView = useInView(cardRef, { once: true, margin: "-80px" });
  const featuresRef = useRef(null);
  const featuresInView = useInView(featuresRef, {
    once: true,
    margin: "-80px",
  });

  return (
    <div
      className="min-h-screen text-white"
      style={{ background: "#080810", fontFamily: "'DM Sans', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&family=Syne:wght@700;800;900&display=swap');
        .font-display { font-family: 'Syne', sans-serif; }
        html { scroll-behavior: smooth; }
      `}</style>

      {/* ── Navbar ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4"
        style={{
          background: "rgba(8,8,16,0.75)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg,#7c3aed,#4f46e5)",
              boxShadow: "0 0 16px rgba(124,58,237,0.4)",
            }}
          >
            <HiSparkles style={{ fontSize: "14px", color: "#fff" }} />
          </div>
          <span
            className="font-bold text-sm font-display"
            style={{ color: "#f1f5f9" }}
          >
            DevTinder
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="text-sm px-4 py-2 rounded-xl transition-colors duration-150"
            style={{ color: "rgba(148,163,184,0.8)" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#f1f5f9";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "rgba(148,163,184,0.8)";
            }}
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="text-sm font-semibold px-5 py-2 rounded-xl flex items-center gap-1.5"
            style={{
              background: "linear-gradient(135deg,#7c3aed,#4f46e5)",
              color: "#fff",
              boxShadow:
                "0 0 16px rgba(124,58,237,0.35), inset 0 1px 0 rgba(255,255,255,0.12)",
            }}
          >
            Get Started <HiArrowRight style={{ fontSize: "13px" }} />
          </Link>
        </div>
      </nav>

      {/* ══════════════ HERO ══════════════ */}
      <section className="relative flex flex-col items-center justify-center text-center min-h-screen px-6 pt-20">
        {/* Background glows */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            style={{
              position: "absolute",
              top: "15%",
              left: "50%",
              transform: "translateX(-50%)",
              width: "600px",
              height: "600px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(124,58,237,0.14) 0%, transparent 65%)",
              filter: "blur(40px)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "30%",
              right: "15%",
              width: "300px",
              height: "300px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(13,148,136,0.1) 0%, transparent 65%)",
              filter: "blur(50px)",
            }}
          />
        </div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-8"
          style={{
            background: "rgba(124,58,237,0.1)",
            border: "1px solid rgba(124,58,237,0.3)",
            color: "#a78bfa",
          }}
        >
          <HiSparkles style={{ fontSize: "11px" }} />
          Developer matchmaking, reimagined
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-display font-black leading-[0.92] tracking-tight mb-6"
          style={{ fontSize: "clamp(56px, 9vw, 108px)", color: "#f1f5f9" }}
        >
          Find Developers.
          <br />
          <span
            style={{
              background: "linear-gradient(135deg,#7c3aed,#818cf8,#38bdf8)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Build Startups.
          </span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.35 }}
          className="text-base leading-relaxed mb-10 max-w-lg mx-auto"
          style={{ color: "rgba(148,163,184,0.72)" }}
        >
          DevTinder helps developers discover collaborators for projects,
          startups, and open source. Swipe, match, and ship — together.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-16"
        >
          <Link
            to="/signup"
            className="flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold"
            style={{
              background: "linear-gradient(135deg,#7c3aed,#4f46e5)",
              color: "#fff",
              boxShadow:
                "0 0 24px rgba(124,58,237,0.4), inset 0 1px 0 rgba(255,255,255,0.12)",
            }}
          >
            <HiSparkles style={{ fontSize: "14px" }} /> Start Building
          </Link>
          <Link
            to="/signup"
            className="flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-semibold"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "rgba(203,213,225,0.85)",
            }}
          >
            <TbBrandGithub style={{ fontSize: "15px" }} /> Continue with GitHub
          </Link>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.58 }}
          className="flex items-center justify-center gap-8 flex-wrap"
        >
          {STATS.map((s, i) => (
            <div key={i} className="text-center">
              <p
                className="text-2xl font-black font-display"
                style={{ color: "#f1f5f9" }}
              >
                {s.value}
              </p>
              <p className="text-xs" style={{ color: "rgba(100,116,139,0.7)" }}>
                {s.label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
        >
          <p
            className="text-[11px] tracking-widest uppercase"
            style={{ color: "rgba(100,116,139,0.4)" }}
          >
            Scroll
          </p>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-8"
            style={{
              background:
                "linear-gradient(to bottom, rgba(124,58,237,0.6), transparent)",
            }}
          />
        </motion.div>
      </section>

      {/* ══════════════ CARD REVEAL SECTION ══════════════ */}
      <section className="relative flex flex-col items-center justify-center px-6 py-24 overflow-hidden">
        {/* Background glow behind card */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div
            style={{
              width: "500px",
              height: "500px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 65%)",
              filter: "blur(60px)",
            }}
          />
        </div>

        {/* Section label */}
        <motion.p
          ref={cardRef}
          initial={{ opacity: 0, y: 12 }}
          animate={cardInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-xs font-bold uppercase tracking-[0.2em] mb-3 text-center"
          style={{ color: "#a78bfa" }}
        >
          Meet your next co-founder
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          animate={cardInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="font-display font-black text-center mb-2 leading-tight"
          style={{ fontSize: "clamp(28px, 4vw, 48px)", color: "#f1f5f9" }}
        >
          Swipe through real developers
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={cardInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-sm text-center mb-14 max-w-md"
          style={{ color: "rgba(148,163,184,0.6)" }}
        >
          Each card shows their stack, experience, and what they're looking to
          build. Swipe right to connect, left to pass.
        </motion.p>

        {/* Stacked cards reveal */}
        <div
          className="relative flex items-center justify-center"
          style={{ width: "340px", height: "520px" }}
        >
          {/* Card 3 — deepest */}
          <motion.div
            initial={{ opacity: 0, scale: 0.82, y: 32 }}
            animate={cardInView ? { opacity: 0.45, scale: 0.88, y: 24 } : {}}
            transition={{
              duration: 0.7,
              delay: 0.05,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute inset-0"
            style={{ zIndex: 1 }}
          >
            <div
              className="w-full h-full rounded-3xl"
              style={{
                background:
                  "linear-gradient(160deg,rgba(255,255,255,0.05),rgba(255,255,255,0.015))",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            />
          </motion.div>

          {/* Card 2 — middle */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 20 }}
            animate={cardInView ? { opacity: 0.72, scale: 0.94, y: 12 } : {}}
            transition={{
              duration: 0.7,
              delay: 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute inset-0"
            style={{ zIndex: 2 }}
          >
            <div
              className="w-full h-full rounded-3xl"
              style={{
                background:
                  "linear-gradient(160deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            />
          </motion.div>

          {/* Card 1 — top (real mock card) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 40, rotateZ: -3 }}
            animate={
              cardInView ? { opacity: 1, scale: 1, y: 0, rotateZ: 0 } : {}
            }
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
            style={{ zIndex: 3 }}
          >
            <MockDeveloperCard />
          </motion.div>
        </div>

        {/* Swipe hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={cardInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-8 text-xs"
          style={{ color: "rgba(100,116,139,0.4)" }}
        >
          Swipe right to connect · Swipe left to pass
        </motion.p>
      </section>

      {/* ══════════════ FEATURES ══════════════ */}
      <section ref={featuresRef} className="px-6 py-20 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={featuresInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <p
            className="text-xs font-bold uppercase tracking-[0.2em] mb-3"
            style={{ color: "#a78bfa" }}
          >
            Why DevTinder
          </p>
          <h2
            className="font-display font-black text-center leading-tight"
            style={{ fontSize: "clamp(28px, 4vw, 44px)", color: "#f1f5f9" }}
          >
            Built for builders
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {FEATURES.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={featuresInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-6 rounded-2xl flex flex-col gap-3"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                style={{
                  background: `${f.accent}18`,
                  border: `1px solid ${f.accent}28`,
                }}
              >
                {f.emoji}
              </div>
              <h3
                className="font-display font-bold text-base"
                style={{ color: "#f1f5f9" }}
              >
                {f.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "rgba(148,163,184,0.6)" }}
              >
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══════════════ CTA BANNER ══════════════ */}
      <section className="px-6 py-20 flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-2xl rounded-3xl p-10 text-center relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg,rgba(124,58,237,0.18),rgba(79,70,229,0.12),rgba(13,148,136,0.1))",
            border: "1px solid rgba(124,58,237,0.25)",
          }}
        >
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-24 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse,rgba(124,58,237,0.3),transparent 70%)",
              filter: "blur(24px)",
            }}
          />

          <h2
            className="font-display font-black mb-3 relative z-10"
            style={{ fontSize: "clamp(24px, 3.5vw, 36px)", color: "#f1f5f9" }}
          >
            Ready to find your team?
          </h2>
          <p
            className="text-sm mb-7 relative z-10"
            style={{ color: "rgba(148,163,184,0.7)" }}
          >
            Join thousands of developers already building on DevTinder.
          </p>
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl text-sm font-bold relative z-10"
            style={{
              background: "linear-gradient(135deg,#7c3aed,#4f46e5)",
              color: "#fff",
              boxShadow:
                "0 0 28px rgba(124,58,237,0.45), inset 0 1px 0 rgba(255,255,255,0.12)",
            }}
          >
            <HiSparkles style={{ fontSize: "14px" }} /> Get Started Free
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer
        className="px-6 py-8 text-center border-t"
        style={{ borderColor: "rgba(255,255,255,0.05)" }}
      >
        <p className="text-xs" style={{ color: "rgba(100,116,139,0.4)" }}>
          © 2025 DevTinder · Built by developers, for developers
        </p>
      </footer>
    </div>
  );
}
