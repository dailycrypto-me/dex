module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      // Exclude source map processing for problematic modules
      // webpackConfig.module.rules.forEach((rule) => {
      //   if (String(rule.test) === String(/\.(js|mjs|jsx|ts|tsx)$/)) {
      //     // Exclude specific modules from source map processing
      //     rule.exclude = [/node_modules\/walletlink\//, /node_modules\/xhr2-cookies\//];
      //   }
      // });
      webpackConfig.resolve.fallback = {
        ...webpackConfig.resolve.fallback, // if you already have some fallbacks
        "stream": require.resolve("stream-browserify"),
        "assert": require.resolve("assert"),
        "util": require.resolve("util"),
        "http": require.resolve("stream-http"),
        "https": require.resolve("https-browserify"),
        "os": require.resolve("os-browserify/browser")
        // other fallbacks you want to add
      };
      return webpackConfig;
    },
  },
};
