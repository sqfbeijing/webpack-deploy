const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const userSetting = require('./user-setting');
function resolve(dir) {
	return path.join(__dirname, dir);
}

const webpack_common_config = {
	entry: {
		app: './src/main.js',
		vendor: ['lodash', 'axios']
	},
	module: {
		rules: [
			{
				test: /\.(html)$/,
				use: {
					loader: 'html-loader',
					options: {
						attrs: ['img:src']
					}
				}
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader'
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: '3000',
							name: './img/[name].[hash:7].[ext]'
						}
					}
				]
			},
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader'
				}
			}
		]
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor'
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'manifest'
		}),
		new CleanWebpackPlugin(['dist']),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify(process.env.NODE_ENV)
			},
			AJAX_BASE_URL: process.env.NODE_ENV === 'production' ? JSON.stringify('http://production.com') : JSON.stringify('https://cnodejs.org/')
		})
	],
	output: {
		path: path.resolve(__dirname, 'dist/'),
		filename: 'js/[name].[hash].js'
	},
	resolve: {
		extensions: ['.js', '.vue', '.json'],
		alias: {
			vue$: 'vue/dist/vue.esm.js',
			'@': resolve('src')
		}
	}
};

// 处理html
userSetting.addHTMLPluginFromWebpackConfig(webpack_common_config, HtmlWebpackPlugin);

module.exports = webpack_common_config;
