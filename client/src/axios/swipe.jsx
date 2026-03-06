import api from "./axios"

export const likeUser = (userId) => {
  return api.post(`/swipe/like/${userId}`)
}

export const passUser = (userId) => {
  return api.post(`/swipe/pass/${userId}`)
}

