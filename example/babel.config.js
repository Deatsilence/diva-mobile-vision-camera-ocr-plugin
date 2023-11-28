module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        extensions: ['.tsx', '.ts', '.js', '.json'],
        alias: {
          'vision-camera-ocr-plugin': '..',
        },
      },
    ],
    ['react-native-worklets-core/plugin'],
  ],
};
