// /* global require:readonly, process:readonly, module:readonly */
// const postcssNormalize = require('postcss-normalize');
// const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const paths = require('react-scripts/config/paths');
// const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';
//
// const sassRegex = /\.common\.(scss|sass)$/;
// // const sassRegex = /\.(scss|sass)$/;
// const sassModuleRegex = /\.(scss|sass)$/;
//
// module.exports = (config, env) => {
//     const getStyleLoaders = (cssOptions, preProcessor) => {
//         const loaders = [
//             isEnvDevelopment && require.resolve('style-loader'),
//             isEnvProduction && {
//                 loader: MiniCssExtractPlugin.loader,
//                 options: shouldUseRelativeAssetPaths ? { publicPath: '../../' } : {},
//             },
//             {
//                 loader: require.resolve('css-loader'),
//                 options: cssOptions,
//             },
//             {
//                 // Options for PostCSS as we reference these options twice
//                 // Adds vendor prefixing based on your specified browser support in
//                 // package.json
//                 loader: require.resolve('postcss-loader'),
//                 options: {
//                     // Necessary for external CSS imports to work
//                     // https://github.com/facebook/create-react-app/issues/2677
//                     ident: 'postcss',
//                     plugins: () => [
//                         require('postcss-flexbugs-fixes'),
//                         require('postcss-preset-env')({
//                             autoprefixer: {
//                                 flexbox: 'no-2009',
//                             },
//                             stage: 3,
//                         }),
//                         // Adds PostCSS Normalize as the reset css with default options,
//                         // so that it honors browserslist config in package.json
//                         // which in turn let's users customize the target behavior as per their needs.
//                         postcssNormalize(),
//                     ],
//                     sourceMap: isEnvProduction && shouldUseSourceMap,
//                 },
//             },
//         ].filter(Boolean);
//         if (preProcessor) {
//             loaders.push({
//                 loader: require.resolve(preProcessor),
//                 options: {
//                     sourceMap: isEnvProduction && shouldUseSourceMap,
//                 },
//             });
//         }
//         return loaders;
//     };
//     const isEnvDevelopment = env === 'development';
//     const isEnvProduction = env === 'production';
//     const publicPath = isEnvProduction ? paths.servedPath : isEnvDevelopment && '/';
//     const shouldUseRelativeAssetPaths = publicPath === './';
//
//     config.module.rules.push(
//         {
//             test: /\.(js|mjs|jsx|ts|tsx)$/,
//             enforce: 'pre',
//             use: [
//                 {
//                     options: {
//                         formatter: require.resolve('react-dev-utils/eslintFormatter'),
//                         eslintPath: require.resolve('eslint'),
//                         // @remove-on-eject-begin
//                         baseConfig: {
//                             extends: [require.resolve('eslint-config-react-app')],
//                         },
//                         ignore: false,
//                         useEslintrc: true,
//                         // @remove-on-eject-end
//                     },
//                     loader: require.resolve('eslint-loader'),
//                 },
//             ],
//             include: paths.appSrc,
//         },
//
//         {
//             test: sassRegex,
//             // exclude: sassModuleRegex,
//             use: getStyleLoaders(
//                 {
//                     importLoaders: 2,
//                     sourceMap: isEnvProduction && shouldUseSourceMap,
//                 },
//                 'sass-loader'
//             ),
//             // Don't consider CSS imports dead code even if the
//             // containing package claims to have no side effects.
//             // Remove this when webpack adds a warning or an error for this.
//             // See https://github.com/webpack/webpack/issues/6571
//             sideEffects: true,
//         },
//         // Adds support for CSS Modules, but using SASS
//         // using the extension .module.scss or .module.sass
//         {
//             test: sassModuleRegex,
//             exclude: sassRegex,
//             use: getStyleLoaders(
//                 {
//                     importLoaders: 2,
//                     sourceMap: isEnvProduction && shouldUseSourceMap,
//                     modules: true,
//                     getLocalIdent: getCSSModuleLocalIdent,
//                 },
//                 'sass-loader'
//             ),
//         }
//     );
//     return config;
// };
