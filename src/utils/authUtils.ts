import { store } from "../redux/store";
import { logout } from "../redux/slices/AuthState";

const EXPIRATION_TIME = 30 * 60 * 1000;
const CHECK_INTERVAL = 30 * 60 * 1000;

export const validateToken = () => {
  const state = store.getState();
  const { isAuthenticated, timeLoggedIn } = state.auth;
  console.log("isAuthenticated", isAuthenticated);
  console.log("timeLoggedIn", timeLoggedIn);
  if (isAuthenticated || timeLoggedIn) {
    if (!isAuthenticated || !timeLoggedIn) {
      store.dispatch(logout());
      return;
    }
  }

  if (!isAuthenticated || !timeLoggedIn) {
    return;
  }

  const currentTime = Date.now();
  const timeDiff = currentTime - Number.parseInt(timeLoggedIn);
  if (timeDiff > EXPIRATION_TIME) {
    store.dispatch(logout());
    return;
  } else {
    const timeUntilExpiration = EXPIRATION_TIME - timeDiff;
    const nextCheckDelay = Math.min(timeUntilExpiration, CHECK_INTERVAL);

    setTimeout(validateToken, nextCheckDelay);
  }
};

export const startTokenValidation = () => {
  setTimeout(validateToken, CHECK_INTERVAL);
};
