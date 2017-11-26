const state = {
  url: getURL(),
};

const actions = {
  go: (state: any) => (url: string) => {
    if (url !== getURL()) {
      history.pushState({}, "", url);
    }
    if (url !== state.url) {
      return { url };
    }
    return undefined;
  },
};

function getURL() {
  const p = location.pathname;
  const s = location.search ? `?${location.search}` : "";
  const h = location.hash ? `#${location.hash}` : "";
  return `${p}${s}${h}`;
}

export const module = () => ({ state, actions });

export const routerListener = (actions: any) => {
  addEventListener("popstate", () => actions.router.go(getURL()));
  return actions;
};
