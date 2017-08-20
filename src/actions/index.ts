export type Actions = {
  router: {
    set: (path: string) => { path: string };
    go: (path: string) => void;
  };
};

export const actions = {};
