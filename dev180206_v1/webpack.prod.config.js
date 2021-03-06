const resolve = require('path').resolve;
const merge = require('webpack-merge');
const common = require('./webpack.common.config.js');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ExtractStyleCommon = new ExtractTextPlugin('css/common.css');

module.exports = merge.smart(common, {
	plugins: [new UglifyJSPlugin(), ExtractStyleCommon],
	output: {
		// publicPath: 'http://test.htexam.net/', //服务器上线的资源路径，需要添加前缀
		// filename: 'js/[name].[chunkhash].js'
		filename: 'js/[name].js'
	},
	module: {
		rules: [
			{
				test: /\.less$/,
				include: resolve(__dirname, './src/less/common'),
				use: ExtractStyleCommon.extract({
					fallback: 'style-loader',
					use: ['css-loader', 'postcss-loader', 'less-loader'],
					publicPath: '../' // 解决css中图片路径的问题
				})
			}
		]
	}
});
