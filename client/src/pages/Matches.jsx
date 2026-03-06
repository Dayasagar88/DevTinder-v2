import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { connectSocket, disconnectSocket } from "../sockets/socket"; // adjust path if needed
import {
  HiOutlinePaperAirplane,
  HiArrowLeft,
  HiOutlineChatBubbleLeftRight,
} from "react-icons/hi2";
import { TbHeartHandshake } from "react-icons/tb";
import { BsStars, BsCheckAll, BsCheck } from "react-icons/bs";
import {
  SiReact,
  SiNodedotjs,
  SiMongodb,
  SiTypescript,
  SiPython,
  SiGo,
} from "react-icons/si";
import api from "../axios/axios";

/* ─── Skill color map ─────────────────────────────────────── */
const SKILL_META = {
  react: { icon: SiReact, color: "#38bdf8" },
  node: { icon: SiNodedotjs, color: "#4ade80" },
  nodejs: { icon: SiNodedotjs, color: "#4ade80" },
  mongodb: { icon: SiMongodb, color: "#4ade80" },
  typescript: { icon: SiTypescript, color: "#60a5fa" },
  python: { icon: SiPython, color: "#facc15" },
  go: { icon: SiGo, color: "#34d399" },
};

function SkillTag({ label }) {
  const meta = SKILL_META[label?.toLowerCase()];
  const Icon = meta?.icon;
  const color = meta?.color ?? "#94a3b8";
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-medium"
      style={{
        background: `${color}14`,
        border: `1px solid ${color}25`,
        color,
      }}
    >
      {Icon && <Icon style={{ fontSize: "9px" }} />}
      {label}
    </span>
  );
}

/* ─── Avatar ──────────────────────────────────────────────── */
function Avatar({ src, name, size = 10, online = false }) {
  const fallback = `https://api.dicebear.com/7.x/initials/svg?seed=${name}`;
  return (
    <div
      className="relative shrink-0"
      style={{ width: `${size * 4}px`, height: `${size * 4}px` }}
    >
      <img
        src={src || fallback}
        alt={name}
        className="w-full h-full rounded-full object-cover"
        style={{ border: "2px solid rgba(124,58,237,0.3)" }}
        onError={(e) => {
          e.target.src = fallback;
        }}
      />
      {online && (
        <span
          className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full"
          style={{
            background: "#22c55e",
            border: "2px solid #080810",
            boxShadow: "0 0 6px #22c55e",
          }}
        />
      )}
    </div>
  );
}

/* ─── Empty state ─────────────────────────────────────────── */
function EmptyMatches() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-5 px-8 text-center">
      <div
        className="w-16 h-16 rounded-3xl flex items-center justify-center"
        style={{
          background:
            "linear-gradient(135deg,rgba(124,58,237,0.2),rgba(13,148,136,0.15))",
          border: "1px solid rgba(124,58,237,0.3)",
        }}
      >
        <TbHeartHandshake className="text-2xl" style={{ color: "#a78bfa" }} />
      </div>
      <div>
        <h3
          className="font-bold text-base mb-1"
          style={{ color: "#e2e8f0", fontFamily: "'Syne',sans-serif" }}
        >
          No matches yet
        </h3>
        <p
          className="text-xs leading-relaxed"
          style={{ color: "rgba(100,116,139,0.6)" }}
        >
          Head to the feed and start connecting with developers to see your
          matches here.
        </p>
      </div>
    </div>
  );
}

/* ─── No chat selected ────────────────────────────────────── */
function NoChatSelected() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 px-8 text-center">
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <HiOutlineChatBubbleLeftRight
          className="text-xl"
          style={{ color: "rgba(148,163,184,0.4)" }}
        />
      </div>
      <div>
        <p
          className="text-sm font-medium"
          style={{ color: "rgba(148,163,184,0.5)" }}
        >
          Select a match to start chatting
        </p>
      </div>
    </div>
  );
}

