// ##### Part of the **[retold](https://stevenvelozo.github.io/retold/)** system
/**
* @license MIT
* @author <steven@velozo.com>
*/

/**
* Create sane Swill Settings
*
* @class createSettings
*/
var createSettings = function(pRootFolder)
{
	var tmpRootFolder = (typeof(pRootFolder) === 'string') ? pRootFolder : '';

	// Main settings object
	var tmpSettings = 
	{
		Product: 'Swill',

		// LiveReload server
		LiveReload:
			{
				Address: '127.0.0.1',
				Port: 35729
			},

		ServerApplication: __dirname+'/Swill-StaticServer.js',
	};


	// Unit tests
	tmpSettings.Tests =
			{
				Mocha: tmpRootFolder+'test/*.js'
			};


	// Global build locations
	tmpSettings.Build =
			{
				Destination: tmpRootFolder+'stage/',
				Source: tmpRootFolder,
			};


	// Instrumentation (for getting inserted into the top of the HTML)
	tmpSettings.Instrumentation =
		{
			Production: tmpSettings.Build.Source+'Pict-ProductionInstrumentation.js',
			Development: tmpSettings.Build.Source+'Pict-DebugInstrumentation.js'
		};

	// CSS Less compilation
	tmpSettings.CSS =
			{
				Source: tmpRootFolder+'less/theme.less',
				SourceFiles: tmpRootFolder+'less/**/*.less',
				Destination: tmpSettings.Build.Destination + 'css/'
			};

	// Script compilation for the Pict requirejs app
	tmpSettings.Scripts =
			{
				SourceFolder: tmpRootFolder+'scripts/',

				Source: [tmpRootFolder+'scripts/**/**.*'],
				LintIgnore: ['!'+tmpRootFolder+'scripts/pict/dependencies/*.js'],

				TemporaryFolder: '/tmp/',
				TemporaryFolderClean: tmpSettings.Build.Destination+'scripts/tmp/',

				ScriptFileName: 'Application.js',

				Destination: tmpSettings.Build.Destination+'scripts/'
			};


	// Single-script in-browser dependencies
	tmpSettings.Dependencies =
			{
				Source: tmpRootFolder+'bower_components/',
				Destination: tmpSettings.Build.Destination,

				Output: {},
				Input: {},
				InputDebug: {}
			};




	// Any other assets (images, fonts, full libraries, etc.)
	tmpSettings.Assets =
			{
				Source: tmpRootFolder,
				Destination: tmpSettings.Build.Destination,

				Output: {},
				Input: {}
			};


	// Site agglomeration configuration
	tmpSettings.Site =
			{
				Source: tmpRootFolder+'html/**/*.*',

				Head: tmpRootFolder+'html/index-head.html',
				Partials:
					[
						tmpRootFolder+'html/templates/**/*.html',
						tmpRootFolder+'html/static/**/*.html',
						tmpRootFolder+'html/pict/**/*.html',
						tmpRootFolder+'html/recordsets/**/*.html'
					],
				Tail: tmpRootFolder+'html/index-tail.html',

				FileName: 'index.html',

				Scripts: tmpRootFolder+'scripts/**/*.js',

				Destination: tmpSettings.Build.Destination
			};

	return tmpSettings;
}

module.exports = createSettings;