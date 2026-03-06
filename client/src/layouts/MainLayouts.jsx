import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import RightPanel from "../components/RightPanel";

function MainLayout() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] relative overflow-x-hidden">
      {/* Ambient background glow effects */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Top-left violet aurora */}
        <div
          className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(circle at center, #7c3aed 0%, #4f46e5 40%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        {/* Bottom-right teal aurora */}
        <div
          className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full opacity-15"
          style={{
            background:
              "radial-gradient(circle at center, #0d9488 0%, #0891b2 40%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        {/* Center subtle glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] opacity-5"
          style={{
            background:
              "radial-gradient(ellipse at center, #818cf8 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />

        {/* Subtle dot grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #a5b4fc 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      {/* Navbar */}
      <div className="relative z-50">
        <Navbar />
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto flex relative z-10 px-2 sm:px-4">
        {/* Left Sidebar */}
        <motion.aside
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
          className="w-64 hidden md:flex flex-col shrink-0"
        >
          {/* Glass sidebar card */}
          <div
            className="mt-4 mx-2 rounded-2xl overflow-hidden h-[calc(100vh-5rem)] sticky top-20 flex flex-col"
            style={{
              background:
                "linear-gradient(160deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.02) 100%)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.07)",
              boxShadow:
                "0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)",
            }}
          >
            {/* Top accent line */}
            <div
              className="h-px w-full shrink-0"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(124,58,237,0.6), rgba(99,102,241,0.6), transparent)",
              }}
            />
            <div className="flex-1 overflow-y-auto scrollbar-hide">
              <Sidebar />
            </div>
          </div>
        </motion.aside>

        {/* Center Feed */}
        <motion.main
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="flex-1 min-w-0 px-2 sm:px-4 py-4"
        >
          <Outlet />
        </motion.main>

        {/* Right Panel */}
        <motion.aside
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="w-72 hidden lg:flex flex-col shrink-0"
        >
          {/* Glass right panel card */}
          <div
            className="mt-4 mx-2 rounded-2xl overflow-hidden h-[calc(100vh-5rem)] sticky top-20 flex flex-col"
            style={{
              background:
                "linear-gradient(160deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.02) 100%)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.07)",
              boxShadow:
                "0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)",
            }}
          >
            {/* Top accent line */}
            <div
              className="h-px w-full shrink-0"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(13,148,136,0.6), rgba(8,145,178,0.5), transparent)",
              }}
            />
            <div className="flex-1 overflow-y-auto scrollbar-hide">
              <RightPanel />
            </div>
          </div>
        </motion.aside>
      </div>

      {/* Bottom fade vignette */}
      <div
        className="fixed bottom-0 left-0 right-0 h-20 pointer-events-none z-20"
        style={{
          background:
            "linear-gradient(to top, rgba(10,10,15,0.8) 0%, transparent 100%)",
        }}
      />

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}

export default MainLayout;
