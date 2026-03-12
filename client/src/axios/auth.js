import api from "./axios"

export const googleAuth = () => {
  return api.post("/auth/google")
}