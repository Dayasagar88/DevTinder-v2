import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiSparkles,
  HiArrowRight,
  HiCheck,
  HiXMark,
  HiOutlineMapPin,
  HiOutlineLink,
  HiPlus,
} from "react-icons/hi2";
import {
  TbBriefcase,
  TbCalendar,
  TbCode,
  TbUpload,
  TbUser,
  TbTarget,
} from "react-icons/tb";
import { BsShieldCheck } from "react-icons/bs";
import {
  SiReact,
  SiNodedotjs,
  SiMongodb,
  SiTypescript,
  SiPython,
  SiGo,
  SiRust,
  SiNextdotjs,
  SiTailwindcss,
  SiDocker,
  SiGraphql,
  SiExpress,
  SiPostgresql,
  SiRedis,
  SiFirebase,
  SiVuedotjs,
  SiAngular,
  SiSolidity,
  SiKubernetes,  
} from "react-icons/si";
import api from "../axios/axios";


/* ─── Schema enums ────────────────────────────────────────── */
const EXPERIENCE_LEVELS = [
  { value: "Beginner", color: "#4ade80", desc: "0 – 2 yrs" },
  { value: "Intermediate", color: "#60a5fa", desc: "2 – 5 yrs" },
  { value: "Advanced", color: "#a78bfa", desc: "5 + yrs" },
];

const LOOKING_FOR_OPTIONS = [
  { label: "Project Collaboration", color: "#38bdf8", emoji: "🛠" },
  { label: "Startup Co-founder", color: "#a78bfa", emoji: "🚀" },
  { label: "Learning Partner", color: "#4ade80", emoji: "📚" },
  { label: "Networking", color: "#fb923c", emoji: "🤝" },
  { label: "Job Opportunities", color: "#f472b6", emoji: "💼" },
];

/* ─── Skill / tech suggestion badges ─────────────────────── */
const SKILL_SUGGESTIONS = [
  { label: "React", icon: SiReact, color: "#38bdf8" },
  { label: "Node.js", icon: SiNodedotjs, color: "#4ade80" },
  { label: "TypeScript", icon: SiTypescript, color: "#60a5fa" },
  { label: "Python", icon: SiPython, color: "#facc15" },
  { label: "Go", icon: SiGo, color: "#34d399" },
  { label: "Rust", icon: SiRust, color: "#fb923c" },
  { label: "Vue.js", icon: SiVuedotjs, color: "#4ade80" },
  { label: "Angular", icon: SiAngular, color: "#fb7185" },
  { label: "Solidity", icon: SiSolidity, color: "#a78bfa" },
];

const TECH_SUGGESTIONS = [
  { label: "Next.js", icon: SiNextdotjs, color: "#e2e8f0" },
  { label: "MongoDB", icon: SiMongodb, color: "#4ade80" },
  { label: "PostgreSQL", icon: SiPostgresql, color: "#60a5fa" },
  { label: "Docker", icon: SiDocker, color: "#38bdf8" },
  { label: "GraphQL", icon: SiGraphql, color: "#f472b6" },
  { label: "Redis", icon: SiRedis, color: "#fb7185" },
  { label: "Firebase", icon: SiFirebase, color: "#fb923c" },
  { label: "Tailwind", icon: SiTailwindcss, color: "#38bdf8" },
  { label: "Express", icon: SiExpress, color: "#94a3b8" },
  { label: "Kubernetes", icon: SiKubernetes, color: "#60a5fa" },
//   { label: "AWS", icon: SiAmazon, color: "#fb923c" },
];

/* ─── Steps ───────────────────────────────────────────────── */
const STEPS = [
  { id: 1, label: "Basic Info", icon: TbUser },
  { id: 2, label: "Skills", icon: TbCode },
  { id: 3, label: "Experience", icon: TbBriefcase },
  { id: 4, label: "Goals & Photo", icon: TbTarget },
];

/* ─── Field wrapper ───────────────────────────────────────── */
function Field({ label, hint, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          className="text-xs font-medium"
          style={{ color: "rgba(148,163,184,0.7)" }}
        >
          {label}
        </label>
      )}
      {children}
      {hint && (
        <p className="text-[10px]" style={{ color: "rgba(100,116,139,0.45)" }}>
          {hint}
        </p>
      )}
    </div>
  );
}

