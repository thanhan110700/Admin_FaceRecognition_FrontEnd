const sessionState = {
  getState: (key) => {
    const localKey = sessionStorage.getItem(key);
    try {
      return JSON.parse(localKey);
    } catch {
      // Not JSON
      return localKey;
    }
  },
  set: (key, value) => {
    if (typeof value === 'object' || Array.isArray(value)) {
      sessionStorage.setItem(key, JSON.stringify(value));
      return;
    }
    sessionStorage.setItem(key, value);
  },
  remove: (key) => sessionStorage.removeItem(key),
  clear: () => sessionStorage.clear(),
};

export default sessionState;
