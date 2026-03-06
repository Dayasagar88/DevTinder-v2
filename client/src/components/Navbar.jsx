import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiSparkles } from "react-icons/hi2";
import { RiHome4Line, RiHome4Fill } from "react-icons/ri";
import { TbHeartHandshake } from "react-icons/tb";
import { HiOutlineUser, HiUser, HiArrowRightOnRectangle } from "react-icons/hi2";
import api from "../axios/axios";

const navLinks = [
  { to: "/app",          label: "Feed",    icon: RiHome4Line,    activeIcon: RiHome4Fill    },
  { to: "/app/matches",  label: "Matches", icon: TbHeartHandshake, activeIcon: TbHeartHandshake },
  { to: "/app/profile",  label: "Profile", icon: HiOutlineUser,  activeIcon: HiUser         },
];

function Navbar() {
  const location  = useLocation();
  const navigate  = useNavigate();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (loggingOut) return;
    setLoggingOut(true);
    try {
      const res = await api.post("/auth/logout");
      console.log(res.data);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
      setLoggingOut(false);
    }
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-50"
      style={{
        background: "rgba(10,10,15,0.75)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        boxShadow: "0 1px 0 rgba(255,255,255,0.04), 0 4px 32px rgba(0,0,0,0.4)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex justify-between items-center">

        {/* ── Logo ── */}
        <Link to="/" className="flex items-center gap-2 group select-none">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
            style={{
              background: "linear-gradient(135deg, #7c3aed 0%, #4f46e5 50%, #0d9488 100%)",
              boxShadow: "0 0 16px rgba(124,58,237,0.5)",
            }}
          >
            <HiSparkles className="text-white text-sm" />
          </div>
          <span
            className="text-lg font-bold tracking-tight"
            style={{
              background: "linear-gradient(90deg, #e2e8f0 0%, #a5b4fc 50%, #67e8f9 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            DevTinder
          </span>
        </Link>

        {/* ── Nav links ── */}
        <div className="flex items-center gap-1">
          {navLinks.map(({ to, label, icon: Icon, activeIcon: ActiveIcon }) => {
            const isActive =
              to === "/app"
                ? location.pathname === "/app" || location.pathname === "/app/"
                : location.pathname.startsWith(to);
            const IconComponent = isActive ? ActiveIcon : Icon;

            return (
              <Link
                key={to}
                to={to}
                className="relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 group"
                style={{ color: isActive ? "#e2e8f0" : "rgba(148,163,184,0.8)" }}
              >
                {isActive && (
                  <motion.div
                    layoutId="navbar-active-pill"
                    className="absolute inset-0 rounded-xl"
                    style={{
                      background: "linear-gradient(135deg, rgba(124,58,237,0.2) 0%, rgba(79,70,229,0.15) 100%)",
                      border: "1px solid rgba(124,58,237,0.3)",
                      boxShadow: "0 0 12px rgba(124,58,237,0.15)",
                    }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                  />
                )}
                {!isActive && (
                  <span
                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    style={{ background: "rgba(255,255,255,0.04)" }}
                  />
                )}
                <IconComponent
                  className="relative z-10 transition-transform duration-200 group-hover:scale-110"
                  style={{ fontSize: "16px", color: isActive ? "#a5b4fc" : undefined }}
                />
                <span className="relative z-10 hidden sm:inline">{label}</span>
                {isActive && (
                  <motion.span
                    layoutId="navbar-dot"
                    className="relative z-10 w-1 h-1 rounded-full sm:hidden"
                    style={{ background: "#a5b4fc" }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* ── Logout button ── */}
        <motion.button
          onClick={handleLogout}
          disabled={loggingOut}
          whileHover={!loggingOut ? { scale: 1.04 } : {}}
          whileTap={!loggingOut  ? { scale: 0.96 } : {}}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            color: loggingOut ? "rgba(100,116,139,0.5)" : "rgba(148,163,184,0.8)",
            cursor: loggingOut ? "not-allowed" : "pointer",
          }}
          onMouseEnter={e => {
            if (!loggingOut) {
              e.currentTarget.style.background   = "rgba(225,29,72,0.1)";
              e.currentTarget.style.borderColor  = "rgba(225,29,72,0.3)";
              e.currentTarget.style.color        = "#fb7185";
            }
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background  = "rgba(255,255,255,0.04)";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
            e.currentTarget.style.color       = "rgba(148,163,184,0.8)";
          }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {loggingOut ? (
              <motion.span
                key="spinning"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-2"
              >
                <svg className="animate-spin w-3.5 h-3.5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                <span className="hidden sm:inline">Logging out…</span>
              </motion.span>
            ) : (
              <motion.span
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="flex items-center gap-2"
              >
                <HiArrowRightOnRectangle className="text-base" />
                <span className="hidden sm:inline">Logout</span>
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>

      </div>

      {/* Bottom shimmer line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(124,58,237,0.4) 30%, rgba(99,102,241,0.4) 50%, rgba(13,148,136,0.3) 70%, transparent 100%)",
        }}
      />
    </motion.nav>
  );
}

export default Navbar;