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
} from "react-icons/hi2";
import {
  TbBriefcase,
  TbCalendar,
  TbCode,
  TbUpload,
  TbUser,
} from "react-icons/tb";
import { BsShieldCheck } from "react-icons/bs";
import api from "../axios/axios";

/* ─── Experience level config ─────────────────────────────── */
const LEVELS = [
  { value: "Beginner", color: "#4ade80", desc: "0 – 2 yrs" },
  { value: "Intermediate", color: "#60a5fa", desc: "2 – 5 yrs" },
  { value: "Advanced", color: "#a78bfa", desc: "5 + yrs" },
];

/* ─── Step config ─────────────────────────────────────────── */
const STEPS = [
  { id: 1, label: "Basic Info", icon: TbUser },
  { id: 2, label: "Skills", icon: TbCode },
  { id: 3, label: "Experience", icon: TbBriefcase },
  { id: 4, label: "Links & Photo", icon: HiOutlineLink },
];

/* ─── Reusable field components ───────────────────────────── */
function Field({ label, children }) {
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
    </div>
  );
}

function StyledInput({ icon: Icon, focused, onFocus, onBlur, ...props }) {
  return (
    <div
      className="relative rounded-xl transition-all duration-200"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: `1px solid ${focused ? "rgba(124,58,237,0.5)" : "rgba(255,255,255,0.08)"}`,
        boxShadow: focused
          ? "0 0 0 1px rgba(124,58,237,0.25), 0 0 14px rgba(124,58,237,0.1)"
          : "none",
      }}
    >
      {Icon && (
        <Icon
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm pointer-events-none"
          style={{
            color: focused ? "#a78bfa" : "rgba(100,116,139,0.55)",
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

function StyledTextarea({ focused, onFocus, onBlur, ...props }) {
  return (
    <div
      className="relative rounded-xl transition-all duration-200"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: `1px solid ${focused ? "rgba(124,58,237,0.5)" : "rgba(255,255,255,0.08)"}`,
        boxShadow: focused
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

/* Inline tag input for skills / techStack */
function TagInput({ value, onChange, placeholder, tint = "#818cf8" }) {
  const [input, setInput] = useState("");
  const [focused, setFocused] = useState(false);
  const uid = placeholder.replace(/\s+/g, "-");

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
    <div
      className="rounded-xl px-3 py-2 flex flex-wrap gap-1.5 min-h-[44px] cursor-text transition-all duration-200"
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
          if (input.trim()) add();
        }}
        onFocus={() => setFocused(true)}
        placeholder={value.length === 0 ? placeholder : ""}
        className="bg-transparent outline-none text-sm flex-1 min-w-[100px] placeholder:text-slate-600"
        style={{ color: "#e2e8f0" }}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   COMPLETE PROFILE PAGE
═══════════════════════════════════════════════════════════ */
function CompleteProfile() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [focused, setFocused] = useState("");

  /* Form state — split into tag arrays for skills/techStack */
  const [form, setForm] = useState({
    headline: "",
    bio: "",
    location: "",
    skills: [], // array — joined on submit
    techStack: [], // array — joined on submit
    experienceLevel: "Beginner",
    yearsOfExperience: "",
    portfolioUrl: "",
  });

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPhoto(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const data = new FormData();
      data.append("headline", form.headline);
      data.append("bio", form.bio);
      data.append("location", form.location);
      data.append("skills", JSON.stringify(form.skills));
      data.append("techStack", JSON.stringify(form.techStack));
      data.append("experienceLevel", form.experienceLevel);
      data.append("yearsOfExperience", form.yearsOfExperience);
      data.append("portfolioUrl", form.portfolioUrl);
      if (photo) data.append("profilePhoto", photo);

      await api.post("/user/complete-profile", data);

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

  const canAdvance = () => {
    if (step === 1)
      return form.headline.trim() && form.bio.trim() && form.location.trim();
    if (step === 2) return form.skills.length > 0 && form.techStack.length > 0;
    if (step === 3) return form.yearsOfExperience !== "";
    return true;
  };

  /* ── Step content ── */
  const stepContent = {
    1: (
      <motion.div
        key="step1"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col gap-4"
      >
        <Field label="Headline *">
          <StyledInput
            icon={TbUser}
            type="text"
            name="headline"
            placeholder="e.g. Full Stack Developer · Open to co-found"
            value={form.headline}
            onChange={handleChange}
            focused={focused === "headline"}
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
            focused={focused === "bio"}
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
            focused={focused === "location"}
            onFocus={() => setFocused("location")}
            onBlur={() => setFocused("")}
            required
          />
        </Field>
      </motion.div>
    ),

    2: (
      <motion.div
        key="step2"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col gap-4"
      >
        <Field label="Skills *">
          <TagInput
            value={form.skills}
            onChange={(v) => setForm((f) => ({ ...f, skills: v }))}
            placeholder="React, Node.js, Python…"
            tint="#818cf8"
          />
          <p
            className="text-[10px]"
            style={{ color: "rgba(100,116,139,0.45)" }}
          >
            Press Enter or comma to add each skill
          </p>
        </Field>

        <Field label="Tech Stack *">
          <TagInput
            value={form.techStack}
            onChange={(v) => setForm((f) => ({ ...f, techStack: v }))}
            placeholder="Next.js, Docker, GraphQL…"
            tint="#a78bfa"
          />
          <p
            className="text-[10px]"
            style={{ color: "rgba(100,116,139,0.45)" }}
          >
            Press Enter or comma to add each technology
          </p>
        </Field>
      </motion.div>
    ),

    3: (
      <motion.div
        key="step3"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col gap-5"
      >
        <Field label="Experience Level *">
          <div className="grid grid-cols-3 gap-2">
            {LEVELS.map(({ value, color, desc }) => {
              const active = form.experienceLevel === value;
              return (
                <motion.button
                  key={value}
                  type="button"
                  whileTap={{ scale: 0.95 }}
                  onClick={() =>
                    setForm((f) => ({ ...f, experienceLevel: value }))
                  }
                  className="flex flex-col items-center py-3 px-2 rounded-xl text-xs font-semibold transition-all duration-200"
                  style={{
                    background: active
                      ? `${color}18`
                      : "rgba(255,255,255,0.04)",
                    border: active
                      ? `1px solid ${color}40`
                      : "1px solid rgba(255,255,255,0.08)",
                    color: active ? color : "rgba(148,163,184,0.6)",
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
            focused={focused === "yearsOfExperience"}
            onFocus={() => setFocused("yearsOfExperience")}
            onBlur={() => setFocused("")}
            required
          />
        </Field>
      </motion.div>
    ),

    4: (
      <motion.div
        key="step4"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col gap-5"
      >
        {/* Photo upload */}
        <Field label="Profile Photo">
          <div className="flex items-center gap-4">
            {/* Preview */}
            <div
              className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 flex items-center justify-center"
              style={{
                border: "2px solid rgba(124,58,237,0.35)",
                background: "rgba(255,255,255,0.04)",
                boxShadow: photoPreview
                  ? "0 0 16px rgba(124,58,237,0.2)"
                  : "none",
              }}
            >
              {photoPreview ? (
                <img
                  src={photoPreview}
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

            {/* File input styled as button */}
            <label
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium cursor-pointer transition-all duration-200"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px dashed rgba(255,255,255,0.12)",
                color: "rgba(148,163,184,0.7)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(124,58,237,0.4)";
                e.currentTarget.style.color = "#a78bfa";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                e.currentTarget.style.color = "rgba(148,163,184,0.7)";
              }}
            >
              <TbUpload className="text-base" />
              {photo
                ? photo.name.slice(0, 24) + (photo.name.length > 24 ? "…" : "")
                : "Upload photo"}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhoto}
              />
            </label>
          </div>
        </Field>

        <Field label="Portfolio URL">
          <StyledInput
            icon={HiOutlineLink}
            type="text"
            name="portfolioUrl"
            placeholder="https://yourportfolio.dev"
            value={form.portfolioUrl}
            onChange={handleChange}
            focused={focused === "portfolioUrl"}
            onFocus={() => setFocused("portfolioUrl")}
            onBlur={() => setFocused("")}
          />
        </Field>

        {/* Summary */}
        <div
          className="rounded-xl p-4 flex flex-col gap-2"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <p
            className="text-[10px] font-bold uppercase tracking-widest mb-1"
            style={{ color: "rgba(100,116,139,0.5)" }}
          >
            Profile Summary
          </p>
          {[
            { label: "Headline", val: form.headline },
            { label: "Location", val: form.location },
            { label: "Skills", val: form.skills.join(", ") || "—" },
            { label: "Level", val: form.experienceLevel },
            {
              label: "Experience",
              val: form.yearsOfExperience
                ? `${form.yearsOfExperience} years`
                : "—",
            },
          ].map(({ label, val }) => (
            <div key={label} className="flex justify-between text-xs gap-4">
              <span style={{ color: "rgba(100,116,139,0.55)" }}>{label}</span>
              <span
                className="truncate text-right"
                style={{ color: "#cbd5e1" }}
              >
                {val || "—"}
              </span>
            </div>
          ))}
        </div>

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

  /* ───────────────────────────────────────────────────────
     RENDER
  ─────────────────────────────────────────────────────── */
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
            background: "radial-gradient(circle, #7c3aed, transparent 65%)",
            filter: "blur(90px)",
          }}
        />
        <div
          className="absolute bottom-0 right-1/3 w-80 h-80 rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, #0d9488, transparent 65%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #a5b4fc 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-lg"
      >
        <div
          className="relative rounded-3xl overflow-hidden"
          style={{
            background:
              "linear-gradient(160deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
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
                  style={{ color: "rgba(100,116,139,0.6)" }}
                >
                  Step {step} of {STEPS.length} — {STEPS[step - 1].label}
                </p>
              </div>
            </div>

            {/* Step progress bar */}
            <div className="flex items-center gap-1.5 mb-7">
              {STEPS.map((s) => {
                const done = step > s.id;
                const active = step === s.id;
                return (
                  <div key={s.id} className="flex items-center gap-1.5 flex-1">
                    <div
                      className="flex-1 h-1 rounded-full overflow-hidden"
                      style={{ background: "rgba(255,255,255,0.07)" }}
                    >
                      <motion.div
                        className="h-full rounded-full"
                        initial={{ width: "0%" }}
                        animate={{
                          width: done ? "100%" : active ? "50%" : "0%",
                        }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        style={{
                          background: done
                            ? "linear-gradient(90deg,#7c3aed,#4f46e5)"
                            : "linear-gradient(90deg,#7c3aed80,#4f46e540)",
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Step labels */}
            <div className="flex justify-between mb-6">
              {STEPS.map((s) => {
                const done = step > s.id;
                const active = step === s.id;
                const Icon = s.icon;
                return (
                  <div key={s.id} className="flex flex-col items-center gap-1">
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-300"
                      style={{
                        background: done
                          ? "linear-gradient(135deg,#7c3aed,#4f46e5)"
                          : active
                            ? "rgba(124,58,237,0.2)"
                            : "rgba(255,255,255,0.04)",
                        border: done
                          ? "none"
                          : active
                            ? "1px solid rgba(124,58,237,0.5)"
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
                            fontSize: "13px",
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
                            ? "rgba(148,163,184,0.5)"
                            : "rgba(100,116,139,0.35)",
                      }}
                    >
                      {s.label}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Step content */}
            <div className="min-h-[200px]">
              <AnimatePresence mode="wait">{stepContent[step]}</AnimatePresence>
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center gap-3 mt-7">
              {step > 1 && (
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setStep((s) => s - 1)}
                  className="px-5 py-3 rounded-2xl text-sm font-medium transition-all duration-200"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.09)",
                    color: "rgba(148,163,184,0.8)",
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
                      ? "0 0 20px rgba(124,58,237,0.3), inset 0 1px 0 rgba(255,255,255,0.12)"
                      : "none",
                    border: canAdvance()
                      ? "none"
                      : "1px solid rgba(255,255,255,0.08)",
                    color: canAdvance() ? "#fff" : "rgba(100,116,139,0.4)",
                    cursor: canAdvance() ? "pointer" : "not-allowed",
                  }}
                >
                  Continue
                  <HiArrowRight className="text-xs" />
                </motion.button>
              ) : (
                <motion.button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading || success}
                  whileHover={
                    !loading && !success
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
                      : "linear-gradient(135deg,#7c3aed,#4f46e5,#0891b2)",
                    boxShadow: success
                      ? "0 0 20px rgba(22,163,74,0.35)"
                      : "0 0 20px rgba(124,58,237,0.3), inset 0 1px 0 rgba(255,255,255,0.12)",
                    color: "#fff",
                    opacity: loading ? 0.75 : 1,
                    cursor: loading || success ? "not-allowed" : "pointer",
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

            {/* Trust line */}
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
