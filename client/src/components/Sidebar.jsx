import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { RiHome4Line, RiHome4Fill, RiCompassDiscoverLine, RiCompassDiscoverFill } from "react-icons/ri";
import { TbHeartHandshake } from "react-icons/tb";
import { HiOutlineUser, HiUser } from "react-icons/hi2";
import { HiOutlineSparkles } from "react-icons/hi";
import { BsCodeSlash } from "react-icons/bs";

const menuLinks = [
  {
    to: "/app",
    label: "Discover Developers",
    icon: RiCompassDiscoverLine,
    activeIcon: RiCompassDiscoverFill,
    description: "Find your next collaborator",
    accent: "#7c3aed",
    accentBg: "rgba(124,58,237,0.12)",
    accentBorder: "rgba(124,58,237,0.25)",
  },
  {
    to: "/app/matches",
    label: "Matches",
    icon: TbHeartHandshake,
    activeIcon: TbHeartHandshake,
    description: "People who liked you back",
    accent: "#e11d48",
    accentBg: "rgba(225,29,72,0.1)",
    accentBorder: "rgba(225,29,72,0.22)",
  },
  {
    to: "/app/profile",
    label: "My Profile",
    icon: HiOutlineUser,
    activeIcon: HiUser,
    description: "Edit your dev identity",
    accent: "#0d9488",
    accentBg: "rgba(13,148,136,0.1)",
    accentBorder: "rgba(13,148,136,0.22)",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
};

function Sidebar() {
  const location = useLocation();

  return (
    <div className="flex flex-col h-full p-4 gap-6">

      {/* Section label */}
      <div className="pt-2">
        <div className="flex items-center gap-2 px-2 mb-3">
          <BsCodeSlash className="text-xs" style={{ color: "rgba(148,163,184,0.5)" }} />
          <span
            className="text-xs font-semibold tracking-widest uppercase"
            style={{ color: "rgba(148,163,184,0.45)", letterSpacing: "0.1em" }}
          >
            Navigate
          </span>
        </div>

        {/* Nav links */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-1"
        >
          {menuLinks.map(({ to, label, icon: Icon, activeIcon: ActiveIcon, description, accent, accentBg, accentBorder }) => {
            const isActive =
              to === "/app"
                ? location.pathname === "/app" || location.pathname === "/app/"
                : location.pathname.startsWith(to);
            const IconComponent = isActive ? ActiveIcon : Icon;

            return (
              <motion.div key={to} variants={itemVariants}>
                <Link
                  to={to}
                  className="group relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200"
                  style={{
                    background: isActive ? accentBg : "transparent",
                    border: `1px solid ${isActive ? accentBorder : "transparent"}`,
                    boxShadow: isActive ? `0 0 16px ${accent}18` : "none",
                  }}
                  onMouseEnter={e => {
                    if (!isActive) {
                      e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isActive) {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.borderColor = "transparent";
                    }
                  }}
                >
                  {/* Active left bar */}
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-active-bar"
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-full"
                      style={{ background: accent, boxShadow: `0 0 8px ${accent}` }}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                    />
                  )}

                  {/* Icon container */}
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-110"
                    style={{
                      background: isActive ? `${accent}22` : "rgba(255,255,255,0.05)",
                      border: `1px solid ${isActive ? `${accent}40` : "rgba(255,255,255,0.07)"}`,
                    }}
                  >
                    <IconComponent
                      style={{
                        fontSize: "15px",
                        color: isActive ? accent : "rgba(148,163,184,0.7)",
                      }}
                    />
                  </div>

                  {/* Label + description */}
                  <div className="flex flex-col min-w-0">
                    <span
                      className="text-sm font-medium leading-tight"
                      style={{ color: isActive ? "#e2e8f0" : "rgba(148,163,184,0.85)" }}
                    >
                      {label}
                    </span>
                    <span
                      className="text-xs leading-tight truncate mt-0.5"
                      style={{ color: "rgba(100,116,139,0.7)" }}
                    >
                      {description}
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Divider */}
      <div
        className="h-px mx-2"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)",
        }}
      />

      {/* Quick Profile */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="mt-auto"
      >
        <div
          className="flex items-center gap-3 p-3 rounded-xl cursor-pointer group transition-all duration-200"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = "rgba(255,255,255,0.055)";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = "rgba(255,255,255,0.03)";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
          }}
        >
          {/* Avatar */}
          <div className="relative shrink-0">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #7c3aed, #0d9488)",
                boxShadow: "0 0 12px rgba(124,58,237,0.35)",
              }}
            >
              <HiOutlineUser className="text-white text-sm" />
            </div>
            {/* Online dot */}
            <span
              className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full"
              style={{
                background: "#22c55e",
                border: "2px solid #0a0a0f",
                boxShadow: "0 0 6px #22c55e88",
              }}
            />
          </div>

          {/* Info */}
          <div className="flex flex-col min-w-0 flex-1">
            <span
              className="text-sm font-medium leading-tight truncate"
              style={{ color: "#e2e8f0" }}
            >
              Developer
            </span>
            <span
              className="text-xs leading-tight"
              style={{ color: "rgba(100,116,139,0.7)" }}
            >
              Online
            </span>
          </div>

          {/* Sparkle icon */}
          <HiOutlineSparkles
            className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            style={{ fontSize: "14px", color: "#a5b4fc" }}
          />
        </div>
      </motion.div>
    </div>
  );
}

export default Sidebar;