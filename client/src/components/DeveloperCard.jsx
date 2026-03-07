import { useState, useRef, useCallback, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  AnimatePresence,
} from "framer-motion";
import {
  HiXMark, HiHeart, HiOutlineMapPin, HiArrowTopRightOnSquare,
} from "react-icons/hi2";
import { TbCalendar, TbBrandGithub, TbWorldWww, TbBriefcase } from "react-icons/tb";
import { BsStars } from "react-icons/bs";
import {
  SiReact, SiNodedotjs, SiMongodb, SiTypescript, SiPython,
  SiGo, SiRust, SiSolidity, SiNextdotjs, SiTailwindcss,
  SiDocker, SiGraphql, SiPostgresql, SiRedis, SiFirebase,
  SiVuedotjs, SiAngular, SiExpress, SiKubernetes,
} from "react-icons/si";
import { likeUser, passUser } from "../axios/swipe";

/* ─── Data maps ──────────────────────────────────────────── */
const SKILL_META = {
  react:       { icon: SiReact,       color: "#38bdf8" },
  node:        { icon: SiNodedotjs,   color: "#4ade80" },
  nodejs:      { icon: SiNodedotjs,   color: "#4ade80" },
  "node.js":   { icon: SiNodedotjs,   color: "#4ade80" },
  mongodb:     { icon: SiMongodb,     color: "#4ade80" },
  typescript:  { icon: SiTypescript,  color: "#60a5fa" },
  python:      { icon: SiPython,      color: "#facc15" },
  go:          { icon: SiGo,          color: "#34d399" },
  rust:        { icon: SiRust,        color: "#fb923c" },
  solidity:    { icon: SiSolidity,    color: "#a78bfa" },
  "next.js":   { icon: SiNextdotjs,   color: "#e2e8f0" },
  nextjs:      { icon: SiNextdotjs,   color: "#e2e8f0" },
  tailwind:    { icon: SiTailwindcss, color: "#38bdf8" },
  docker:      { icon: SiDocker,      color: "#60a5fa" },
  graphql:     { icon: SiGraphql,     color: "#f472b6" },
  postgresql:  { icon: SiPostgresql,  color: "#60a5fa" },
  redis:       { icon: SiRedis,       color: "#fb7185" },
  firebase:    { icon: SiFirebase,    color: "#fb923c" },
  vue:         { icon: SiVuedotjs,    color: "#4ade80" },
  "vue.js":    { icon: SiVuedotjs,    color: "#4ade80" },
  angular:     { icon: SiAngular,     color: "#fb7185" },
  express:     { icon: SiExpress,     color: "#94a3b8" },
  kubernetes:  { icon: SiKubernetes,  color: "#60a5fa" },
};

const LEVEL_COLOR = {
  beginner:     "#4ade80",
  intermediate: "#60a5fa",
  advanced:     "#a78bfa",
};

const LOOKING_FOR_COLOR = {
  "Project Collaboration": "#38bdf8",
  "Startup Co-founder":    "#a78bfa",
  "Learning Partner":      "#4ade80",
  "Networking":            "#fb923c",
  "Job Opportunities":     "#f472b6",
};

/* ─── Skill pill ─────────────────────────────────────────── */
function SkillPill({ label }) {
  const meta  = SKILL_META[label.toLowerCase()];
  const Icon  = meta?.icon;
  const color = meta?.color ?? "#94a3b8";
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium shrink-0"
      style={{ background: `${color}14`, border: `1px solid ${color}28`, color }}
    >
      {Icon && <Icon style={{ fontSize: "10px" }} />}
      {label}
    </span>
  );
}

