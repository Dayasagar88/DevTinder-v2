import { motion } from "framer-motion";
import DeveloperCard from "../components/DeveloperCard";

function Home() {
  const dummyUser = {
    firstName: "Sagar",
    headline: "Full Stack Developer",
    profilePhoto: "https://i.pravatar.cc/150",
    skills: ["React", "Node", "MongoDB"],
  };

  return (
    <div
      className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center relative px-4 py-8"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&family=Syne:wght@700;800&display=swap');
        .font-display { font-family: 'Syne', sans-serif; }
        @keyframes float-card { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-6px)} }
        .float-card { animation: float-card 6s ease-in-out infinite; }
      `}</style>

      {/* Background glow behind card */}
      <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center">
        <div
          className="w-80 h-80 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      {/* Header label */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-center gap-2 mb-6 z-10"
      >
        <div
          className="flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold"
          style={{
            background: "rgba(124,58,237,0.1)",
            border: "1px solid rgba(124,58,237,0.25)",
            color: "#a78bfa",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: "#a78bfa", boxShadow: "0 0 6px #a78bfa" }}
          />
          1 developer nearby
        </div>
      </motion.div>

      {/* Card wrapper */}
      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className="relative z-10 float-card"
      >
        {/* Ghost cards behind for depth */}
        <div
          className="absolute inset-0 rounded-3xl -rotate-3 scale-95 translate-y-2"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.05)",
          }}
        />
        <div
          className="absolute inset-0 rounded-3xl rotate-2 scale-97 translate-y-1"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        />
        {/* Actual card */}
        <DeveloperCard user={dummyUser} />
      </motion.div>

      {/* Hint text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mt-8 text-xs z-10"
        style={{ color: "rgba(100,116,139,0.45)" }}
      >
        Swipe or use the buttons to connect
      </motion.p>
    </div>
  );
}

export default Home;