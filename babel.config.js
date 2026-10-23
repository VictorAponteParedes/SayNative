module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@': './src',
          '@components': './src/components',
          '@features': './src/features',
          '@navigation': './src/navigation',
          '@theme': './src/theme',
          '@store': './src/store',
          '@lang': './src/lang',
        },
      },
    ],
  ],
};