/* ─── Match popup ────────────────────────────────────────── */
function MatchPopup({ matchedUser, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.88)", backdropFilter: "blur(14px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.72, opacity: 0, y: 40 }}
        animate={{ scale: 1,    opacity: 1, y: 0  }}
        exit={{   scale: 0.88,  opacity: 0, y: 16 }}
        transition={{ type: "spring", bounce: 0.42, duration: 0.65 }}
        onClick={e => e.stopPropagation()}
        className="relative w-full max-w-sm rounded-3xl overflow-hidden text-center"
        style={{
          background: "linear-gradient(160deg,rgba(18,18,28,0.99),rgba(11,11,18,0.99))",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 40px 100px rgba(0,0,0,0.8),0 0 60px rgba(124,58,237,0.2)",
        }}
      >
        <div className="h-px w-full" style={{ background: "linear-gradient(90deg,transparent,rgba(124,58,237,0.8),rgba(13,148,136,0.6),transparent)" }} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 pointer-events-none"
          style={{ background: "radial-gradient(ellipse,rgba(124,58,237,0.25),transparent 70%)", filter: "blur(20px)" }} />

        <div className="px-8 py-10 relative z-10">
          {/* Avatars */}
          <div className="flex items-center justify-center mb-6">
            <motion.div initial={{ x: 28, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
              className="w-20 h-20 rounded-2xl overflow-hidden shrink-0"
              style={{ border: "3px solid #080810", boxShadow: "0 0 0 2px rgba(124,58,237,0.5),0 0 24px rgba(124,58,237,0.3)", zIndex: 1 }}>
              <img
                src={matchedUser?.profilePhoto || `https://api.dicebear.com/7.x/initials/svg?seed=${matchedUser?.firstName}`}
                alt={matchedUser?.firstName} className="w-full h-full object-cover"
              />
            </motion.div>
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
              transition={{ delay: 0.42, type: "spring", bounce: 0.7 }}
              className="w-10 h-10 rounded-full flex items-center justify-center mx-[-8px] z-10 shrink-0"
              style={{ background: "linear-gradient(135deg,#7c3aed,#4f46e5)", boxShadow: "0 0 20px rgba(124,58,237,0.5)", border: "2px solid #080810" }}>
              <HiHeart className="text-white text-base" />
            </motion.div>
            <motion.div initial={{ x: -28, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
              className="w-20 h-20 rounded-2xl overflow-hidden shrink-0"
              style={{ border: "3px solid #080810", boxShadow: "0 0 0 2px rgba(13,148,136,0.5),0 0 24px rgba(13,148,136,0.25)" }}>
              <div className="w-full h-full flex items-center justify-center"
                style={{ background: "linear-gradient(135deg,#0d9488,#0891b2)" }}>
                <BsStars className="text-white text-2xl" />
              </div>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.48, duration: 0.38 }}>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] mb-2" style={{ color: "#a78bfa" }}>
              It's a Match! 🎉
            </p>
            <h2 className="text-2xl font-extrabold mb-2"
              style={{ color: "#f1f5f9", fontFamily: "'Syne',sans-serif" }}>
              You &amp; {matchedUser?.firstName}
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(148,163,184,0.7)" }}>
              You both liked each other! Time to build something awesome together.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.62, duration: 0.36 }}
            className="flex flex-col gap-3 mt-8">
            <motion.button
              whileHover={{ scale: 1.03, boxShadow: "0 0 28px rgba(124,58,237,0.5)" }}
              whileTap={{ scale: 0.97 }}
              onClick={onClose}
              className="w-full py-3.5 rounded-2xl text-sm font-bold"
              style={{ background: "linear-gradient(135deg,#7c3aed,#4f46e5)", color: "#fff",
                boxShadow: "0 0 20px rgba(124,58,237,0.3),inset 0 1px 0 rgba(255,255,255,0.12)" }}>
              <HiHeart className="inline mr-2 text-sm" />
              Send a Message
            </motion.button>
            <button onClick={onClose} className="text-xs py-2 transition-colors duration-150"
              style={{ color: "rgba(100,116,139,0.5)" }}
              onMouseEnter={e => { e.currentTarget.style.color = "rgba(148,163,184,0.75)"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "rgba(100,116,139,0.5)"; }}>
              Keep browsing
            </button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════
   INNER CAROUSEL
   Gesture contract:
   - On pointerdown, record start position.
   - On first pointermove > 6px, measure the angle.
   - If |dx| > |dy| → this is a carousel swipe: capture pointer,
     animate the strip, prevent card drag.
   - If |dy| >= |dx| → this is a card swipe (or scroll): do nothing,
     let the event bubble up to the parent motion.div.
   - We communicate "carousel owns this drag" by calling
     onCarouselDragStart() / onCarouselDragEnd() so the parent
     can temporarily disable its own drag.
