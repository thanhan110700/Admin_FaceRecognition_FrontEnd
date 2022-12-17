const state = {
  getState: (key) => {
    const localKey = localStorage.getItem(key)
    try {
      return JSON.parse(localKey)
    } catch {
      // Not JSON
      return localKey
    }
  },
  set: (key, value) => {
    if (typeof value === 'object' || Array.isArray(value)) {
      localStorage.setItem(key, JSON.stringify(value))
      return
    }
    localStorage.setItem(key, value)
  },
  remove: (key) => localStorage.removeItem(key),
  clear: () => localStorage.clear(),
  setAuth(adminToken) {
    return this.set('token', adminToken)
  },
  getToken() {
    return this.getState('token')
  },
}

export default state
