import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineMapPin,
  HiOutlinePencilSquare,
  HiArrowTopRightOnSquare,
  HiXMark,
  HiCheck,
  HiOutlineXCircle,
} from "react-icons/hi2";
import {
  TbBrandGithub,
  TbWorldWww,
  TbBriefcase,
  TbCalendar,
} from "react-icons/tb";
import { BsStars } from "react-icons/bs";
import {
  SiReact,
  SiNodedotjs,
  SiMongodb,
  SiTypescript,
  SiPython,
  SiGo,
  SiRust,
  SiSolidity,
  SiNextdotjs,
  SiTailwindcss,
  SiDocker,
  SiGraphql,
} from "react-icons/si";
import api from "../axios/axios";

/* ─── Schema-accurate enums ───────────────────────────────── */
const EXPERIENCE_LEVELS = ["Beginner", "Intermediate", "Advanced"];

const LOOKING_FOR_OPTIONS = [
  "Project Collaboration",
  "Startup Co-founder",
  "Learning Partner",
  "Networking",
  "Job Opportunities",
];

/* ─── Skill icon/color map ────────────────────────────────── */
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
  next: { icon: SiNextdotjs, color: "#e2e8f0" },
  nextjs: { icon: SiNextdotjs, color: "#e2e8f0" },
  tailwind: { icon: SiTailwindcss, color: "#38bdf8" },
  docker: { icon: SiDocker, color: "#60a5fa" },
  graphql: { icon: SiGraphql, color: "#f472b6" },
};

const LEVEL_META = {
  beginner: { color: "#4ade80" },
  intermediate: { color: "#60a5fa" },
  advanced: { color: "#a78bfa" },
};

/* ─── Small view-mode components ──────────────────────────── */
function Tag({ label, tint }) {
  const meta = SKILL_META[label.toLowerCase()];
  const Icon = meta?.icon;
  const color = meta?.color ?? tint ?? "#94a3b8";
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
      {label}
    </span>
  );
}

function SectionLabel({ title }) {
  return (
    <p
      className="text-[10px] font-bold uppercase tracking-widest mb-3"
      style={{ color: "rgba(100,116,139,0.5)" }}
    >
      {title}
    </p>
  );
}

/* ─── Edit-mode field components ──────────────────────────── */
function EditInput({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      {label && (
        <label
          className="block text-xs font-medium mb-1.5"
          style={{ color: "rgba(148,163,184,0.65)" }}
        >
          {label}
        </label>
      )}
      <div
        className="rounded-xl transition-all duration-200"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: `1px solid ${focused ? "rgba(124,58,237,0.5)" : "rgba(255,255,255,0.09)"}`,
          boxShadow: focused
            ? "0 0 0 1px rgba(124,58,237,0.25), 0 0 14px rgba(124,58,237,0.1)"
            : "none",
        }}
      >
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full bg-transparent px-3.5 py-2.5 text-sm outline-none rounded-xl placeholder:text-slate-600"
          style={{ color: "#e2e8f0" }}
        />
      </div>
    </div>
  );
}

function EditTextarea({ label, name, value, onChange, placeholder }) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      {label && (
        <label
          className="block text-xs font-medium mb-1.5"
          style={{ color: "rgba(148,163,184,0.65)" }}
        >
          {label}
        </label>
      )}
      <div
        className="rounded-xl transition-all duration-200"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: `1px solid ${focused ? "rgba(124,58,237,0.5)" : "rgba(255,255,255,0.09)"}`,
          boxShadow: focused
            ? "0 0 0 1px rgba(124,58,237,0.25), 0 0 14px rgba(124,58,237,0.1)"
            : "none",
        }}
      >
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={3}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full bg-transparent px-3.5 py-2.5 text-sm outline-none rounded-xl placeholder:text-slate-600 resize-none"
          style={{ color: "#e2e8f0" }}
        />
      </div>
    </div>
  );
}