/* ─── Styled input ────────────────────────────────────────── */
function StyledInput({ icon: Icon, isFocused, onFocus, onBlur, ...props }) {
  return (
    <div
      className="relative rounded-xl transition-all duration-200"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: `1px solid ${isFocused ? "rgba(124,58,237,0.5)" : "rgba(255,255,255,0.08)"}`,
        boxShadow: isFocused
          ? "0 0 0 1px rgba(124,58,237,0.25), 0 0 14px rgba(124,58,237,0.1)"
          : "none",
      }}
    >
      {Icon && (
        <Icon
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm pointer-events-none"
          style={{
            color: isFocused ? "#a78bfa" : "rgba(100,116,139,0.55)",
            transition: "color 0.2s",
          }}
        />
      )}
      <input
        {...props}
        onFocus={onFocus}
        onBlur={onBlur}
        className={`w-full bg-transparent ${Icon ? "pl-9" : "pl-3.5"} pr-3.5 py-2.5 text-sm outline-none rounded-xl placeholder:text-slate-600`}
        style={{ color: "#e2e8f0" }}
      />
    </div>
  );
}

/* ─── Styled textarea ─────────────────────────────────────── */
function StyledTextarea({ isFocused, onFocus, onBlur, ...props }) {
  return (
    <div
      className="rounded-xl transition-all duration-200"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: `1px solid ${isFocused ? "rgba(124,58,237,0.5)" : "rgba(255,255,255,0.08)"}`,
        boxShadow: isFocused
          ? "0 0 0 1px rgba(124,58,237,0.25), 0 0 14px rgba(124,58,237,0.1)"
          : "none",
      }}
    >
      <textarea
        {...props}
        rows={3}
        onFocus={onFocus}
        onBlur={onBlur}
        className="w-full bg-transparent px-3.5 py-2.5 text-sm outline-none rounded-xl placeholder:text-slate-600 resize-none"
        style={{ color: "#e2e8f0" }}
      />
    </div>
  );
}

