// import Cookie from 'vue-cookie'
import GLOBAL_CONST from '@/config/const'

const TOKEN_KEY = GLOBAL_CONST.token.tokenKey

function getToken () {
  return sessionStorage.getItem(TOKEN_KEY)
}

function setToken (token) {
  sessionStorage.setItem(TOKEN_KEY, token, 7)
}

function removeToken () {
  sessionStorage.removeItem(TOKEN_KEY)
}

export {
  getToken,
  setToken,
  removeToken
}