function TagInput({ label, value, onChange, placeholder, tint = "#818cf8" }) {
  const [input, setInput] = useState("");
  const [focused, setFocused] = useState(false);
  const uid = label.replace(/\s+/g, "-");

  const add = () => {
    const v = input.trim();
    if (v && !value.includes(v)) onChange([...value, v]);
    setInput("");
  };
  const remove = (item) => onChange(value.filter((s) => s !== item));
  const handleKey = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      add();
    }
    if (e.key === "Backspace" && !input && value.length)
      remove(value[value.length - 1]);
  };

  return (
    <div>
      {label && (
        <label
          className="block text-xs font-medium mb-1.5"
          style={{ color: "rgba(148,163,184,0.65)" }}
        >
          {label}
        </label>
      )}
      <div
        className="rounded-xl px-3 py-2 flex flex-wrap gap-1.5 min-h-[44px] cursor-text transition-all duration-200"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: `1px solid ${focused ? "rgba(124,58,237,0.5)" : "rgba(255,255,255,0.09)"}`,
          boxShadow: focused
            ? "0 0 0 1px rgba(124,58,237,0.25), 0 0 14px rgba(124,58,237,0.1)"
            : "none",
        }}
        onClick={() => document.getElementById(uid)?.focus()}
      >
        {value.map((item) => (
          <span
            key={item}
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium"
            style={{
              background: `${tint}18`,
              border: `1px solid ${tint}30`,
              color: tint,
            }}
          >
            {item}
            <button
              type="button"
              onClick={() => remove(item)}
              className="opacity-50 hover:opacity-100 transition-opacity"
            >
              <HiXMark style={{ fontSize: "10px" }} />
            </button>
          </span>
        ))}
        <input
          id={uid}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          onBlur={() => {
            setFocused(false);
            if (input.trim()) add();
          }}
          onFocus={() => setFocused(true)}
          placeholder={value.length === 0 ? placeholder : ""}
          className="bg-transparent outline-none text-sm flex-1 min-w-[80px] placeholder:text-slate-600"
          style={{ color: "#e2e8f0" }}
        />
      </div>
      <p
        className="text-[10px] mt-1"
        style={{ color: "rgba(100,116,139,0.4)" }}
      >
        Press Enter or comma to add
      </p>
    </div>
  );
}

/* Looking For — multi-select toggle buttons using exact schema enums */
function LookingForSelect({ value, onChange }) {
  const toggle = (opt) => {
    if (value.includes(opt)) onChange(value.filter((v) => v !== opt));
    else onChange([...value, opt]);
  };
  return (
    <div className="flex flex-wrap gap-2">
      {LOOKING_FOR_OPTIONS.map((opt) => {
        const active = value.includes(opt);
        return (
          <motion.button
            key={opt}
            type="button"
            whileTap={{ scale: 0.95 }}
            onClick={() => toggle(opt)}
            className="px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200"
            style={{
              background: active
                ? "rgba(13,148,136,0.15)"
                : "rgba(255,255,255,0.04)",
              border: active
                ? "1px solid rgba(13,148,136,0.4)"
                : "1px solid rgba(255,255,255,0.08)",
              color: active ? "#2dd4bf" : "rgba(148,163,184,0.6)",
            }}
          >
            {active && "✓ "}
            {opt}
          </motion.button>
        );
      })}
    </div>
  );
}

/* Experience level — single-select toggle buttons */
function ExperienceSelect({ value, onChange }) {
  const meta = {
    Beginner: "#4ade80",
    Intermediate: "#60a5fa",
    Advanced: "#a78bfa",
  };
  return (
    <div className="flex gap-2">
      {EXPERIENCE_LEVELS.map((lvl) => {
        const active = value === lvl;
        const color = meta[lvl];
        return (
          <motion.button
            key={lvl}
            type="button"
            whileTap={{ scale: 0.95 }}
            onClick={() => onChange(lvl)}
            className="flex-1 py-2 rounded-xl text-xs font-semibold transition-all duration-200"
            style={{
              background: active ? `${color}18` : "rgba(255,255,255,0.04)",
              border: active
                ? `1px solid ${color}40`
                : "1px solid rgba(255,255,255,0.08)",
              color: active ? color : "rgba(148,163,184,0.6)",
            }}
          >
            {lvl}
          </motion.button>
        );
      })}
    </div>
  );
}

/* ─── Animation variants ───────────────────────────────────── */
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ════════════════════════════════════════════════════════════
   PROFILE PAGE
