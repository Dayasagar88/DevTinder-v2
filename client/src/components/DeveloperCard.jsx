import { motion, useMotionValue, useTransform } from "framer-motion";
import { HiXMark, HiHeart } from "react-icons/hi2";
import { TbStar } from "react-icons/tb";
import {
  SiReact,
  SiNodedotjs,
  SiMongodb,
  SiTypescript,
  SiPython,
  SiGo,
  SiRust,
  SiSolidity,
} from "react-icons/si";

/* ── Skill → brand icon + color ──────────────────────────── */
const SKILL_META = {
  react: { icon: SiReact, color: "#38bdf8" },
  node: { icon: SiNodedotjs, color: "#4ade80" },
  nodejs: { icon: SiNodedotjs, color: "#4ade80" },
  mongodb: { icon: SiMongodb, color: "#4ade80" },
  typescript: { icon: SiTypescript, color: "#60a5fa" },
  python: { icon: SiPython, color: "#facc15" },
  go: { icon: SiGo, color: "#34d399" },
  rust: { icon: SiRust, color: "#fb923c" },
  solidity: { icon: SiSolidity, color: "#a78bfa" },
};

/* ── Skill pill ───────────────────────────────────────────── */
function SkillPill({ skill }) {
  const meta = SKILL_META[skill.toLowerCase()];
  const Icon = meta?.icon;
  const color = meta?.color ?? "#94a3b8";
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium"
      style={{
        background: `${color}14`,
        border: `1px solid ${color}28`,
        color,
      }}
    >
      {Icon && <Icon style={{ fontSize: "10px" }} />}
      {skill}
    </span>
  );
}

/* ── Action button ────────────────────────────────────────── */
const BTN = {
  pass: {
    base: {
      background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(255,255,255,0.1)",
      color: "rgba(148,163,184,0.8)",
    },
    hover: {
      background: "rgba(225,29,72,0.12)",
      borderColor: "rgba(225,29,72,0.4)",
      color: "#fb7185",
    },
    hoverShadow: "0 0 20px rgba(225,29,72,0.2)",
  },
  connect: {
    base: {
      background: "linear-gradient(135deg,#7c3aed,#4f46e5)",
      border: "1px solid rgba(124,58,237,0.4)",
      color: "#fff",
    },
    hoverShadow: "0 0 28px rgba(124,58,237,0.55)",
  },
  super: {
    base: {
      background: "rgba(251,191,36,0.08)",
      border: "1px solid rgba(251,191,36,0.25)",
      color: "#fbbf24",
    },
    hover: { background: "rgba(251,191,36,0.15)" },
    hoverShadow: "0 0 20px rgba(251,191,36,0.25)",
  },
};

function ActionButton({ variant, onClick, children, wide }) {
  const s = BTN[variant];
  return (
    <motion.button
      whileHover={{ scale: 1.08, boxShadow: s.hoverShadow }}
      whileTap={{ scale: 0.93 }}
      onClick={onClick}
      className="flex items-center justify-center gap-2 rounded-2xl font-semibold text-sm transition-colors duration-200"
      style={{
        ...s.base,
        height: "48px",
        padding: wide ? "0 1.75rem" : "0",
        width: wide ? "auto" : "48px",
        flexShrink: 0,
      }}
      onMouseEnter={(e) => {
        if (s.hover?.background)
          e.currentTarget.style.background = s.hover.background;
        if (s.hover?.borderColor)
          e.currentTarget.style.borderColor = s.hover.borderColor;
        if (s.hover?.color) e.currentTarget.style.color = s.hover.color;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = s.base.background;
        e.currentTarget.style.borderColor = "";
        e.currentTarget.style.color = s.base.color;
      }}
    >
      {children}
    </motion.button>
  );
}

