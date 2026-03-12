import api from "./axios"


export const getFeed = () => {
  return api.get("/user/feed")
}

// export const getProfile = () => {
//     return api.get
// }

export const getUserStats = () => {
  return api.get("/user/stats")
}

