import { store } from "../redux/store";
import { logout } from "../redux/slices/AuthState";

const EXPIRATION_TIME = 30 * 60 * 1000; //this is hardcoded for now
let CHECK_INTERVAL = 30 * 60 * 1000; //this is hardcoded for now

export const validateToken = () => {
  const state = store.getState();
  const { isAuthenticated, timeLoggedIn } = state.auth;

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
    CHECK_INTERVAL = Math.min(timeUntilExpiration, CHECK_INTERVAL);

    setTimeout(validateToken, CHECK_INTERVAL);
  }
};

export const startTokenValidation = () => {
  setTimeout(validateToken, CHECK_INTERVAL);
};