/* ── Main card ────────────────────────────────────────────── */
function DeveloperCard({ user }) {
  const { firstName, headline, profilePhoto, skills = [] } = user;

  /* Drag physics */
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-220, 220], [-18, 18]);
  const cardOpac = useTransform(x, [-220, -120, 0, 120, 220], [0, 1, 1, 1, 0]);

  /* Stamp opacities */
  const likeOpac = useTransform(x, [30, 110], [0, 1]);
  const passOpac = useTransform(x, [-110, -30], [1, 0]);

  const handleDragEnd = (_, info) => {
    // In a real app: call pass/like callbacks here
  };

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.85}
      onDragEnd={handleDragEnd}
      style={{
        x,
        rotate,
        opacity: cardOpac,
        cursor: "grab",
        touchAction: "none",
      }}
      whileDrag={{ cursor: "grabbing", scale: 1.03 }}
      className="relative select-none"
    >
      <div
        className="w-80 rounded-3xl overflow-hidden"
        style={{
          background:
            "linear-gradient(160deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 100%)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow:
            "0 24px 64px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.08)",
        }}
      >
        {/* Top shimmer accent */}
        <div
          className="h-px w-full"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(124,58,237,0.7), rgba(13,148,136,0.5), transparent)",
          }}
        />

        {/* ── Photo section ── */}
        <div className="relative h-56 overflow-hidden">
          <img
            src={profilePhoto}
            alt={firstName}
            className="w-full h-full object-cover"
            draggable={false}
          />

          {/* Photo gradient */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, rgba(8,8,16,0.72) 100%)",
            }}
          />

          {/* CONNECT stamp */}
          <motion.div
            className="absolute top-5 left-5 px-3 py-1.5 rounded-xl border-2 font-black text-sm uppercase tracking-wider pointer-events-none"
            style={{
              opacity: likeOpac,
              borderColor: "#4ade80",
              color: "#4ade80",
              background: "rgba(74,222,128,0.12)",
              rotate: "-12deg",
            }}
          >
            ✓ Connect
          </motion.div>

          {/* PASS stamp */}
          <motion.div
            className="absolute top-5 right-5 px-3 py-1.5 rounded-xl border-2 font-black text-sm uppercase tracking-wider pointer-events-none"
            style={{
              opacity: passOpac,
              borderColor: "#fb7185",
              color: "#fb7185",
              background: "rgba(251,113,133,0.12)",
              rotate: "12deg",
            }}
          >
            ✕ Pass
          </motion.div>

          {/* Online dot */}
          <div
            className="absolute top-4 right-4 w-3 h-3 rounded-full"
            style={{
              background: "#22c55e",
              boxShadow: "0 0 8px #22c55e, 0 0 18px rgba(34,197,94,0.5)",
            }}
          />

          {/* Name / headline over photo */}
          <div className="absolute bottom-4 left-5 right-5">
            <h3
              className="text-xl font-bold leading-tight"
              style={{
                color: "#f1f5f9",
                fontFamily: "'Syne', sans-serif",
                textShadow: "0 2px 12px rgba(0,0,0,0.5)",
              }}
            >
              {firstName}
            </h3>
            <p
              className="text-sm mt-0.5"
              style={{ color: "rgba(203,213,225,0.75)" }}
            >
              {headline}
            </p>
          </div>
        </div>

        {/* ── Card body ── */}
        <div className="p-5">
          {/* Skills */}
          {skills.length > 0 && (
            <div className="mb-5">
              <p
                className="text-[10px] font-semibold uppercase tracking-widest mb-2"
                style={{ color: "rgba(100,116,139,0.5)" }}
              >
                Stack
              </p>
              <div className="flex flex-wrap gap-1.5">
                {skills.map((skill) => (
                  <SkillPill key={skill} skill={skill} />
                ))}
              </div>
            </div>
          )}

          {/* Divider */}
          <div
            className="h-px mb-5"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)",
            }}
          />

          {/* Action buttons */}
          <div className="flex items-center justify-between gap-3">
            <ActionButton variant="pass" onClick={() => {}}>
              <HiXMark style={{ fontSize: "20px" }} />
            </ActionButton>

            <ActionButton variant="connect" onClick={() => {}} wide>
              <HiHeart style={{ fontSize: "16px" }} />
              Connect
            </ActionButton>

            <ActionButton variant="super" onClick={() => {}}>
              <TbStar style={{ fontSize: "20px" }} />
            </ActionButton>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default DeveloperCard;
