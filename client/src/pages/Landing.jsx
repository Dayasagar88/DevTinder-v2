import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HiSparkles, HiArrowRight } from "react-icons/hi2";
import {
  TbBrandGithub,
  TbHeartHandshake,
  TbRocket,
  TbCode,
} from "react-icons/tb";
import {
  SiReact,
  SiRust,
  SiTypescript,
  SiPython,
  SiGo,
  SiSolidity,
} from "react-icons/si";
import { BsStars } from "react-icons/bs";
import { RiCompassDiscoverFill } from "react-icons/ri";

/* ─── Static data ─────────────────────────────────────────── */
const features = [
  {
    icon: RiCompassDiscoverFill,
    color: "#7c3aed",
    glow: "rgba(124,58,237,0.3)",
    title: "Swipe on Developers",
    desc: "Browse developer profiles like cards. Like, skip, or super-like based on their stack, vibe, and what they're building.",
  },
  {
    icon: TbHeartHandshake,
    color: "#e11d48",
    glow: "rgba(225,29,72,0.3)",
    title: "Match & Collaborate",
    desc: "When interest is mutual, you match. Start a conversation, share your idea, and build something together.",
  },
  {
    icon: TbRocket,
    color: "#0d9488",
    glow: "rgba(13,148,136,0.3)",
    title: "Launch Together",
    desc: "From side project to funded startup. DevTinder pairs complementary skills so teams are built to ship.",
  },
];

const techPills = [
  { icon: SiReact, label: "React", color: "#38bdf8" },
  { icon: SiTypescript, label: "TypeScript", color: "#60a5fa" },
  { icon: SiRust, label: "Rust", color: "#fb923c" },
  { icon: SiPython, label: "Python", color: "#facc15" },
  { icon: SiGo, label: "Go", color: "#34d399" },
  { icon: SiSolidity, label: "Solidity", color: "#a78bfa" },
];

const avatarColors = [
  "linear-gradient(135deg,#7c3aed,#4f46e5)",
  "linear-gradient(135deg,#0891b2,#0d9488)",
  "linear-gradient(135deg,#e11d48,#f59e0b)",
  "linear-gradient(135deg,#4f46e5,#0891b2)",
];

const stats = [
  { value: "12k+", label: "Developers" },
  { value: "3.4k", label: "Matches Made" },
  { value: "820+", label: "Projects Launched" },
];