════════════════════════════════════════════════════════════ */
function Profile() {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/user/profile");
        setUser(res.data.user);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProfile();
  }, []);

  /* Open edit mode — pre-fill form from current user */
  const startEditing = () => {
    setForm({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      headline: user.headline || "",
      bio: user.bio || "",
      profilePhoto: user.profilePhoto || "",
      location: user.location || "",
      skills: user.skills || [],
      techStack: user.techStack || [],
      experienceLevel: user.experienceLevel || "Beginner",
      yearsOfExperience: user.yearsOfExperience || 0,
      githubUrl: user.githubUrl || "",
      portfolioUrl: user.portfolioUrl || "",
      lookingFor: user.lookingFor || [],
    });
    setError("");
    setSuccess(false);
    setEditing(true);
  };

  const cancelEditing = () => {
    setEditing(false);
    setError("");
  };

  const handleChange = (e) => {
    setError("");
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    setLoading(true);
    setError("");
    try {
      // ← Replace with your actual endpoint
      const res = await api.post("/user/update-profile", form);
      setUser(res.data.user);
      setSuccess(true);
      setTimeout(() => {
        setEditing(false);
        setSuccess(false);
      }, 900);
    } catch (err) {
      setError(err.response?.data?.message || "Update failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  /* ── Loading state ── */
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
        <div
          className="w-10 h-10 rounded-2xl flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg,#7c3aed,#4f46e5,#0d9488)",
            boxShadow: "0 0 20px rgba(124,58,237,0.4)",
          }}
        >
          <BsStars className="text-white text-sm animate-pulse" />
        </div>
        <p className="text-sm" style={{ color: "rgba(100,116,139,0.5)" }}>
          Loading profile…
        </p>
      </div>
    );
  }

  const levelMeta = LEVEL_META[(user.experienceLevel || "").toLowerCase()] ?? {
    color: "#94a3b8",
  };

  /* ══════════════════════════════════════════════════════════
     VIEW MODE
  ══════════════════════════════════════════════════════════ */
  if (!editing) {
    return (
      <div
        className="flex justify-center px-4 py-6"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&family=Syne:wght@700;800&display=swap');`}</style>

        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="w-full max-w-[540px] flex flex-col gap-4"
        >
          {/* Hero */}
          <motion.div
            variants={fadeUp}
            className="relative rounded-3xl overflow-hidden"
            style={{
              background:
                "linear-gradient(160deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 100%)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.09)",
              boxShadow:
                "0 16px 48px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.07)",
            }}
          >
            <div
              className="h-px w-full"
              style={{
                background:
                  "linear-gradient(90deg,transparent,rgba(124,58,237,0.7),rgba(13,148,136,0.5),transparent)",
              }}
            />
            {/* Cover */}
            <div
              className="h-24 w-full relative"
              style={{
                background:
                  "linear-gradient(135deg,rgba(124,58,237,0.25),rgba(79,70,229,0.2),rgba(13,148,136,0.15))",
              }}
            >
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, #a5b4fc 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              />
            </div>

            <div className="px-6 pb-6">
              <div className="flex items-end justify-between -mt-12 mb-4">
                {/* Avatar */}
                <div className="relative">
                  <div
                    className="w-20 h-20 rounded-2xl overflow-hidden"
                    style={{
                      border: "3px solid #080810",
                      boxShadow:
                        "0 0 0 1px rgba(124,58,237,0.4), 0 0 20px rgba(124,58,237,0.25)",
                    }}
                  >
                    <img
                      src={
                        user.profilePhoto ||
                        `https://api.dicebear.com/7.x/initials/svg?seed=${user.firstName}`
                      }
                      alt={user.firstName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span
                    className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full"
                    style={{
                      background: "#22c55e",
                      border: "2px solid #080810",
                      boxShadow: "0 0 8px #22c55e",
                    }}
                  />
                </div>
                {/* Edit button */}
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 20px rgba(124,58,237,0.5)",
                  }}
                  whileTap={{ scale: 0.96 }}
                  onClick={startEditing}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold"
                  style={{
                    background: "linear-gradient(135deg,#7c3aed,#4f46e5)",
                    boxShadow:
                      "0 0 16px rgba(124,58,237,0.35), inset 0 1px 0 rgba(255,255,255,0.12)",
                    color: "#fff",
                  }}
                >
                  <HiOutlinePencilSquare className="text-sm" />
                  Edit Profile
                </motion.button>
              </div>

              <h2
                className="text-2xl font-bold"
                style={{ color: "#f1f5f9", fontFamily: "'Syne',sans-serif" }}
              >
                {user.firstName} {user.lastName}
              </h2>
              <p
                className="text-sm mt-1"
                style={{ color: "rgba(148,163,184,0.75)" }}
              >
                {user.headline || "Developer"}
              </p>

              <div className="flex flex-wrap items-center gap-3 mt-3">
                {user.location && (
                  <span
                    className="flex items-center gap-1.5 text-xs"
                    style={{ color: "rgba(100,116,139,0.7)" }}
                  >
                    <HiOutlineMapPin className="text-xs" />
                    {user.location}
                  </span>
                )}
                {user.experienceLevel && (
                  <span
                    className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg text-xs font-semibold"
                    style={{
                      background: `${levelMeta.color}14`,
                      border: `1px solid ${levelMeta.color}30`,
                      color: levelMeta.color,
                    }}
                  >
                    <TbBriefcase className="text-xs" />
                    {user.experienceLevel}
                  </span>
                )}
                {user.yearsOfExperience > 0 && (
                  <span
                    className="flex items-center gap-1.5 text-xs"
                    style={{ color: "rgba(100,116,139,0.6)" }}
                  >
                    <TbCalendar className="text-xs" />
                    {user.yearsOfExperience} yrs exp
                  </span>
                )}
              </div>
            </div>
          </motion.div>

          {/* Bio */}
          {user.bio && (
            <motion.div
              variants={fadeUp}
              className="rounded-2xl p-5"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <SectionLabel title="About" />
              <p
                className="text-sm leading-relaxed"
                style={{ color: "rgba(148,163,184,0.75)" }}
              >
                {user.bio}
              </p>
            </motion.div>
          )}

          {/* Skills + Stack + Looking For */}
          <motion.div
            variants={fadeUp}
            className="rounded-2xl p-5 flex flex-col gap-5"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <div>
              <SectionLabel title="Skills" />
              {user.skills?.length > 0 ? (
                <div className="flex flex-wrap gap-1.5">
                  {user.skills.map((s) => (
                    <Tag key={s} label={s} tint="#818cf8" />
                  ))}
                </div>
              ) : (
                <p
                  className="text-xs"
                  style={{ color: "rgba(100,116,139,0.45)" }}
                >
                  No skills added.
                </p>
              )}
            </div>
            <div
              className="h-px"
              style={{ background: "rgba(255,255,255,0.06)" }}
            />
            <div>
              <SectionLabel title="Tech Stack" />
              {user.techStack?.length > 0 ? (
                <div className="flex flex-wrap gap-1.5">
                  {user.techStack.map((t) => (
                    <Tag key={t} label={t} tint="#a78bfa" />
                  ))}
                </div>
              ) : (
                <p
                  className="text-xs"
                  style={{ color: "rgba(100,116,139,0.45)" }}
                >
                  No tech stack added.
                </p>
              )}
            </div>
            {user.lookingFor?.length > 0 && (
              <>
                <div
                  className="h-px"
                  style={{ background: "rgba(255,255,255,0.06)" }}
                />
                <div>
                  <SectionLabel title="Looking For" />
                  <div className="flex flex-wrap gap-1.5">
                    {user.lookingFor.map((l) => (
                      <Tag key={l} label={l} tint="#2dd4bf" />
                    ))}
                  </div>
                </div>
              </>
            )}
          </motion.div>

          {/* Links */}
          {(user.githubUrl || user.portfolioUrl) && (
            <motion.div
              variants={fadeUp}
              className="rounded-2xl p-5"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <SectionLabel title="Links" />
              <div className="flex flex-col gap-2">
                {user.githubUrl && (
                  <a
                    href={user.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.07)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(124,58,237,0.1)";
                      e.currentTarget.style.borderColor =
                        "rgba(124,58,237,0.3)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background =
                        "rgba(255,255,255,0.03)";
                      e.currentTarget.style.borderColor =
                        "rgba(255,255,255,0.07)";
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{
                          background: "rgba(255,255,255,0.06)",
                          border: "1px solid rgba(255,255,255,0.08)",
                        }}
                      >
                        <TbBrandGithub
                          className="text-sm"
                          style={{ color: "#a5b4fc" }}
                        />
                      </div>
                      <div>
                        <p
                          className="text-xs font-semibold"
                          style={{ color: "#e2e8f0" }}
                        >
                          GitHub
                        </p>
                        <p
                          className="text-[11px]"
                          style={{ color: "rgba(100,116,139,0.6)" }}
                        >
                          {user.githubUrl.replace("https://github.com/", "@")}
                        </p>
                      </div>
                    </div>
                    <HiArrowTopRightOnSquare
                      className="text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ color: "#a5b4fc" }}
                    />
                  </a>
                )}
                {user.portfolioUrl && (
                  <a
                    href={user.portfolioUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.07)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(13,148,136,0.1)";
                      e.currentTarget.style.borderColor =
                        "rgba(13,148,136,0.3)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background =
                        "rgba(255,255,255,0.03)";
                      e.currentTarget.style.borderColor =
                        "rgba(255,255,255,0.07)";
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{
                          background: "rgba(255,255,255,0.06)",
                          border: "1px solid rgba(255,255,255,0.08)",
                        }}
                      >
                        <TbWorldWww
                          className="text-sm"
                          style={{ color: "#2dd4bf" }}
                        />
                      </div>
                      <div>
                        <p
                          className="text-xs font-semibold"
                          style={{ color: "#e2e8f0" }}
                        >
                          Portfolio
                        </p>
                        <p
                          className="text-[11px]"
                          style={{ color: "rgba(100,116,139,0.6)" }}
                        >
                          {user.portfolioUrl.replace(/^https?:\/\//, "")}
                        </p>
                      </div>
                    </div>
                    <HiArrowTopRightOnSquare
                      className="text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ color: "#2dd4bf" }}
                    />
                  </a>
                )}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    );
  }

  /* ══════════════════════════════════════════════════════════
     EDIT MODE
  ══════════════════════════════════════════════════════════ */
  return (
    <div
      className="flex justify-center px-4 py-6"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&family=Syne:wght@700;800&display=swap');`}</style>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-[540px] flex flex-col gap-4"
      >
        {/* Edit header bar */}
        <div className="flex items-center justify-between px-1">
          <div>
            <h2
              className="text-lg font-bold"
              style={{ color: "#f1f5f9", fontFamily: "'Syne',sans-serif" }}
            >
              Edit Profile
            </h2>
            <p
              className="text-xs mt-0.5"
              style={{ color: "rgba(100,116,139,0.55)" }}
            >
              Changes save instantly to your DevTinder profile
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={cancelEditing}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-colors duration-150"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "rgba(148,163,184,0.7)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#fb7185";
              e.currentTarget.style.borderColor = "rgba(225,29,72,0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "rgba(148,163,184,0.7)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
            }}
          >
            <HiOutlineXCircle className="text-sm" /> Cancel
          </motion.button>
        </div>

        {/* ── Basic info card ── */}
        <div
          className="rounded-2xl p-5 flex flex-col gap-4"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <p
            className="text-[10px] font-bold uppercase tracking-widest"
            style={{ color: "rgba(100,116,139,0.5)" }}
          >
            Basic Info
          </p>

          {/* Avatar preview + URL */}
          <div className="flex items-center gap-4">
            <div
              className="w-16 h-16 rounded-2xl overflow-hidden shrink-0"
              style={{
                border: "2px solid rgba(124,58,237,0.3)",
                boxShadow: "0 0 16px rgba(124,58,237,0.2)",
              }}
            >
              <img
                src={
                  form.profilePhoto ||
                  `https://api.dicebear.com/7.x/initials/svg?seed=${form.firstName}`
                }
                alt="preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = `https://api.dicebear.com/7.x/initials/svg?seed=${form.firstName}`;
                }}
              />
            </div>
            <div className="flex-1">
              <EditInput
                name="profilePhoto"
                value={form.profilePhoto}
                onChange={handleChange}
                placeholder="Profile photo URL (https://...)"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <EditInput
              label="First Name"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              placeholder="Alex"
            />
            <EditInput
              label="Last Name"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              placeholder="Chen"
            />
          </div>

          <EditInput
            label="Headline"
            name="headline"
            value={form.headline}
            onChange={handleChange}
            placeholder="Full Stack Dev · Open to co-found"
          />

          <EditInput
            label="Location"
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="San Francisco, CA"
          />

          <EditTextarea
            label="Bio"
            name="bio"
            value={form.bio}
            onChange={handleChange}
            placeholder="Tell developers what you're building and who you're looking for…"
          />
        </div>

        {/* ── Skills & Stack card ── */}
        <div
          className="rounded-2xl p-5 flex flex-col gap-4"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <p
            className="text-[10px] font-bold uppercase tracking-widest"
            style={{ color: "rgba(100,116,139,0.5)" }}
          >
            Skills & Stack
          </p>

          <TagInput
            label="Skills"
            value={form.skills}
            onChange={(v) => setForm((f) => ({ ...f, skills: v }))}
            placeholder="React, Node, Python…"
            tint="#818cf8"
          />

          <TagInput
            label="Tech Stack"
            value={form.techStack}
            onChange={(v) => setForm((f) => ({ ...f, techStack: v }))}
            placeholder="Next.js, Docker, GraphQL…"
            tint="#a78bfa"
          />
        </div>

        {/* ── Experience card ── */}
        <div
          className="rounded-2xl p-5 flex flex-col gap-4"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <p
            className="text-[10px] font-bold uppercase tracking-widest"
            style={{ color: "rgba(100,116,139,0.5)" }}
          >
            Experience
          </p>

          <div>
            <label
              className="block text-xs font-medium mb-2"
              style={{ color: "rgba(148,163,184,0.65)" }}
            >
              Experience Level
            </label>
            <ExperienceSelect
              value={form.experienceLevel}
              onChange={(v) => setForm((f) => ({ ...f, experienceLevel: v }))}
            />
          </div>

          <EditInput
            label="Years of Experience"
            name="yearsOfExperience"
            value={form.yearsOfExperience}
            onChange={handleChange}
            placeholder="3"
            type="number"
          />
        </div>

        {/* ── Looking For card ── */}
        <div
          className="rounded-2xl p-5 flex flex-col gap-3"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <p
            className="text-[10px] font-bold uppercase tracking-widest"
            style={{ color: "rgba(100,116,139,0.5)" }}
          >
            Looking For
          </p>
          <LookingForSelect
            value={form.lookingFor}
            onChange={(v) => setForm((f) => ({ ...f, lookingFor: v }))}
          />
        </div>

        {/* ── Links card ── */}
        <div
          className="rounded-2xl p-5 flex flex-col gap-4"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <p
            className="text-[10px] font-bold uppercase tracking-widest"
            style={{ color: "rgba(100,116,139,0.5)" }}
          >
            Links
          </p>
          <div className="relative">
            <TbBrandGithub
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm pointer-events-none"
              style={{ color: "#a5b4fc" }}
            />
            <div
              className="rounded-xl transition-all duration-200"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.09)",
              }}
            >
              <input
                name="githubUrl"
                value={form.githubUrl}
                onChange={handleChange}
                placeholder="https://github.com/username"
                className="w-full bg-transparent pl-9 pr-3.5 py-2.5 text-sm outline-none rounded-xl placeholder:text-slate-600"
                style={{ color: "#e2e8f0" }}
              />
            </div>
          </div>
          <div className="relative">
            <TbWorldWww
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm pointer-events-none"
              style={{ color: "#2dd4bf" }}
            />
            <div
              className="rounded-xl transition-all duration-200"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.09)",
              }}
            >
              <input
                name="portfolioUrl"
                value={form.portfolioUrl}
                onChange={handleChange}
                placeholder="https://yourportfolio.dev"
                className="w-full bg-transparent pl-9 pr-3.5 py-2.5 text-sm outline-none rounded-xl placeholder:text-slate-600"
                style={{ color: "#e2e8f0" }}
              />
            </div>
          </div>
        </div>

        {/* Error */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -6, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="text-xs px-3 py-2.5 rounded-xl"
              style={{
                background: "rgba(225,29,72,0.1)",
                border: "1px solid rgba(225,29,72,0.25)",
                color: "#fb7185",
              }}
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Save button */}
        <motion.button
          onClick={handleSave}
          disabled={loading || success}
          whileHover={
            !loading && !success
              ? { scale: 1.02, boxShadow: "0 0 28px rgba(124,58,237,0.5)" }
              : {}
          }
          whileTap={!loading && !success ? { scale: 0.98 } : {}}
          className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-2xl text-sm font-bold mb-6"
          style={{
            background: success
              ? "linear-gradient(135deg,#16a34a,#15803d)"
              : "linear-gradient(135deg,#7c3aed,#4f46e5,#0891b2)",
            boxShadow: success
              ? "0 0 20px rgba(22,163,74,0.35)"
              : "0 0 20px rgba(124,58,237,0.3), inset 0 1px 0 rgba(255,255,255,0.12)",
            color: "#fff",
            opacity: loading ? 0.75 : 1,
            cursor: loading || success ? "not-allowed" : "pointer",
            transition: "background 0.4s, box-shadow 0.3s",
          }}
        >
          {success ? (
            <>
              <HiCheck className="text-base" /> Profile Saved!
            </>
          ) : loading ? (
            <>
              <svg
                className="animate-spin w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                />
              </svg>
              Saving…
            </>
          ) : (
            <>
              <HiCheck className="text-sm" /> Save Changes
            </>
          )}
        </motion.button>
      </motion.div>
    </div>
  );
}

export default Profile;