══════════════════════════════════════════════════════════ */
function CardCarousel({ slides, onCarouselDragStart, onCarouselDragEnd }) {
  const [current, setCurrent] = useState(0);
  const stripX    = useMotionValue(0);
  const wrapRef   = useRef(null);

  // drag-intent detection refs
  const downRef   = useRef(null);   // { x, y, pointerId }
  const intentRef = useRef(null);   // null | "carousel" | "card"
  const activeRef = useRef(false);  // currently owning the drag?
  const startXRef = useRef(0);      // x when carousel ownership confirmed

  const SLIDE_W = 308;
  const snapTo  = useCallback((idx, from) => {
    const clamped = Math.max(0, Math.min(slides.length - 1, idx));
    animate(stripX, -clamped * SLIDE_W, {
      type: "spring", stiffness: 420, damping: 40, mass: 0.75,
    });
    setCurrent(clamped);
    return clamped;
  }, [slides.length, stripX]);

  /* ── Pointer handlers ── */
  const handlePointerDown = useCallback((e) => {
    downRef.current  = { x: e.clientX, y: e.clientY, pointerId: e.pointerId };
    intentRef.current = null;
    activeRef.current = false;
  }, []);

  const handlePointerMove = useCallback((e) => {
    if (!downRef.current) return;
    const dx = e.clientX - downRef.current.x;
    const dy = e.clientY - downRef.current.y;

    // Haven't moved enough yet — wait
    if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return;

    if (!intentRef.current) {
      // First decisive move — lock intent
      if (Math.abs(dx) > Math.abs(dy)) {
        intentRef.current = "carousel";
        activeRef.current = true;
        startXRef.current = stripX.get();
        // Capture so we keep receiving events even if pointer leaves element
        try { wrapRef.current?.setPointerCapture(e.pointerId); } catch (_) {}
        onCarouselDragStart?.();
        e.stopPropagation();
      } else {
        intentRef.current = "card";
        // Don't capture — let it bubble to framer drag
        downRef.current = null;
      }
    }

    if (intentRef.current === "carousel") {
      e.stopPropagation();
      // Follow finger with slight resistance at edges
      const raw = startXRef.current + dx;
      const min = -(slides.length - 1) * SLIDE_W;
      const max = 0;
      let clamped = raw;
      if (raw > max)  clamped = max  + (raw - max)  * 0.25;
      if (raw < min)  clamped = min  + (raw - min)  * 0.25;
      stripX.set(clamped);
    }
  }, [slides.length, stripX, onCarouselDragStart]);

  const handlePointerUp = useCallback((e) => {
    if (!activeRef.current || intentRef.current !== "carousel") {
      downRef.current = null;
      return;
    }

    e.stopPropagation();
    try { wrapRef.current?.releasePointerCapture(downRef.current?.pointerId); } catch (_) {}

    const dx    = e.clientX - downRef.current.x;
    const vel   = 0; // pointer events don't give velocity; use distance only
    const THRESHOLD = 60;

    if (dx < -THRESHOLD && current < slides.length - 1) snapTo(current + 1);
    else if (dx > THRESHOLD && current > 0)              snapTo(current - 1);
    else                                                  snapTo(current);   // snap back

    downRef.current  = null;
    intentRef.current = null;
    activeRef.current = false;
    onCarouselDragEnd?.();
  }, [current, slides.length, snapTo, onCarouselDragEnd]);

  return (
    <div className="flex flex-col" style={{ userSelect: "none" }}>
      {/* Slide window */}
      <div
        ref={wrapRef}
        className="overflow-hidden"
        style={{ cursor: "grab", touchAction: "pan-y" }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <motion.div
          className="flex items-start"
          style={{ x: stripX, width: `${slides.length * SLIDE_W}px` }}
        >
          {slides.map((slide, i) => (
            <div
              key={i}
              style={{ width: `${SLIDE_W}px`, minWidth: `${SLIDE_W}px` }}
              className="pr-1"
            >
              {slide}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Dot indicators */}
      {slides.length > 1 && (
        <div className="flex items-center justify-center gap-[5px] mt-3">
          {slides.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => snapTo(i)}
              animate={{
                width:   i === current ? 20 : 6,
                opacity: i === current ? 1  : 0.3,
                background: i === current
                  ? "linear-gradient(90deg,#7c3aed,#4f46e5)"
                  : "rgba(255,255,255,1)",
              }}
              transition={{ duration: 0.22 }}
              style={{ height: "6px", borderRadius: "3px", padding: 0, border: "none", cursor: "pointer" }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   DEVELOPER CARD  (fixed height: photo + carousel + buttons)
══════════════════════════════════════════════════════════ */
function DeveloperCard({ user, onNext, isTop }) {
  const [showMatch, setShowMatch]   = useState(false);
  const [gone, setGone]             = useState(false);
  const carouselActive              = useRef(false); // true while carousel owns drag

  const {
    _id, firstName, headline, bio, profilePhoto, location,
    skills = [], techStack = [], lookingFor = [],
    experienceLevel, yearsOfExperience, githubUrl, portfolioUrl,
  } = user;

  /* ── Card swipe motion values ── */
  const x        = useMotionValue(0);
  const rotate   = useTransform(x, [-300, 300], [-22, 22]);
  const likeOpac = useTransform(x, [15, 80],   [0, 1]);
  const passOpac = useTransform(x, [-80, -15], [1, 0]);

  const levelColor = LEVEL_COLOR[(experienceLevel || "").toLowerCase()] ?? "#94a3b8";

  /* ── Build carousel slides ── */
  const slides = [];

  

  /* Slide 1 — About */
  slides.push(
    <div key="about" className="flex flex-col gap-2" style={{ height: "136px" }}>
      <p className="text-[9px] font-bold uppercase tracking-widest" style={{ color: "rgba(100,116,139,0.5)" }}>
        About
      </p>
      {bio ? (
        <p className="text-xs leading-relaxed flex-1 overflow-hidden"
          style={{
            color: "rgba(148,163,184,0.8)",
            display: "-webkit-box",
            WebkitLineClamp: 4,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}>
          {bio}
        </p>
      ) : (
        <p className="text-xs italic" style={{ color: "rgba(100,116,139,0.35)" }}>No bio added yet.</p>
      )}
      {/* Quick meta chips */}
      <div className="flex flex-wrap gap-x-3 gap-y-1 mt-auto">
        {location && (
          <span className="flex items-center gap-1 text-[11px]" style={{ color: "rgba(100,116,139,0.65)" }}>
            <HiOutlineMapPin style={{ fontSize: "11px" }} />{location}
          </span>
        )}
        {yearsOfExperience > 0 && (
          <span className="flex items-center gap-1 text-[11px]" style={{ color: "rgba(100,116,139,0.65)" }}>
            <TbCalendar style={{ fontSize: "11px" }} />{yearsOfExperience} yr{yearsOfExperience !== 1 ? "s" : ""} exp
          </span>
        )}
        {experienceLevel && (
          <span className="flex items-center gap-1 text-[11px]" style={{ color: levelColor }}>
            <TbBriefcase style={{ fontSize: "11px" }} />{experienceLevel}
          </span>
        )}
      </div>
    </div>
  );

  /* Slide 4 — Goals & Links */
  const hasGoals = lookingFor.length > 0;
  const hasLinks = !!(githubUrl || portfolioUrl);
  if (hasGoals || hasLinks) {
    slides.push(
      <div key="goals" className="flex flex-col gap-2.5" style={{ height: "136px" }}>
        {hasGoals && (
          <>
            <p className="text-[9px] font-bold uppercase tracking-widest" style={{ color: "rgba(100,116,139,0.5)" }}>
              Looking For
            </p>
            <div className="flex flex-col gap-1 overflow-hidden" style={{ maxHeight: hasLinks ? "64px" : "108px" }}>
              {lookingFor.map(l => {
                const color = LOOKING_FOR_COLOR[l] ?? "#94a3b8";
                return (
                  <span key={l}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium w-fit"
                    style={{ background: `${color}12`, border: `1px solid ${color}25`, color }}>
                    {l}
                  </span>
                );
              })}
            </div>
          </>
        )}
        {hasLinks && (
          <>
            <p className="text-[9px] font-bold uppercase tracking-widest" style={{ color: "rgba(100,116,139,0.5)" }}>
              Links
            </p>
            <div className="flex flex-col gap-1.5">
              {githubUrl && (
                <a href={githubUrl} target="_blank" rel="noopener noreferrer"
                  onClick={e => e.stopPropagation()}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs transition-colors duration-150"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(148,163,184,0.8)" }}
                  onMouseEnter={e => { e.currentTarget.style.color = "#a5b4fc"; e.currentTarget.style.borderColor = "rgba(124,58,237,0.3)"; }}
                  onMouseLeave={e => { e.currentTarget.style.color = "rgba(148,163,184,0.8)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}>
                  <TbBrandGithub className="shrink-0" />
                  <span className="truncate">{githubUrl.replace(/^https?:\/\/(www\.)?/, "")}</span>
                  <HiArrowTopRightOnSquare className="ml-auto shrink-0 opacity-40" style={{ fontSize: "10px" }} />
                </a>
              )}
              {portfolioUrl && (
                <a href={portfolioUrl} target="_blank" rel="noopener noreferrer"
                  onClick={e => e.stopPropagation()}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs transition-colors duration-150"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(148,163,184,0.8)" }}
                  onMouseEnter={e => { e.currentTarget.style.color = "#2dd4bf"; e.currentTarget.style.borderColor = "rgba(13,148,136,0.3)"; }}
                  onMouseLeave={e => { e.currentTarget.style.color = "rgba(148,163,184,0.8)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}>
                  <TbWorldWww className="shrink-0" />
                  <span className="truncate">{portfolioUrl.replace(/^https?:\/\/(www\.)?/, "")}</span>
                  <HiArrowTopRightOnSquare className="ml-auto shrink-0 opacity-40" style={{ fontSize: "10px" }} />
                </a>
              )}
            </div>
          </>
        )}
      </div>
    );
  }

  /* Slide 2 — Skills */
  if (skills.length > 0) {
    slides.push(
      <div key="skills" className="flex flex-col gap-2" style={{ height: "136px" }}>
        <p className="text-[9px] font-bold uppercase tracking-widest" style={{ color: "rgba(100,116,139,0.5)" }}>
          Skills
        </p>
        <div className="flex flex-wrap gap-1.5 overflow-hidden" style={{ maxHeight: "108px", alignContent: "flex-start" }}>
          {skills.map(s => <SkillPill key={s} label={s} />)}
        </div>
      </div>
    );
  }

  /* Slide 3 — Tech Stack */
  if (techStack.length > 0) {
    slides.push(
      <div key="stack" className="flex flex-col gap-2" style={{ height: "136px" }}>
        <p className="text-[9px] font-bold uppercase tracking-widest" style={{ color: "rgba(100,116,139,0.5)" }}>
          Tech Stack
        </p>
        <div className="flex flex-wrap gap-1.5 overflow-hidden" style={{ maxHeight: "108px", alignContent: "flex-start" }}>
          {techStack.map(t => <SkillPill key={t} label={t} />)}
        </div>
      </div>
    );
  }

  

  /* ── Fly-off handler ── */
  const flyAndDismiss = useCallback(async (direction, action) => {
    if (gone) return;
    setGone(true);
    await animate(x, direction === "right" ? 720 : -720, {
      type: "tween", duration: 0.30,
      ease: [0.25, 0.46, 0.45, 0.94],
    });
    try {
      if (action === "like") {
        const res = await likeUser(_id);
        if (res?.data?.isMatch) { setShowMatch(true); return; }
      } else {
        await passUser(_id);
      }
    } catch (err) { console.log(err); }
    onNext();
  }, [gone, _id, x, onNext]);

  const handleLike = () => flyAndDismiss("right", "like");
  const handlePass = () => flyAndDismiss("left",  "pass");

  const handleDragEnd = useCallback((_, info) => {
    // If carousel was the owner of this gesture, ignore
    if (carouselActive.current) return;
    const { offset, velocity } = info;
    if      (offset.x >  100 || velocity.x >  450) flyAndDismiss("right", "like");
    else if (offset.x < -100 || velocity.x < -450) flyAndDismiss("left",  "pass");
    else animate(x, 0, { type: "tween", duration: 0.24, ease: "easeOut" });
  }, [flyAndDismiss, x]);

  /* Filter drag: block card drag while carousel owns pointer */
  const handleDragStart = useCallback(() => {
    if (carouselActive.current) return false; // Framer respects false return
  }, []);

  return (
    <>
      <AnimatePresence>
        {showMatch && (
          <MatchPopup
            matchedUser={user}
            onClose={() => { setShowMatch(false); onNext(); }}
          />
        )}
      </AnimatePresence>

      <motion.div
        drag={isTop && !gone ? "x" : false}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0}
        dragMomentum={false}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        style={{
          x,
          rotate,
          cursor: isTop ? "grab" : "default",
          touchAction: "none",
          willChange: "transform",
        }}
        whileDrag={{ cursor: "grabbing" }}
        className="relative select-none w-full h-full"
      >
        {/*
          Fixed-size shell — CARD_HEIGHT is set on the container in Home.jsx
          flex-col keeps photo + carousel + buttons stacked without overflow
        */}
        <div
          className="w-full h-full rounded-3xl flex flex-col overflow-hidden"
          style={{
            background: "linear-gradient(160deg,rgba(255,255,255,0.07) 0%,rgba(255,255,255,0.025) 100%)",
            backdropFilter: "blur(22px)",
            WebkitBackdropFilter: "blur(22px)",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.52),inset 0 1px 0 rgba(255,255,255,0.08)",
            pointerEvents: isTop ? "auto" : "none",
          }}
        >
          {/* Top shimmer accent */}
          <div className="h-px w-full shrink-0"
            style={{ background: "linear-gradient(90deg,transparent,rgba(124,58,237,0.7),rgba(13,148,136,0.5),transparent)" }} />

          {/* ── Photo (fixed 196px) ── */}
          <div className="relative shrink-0 overflow-hidden" style={{ height: "196px" }}>
            {profilePhoto ? (
              <img src={profilePhoto} alt={firstName}
                className="w-full h-full object-cover" draggable={false} />
            ) : (
              <div className="w-full h-full flex items-center justify-center"
                style={{ background: "linear-gradient(135deg,rgba(124,58,237,0.22),rgba(13,148,136,0.18))" }}>
                <span className="text-7xl font-black"
                  style={{ color: "rgba(255,255,255,0.1)", fontFamily: "'Syne',sans-serif" }}>
                  {firstName?.[0]}
                </span>
              </div>
            )}

            {/* Gradient vignette */}
            <div className="absolute inset-0"
              style={{ background: "linear-gradient(to bottom,rgba(0,0,0,0.02) 0%,rgba(8,8,16,0.82) 100%)" }} />

            {/* CONNECT stamp */}
            <motion.div
              className="absolute top-4 left-4 px-3 py-1 rounded-xl border-2 font-black text-xs uppercase tracking-wider pointer-events-none"
              style={{ opacity: likeOpac, borderColor: "#4ade80", color: "#4ade80",
                background: "rgba(74,222,128,0.12)", rotate: "-12deg" }}>
              ✓ Connect
            </motion.div>

            {/* PASS stamp */}
            <motion.div
              className="absolute top-4 right-4 px-3 py-1 rounded-xl border-2 font-black text-xs uppercase tracking-wider pointer-events-none"
              style={{ opacity: passOpac, borderColor: "#fb7185", color: "#fb7185",
                background: "rgba(251,113,133,0.12)", rotate: "12deg" }}>
              ✕ Pass
            </motion.div>

            {/* Online dot */}
            <div className="absolute top-3.5 right-3.5 w-2.5 h-2.5 rounded-full"
              style={{ background: "#22c55e", boxShadow: "0 0 7px #22c55e,0 0 16px rgba(34,197,94,0.45)" }} />

            {/* Name / headline overlay */}
            <div className="absolute bottom-3 left-4 right-4">
              <div className="flex items-end justify-between gap-2">
                <div className="min-w-0">
                  <h3 className="text-[19px] font-extrabold leading-tight truncate"
                    style={{ color: "#f1f5f9", fontFamily: "'Syne',sans-serif", textShadow: "0 2px 12px rgba(0,0,0,0.55)" }}>
                    {firstName}
                  </h3>
                  {headline && (
                    <p className="text-[11px] mt-0.5 truncate" style={{ color: "rgba(203,213,225,0.72)" }}>{headline}</p>
                  )}
                </div>
                {experienceLevel && (
                  <span className="shrink-0 px-2 py-0.5 rounded-lg text-[10px] font-bold"
                    style={{ background: `${levelColor}18`, border: `1px solid ${levelColor}35`, color: levelColor }}>
                    {experienceLevel}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* ── Carousel (flex-1 fills remaining space between photo and buttons) ── */}
          <div className="flex-1 min-h-0 px-4 pt-3 pb-1 flex flex-col">
            <CardCarousel
              slides={slides}
              onCarouselDragStart={() => { carouselActive.current = true;  }}
              onCarouselDragEnd={()   => { carouselActive.current = false; }}
            />
          </div>

          {/* ── Divider ── */}
          <div className="mx-4 shrink-0 h-px" style={{ background: "rgba(255,255,255,0.055)" }} />

          {/* ── Action buttons (always visible at bottom) ── */}
          <div className="px-4 py-3 flex items-center gap-3 shrink-0">
            {/* Pass */}
            <motion.button
              whileHover={{ scale: 1.09, boxShadow: "0 0 22px rgba(225,29,72,0.28)" }}
              whileTap={{ scale: 0.88 }}
              onClick={handlePass}
              disabled={!isTop || gone}
              className="w-12 h-11 flex items-center justify-center rounded-2xl transition-colors duration-200"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(148,163,184,0.75)",
                cursor: isTop && !gone ? "pointer" : "default",
              }}
              onMouseEnter={e => {
                if (!isTop || gone) return;
                e.currentTarget.style.background    = "rgba(225,29,72,0.12)";
                e.currentTarget.style.borderColor   = "rgba(225,29,72,0.4)";
                e.currentTarget.style.color         = "#fb7185";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background  = "rgba(255,255,255,0.04)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                e.currentTarget.style.color       = "rgba(148,163,184,0.75)";
              }}
            >
              <HiXMark style={{ fontSize: "20px" }} />
            </motion.button>

            {/* Connect */}
            <motion.button
              whileHover={{ scale: 1.03, boxShadow: "0 0 30px rgba(124,58,237,0.6)" }}
              whileTap={{ scale: 0.97 }}
              onClick={handleLike}
              disabled={!isTop || gone}
              className="flex-1 h-11 flex items-center justify-center gap-2 rounded-2xl text-sm font-bold"
              style={{
                background: "linear-gradient(135deg,#7c3aed,#4f46e5)",
                border: "1px solid rgba(124,58,237,0.4)",
                color: "#fff",
                boxShadow: "0 0 16px rgba(124,58,237,0.28),inset 0 1px 0 rgba(255,255,255,0.12)",
                cursor: isTop && !gone ? "pointer" : "default",
              }}
            >
              <HiHeart style={{ fontSize: "15px" }} />
              Connect
            </motion.button>
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default DeveloperCard;