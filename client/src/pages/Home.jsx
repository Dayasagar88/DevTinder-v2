import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DeveloperCard from "../components/DeveloperCard";
import { getFeed } from "../axios/users";

function Home() {
  const [users, setUsers]     = useState([]);
  const [index, setIndex]     = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const res = await getFeed();
        setUsers(res.data.users || []);
      } catch (err) {
        console.log(err.response?.data);
      } finally {
        setLoading(false);
      }
    };
    fetchFeed();
  }, []);

  const onNext = () => setIndex(i => i + 1);

  const stack     = users.slice(index, index + 3);
  const remaining = users.length - index;

  return (
    <div
      className="flex flex-col items-center justify-center relative px-4 py-6"
      style={{ fontFamily: "'DM Sans', sans-serif", minHeight: "calc(100vh - 6rem)" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&family=Syne:wght@700;800&display=swap');
      `}</style>

      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center">
        <div style={{
          width: "440px", height: "440px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%)",
          filter: "blur(70px)",
        }} />
      </div>

      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center gap-2 mb-8 z-10 px-4 py-1.5 rounded-full text-xs font-semibold"
        style={{
          background: "rgba(124,58,237,0.1)",
          border: "1px solid rgba(124,58,237,0.25)",
          color: "#a78bfa",
        }}
      >
        <span className="w-1.5 h-1.5 rounded-full animate-pulse"
          style={{ background: "#a78bfa", boxShadow: "0 0 6px #a78bfa" }} />
        {loading ? "Loading…" : `${remaining} developer${remaining !== 1 ? "s" : ""} nearby`}
      </motion.div>

      {/* Stack container — fixed size so cards don't shift layout */}
      {/* Height = 1px shimmer + 196px photo + 1px divider + ~185px carousel + 1px divider + 68px buttons = ~452px */}
      <div className="relative z-10" style={{ width: "340px", height: "452px" }}>

        <AnimatePresence>
          {!loading && stack.length === 0 && (
            <motion.div key="empty"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-3xl"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <div className="text-4xl">👨‍💻</div>
              <p className="text-sm font-medium" style={{ color: "rgba(148,163,184,0.6)" }}>
                No more developers nearby
              </p>
              <p className="text-xs" style={{ color: "rgba(100,116,139,0.4)" }}>Check back later!</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/*
          Render in reverse so top card (index 0) is painted on top.
          stackPos 0 = top card, 1 = second, 2 = third.
        */}
        {[...stack].reverse().map((user, ri) => {
          const stackPos = stack.length - 1 - ri;
          const isTop    = stackPos === 0;

          return (
            <div
              key={user._id}
              className="absolute inset-0"
              style={{ zIndex: 10 + (stack.length - stackPos) }}
            >
              <DeveloperCard
                user={user}
                onNext={onNext}
                isTop={isTop}
                stackPos={stackPos}   /* passed so card can read drag progress */
              />
            </div>
          );
        })}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-6 text-xs z-10"
        style={{ color: "rgba(100,116,139,0.4)" }}
      >
        Swipe right to connect · Swipe left to pass
      </motion.p>
    </div>
  );
}

export default Home;