/* ─── Animation variants ──────────────────────────────────── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay },
});

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ─── Component ───────────────────────────────────────────── */
function Landing() {
  return (
    <div
      className="min-h-screen flex flex-col overflow-x-hidden"
      style={{ background: "#080810", fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Google Font */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=Syne:wght@700;800&display=swap');
        .font-display { font-family: 'Syne', sans-serif; }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes pulse-slow { 0%,100%{opacity:0.4} 50%{opacity:0.7} }
        .float { animation: float 5s ease-in-out infinite; }
        .pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
        .card-rotate:hover { transform: translateY(-4px) rotate(1deg); }
        .card-rotate { transition: transform 0.3s ease; }
      `}</style>

      {/* ── Ambient background ── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, #7c3aed 0%, transparent 65%)",
            filter: "blur(90px)",
          }}
        />
        <div
          className="absolute top-32 right-0 w-[400px] h-[400px] rounded-full opacity-15"
          style={{
            background: "radial-gradient(circle, #0891b2 0%, transparent 65%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-[500px] h-[400px] rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, #e11d48 0%, transparent 65%)",
            filter: "blur(100px)",
          }}
        />
        {/* dot grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #a5b4fc 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      {/* ══════════════════════════════════════════════
          NAVBAR
      ══════════════════════════════════════════════ */}
      <motion.nav
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-50 sticky top-0"
        style={{
          background: "rgba(8,8,16,0.8)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group select-none">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
              style={{
                background:
                  "linear-gradient(135deg, #7c3aed, #4f46e5, #0d9488)",
                boxShadow: "0 0 16px rgba(124,58,237,0.5)",
              }}
            >
              <HiSparkles className="text-white text-sm" />
            </div>
            <span
              className="font-display text-lg font-bold"
              style={{
                background: "linear-gradient(90deg, #e2e8f0, #a5b4fc, #67e8f9)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              DevTinder
            </span>
          </Link>

          {/* Nav actions */}
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="text-sm font-medium px-4 py-2 rounded-xl transition-all duration-200"
              style={{ color: "rgba(148,163,184,0.8)" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#e2e8f0";
                e.currentTarget.style.background = "rgba(255,255,255,0.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "rgba(148,163,184,0.8)";
                e.currentTarget.style.background = "transparent";
              }}
            >
              Login
            </Link>
            <Link to="/signup">
              <motion.div
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-xl"
                style={{
                  background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
                  boxShadow:
                    "0 0 20px rgba(124,58,237,0.35), inset 0 1px 0 rgba(255,255,255,0.1)",
                  color: "#fff",
                }}
              >
                Get Started
                <HiArrowRight className="text-xs" />
              </motion.div>
            </Link>
          </div>
        </div>

        {/* Bottom shimmer */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(124,58,237,0.5), rgba(99,102,241,0.4), rgba(13,148,136,0.3), transparent)",
          }}
        />
      </motion.nav>

      {/* ══════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════ */}
      <section className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 pt-24 pb-16">
        {/* Eyebrow badge */}
        <motion.div {...fadeUp(0.1)}>
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-8"
            style={{
              background: "rgba(124,58,237,0.12)",
              border: "1px solid rgba(124,58,237,0.3)",
              color: "#a78bfa",
            }}
          >
            <BsStars className="text-xs" />
            Developer matchmaking, reimagined
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h2
          {...fadeUp(0.18)}
          className="font-display text-5xl sm:text-6xl md:text-7xl font-extrabold leading-[1.05] mb-6 max-w-3xl"
        >
          <span style={{ color: "#f1f5f9" }}>Find Developers.</span>
          <br />
          <span
            style={{
              background:
                "linear-gradient(90deg, #a78bfa 0%, #818cf8 40%, #38bdf8 80%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Build Startups.
          </span>
        </motion.h2>

        {/* Sub-headline */}
        <motion.p
          {...fadeUp(0.26)}
          className="text-base sm:text-lg max-w-xl mb-10 leading-relaxed"
          style={{ color: "rgba(148,163,184,0.75)" }}
        >
          DevTinder helps developers discover collaborators for projects,
          startups, and open source. Swipe, match, and ship — together.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          {...fadeUp(0.34)}
          className="flex flex-wrap items-center justify-center gap-3 mb-16"
        >
          <Link to="/signup">
            <motion.div
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 32px rgba(124,58,237,0.5)",
              }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2.5 px-7 py-3.5 rounded-2xl text-sm font-bold"
              style={{
                background:
                  "linear-gradient(135deg, #7c3aed 0%, #4f46e5 60%, #0891b2 100%)",
                boxShadow:
                  "0 0 24px rgba(124,58,237,0.35), inset 0 1px 0 rgba(255,255,255,0.12)",
                color: "#fff",
              }}
            >
              <TbRocket className="text-base" />
              Start Building
            </motion.div>
          </Link>
          <Link to="/login">
            <motion.div
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2.5 px-7 py-3.5 rounded-2xl text-sm font-semibold"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(203,213,225,0.85)",
              }}
            >
              <TbBrandGithub className="text-base" />
              Continue with GitHub
            </motion.div>
          </Link>
        </motion.div>

        {/* ── Floating dev card mockup ── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-sm mx-auto float"
        >
          {/* Glow behind card */}
          <div
            className="absolute inset-0 rounded-3xl blur-2xl pulse-slow"
            style={{
              background:
                "linear-gradient(135deg, rgba(124,58,237,0.25), rgba(8,145,178,0.2))",
              transform: "scale(1.08)",
            }}
          />

          {/* The card */}
          <div
            className="relative rounded-3xl p-6 text-left"
            style={{
              background:
                "linear-gradient(160deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 100%)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow:
                "0 24px 64px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)",
            }}
          >
            {/* Card top */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-2xl"
                  style={{
                    background: "linear-gradient(135deg,#7c3aed,#0891b2)",
                    boxShadow: "0 0 16px rgba(124,58,237,0.4)",
                  }}
                />
                <div>
                  <p
                    className="text-sm font-semibold"
                    style={{ color: "#f1f5f9" }}
                  >
                    Alex Chen
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: "rgba(148,163,184,0.6)" }}
                  >
                    Full-Stack · San Francisco
                  </p>
                </div>
              </div>
              <div
                className="w-2 h-2 rounded-full"
                style={{ background: "#22c55e", boxShadow: "0 0 8px #22c55e" }}
              />
            </div>
            {/* Bio */}
            <p
              className="text-xs leading-relaxed mb-4"
              style={{ color: "rgba(148,163,184,0.7)" }}
            >
              Building a B2B SaaS for dev teams. Looking for a co-founder with
              ML experience. YC alum.
            </p>
            {/* Tech pills */}
            <div className="flex flex-wrap gap-1.5 mb-5">
              {[
                { icon: SiReact, label: "React", c: "#38bdf8" },
                { icon: SiTypescript, label: "TypeScript", c: "#60a5fa" },
                { icon: SiGo, label: "Go", c: "#34d399" },
              ].map(({ icon: Icon, label, c }) => (
                <span
                  key={label}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium"
                  style={{
                    background: `${c}14`,
                    border: `1px solid ${c}28`,
                    color: c,
                  }}
                >
                  <Icon style={{ fontSize: "10px" }} />
                  {label}
                </span>
              ))}
            </div>
            {/* Action buttons */}
            <div className="flex gap-2">
              <div
                className="flex-1 text-center py-2 rounded-xl text-xs font-semibold cursor-pointer"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "rgba(148,163,184,0.7)",
                }}
              >
                Pass
              </div>
              <div
                className="flex-1 text-center py-2 rounded-xl text-xs font-semibold cursor-pointer"
                style={{
                  background: "linear-gradient(135deg,#7c3aed,#4f46e5)",
                  color: "#fff",
                  boxShadow: "0 0 12px rgba(124,58,237,0.4)",
                }}
              >
                ✦ Connect
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats row */}
        <motion.div {...fadeUp(0.6)} className="flex items-center gap-8 mt-14">
          {stats.map(({ value, label }, i) => (
            <div key={i} className="text-center">
              <p
                className="font-display text-2xl font-bold"
                style={{ color: "#e2e8f0" }}
              >
                {value}
              </p>
              <p className="text-xs" style={{ color: "rgba(100,116,139,0.7)" }}>
                {label}
              </p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════
          TECH PILLS TICKER
      ══════════════════════════════════════════════ */}
      <section
        className="relative z-10 py-8 overflow-hidden"
        style={{
          borderTop: "1px solid rgba(255,255,255,0.05)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div className="flex items-center gap-4 flex-wrap justify-center px-6">
          <span
            className="text-xs font-semibold uppercase tracking-widest mr-4"
            style={{ color: "rgba(100,116,139,0.5)" }}
          >
            Popular Stacks
          </span>
          {techPills.map(({ icon: Icon, label, color }) => (
            <motion.div
              key={label}
              whileHover={{ scale: 1.08, y: -2 }}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-all duration-200"
              style={{
                background: `${color}10`,
                border: `1px solid ${color}25`,
                color,
              }}
            >
              <Icon style={{ fontSize: "12px" }} />
              {label}
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          FEATURES
      ══════════════════════════════════════════════ */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-16"
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-5"
              style={{
                background: "rgba(13,148,136,0.1)",
                border: "1px solid rgba(13,148,136,0.25)",
                color: "#2dd4bf",
              }}
            >
              <TbCode className="text-xs" />
              How it works
            </div>
            <h3
              className="font-display text-4xl sm:text-5xl font-extrabold mb-4"
              style={{ color: "#f1f5f9" }}
            >
              Built for builders.
            </h3>
            <p
              className="text-sm max-w-md mx-auto"
              style={{ color: "rgba(148,163,184,0.65)" }}
            >
              Three steps from solo developer to founding team.
            </p>
          </motion.div>

          {/* Feature cards */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {features.map(({ icon: Icon, color, glow, title, desc }, i) => (
              <motion.div key={i} variants={staggerItem}>
                <div
                  className="relative rounded-2xl p-6 h-full card-rotate"
                  style={{
                    background:
                      "linear-gradient(160deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    boxShadow:
                      "0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `${color}35`;
                    e.currentTarget.style.boxShadow = `0 8px 32px rgba(0,0,0,0.4), 0 0 24px ${glow}, inset 0 1px 0 rgba(255,255,255,0.07)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor =
                      "rgba(255,255,255,0.07)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)";
                  }}
                >
                  {/* Step number */}
                  <span
                    className="absolute top-5 right-5 font-display text-5xl font-black opacity-[0.06]"
                    style={{ color }}
                  >
                    {i + 1}
                  </span>
                  {/* Icon */}
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
                    style={{
                      background: `${color}18`,
                      border: `1px solid ${color}30`,
                      boxShadow: `0 0 16px ${glow}`,
                    }}
                  >
                    <Icon style={{ fontSize: "18px", color }} />
                  </div>
                  <h4
                    className="font-semibold text-base mb-2"
                    style={{ color: "#e2e8f0" }}
                  >
                    {title}
                  </h4>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "rgba(148,163,184,0.6)" }}
                  >
                    {desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          CTA BANNER
      ══════════════════════════════════════════════ */}
      <section className="relative z-10 py-20 px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl mx-auto text-center relative"
        >
          {/* Glow */}
          <div
            className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-40 rounded-full blur-3xl opacity-20"
            style={{ background: "linear-gradient(90deg, #7c3aed, #0891b2)" }}
          />

          <div
            className="relative rounded-3xl p-10"
            style={{
              background:
                "linear-gradient(135deg, rgba(124,58,237,0.1) 0%, rgba(79,70,229,0.07) 50%, rgba(13,148,136,0.08) 100%)",
              border: "1px solid rgba(124,58,237,0.2)",
              boxShadow:
                "0 0 40px rgba(124,58,237,0.1), inset 0 1px 0 rgba(255,255,255,0.06)",
            }}
          >
            {/* Avatars */}
            <div className="flex items-center justify-center mb-6">
              <div className="flex -space-x-2">
                {avatarColors.map((bg, i) => (
                  <div
                    key={i}
                    className="w-9 h-9 rounded-full border-2"
                    style={{
                      background: bg,
                      borderColor: "#080810",
                      zIndex: 4 - i,
                    }}
                  />
                ))}
              </div>
              <span
                className="ml-3 text-sm"
                style={{ color: "rgba(148,163,184,0.7)" }}
              >
                Join <strong style={{ color: "#e2e8f0" }}>12,000+</strong>{" "}
                developers
              </span>
            </div>

            <h3
              className="font-display text-3xl sm:text-4xl font-extrabold mb-3"
              style={{ color: "#f1f5f9" }}
            >
              Your co-founder is waiting.
            </h3>
            <p
              className="text-sm mb-8 max-w-sm mx-auto leading-relaxed"
              style={{ color: "rgba(148,163,184,0.65)" }}
            >
              Stop building alone. Create your profile, showcase your stack, and
              start matching with developers who share your vision.
            </p>

            <Link to="/signup">
              <motion.div
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 40px rgba(124,58,237,0.55)",
                }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-2xl text-sm font-bold"
                style={{
                  background:
                    "linear-gradient(135deg, #7c3aed, #4f46e5, #0891b2)",
                  boxShadow:
                    "0 0 24px rgba(124,58,237,0.4), inset 0 1px 0 rgba(255,255,255,0.12)",
                  color: "#fff",
                }}
              >
                <HiSparkles className="text-sm" />
                Create Your Profile — Free
                <HiArrowRight className="text-xs" />
              </motion.div>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════════ */}
      <footer
        className="relative z-10 py-8 px-6"
        style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
      >
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded-lg flex items-center justify-center"
              style={{ background: "linear-gradient(135deg,#7c3aed,#0d9488)" }}
            >
              <HiSparkles className="text-white text-[10px]" />
            </div>
            <span
              className="text-sm font-semibold"
              style={{ color: "rgba(148,163,184,0.5)" }}
            >
              DevTinder
            </span>
          </div>
          <p className="text-xs" style={{ color: "rgba(100,116,139,0.4)" }}>
            © 2025 DevTinder. Built by developers, for developers.
          </p>
          <div className="flex gap-5">
            {["Privacy", "Terms", "GitHub"].map((item) => (
              <span
                key={item}
                className="text-xs cursor-pointer transition-colors duration-150 hover:text-slate-300"
                style={{ color: "rgba(100,116,139,0.5)" }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Landing;
