import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { HiSparkles, HiArrowRight, HiEye, HiEyeSlash } from "react-icons/hi2";
import { TbBrandGithub, TbMail, TbLock } from "react-icons/tb";
import { FcGoogle } from "react-icons/fc";
import { BsShieldCheck } from "react-icons/bs";
import api from "../axios/axios";


function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [focused, setFocused] = useState("");

  const handleChange = (e) => {
    setError("");
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await api.post("/auth/login", form);
      console.log(res.data);
      navigate("/app");
    } catch (err) {
      setError(
        err.response?.data?.message || "Invalid email or password. Try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = (name) => ({
    background: "rgba(255,255,255,0.04)",
    border: `1px solid ${focused === name ? "rgba(124,58,237,0.5)" : "rgba(255,255,255,0.08)"}`,
    boxShadow:
      focused === name
        ? "0 0 0 1px rgba(124,58,237,0.3), 0 0 16px rgba(124,58,237,0.12)"
        : "none",
    transition: "border 0.2s, box-shadow 0.2s",
  });

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden"
      style={{ background: "#080810", fontFamily: "'DM Sans', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&family=Syne:wght@700;800&display=swap');
        .font-display { font-family: 'Syne', sans-serif; }
      `}</style>

      {/* Ambient glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          className="absolute top-0 right-1/4 w-96 h-96 rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, #4f46e5, transparent 65%)",
            filter: "blur(90px)",
          }}
        />
        <div
          className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full opacity-15"
          style={{
            background: "radial-gradient(circle, #0d9488, transparent 65%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, #7c3aed, transparent 65%)",
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

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-md"
      >
        <div
          className="relative rounded-3xl p-8"
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
          {/* Top accent shimmer */}
          <div
            className="absolute top-0 left-8 right-8 h-px rounded-full"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(79,70,229,0.7), rgba(124,58,237,0.6), rgba(13,148,136,0.5), transparent)",
            }}
          />

          {/* Logo + heading */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.4,
                delay: 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="inline-flex items-center justify-center w-12 h-12 rounded-2xl mb-4"
              style={{
                background:
                  "linear-gradient(135deg, #4f46e5, #7c3aed, #0d9488)",
                boxShadow: "0 0 24px rgba(79,70,229,0.5)",
              }}
            >
              <HiSparkles className="text-white text-xl" />
            </motion.div>

            <h2
              className="font-display text-2xl font-extrabold mb-1"
              style={{ color: "#f1f5f9" }}
            >
              Welcome back
            </h2>
            <p className="text-sm" style={{ color: "rgba(148,163,184,0.6)" }}>
              Log in to DevTinder and keep building.
            </p>
          </div>

          {/* OAuth buttons */}
          <div className="flex flex-col gap-2.5 mb-6">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              className="w-full flex items-center justify-center gap-3 py-3 rounded-2xl text-sm font-semibold"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#e2e8f0",
                transition: "background 0.2s, border-color 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
              }}
            >
              <FcGoogle className="text-lg shrink-0" />
              Continue with Google
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              className="w-full flex items-center justify-center gap-3 py-3 rounded-2xl text-sm font-semibold"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#e2e8f0",
                transition: "background 0.2s, border-color 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
              }}
            >
              <TbBrandGithub
                className="text-lg shrink-0"
                style={{ color: "#94a3b8" }}
              />
              Continue with GitHub
            </motion.button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div
              className="flex-1 h-px"
              style={{ background: "rgba(255,255,255,0.07)" }}
            />
            <span
              className="text-xs font-medium"
              style={{ color: "rgba(100,116,139,0.6)" }}
            >
              or continue with email
            </span>
            <div
              className="flex-1 h-px"
              style={{ background: "rgba(255,255,255,0.07)" }}
            />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Email */}
            <div className="relative rounded-xl" style={inputStyle("email")}>
              <TbMail
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm pointer-events-none"
                style={{
                  color:
                    focused === "email" ? "#a78bfa" : "rgba(100,116,139,0.6)",
                  transition: "color 0.2s",
                }}
              />
              <input
                name="email"
                placeholder="Email"
                type="email"
                value={form.email}
                onChange={handleChange}
                onFocus={() => setFocused("email")}
                onBlur={() => setFocused("")}
                className="w-full bg-transparent pl-10 pr-4 py-3 text-sm outline-none rounded-xl placeholder:text-slate-600"
                style={{ color: "#e2e8f0" }}
              />
            </div>

            {/* Password */}
            <div className="relative rounded-xl" style={inputStyle("password")}>
              <TbLock
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm pointer-events-none"
                style={{
                  color:
                    focused === "password"
                      ? "#a78bfa"
                      : "rgba(100,116,139,0.6)",
                  transition: "color 0.2s",
                }}
              />
              <input
                name="password"
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
                onFocus={() => setFocused("password")}
                onBlur={() => setFocused("")}
                className="w-full bg-transparent pl-10 pr-10 py-3 text-sm outline-none rounded-xl placeholder:text-slate-600"
                style={{ color: "#e2e8f0" }}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors duration-150"
                style={{ color: "rgba(100,116,139,0.5)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#a78bfa")}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(100,116,139,0.5)")
                }
              >
                {showPassword ? (
                  <HiEyeSlash className="text-sm" />
                ) : (
                  <HiEye className="text-sm" />
                )}
              </button>
            </div>

            {/* Forgot password */}
            <div className="flex justify-end -mt-1">
              <Link
                to="/forgot-password"
                className="text-xs transition-colors duration-150"
                style={{ color: "rgba(100,116,139,0.55)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#a78bfa")}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(100,116,139,0.55)")
                }
              >
                Forgot password?
              </Link>
            </div>

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -6, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -6, height: 0 }}
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

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={
                !loading
                  ? { scale: 1.02, boxShadow: "0 0 32px rgba(79,70,229,0.55)" }
                  : {}
              }
              whileTap={!loading ? { scale: 0.98 } : {}}
              className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-2xl text-sm font-bold mt-1"
              style={{
                background:
                  "linear-gradient(135deg, #4f46e5, #7c3aed, #0891b2)",
                boxShadow:
                  "0 0 24px rgba(79,70,229,0.35), inset 0 1px 0 rgba(255,255,255,0.12)",
                color: "#fff",
                opacity: loading ? 0.7 : 1,
                cursor: loading ? "not-allowed" : "pointer",
                transition: "opacity 0.2s",
              }}
            >
              {loading ? (
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
                  Signing in…
                </>
              ) : (
                <>
                  <HiSparkles className="text-sm" />
                  Log In
                  <HiArrowRight className="text-xs" />
                </>
              )}
            </motion.button>
          </form>

          {/* Trust line */}
          <div className="flex items-center justify-center gap-1.5 mt-4">
            <BsShieldCheck
              className="text-xs"
              style={{ color: "rgba(100,116,139,0.5)" }}
            />
            <span
              className="text-[11px]"
              style={{ color: "rgba(100,116,139,0.45)" }}
            >
              Secure login · Your data is safe
            </span>
          </div>

          {/* Sign up link */}
          <p
            className="text-sm text-center mt-5"
            style={{ color: "rgba(100,116,139,0.6)" }}
          >
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-semibold transition-colors duration-150"
              style={{ color: "#a78bfa" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#c4b5fd")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#a78bfa")}
            >
              Sign up free →
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default Login;
