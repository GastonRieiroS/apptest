module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          extensions: ['.tsx', '.ts', '.js', '.json'],
          alias: {
            src: './src',
            '@components': './src/components',
            '@features': './src/features',
            '@services': './src/services',
            '@styles': './src/styles',
            '@utils': './src/utils'
          },
        },
      ],
    ],
  };
};
