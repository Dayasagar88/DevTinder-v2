import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import DeveloperCard from "../components/DeveloperCard";
import { getFeed } from "../axios/users";

function Home() {
  const [users, setUsers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const res = await getFeed();
        console.log(res.data);

        setUsers(res.data.users);
      } catch (error) {
        console.log(error.response?.data);
      }
    };

    fetchFeed();
  }, []);

  const currentUser = users[currentIndex];

  return (
    <div
      className="min-h-[calc(100vh-6rem)] flex flex-col items-center justify-center relative px-4 py-8"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&family=Syne:wght@700;800&display=swap');
        .font-display { font-family: 'Syne', sans-serif; }
        @keyframes float-card { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-6px)} }
        .float-card { animation: float-card 6s ease-in-out infinite; }
      `}</style>

      {/* Background glow */}

      <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center">
        <div
          className="w-80 h-80 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      {/* Header */}

      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
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
            style={{
              background: "#a78bfa",
              boxShadow: "0 0 6px #a78bfa",
            }}
          />
          {users.length} developers nearby
        </div>
      </motion.div>

      {/* Card */}

      {currentUser && (
        <motion.div
          key={currentUser._id}
          initial={{ opacity: 0, y: 32, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 float-card"
        >
          <DeveloperCard
            user={currentUser}
            onNext={() => setCurrentIndex((prev) => prev + 1)}
          />
        </motion.div>
      )}

      {/* Hint */}

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
