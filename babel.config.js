module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    ['module:react-native-dotenv'],
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '*': './src/*',
          '@store': './src/store',
          '@components': './src/components',
          '@screens': './src/screens',
          '@services': './src/services',
          '@models': './src/models',
          '@ui': './src/ui',
          '@hooks': './src/hooks',
          '@contexts': './src/contexts',
          '@utils': './src/utils',
        },
      },
    ],
  ],
};
