/// ##### Part of the **[retold](https://stevenvelozo.github.io/retold/)** system
/**
* @license MIT
* @author <steven@velozo.com>
*/
var libLess = require('gulp-less');
var libMinifyCSS = require('gulp-minify-css');

// For building the single-page web app
var libConcat = require('gulp-concat');
var libReplace = require('gulp-replace');
var libTemplate = require('gulp-html-replace');
var libHTMLHint = require("gulp-htmlhint");

// For loading instrumentation if it exists
var libFS = require('fs');
var libDel = require('del');

// For building the Javascript App
var libRequirejs = require('gulp-requirejs');
var libUglify = require('gulp-uglify');
// The Closure Compiler does not work with this module as of node 5.x release
//var libClosureCompiler = require('gulp-closure-compiler');
var libRename = require('gulp-rename');
var libRunSequence = require('run-sequence');

/**
* Testing and Linting Tasks
*
* @class buildTasks
*/
var buildTasks = function(pFable)
{
	// ### TASK: Compile CSS with the less compiler and minify
	pFable.gulp.task
	(
		'less',
		function ()
		{
			pFable.gulp.src(pFable.settings.CSS.Source)
				.pipe(libLess())
				.pipe(libMinifyCSS
						(
						{
							// * for keeping all (default), 1 for keeping first one, 0 for removing all
							keepSpecialComments: 0,
							keepBreaks: false,
							removeEmpty: true,
							debug: false
						}
						))
				.pipe(pFable.gulp.dest(pFable.settings.CSS.Destination));
		}
	);

	// ### TASK: Compile CSS with the less compiler
	pFable.gulp.task
	(
		'less-debug',
		function ()
		{
			pFable.gulp.src(pFable.settings.CSS.Source)
				.pipe(libLess())
			.on
				(
					'error',
					function(pError)
					{
						console.log('Something blew up during Less CSS compilation.');
						console.log('Error: '+pError);
					}
				)
				.pipe(pFable.gulp.dest(pFable.settings.CSS.Destination));
		}
	);

	// ### TASK: Copy the Site (HTML)
	pFable.gulp.task
	(
		'site-copy',
		function ()
		{
			libFS.readFile(pFable.settings.Instrumentation.Production, 'utf8',
				function (pError, pData)
				{
					var tmpInstrumentation = '';
					if (pError)
					{
						// We expect it to not exist.
					}
					else
					{
						// This instance has instrumentation code setup, include it in the build.
						tmpInstrumentation = pData;
					}

					// Build the array of source files
					var tmpHTMLSourceGlob = [pFable.settings.Site.Head].concat(pFable.settings.Site.Partials)
					tmpHTMLSourceGlob.push(pFable.settings.Site.Tail);

					pFable.gulp.src(tmpHTMLSourceGlob)
						.pipe(libConcat(pFable.settings.Site.FileName))
						.pipe(libTemplate
								(
									{
										// Eliminate the livereload from the release build
										livereload: {src: ' ', tpl: '%s'}
									},
									{keepUnassigned: true}
								)
						)
						.pipe(libReplace('VERSION', pFable.settings.ProductVersion))
						.pipe(libReplace('INSTRUMENTATIONCODE', tmpInstrumentation))
						.pipe(pFable.gulp.dest(pFable.settings.Site.Destination));
				});
		}
	);

	// ### TASK: Copy the Site (HTML) in debug mode
	pFable.gulp.task
	(
		'site-copy-debug',
		function ()
		{
			libFS.readFile(pFable.settings.Instrumentation.Development, 'utf8',
				function (pError, pData)
				{
					var tmpInstrumentation = '';
					if (pError)
					{
						// We expect it to not exist.
					}
					else
					{
						// This instance has instrumentation code setup, include it in the build.
						tmpInstrumentation = pData;
					}

					// Build the array of source files
					var tmpHTMLSourceGlob = [pFable.settings.Site.Head].concat(pFable.settings.Site.Partials)
					tmpHTMLSourceGlob.push(pFable.settings.Site.Tail);

					pFable.gulp.src(tmpHTMLSourceGlob)
						.pipe(libConcat(pFable.settings.Site.FileName))
						.pipe(libTemplate
								(
									{
										// Eliminate the livereload from the release build
										instrumentation: {src: ' ', tpl: '%s'}
									},
									{keepUnassigned: true}
								)
						)
						.pipe(libReplace('VERSION', pFable.settings.ProductVersion+'-D'))
						.pipe(libReplace('LIVERELOADSERVERADDRESS', pFable.settings.LiveReload.Address))
						.pipe(libReplace('LIVERELOADSERVERPORT', pFable.settings.LiveReload.Port))
						.pipe(libHTMLHint())
						.pipe(libHTMLHint.reporter())
						.pipe(pFable.gulp.dest(pFable.settings.Site.Destination));
				});
		}
	);

	// ### TASK: Copy Assets
	pFable.gulp.task
	(
		'asset-copy',
		function ()
		{
			// Basic sentence: ForEach ASSET_TO_OUTPUT Copy ASSET_SOURCE While Renaming to ASSET_OUTPUT_NAME
			for (var tmpAssetName in pFable.settings.Assets.Output)
				if (typeof(pFable.settings.Assets.Input[tmpAssetName]) === 'undefined')
					// Show a message maybe that this asset isn't supported.
					console.log('Asset '+tmpAssetName+' is in list of expected outputs without a valid input.');
				else
					pFable.gulp.src(pFable.settings.Assets.Source+pFable.settings.Assets.Input[tmpAssetName])
						.pipe(pFable.gulp.dest(pFable.settings.Assets.Destination+pFable.settings.Assets.Output[tmpAssetName]));
		}
	);

	// ### TASK: Copy Dependencies
	pFable.gulp.task
	(
		'dependencies',
		function ()
		{
			// Basic sentence: ForEach DEPENDENCY_TO_OUTPUT Copy DEPENDENCY_SOURCE While Renaming to DEPENDENCY_OUTPUT_NAME
			for (var tmpDependencyName in pFable.settings.Dependencies.Output)
				if (typeof(pFable.settings.Dependencies.Input[tmpDependencyName]) === 'undefined')
					// Show a message maybe that this dependency isn't supported.
					console.log('Dependency '+tmpDependencyName+' is in list of expected outputs without a valid input.');
				else
					// This allows us to skip dependencies that are debug only.
					if (pFable.settings.Dependencies.Input[tmpDependencyName])
						pFable.gulp.src(pFable.settings.Dependencies.Source+pFable.settings.Dependencies.Input[tmpDependencyName])
							.pipe(libRename(pFable.settings.Dependencies.Output[tmpDependencyName]))
							.pipe(pFable.gulp.dest(pFable.settings.Dependencies.Destination));
		}
	);

	// ### TASK: Copy Dependencies (debug mode)
	pFable.gulp.task
	(
		'dependencies-debug',
		function ()
		{
			// Basic sentence: ForEach DEPENDENCY_TO_OUTPUT Copy DEPENDENCY_SOURCE While Renaming to DEPENDENCY_OUTPUT_NAME
			for (var tmpDependencyName in pFable.settings.Dependencies.Output)
				if (typeof(pFable.settings.Dependencies.Input[tmpDependencyName]) === 'undefined')
					// Show a message maybe that this dependency isn't supported.
					console.log('Dependency '+tmpDependencyName+' is in list of expected outputs without a valid debug input.');
				else
					// This allows us to skip dependencies that are release only.
					if (pFable.settings.Dependencies.InputDebug[tmpDependencyName])
						pFable.gulp.src(pFable.settings.Dependencies.Source+pFable.settings.Dependencies.InputDebug[tmpDependencyName])
							.pipe(libRename(pFable.settings.Dependencies.Output[tmpDependencyName]))
							.pipe(pFable.gulp.dest(pFable.settings.Dependencies.Destination));
		}
	);

	// ### TASK: Build the scripts
	pFable.gulp.task
	(
		'scriptcompile',
		function()
		{
			libRequirejs
				({
					name: 'Application',
					baseUrl: pFable.settings.Scripts.SourceFolder,
					out: pFable.settings.Scripts.TemporaryFolder+pFable.settings.Scripts.ScriptFileName,
					shim: { }
				})
				// Pipe it to a temporary file
				.pipe(pFable.gulp.dest(pFable.settings.Scripts.Destination+pFable.settings.Scripts.TemporaryFolder+pFable.settings.Scripts.ScriptFileName))
				// Compress it with uglify
				.pipe(libUglify())
				// Now pipe it to the final destination
				.pipe(pFable.gulp.dest(pFable.settings.Scripts.Destination+pFable.settings.Scripts.ScriptFileName));
		}
	);


/*
	// ### TASK: Cleanup cruft from javascript compiler/uglifier/minifier
	pFable.gulp.task
	(
		'scriptcompile-cleanup',
		function()
		{
			return libDel([pFable.settings.Scripts.TemporaryFolderClean]);
		}
	)

	// ### TASK: Build/uglify the scripts then cleanup the mess
	pFable.gulp.task
	(
		'scriptcompile',
		['scriptcompile-uglify'],
		function (pCallback)
		{
			// This works like async waterfall, but allows you to pass in gulp tasks.
			libRunSequence
				(
					'scriptcompile-cleanup',
					pCallback
				);
		}
	);
*/

	// ### TASK: Build the scripts with debug info.
	pFable.gulp.task
	(
		'scriptcompile-debug',
		function()
		{
			// Use the "copy compiler" in debug mode.  Yay for Requirejs.
			pFable.gulp.src(pFable.settings.Scripts.Source)
				.pipe(pFable.gulp.dest(pFable.settings.Scripts.Destination));
		}
	);
};

module.exports = buildTasks;
