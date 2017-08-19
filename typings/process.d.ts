declare const process: {
  env: {
    NODE_ENV: "development" | "production" | "bundle-analyzer";
    BUILD_TIME: string;
    COMMIT: string;
  };
};