/* ─── Message bubble ──────────────────────────────────────── */
function MessageBubble({ msg, isMine }) {
  const time = new Date(msg.createdAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className={`flex items-end gap-2 ${isMine ? "flex-row-reverse" : "flex-row"}`}
    >
      {!isMine && (
        <Avatar
          src={msg.senderId?.profilePhoto}
          name={msg.senderId?.firstName || "?"}
          size={7}
        />
      )}

      <div
        className={`flex flex-col gap-1 max-w-[70%] ${isMine ? "items-end" : "items-start"}`}
      >
        <div
          className="px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed"
          style={
            isMine
              ? {
                  background: "linear-gradient(135deg,#7c3aed,#4f46e5)",
                  borderBottomRightRadius: "4px",
                  color: "#fff",
                  boxShadow: "0 2px 12px rgba(124,58,237,0.25)",
                }
              : {
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderBottomLeftRadius: "4px",
                  color: "#e2e8f0",
                }
          }
        >
          {msg.text}
        </div>
        <div className="flex items-center gap-1 px-1">
          <span
            className="text-[10px]"
            style={{ color: "rgba(100,116,139,0.5)" }}
          >
            {time}
          </span>
          {isMine && (
            <BsCheckAll
              className="text-xs"
              style={{ color: "rgba(99,102,241,0.7)" }}
            />
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   MATCHES PAGE
═══════════════════════════════════════════════════════════ */
function Matches() {
  const [matches, setMatches] = useState([]);
  const [loadingMatches, setLoadingMatches] = useState(true);
  const [activeMatch, setActiveMatch] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loadingMsgs, setLoadingMsgs] = useState(false);
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [mobileView, setMobileView] = useState("list"); // "list" | "chat"

  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const socketRef = useRef(null);

  /* ── Fetch current user ── */
  useEffect(() => {
    api
      .get("/user/profile") // ← replace with your endpoint
      .then((r) => setCurrentUser(r.data.user))
      .catch(console.error);
  }, []);

  /* ── Fetch matches ── */
  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const res = await api.get("/matches"); // ← replace with your endpoint
        setMatches(res.data.matches || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingMatches(false);
      }
    };
    fetchMatches();
  }, []);

  /* ── Socket setup ── */
  useEffect(() => {
    const socket = connectSocket();
    socketRef.current = socket;

    socket.on("receiveMessage", (message) => {
      setMessages((prev) => {
        // Avoid duplicates (in case REST + socket both fire)
        if (prev.find((m) => m._id === message._id)) return prev;
        return [...prev, message];
      });
    });

    return () => {
      socket.off("receiveMessage");
      disconnectSocket();
    };
  }, []);

  /* ── Load messages when match selected ── */
  useEffect(() => {
    if (!activeMatch) return;
    const fetchMessages = async () => {
      setLoadingMsgs(true);
      try {
        const res = await api.get(`/messages/${activeMatch._id}`); // ← replace with your endpoint
        setMessages(res.data.messages || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingMsgs(false);
      }
    };
    fetchMessages();
    socketRef.current?.emit("joinMatch", activeMatch._id);
  }, [activeMatch]);

  /* ── Auto-scroll to bottom ── */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* ── Select a match ── */
  const selectMatch = (match) => {
    setActiveMatch(match);
    setMobileView("chat");
    setTimeout(() => inputRef.current?.focus(), 300);
  };

  /* ── Send message ── */
  const sendMessage = async () => {
    if (!text.trim() || !activeMatch || sending) return;
    const payload = { text: text.trim() };
    setText("");
    setSending(true);

    try {
      const res = await api.post(`/messages/${activeMatch._id}`, payload); // ← replace with your endpoint
      const saved = res.data.message;

      // Optimistic: add to local state
      setMessages((prev) => {
        if (prev.find((m) => m._id === saved._id)) return prev;
        return [
          ...prev,
          {
            ...saved,
            senderId: {
              _id: currentUser?._id,
              firstName: currentUser?.firstName,
              profilePhoto: currentUser?.profilePhoto,
            },
          },
        ];
      });

      // Broadcast via socket so the other user sees it
      socketRef.current?.emit("sendMessage", {
        matchId: activeMatch._id,
        message: {
          ...saved,
          senderId: {
            _id: currentUser?._id,
            firstName: currentUser?.firstName,
            profilePhoto: currentUser?.profilePhoto,
          },
        },
      });
    } catch (err) {
      console.error(err);
    } finally {
      setSending(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  /* ── Get the other user in a match ── */
  const getPartner = (match) => {
    if (!currentUser) return match.users?.[0];
    return (
      match.users?.find((u) => u._id !== currentUser._id) || match.users?.[0]
    );
  };

  /* ── Loading state ── */
  if (loadingMatches) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
        <div
          className="w-10 h-10 rounded-2xl flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg,#7c3aed,#4f46e5,#0d9488)",
            boxShadow: "0 0 20px rgba(124,58,237,0.4)",
          }}
        >
          <BsStars className="text-white text-sm animate-pulse" />
        </div>
        <p className="text-sm" style={{ color: "rgba(100,116,139,0.5)" }}>
          Loading matches…
        </p>
      </div>
    );
  }

  /* ─────────────────────────────────────────────────────────
     RENDER
  ───────────────────────────────────────────────────────── */
  return (
    <div
      className="h-[calc(100vh-6rem)] flex flex-col"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&family=Syne:wght@700;800&display=swap');
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div
        className="flex flex-1 overflow-hidden rounded-2xl m-2 gap-0"
        style={{
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        {/* ══════════════════════════════════════════
            LEFT — Matches list
        ══════════════════════════════════════════ */}
        <div
          className={`flex flex-col shrink-0 ${mobileView === "chat" ? "hidden md:flex" : "flex"} md:flex`}
          style={{
            width: "280px",
            borderRight: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {/* List header */}
          <div className="px-4 pt-4 pb-3 shrink-0">
            <div className="flex items-center gap-2 mb-1">
              <TbHeartHandshake
                className="text-base"
                style={{ color: "#a78bfa" }}
              />
              <h2
                className="font-bold text-sm"
                style={{ color: "#e2e8f0", fontFamily: "'Syne',sans-serif" }}
              >
                Matches
              </h2>
              {matches.length > 0 && (
                <span
                  className="ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full"
                  style={{
                    background: "rgba(124,58,237,0.2)",
                    color: "#a78bfa",
                    border: "1px solid rgba(124,58,237,0.3)",
                  }}
                >
                  {matches.length}
                </span>
              )}
            </div>
            <p
              className="text-[11px]"
              style={{ color: "rgba(100,116,139,0.5)" }}
            >
              Your dev connections
            </p>
          </div>

          {/* Accent line */}
          <div
            className="h-px mx-4 mb-2"
            style={{ background: "rgba(255,255,255,0.06)" }}
          />

          {/* Match list */}
          <div className="flex-1 overflow-y-auto scrollbar-hide px-2 pb-2">
            {matches.length === 0 ? (
              <EmptyMatches />
            ) : (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.06 } },
                }}
                className="flex flex-col gap-1"
              >
                {matches.map((match) => {
                  const partner = getPartner(match);
                  const isActive = activeMatch?._id === match._id;
                  return (
                    <motion.div
                      key={match._id}
                      variants={{
                        hidden: { opacity: 0, x: -12 },
                        visible: {
                          opacity: 1,
                          x: 0,
                          transition: {
                            duration: 0.3,
                            ease: [0.22, 1, 0.36, 1],
                          },
                        },
                      }}
                    >
                      <button
                        onClick={() => selectMatch(match)}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200"
                        style={{
                          background: isActive
                            ? "rgba(124,58,237,0.12)"
                            : "transparent",
                          border: `1px solid ${isActive ? "rgba(124,58,237,0.3)" : "transparent"}`,
                          boxShadow: isActive
                            ? "0 0 12px rgba(124,58,237,0.1)"
                            : "none",
                        }}
                        onMouseEnter={(e) => {
                          if (!isActive) {
                            e.currentTarget.style.background =
                              "rgba(255,255,255,0.04)";
                            e.currentTarget.style.borderColor =
                              "rgba(255,255,255,0.07)";
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!isActive) {
                            e.currentTarget.style.background = "transparent";
                            e.currentTarget.style.borderColor = "transparent";
                          }
                        }}
                      >
                        <Avatar
                          src={partner?.profilePhoto}
                          name={partner?.firstName || "?"}
                          size={9}
                          online
                        />

                        <div className="flex flex-col min-w-0 flex-1">
                          <span
                            className="text-sm font-semibold truncate"
                            style={{
                              color: isActive
                                ? "#e2e8f0"
                                : "rgba(203,213,225,0.85)",
                            }}
                          >
                            {partner?.firstName || "Developer"}
                          </span>
                          <span
                            className="text-[11px] truncate mt-0.5"
                            style={{ color: "rgba(100,116,139,0.55)" }}
                          >
                            {partner?.headline || "Developer"}
                          </span>
                          {/* Skill pills — max 2 */}
                          {partner?.skills?.length > 0 && (
                            <div className="flex gap-1 mt-1.5 flex-wrap">
                              {partner.skills.slice(0, 2).map((s) => (
                                <SkillTag key={s} label={s} />
                              ))}
                            </div>
                          )}
                        </div>

                        {isActive && (
                          <motion.div
                            layoutId="active-match-dot"
                            className="w-1.5 h-1.5 rounded-full shrink-0"
                            style={{ background: "#a78bfa" }}
                          />
                        )}
                      </button>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </div>
        </div>

        {/* ══════════════════════════════════════════
            RIGHT — Chat pane
        ══════════════════════════════════════════ */}
        <div
          className={`flex flex-col flex-1 min-w-0 ${mobileView === "list" ? "hidden md:flex" : "flex"} md:flex`}
        >
          {!activeMatch ? (
            <NoChatSelected />
          ) : (
            <>
              {/* Chat header */}
              <div
                className="flex items-center gap-3 px-4 py-3 shrink-0"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
              >
                {/* Mobile back */}
                <button
                  className="md:hidden flex items-center justify-center w-8 h-8 rounded-xl mr-1 transition-colors duration-150"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "rgba(148,163,184,0.7)",
                  }}
                  onClick={() => setMobileView("list")}
                >
                  <HiArrowLeft className="text-sm" />
                </button>

                <Avatar
                  src={getPartner(activeMatch)?.profilePhoto}
                  name={getPartner(activeMatch)?.firstName || "?"}
                  size={9}
                  online
                />

                <div className="flex flex-col min-w-0">
                  <span
                    className="text-sm font-semibold"
                    style={{ color: "#e2e8f0" }}
                  >
                    {getPartner(activeMatch)?.firstName || "Developer"}
                  </span>
                  <span
                    className="flex items-center gap-1.5 text-[11px]"
                    style={{ color: "#22c55e" }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                    Online
                  </span>
                </div>

                {/* Skill pills in header */}
                <div className="ml-auto hidden sm:flex gap-1.5 flex-wrap justify-end">
                  {getPartner(activeMatch)
                    ?.skills?.slice(0, 3)
                    .map((s) => (
                      <SkillTag key={s} label={s} />
                    ))}
                </div>
              </div>

              {/* Messages area */}
              <div className="flex-1 overflow-y-auto scrollbar-hide px-4 py-4 flex flex-col gap-3">
                {loadingMsgs ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-2 h-2 rounded-full"
                          style={{ background: "rgba(124,58,237,0.5)" }}
                          animate={{ y: [0, -6, 0] }}
                          transition={{
                            duration: 0.7,
                            delay: i * 0.15,
                            repeat: Infinity,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                ) : messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full gap-3">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center"
                      style={{
                        background: "rgba(124,58,237,0.1)",
                        border: "1px solid rgba(124,58,237,0.2)",
                      }}
                    >
                      <HiOutlineChatBubbleLeftRight
                        className="text-lg"
                        style={{ color: "#a78bfa" }}
                      />
                    </div>
                    <p
                      className="text-xs text-center"
                      style={{ color: "rgba(100,116,139,0.5)" }}
                    >
                      No messages yet.
                      <br />
                      Say hi to{" "}
                      <span style={{ color: "#a78bfa" }}>
                        {getPartner(activeMatch)?.firstName}
                      </span>
                      !
                    </p>
                  </div>
                ) : (
                  <AnimatePresence initial={false}>
                    {messages.map((msg) => {
                      const isMine =
                        msg.senderId?._id === currentUser?._id ||
                        msg.senderId === currentUser?._id;
                      return (
                        <MessageBubble
                          key={msg._id || Math.random()}
                          msg={msg}
                          isMine={isMine}
                        />
                      );
                    })}
                  </AnimatePresence>
                )}
                <div ref={bottomRef} />
              </div>

              {/* Input bar */}
              <div
                className="px-4 py-3 shrink-0"
                style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
              >
                <div className="flex items-center gap-2">
                  <div
                    className="flex-1 relative rounded-2xl transition-all duration-200"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.09)",
                    }}
                  >
                    <input
                      ref={inputRef}
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      onKeyDown={handleKey}
                      placeholder={`Message ${getPartner(activeMatch)?.firstName || ""}…`}
                      className="w-full bg-transparent px-4 py-3 text-sm outline-none rounded-2xl placeholder:text-slate-600"
                      style={{ color: "#e2e8f0" }}
                      onFocus={(e) => {
                        e.currentTarget.parentElement.style.borderColor =
                          "rgba(124,58,237,0.5)";
                        e.currentTarget.parentElement.style.boxShadow =
                          "0 0 0 1px rgba(124,58,237,0.25), 0 0 14px rgba(124,58,237,0.1)";
                      }}
                      onBlur={(e) => {
                        e.currentTarget.parentElement.style.borderColor =
                          "rgba(255,255,255,0.09)";
                        e.currentTarget.parentElement.style.boxShadow = "none";
                      }}
                    />
                  </div>

                  <motion.button
                    whileHover={
                      text.trim()
                        ? {
                            scale: 1.08,
                            boxShadow: "0 0 20px rgba(124,58,237,0.5)",
                          }
                        : {}
                    }
                    whileTap={text.trim() ? { scale: 0.92 } : {}}
                    onClick={sendMessage}
                    disabled={!text.trim() || sending}
                    className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-200"
                    style={{
                      background: text.trim()
                        ? "linear-gradient(135deg,#7c3aed,#4f46e5)"
                        : "rgba(255,255,255,0.04)",
                      border: text.trim()
                        ? "1px solid rgba(124,58,237,0.4)"
                        : "1px solid rgba(255,255,255,0.08)",
                      color: text.trim() ? "#fff" : "rgba(100,116,139,0.4)",
                      boxShadow: text.trim()
                        ? "0 0 12px rgba(124,58,237,0.3)"
                        : "none",
                      cursor: text.trim() ? "pointer" : "not-allowed",
                    }}
                  >
                    {sending ? (
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
                    ) : (
                      <HiOutlinePaperAirplane className="text-sm" />
                    )}
                  </motion.button>
                </div>
                <p
                  className="text-[10px] mt-1.5 text-center"
                  style={{ color: "rgba(100,116,139,0.35)" }}
                >
                  Press Enter to send
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Matches;
