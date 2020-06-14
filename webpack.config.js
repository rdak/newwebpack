const webpack = require("webpack");
const path = require("path");

const HtmlWebPackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
// const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
	output: {
		filename: "bundle.[name].js",
		path: path.resolve(__dirname, "dist"),
	},

	resolve: {
		// Add '.ts' and '.tsx' as resolvable extensions.
		extensions: [".ts", ".tsx", ".js", ".json"],
	},
	mode: "development",
	entry: {
		main: "./src/index.tsx",
	},

	// Enable sourcemaps for debugging webpack's output.
	devtool: "source-map",

	devServer: {
		port: 3000,
		compress: true,
		contentBase: path.resolve(__dirname, "dist"),
		index: "index.html",
		overlay: {
			warnings: true,
			errors: true,
		},
		historyApiFallback: true,
		hot: true,
	},

	module: {
		rules: [
			{
				test: /\.tsx?$/,
				exclude: "/node_modules",
				use: [
					{
						loader: "babel-loader",
						options: {
							cacheDirectory: true,
							babelrc: false,
							presets: [
								[
									"@babel/preset-env",
									{
										targets: {
											browsers: "last 2 versions",
										},
									},
								],
								"@babel/preset-react",
								"@babel/preset-typescript",
							],
							plugins: [],
						},
					},
				],
			},
			{
				test: /\.scss$/,
				use: [
					"style-loader",
					"css-loader",
					{
						loader: "postcss-loader",
						options: {
							ident: "postcss",
							plugins: [require("autoprefixer")],
						},
					},
					"sass-loader",
				],
			},

			{
				test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
				use: [
					{
						loader: "file-loader",
						options: {
							name: "[name].[ext]",
							outputPath: "fonts/",
							includePath: [
								"../node_modules/mdi",
								"../node_modules/flag-icon-css",
							],
						},
					},
				],
			},

			{
				test: /\.(gif|png|jpe?g)$/,
				use: [
					{
						loader: "url-loader",
						options: {
							limit: 8192,
							name: "[name].[ext]",
							outputPath: "media/",
							includePath: ["../media/"],
							mimetype: "image/png",
						},
					},
				],
			},
		],
	},

	plugins: [
		new ForkTsCheckerWebpackPlugin(),
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		// new CopyWebpackPlugin(copyArray),
		new HtmlWebPackPlugin({
			template: path.resolve(path.join(__dirname, "src", "index.html")),
			filename: "./index.html",
			title: "Beer",

			meta: {
				viewport: "width=device-width",
				"theme-color": "#02a2d6",
			},

			hash: true,
			minify: true,
		}),
	],
	watch: true,
};
