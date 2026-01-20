module.exports = function (api) {
  api.cache(true);
  return {
    presets: [['babel-preset-expo', { jsxImportSource: 'nativewind' }], 'nativewind/babel'],
    plugins: [
      [
        'module:react-native-dotenv',
        {
          moduleName: '@env',
          path: '.env',
        },
      ],
      [
        'babel-plugin-module-resolver', // Use the full name for clarity
        {
          root: ['./'],
          alias: {
            '@': './',
            'tailwind.config': './tailwind.config.js',
          },
        },
      ],
      'react-native-reanimated/plugin', // MUST be last
    ],
  };
};