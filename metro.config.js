const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/** @type {import('metro-config').ConfigT} */
const defaultConfig = getDefaultConfig(__dirname);

/** @type {import('metro-config').ConfigT} */
const svgConfig = {
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
  resolver: {
    assetExts: defaultConfig.resolver.assetExts.filter(ext => ext !== 'svg'),
    sourceExts: [...defaultConfig.resolver.sourceExts, 'svg'],
  },
};

module.exports = mergeConfig(defaultConfig, svgConfig);
