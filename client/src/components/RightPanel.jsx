import { motion } from "framer-motion";
import { HiOutlineLightBulb } from "react-icons/hi2";
import { SiReact, SiNodedotjs, SiOpenai, SiWeb3Dotjs } from "react-icons/si";
import { TbBrandGithub } from "react-icons/tb";
import { BsArrowUpRight, BsFire } from "react-icons/bs";
import { RiSparklingLine } from "react-icons/ri";

const skills = [
  {
    label: "React",
    icon: SiReact,
    color: "#38bdf8",
    bg: "rgba(56,189,248,0.1)",
    border: "rgba(56,189,248,0.2)",
    glow: "rgba(56,189,248,0.15)",
    trend: "+12%",
  },
  {
    label: "Node.js",
    icon: SiNodedotjs,
    color: "#4ade80",
    bg: "rgba(74,222,128,0.1)",
    border: "rgba(74,222,128,0.2)",
    glow: "rgba(74,222,128,0.12)",
    trend: "+8%",
  },
  {
    label: "AI",
    icon: SiOpenai,
    color: "#a78bfa",
    bg: "rgba(167,139,250,0.1)",
    border: "rgba(167,139,250,0.2)",
    glow: "rgba(167,139,250,0.15)",
    trend: "+34%",
    hot: true,
  },
  {
    label: "Web3",
    icon: SiWeb3Dotjs,
    color: "#fb923c",
    bg: "rgba(251,146,60,0.1)",
    border: "rgba(251,146,60,0.2)",
    glow: "rgba(251,146,60,0.12)",
    trend: "+5%",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: 12 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  },
};

function RightPanel() {
  return (
    <div className="flex flex-col max-h-screen p-4 gap-6">
      {/* Trending Skills */}
      <div className="pt-2">
        {/* Section header */}
        <div className="flex items-center justify-between px-1 mb-3">
          <div className="flex items-center gap-2">
            <BsFire
              style={{ fontSize: "13px", color: "rgba(251,146,60,0.8)" }}
            />
            <span
              className="text-xs font-semibold tracking-widest uppercase"
              style={{
                color: "rgba(148,163,184,0.45)",
                letterSpacing: "0.1em",
              }}
            >
              Trending Skills
            </span>
          </div>
          <RiSparklingLine
            style={{ fontSize: "13px", color: "rgba(148,163,184,0.3)" }}
          />
        </div>

        {/* Skill chips */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-1.5"
        >
          {skills.map(
            ({ label, icon: Icon, color, bg, border, glow, trend, hot }) => (
              <motion.div key={label} variants={itemVariants}>
                <div
                  className="group flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-200"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: `1px solid rgba(255,255,255,0.06)`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = bg;
                    e.currentTarget.style.borderColor = border;
                    e.currentTarget.style.boxShadow = `0 0 16px ${glow}`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                    e.currentTarget.style.borderColor =
                      "rgba(255,255,255,0.06)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  {/* Icon badge */}
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-110"
                    style={{ background: bg, border: `1px solid ${border}` }}
                  >
                    <Icon style={{ fontSize: "13px", color }} />
                  </div>

                  {/* Label */}
                  <span
                    className="text-sm font-medium flex-1"
                    style={{ color: "rgba(203,213,225,0.85)" }}
                  >
                    {label}
                  </span>

                  {/* Hot badge */}
                  {hot && (
                    <span
                      className="text-[10px] font-bold px-1.5 py-0.5 rounded-md"
                      style={{
                        background: "rgba(167,139,250,0.15)",
                        color: "#a78bfa",
                        border: "1px solid rgba(167,139,250,0.25)",
                      }}
                    >
                      HOT
                    </span>
                  )}

                  {/* Trend */}
                  <span
                    className="text-xs font-semibold tabular-nums"
                    style={{ color: "rgba(74,222,128,0.8)" }}
                  >
                    {trend}
                  </span>
                </div>
              </motion.div>
            ),
          )}
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

      {/* Tip card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className="relative rounded-2xl p-4 overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, rgba(124,58,237,0.12) 0%, rgba(79,70,229,0.08) 50%, rgba(13,148,136,0.08) 100%)",
            border: "1px solid rgba(124,58,237,0.2)",
            boxShadow:
              "0 0 24px rgba(124,58,237,0.08), inset 0 1px 0 rgba(255,255,255,0.05)",
          }}
        >
          {/* Corner glow */}
          <div
            className="absolute -top-6 -right-6 w-20 h-20 rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(124,58,237,0.25), transparent 70%)",
              filter: "blur(12px)",
            }}
          />

          {/* Icon */}
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center mb-3"
            style={{
              background: "rgba(124,58,237,0.2)",
              border: "1px solid rgba(124,58,237,0.3)",
              boxShadow: "0 0 12px rgba(124,58,237,0.2)",
            }}
          >
            <HiOutlineLightBulb
              style={{ fontSize: "15px", color: "#a78bfa" }}
            />
          </div>

          <h3
            className="text-sm font-semibold mb-1.5"
            style={{ color: "#e2e8f0" }}
          >
            DevTinder Tip
          </h3>
          <p
            className="text-xs leading-relaxed"
            style={{ color: "rgba(148,163,184,0.7)" }}
          >
            Add your skills and GitHub profile to increase your chances of
            finding great collaborators.
          </p>

          {/* CTA */}
          <div className="mt-3 flex items-center gap-1.5 cursor-pointer group w-fit">
            <TbBrandGithub style={{ fontSize: "13px", color: "#a5b4fc" }} />
            <span className="text-xs font-medium" style={{ color: "#a5b4fc" }}>
              Connect GitHub
            </span>
            <BsArrowUpRight
              className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              style={{ fontSize: "10px", color: "#a5b4fc" }}
            />
          </div>
        </div>
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.55 }}
        className="mt-auto pb-2"
      >
        <div className="flex flex-wrap gap-x-3 gap-y-1 px-1">
          {["Privacy", "Terms", "About"].map((item) => (
            <span
              key={item}
              className="text-[11px] cursor-pointer transition-colors duration-150 hover:text-slate-400"
              style={{ color: "rgba(100,116,139,0.5)" }}
            >
              {item}
            </span>
          ))}
          <span
            className="text-[11px] w-full mt-0.5"
            style={{ color: "rgba(100,116,139,0.35)" }}
          >
            © 2025 DevTinder
          </span>
        </div>
      </motion.div>
    </div>
  );
}

export default RightPanel;
