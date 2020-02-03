module.exports = {
    presets: [
    	[
			'@babel/preset-env',
			{
				modules: false,
				useBuiltIns: 'usage',
				debug: true,
					targets: {
						//browsers: ['last 2 versions']
						browsers: ['chrome>= 70', 'edge >= 17', 'ie >= 11', 'firefox >= 70']
					}
			}
		],
		'@babel/react',
		'@babel/typescript'
    ],
	'plugins': [
		'react-hot-loader/babel',
		'@babel/proposal-class-properties',
		'@babel/plugin-proposal-optional-chaining',
		['import', {
			libraryName: 'antd',
			style: 'css',
			libraryDirectory: 'lib'
		}]
	]
};
