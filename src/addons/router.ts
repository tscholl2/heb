import { IReducer } from "../controller";

export const initialState = {
  path: getCurrentPath(),
};

export type IState = typeof initialState;

export const go = (path: string): IReducer<IState> => state => {
  if (path !== getCurrentPath()) {
    history.pushState({}, "", path);
  }
  return path !== state.path ? { path } : state;
};

/**
 * Register a listener that gets called whenever that path changes.
 * Only *one* listener can be active at a time.
 * Hot-reloading may add lots of new listeners(?), so we only keep one at a time.
 * Typically this should only run once.
 *
 * @param {function}
 */
let oldListener: any;
export function addListener(listener: (path: string) => void) {
  if (oldListener) removeEventListener("popstate", oldListener);
  oldListener = () => listener(getCurrentPath());
  addEventListener("popstate", oldListener);
}

/**
 * Returns the url the browser is currently at.
 */
function getCurrentPath() {
  return `${window.location.pathname}${window.location.search}${window.location.hash}`;
}