/* ─── Tag input with suggestion badges ───────────────────── */
function TagInput({
  value,
  onChange,
  placeholder,
  tint = "#818cf8",
  suggestions = [],
}) {
  const [input, setInput] = useState("");
  const [focused, setFocused] = useState(false);
  const uid = placeholder.replace(/\s+/g, "-");

  const add = (v) => {
    const trimmed = (typeof v === "string" ? v : input).trim();
    if (trimmed && !value.includes(trimmed)) onChange([...value, trimmed]);
    if (typeof v !== "string") setInput("");
  };
  const remove = (item) => onChange(value.filter((s) => s !== item));
  const handleKey = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      add(input);
    }
    if (e.key === "Backspace" && !input && value.length)
      remove(value[value.length - 1]);
  };

  const unused = suggestions.filter((s) => !value.includes(s.label));

  return (
    <div className="flex flex-col gap-2">
      {/* Input area */}
      <div
        className="rounded-xl px-3 py-2 flex flex-wrap gap-1.5 min-h-[48px] cursor-text transition-all duration-200"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: `1px solid ${focused ? "rgba(124,58,237,0.5)" : "rgba(255,255,255,0.08)"}`,
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
            if (input.trim()) add(input);
          }}
          onFocus={() => setFocused(true)}
          placeholder={value.length === 0 ? placeholder : "Add more…"}
          className="bg-transparent outline-none text-sm flex-1 min-w-[100px] placeholder:text-slate-600"
          style={{ color: "#e2e8f0" }}
        />
      </div>

      {/* Quick-add suggestion badges */}
      {unused.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {unused.slice(0, 8).map(({ label, icon: Icon, color }) => (
            <motion.button
              key={label}
              type="button"
              whileHover={{ scale: 1.06, y: -1 }}
              whileTap={{ scale: 0.94 }}
              onClick={() => add(label)}
              className="inline-flex items-center gap-1.5 px-2 py-1 rounded-lg text-[11px] font-medium transition-all duration-150"
              style={{
                background: `${color}0e`,
                border: `1px solid ${color}22`,
                color: `${color}cc`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = `${color}20`;
                e.currentTarget.style.borderColor = `${color}45`;
                e.currentTarget.style.color = color;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = `${color}0e`;
                e.currentTarget.style.borderColor = `${color}22`;
                e.currentTarget.style.color = `${color}cc`;
              }}
            >
              {Icon && <Icon style={{ fontSize: "10px" }} />}
              {label}
              <HiPlus style={{ fontSize: "9px", opacity: 0.6 }} />
            </motion.button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   COMPLETE PROFILE
═══════════════════════════════════════════════════════════ */
function CompleteProfile() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const [focused, setFocused] = useState("");

  const [form, setForm] = useState({
    headline: "",
    bio: "",
    location: "",
    skills: [],
    techStack: [],
    lookingFor: [],
    experienceLevel: "Beginner",
    yearsOfExperience: "",
    portfolioUrl: "",
  });

  const set = (name, val) => setForm((f) => ({ ...f, [name]: val }));
  const handleChange = (e) => set(e.target.name, e.target.value);

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPhoto(file);
    setPreview(URL.createObjectURL(file));
  };

  const toggleLookingFor = (opt) => {
    set(
      "lookingFor",
      form.lookingFor.includes(opt)
        ? form.lookingFor.filter((v) => v !== opt)
        : [...form.lookingFor, opt],
    );
  };

  const canAdvance = () => {
    if (step === 1)
      return form.headline.trim() && form.bio.trim() && form.location.trim();
    if (step === 2) return form.skills.length > 0 && form.techStack.length > 0;
    if (step === 3) return form.yearsOfExperience !== "";
    if (step === 4) return form.lookingFor.length > 0;
    return true;
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    try {
      const data = new FormData();
      data.append("headline", form.headline);
      data.append("bio", form.bio);
      data.append("location", form.location);
      data.append("skills", JSON.stringify(form.skills));
      data.append("techStack", JSON.stringify(form.techStack));
      data.append("lookingFor", JSON.stringify(form.lookingFor));
      data.append("experienceLevel", form.experienceLevel);
      data.append("yearsOfExperience", form.yearsOfExperience);
      data.append("portfolioUrl", form.portfolioUrl);
      if (photo) data.append("profilePhoto", photo);

      const res = await api.post("/user/complete-profile", data);
      console.log(res.data)
      setSuccess(true);
      setTimeout(() => navigate("/app"), 900);
    } catch (err) {
      console.log(err);
      setError(
        err.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  /* ── Step panels ── */
  const panels = {
    1: (
      <motion.div
        key="s1"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col gap-4"
      >
        <Field label="Headline *">
          <StyledInput
            icon={TbUser}
            type="text"
            name="headline"
            placeholder="e.g. Full Stack Dev · Open to co-found"
            value={form.headline}
            onChange={handleChange}
            isFocused={focused === "headline"}
            onFocus={() => setFocused("headline")}
            onBlur={() => setFocused("")}
            required
          />
        </Field>
        <Field label="Bio *">
          <StyledTextarea
            name="bio"
            placeholder="Tell developers what you're building and who you're looking for…"
            value={form.bio}
            onChange={handleChange}
            isFocused={focused === "bio"}
            onFocus={() => setFocused("bio")}
            onBlur={() => setFocused("")}
            required
          />
        </Field>
        <Field label="Location *">
          <StyledInput
            icon={HiOutlineMapPin}
            type="text"
            name="location"
            placeholder="San Francisco, CA"
            value={form.location}
            onChange={handleChange}
            isFocused={focused === "location"}
            onFocus={() => setFocused("location")}
            onBlur={() => setFocused("")}
            required
          />
        </Field>
      </motion.div>
    ),

    2: (
      <motion.div
        key="s2"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col gap-5"
      >
        <Field
          label="Skills *"
          hint="Click a badge to quick-add, or type and press Enter"
        >
          <TagInput
            value={form.skills}
            onChange={(v) => set("skills", v)}
            placeholder="React, Python…"
            tint="#818cf8"
            suggestions={SKILL_SUGGESTIONS}
          />
        </Field>
        <div
          className="h-px"
          style={{ background: "rgba(255,255,255,0.06)" }}
        />
        <Field
          label="Tech Stack *"
          hint="Click a badge to quick-add, or type and press Enter"
        >
          <TagInput
            value={form.techStack}
            onChange={(v) => set("techStack", v)}
            placeholder="Next.js, Docker…"
            tint="#a78bfa"
            suggestions={TECH_SUGGESTIONS}
          />
        </Field>
      </motion.div>
    ),

    3: (
      <motion.div
        key="s3"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col gap-5"
      >
        <Field label="Experience Level *">
          <div className="grid grid-cols-3 gap-2">
            {EXPERIENCE_LEVELS.map(({ value, color, desc }) => {
              const active = form.experienceLevel === value;
              return (
                <motion.button
                  key={value}
                  type="button"
                  whileTap={{ scale: 0.95 }}
                  onClick={() => set("experienceLevel", value)}
                  className="flex flex-col items-center py-3 px-2 rounded-xl text-xs font-semibold transition-all duration-200"
                  style={{
                    background: active
                      ? `${color}18`
                      : "rgba(255,255,255,0.04)",
                    border: active
                      ? `1px solid ${color}40`
                      : "1px solid rgba(255,255,255,0.08)",
                    color: active ? color : "rgba(148,163,184,0.55)",
                    boxShadow: active ? `0 0 14px ${color}20` : "none",
                  }}
                >
                  <span className="text-sm mb-0.5">{value}</span>
                  <span className="text-[10px] opacity-60">{desc}</span>
                </motion.button>
              );
            })}
          </div>
        </Field>
        <Field label="Years of Experience *">
          <StyledInput
            icon={TbCalendar}
            type="number"
            name="yearsOfExperience"
            placeholder="e.g. 3"
            value={form.yearsOfExperience}
            onChange={handleChange}
            isFocused={focused === "years"}
            onFocus={() => setFocused("years")}
            onBlur={() => setFocused("")}
            required
          />
        </Field>
      </motion.div>
    ),

    4: (
      <motion.div
        key="s4"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col gap-5"
      >
        {/* Looking For — multi-select enum */}
        <Field label="Looking For * (select all that apply)">
          <div className="flex flex-col gap-2">
            {LOOKING_FOR_OPTIONS.map(({ label, color, emoji }) => {
              const active = form.lookingFor.includes(label);
              return (
                <motion.button
                  key={label}
                  type="button"
                  whileTap={{ scale: 0.98 }}
                  onClick={() => toggleLookingFor(label)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-left transition-all duration-200"
                  style={{
                    background: active
                      ? `${color}12`
                      : "rgba(255,255,255,0.03)",
                    border: active
                      ? `1px solid ${color}35`
                      : "1px solid rgba(255,255,255,0.07)",
                    color: active ? color : "rgba(148,163,184,0.7)",
                    boxShadow: active ? `0 0 12px ${color}15` : "none",
                  }}
                >
                  <span className="text-base">{emoji}</span>
                  <span className="flex-1">{label}</span>
                  <div
                    className="w-4 h-4 rounded-md flex items-center justify-center shrink-0"
                    style={{
                      background: active ? color : "rgba(255,255,255,0.06)",
                      border: active
                        ? "none"
                        : "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    {active && (
                      <HiCheck className="text-black text-[10px] font-bold" />
                    )}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </Field>

        {/* Photo */}
        <Field label="Profile Photo">
          <div className="flex items-center gap-3">
            <div
              className="w-14 h-14 rounded-2xl overflow-hidden shrink-0 flex items-center justify-center"
              style={{
                border: "2px solid rgba(124,58,237,0.3)",
                background: "rgba(255,255,255,0.04)",
              }}
            >
              {preview ? (
                <img
                  src={preview}
                  alt="preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <TbUpload
                  className="text-xl"
                  style={{ color: "rgba(100,116,139,0.4)" }}
                />
              )}
            </div>
            <label
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-medium cursor-pointer transition-all duration-200"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px dashed rgba(255,255,255,0.12)",
                color: "rgba(148,163,184,0.65)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(124,58,237,0.4)";
                e.currentTarget.style.color = "#a78bfa";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                e.currentTarget.style.color = "rgba(148,163,184,0.65)";
              }}
            >
              <TbUpload className="text-sm" />
              {photo
                ? photo.name.slice(0, 22) + (photo.name.length > 22 ? "…" : "")
                : "Upload photo (optional)"}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhoto}
              />
            </label>
          </div>
        </Field>

        {/* Portfolio */}
        <Field label="Portfolio URL">
          <StyledInput
            icon={HiOutlineLink}
            type="text"
            name="portfolioUrl"
            placeholder="https://yourportfolio.dev"
            value={form.portfolioUrl}
            onChange={handleChange}
            isFocused={focused === "portfolio"}
            onFocus={() => setFocused("portfolio")}
            onBlur={() => setFocused("")}
          />
        </Field>

        {/* Error */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
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
      </motion.div>
    ),
  };

  /* ─── Render ──────────────────────────────────────────── */
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-10 relative overflow-hidden"
      style={{ background: "#080810", fontFamily: "'DM Sans', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&family=Syne:wght@700;800&display=swap');
      `}</style>

      {/* Ambient glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          className="absolute top-0 left-1/3 w-96 h-96 rounded-full opacity-15"
          style={{
            background: "radial-gradient(circle,#7c3aed,transparent 65%)",
            filter: "blur(90px)",
          }}
        />
        <div
          className="absolute bottom-0 right-1/3 w-80 h-80 rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle,#0d9488,transparent 65%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "radial-gradient(circle,#a5b4fc 1px,transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-lg"
      >
        <div
          className="relative rounded-3xl overflow-hidden"
          style={{
            background:
              "linear-gradient(160deg,rgba(255,255,255,0.06) 0%,rgba(255,255,255,0.02) 100%)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow:
              "0 32px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.07)",
          }}
        >
          {/* Top shimmer */}
          <div
            className="h-px w-full"
            style={{
              background:
                "linear-gradient(90deg,transparent,rgba(124,58,237,0.7),rgba(13,148,136,0.5),transparent)",
            }}
          />

          <div className="p-7">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0"
                style={{
                  background: "linear-gradient(135deg,#7c3aed,#4f46e5,#0d9488)",
                  boxShadow: "0 0 20px rgba(124,58,237,0.4)",
                }}
              >
                <HiSparkles className="text-white text-base" />
              </div>
              <div>
                <h2
                  className="font-bold text-lg leading-tight"
                  style={{ color: "#f1f5f9", fontFamily: "'Syne',sans-serif" }}
                >
                  Complete Your Profile
                </h2>
                <p
                  className="text-xs"
                  style={{ color: "rgba(100,116,139,0.55)" }}
                >
                  Step {step} of {STEPS.length} — {STEPS[step - 1].label}
                </p>
              </div>
            </div>

            {/* Progress bar */}
            <div className="flex gap-1.5 mb-6">
              {STEPS.map((s) => {
                const done = step > s.id;
                const active = step === s.id;
                return (
                  <div
                    key={s.id}
                    className="flex-1 h-1 rounded-full overflow-hidden"
                    style={{ background: "rgba(255,255,255,0.07)" }}
                  >
                    <motion.div
                      className="h-full rounded-full"
                      initial={{ width: "0%" }}
                      animate={{ width: done ? "100%" : active ? "55%" : "0%" }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      style={{
                        background:
                          done || active
                            ? "linear-gradient(90deg,#7c3aed,#4f46e5)"
                            : "transparent",
                      }}
                    />
                  </div>
                );
              })}
            </div>

            {/* Step icons */}
            <div className="flex justify-between mb-6">
              {STEPS.map((s) => {
                const done = step > s.id;
                const active = step === s.id;
                const Icon = s.icon;
                return (
                  <div key={s.id} className="flex flex-col items-center gap-1">
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300"
                      style={{
                        background: done
                          ? "linear-gradient(135deg,#7c3aed,#4f46e5)"
                          : active
                            ? "rgba(124,58,237,0.18)"
                            : "rgba(255,255,255,0.04)",
                        border: done
                          ? "none"
                          : active
                            ? "1px solid rgba(124,58,237,0.45)"
                            : "1px solid rgba(255,255,255,0.08)",
                        boxShadow: active
                          ? "0 0 12px rgba(124,58,237,0.25)"
                          : "none",
                      }}
                    >
                      {done ? (
                        <HiCheck className="text-white text-xs" />
                      ) : (
                        <Icon
                          style={{
                            fontSize: "14px",
                            color: active ? "#a78bfa" : "rgba(100,116,139,0.4)",
                          }}
                        />
                      )}
                    </div>
                    <span
                      className="text-[9px] font-medium hidden sm:block"
                      style={{
                        color: active
                          ? "#a78bfa"
                          : done
                            ? "rgba(148,163,184,0.45)"
                            : "rgba(100,116,139,0.3)",
                      }}
                    >
                      {s.label}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Panel */}
            <div className="min-h-[240px]">
              <AnimatePresence mode="wait">{panels[step]}</AnimatePresence>
            </div>

            {/* Nav buttons */}
            <div className="flex items-center gap-3 mt-7">
              {step > 1 && (
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setStep((s) => s - 1)}
                  className="px-5 py-3 rounded-2xl text-sm font-medium transition-colors duration-200"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.09)",
                    color: "rgba(148,163,184,0.75)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.07)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                  }}
                >
                  Back
                </motion.button>
              )}

              {step < STEPS.length ? (
                <motion.button
                  type="button"
                  disabled={!canAdvance()}
                  whileHover={
                    canAdvance()
                      ? {
                          scale: 1.02,
                          boxShadow: "0 0 24px rgba(124,58,237,0.45)",
                        }
                      : {}
                  }
                  whileTap={canAdvance() ? { scale: 0.98 } : {}}
                  onClick={() => setStep((s) => s + 1)}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-bold transition-all duration-200"
                  style={{
                    background: canAdvance()
                      ? "linear-gradient(135deg,#7c3aed,#4f46e5)"
                      : "rgba(255,255,255,0.04)",
                    boxShadow: canAdvance()
                      ? "0 0 20px rgba(124,58,237,0.3),inset 0 1px 0 rgba(255,255,255,0.12)"
                      : "none",
                    border: canAdvance()
                      ? "none"
                      : "1px solid rgba(255,255,255,0.08)",
                    color: canAdvance() ? "#fff" : "rgba(100,116,139,0.4)",
                    cursor: canAdvance() ? "pointer" : "not-allowed",
                  }}
                >
                  Continue <HiArrowRight className="text-xs" />
                </motion.button>
              ) : (
                <motion.button
                  type="button"
                  disabled={loading || success || !canAdvance()}
                  onClick={handleSubmit}
                  whileHover={
                    !loading && !success && canAdvance()
                      ? {
                          scale: 1.02,
                          boxShadow: "0 0 28px rgba(124,58,237,0.5)",
                        }
                      : {}
                  }
                  whileTap={!loading && !success ? { scale: 0.98 } : {}}
                  className="flex-1 flex items-center justify-center gap-2.5 py-3 rounded-2xl text-sm font-bold"
                  style={{
                    background: success
                      ? "linear-gradient(135deg,#16a34a,#15803d)"
                      : !canAdvance()
                        ? "rgba(255,255,255,0.04)"
                        : "linear-gradient(135deg,#7c3aed,#4f46e5,#0891b2)",
                    boxShadow: success
                      ? "0 0 20px rgba(22,163,74,0.35)"
                      : canAdvance()
                        ? "0 0 20px rgba(124,58,237,0.3),inset 0 1px 0 rgba(255,255,255,0.12)"
                        : "none",
                    border: canAdvance()
                      ? "none"
                      : "1px solid rgba(255,255,255,0.08)",
                    color:
                      canAdvance() || success
                        ? "#fff"
                        : "rgba(100,116,139,0.4)",
                    opacity: loading ? 0.75 : 1,
                    cursor:
                      loading || success || !canAdvance()
                        ? "not-allowed"
                        : "pointer",
                    transition: "background 0.4s",
                  }}
                >
                  {success ? (
                    <>
                      <HiCheck className="text-base" /> Profile Created!
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
                      Creating profile…
                    </>
                  ) : (
                    <>
                      <HiSparkles className="text-sm" /> Complete Profile
                    </>
                  )}
                </motion.button>
              )}
            </div>

            {/* Trust badge */}
            <div className="flex items-center justify-center gap-1.5 mt-4">
              <BsShieldCheck
                className="text-xs"
                style={{ color: "rgba(100,116,139,0.4)" }}
              />
              <span
                className="text-[11px]"
                style={{ color: "rgba(100,116,139,0.4)" }}
              >
                Your data is safe · You can update this anytime
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default CompleteProfile;
