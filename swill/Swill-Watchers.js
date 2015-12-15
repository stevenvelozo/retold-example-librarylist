/// ##### Part of the **[retold](https://stevenvelozo.github.io/retold/)** system
/**
* @license MIT
* @author <steven@velozo.com>
*/

/**
* Watcher Tasks for executing the standard build actions
*
* @class watcherTasks
*/
var watcherTasks = function(pFable)
{
	////////////////////////////////////////////////////////////////////
	//////////////////////// AUTOMATIC WATCHERS ////////////////////////
	//================================================================//

	/********************************************************
	 * TASK: Auto unit test on save
	 */
	pFable.gulp.task
	(
		'watch-test',
		function()
		{
			pFable.gulp.watch([pFable.settings.Scripts.Source], ['test']);
		}
	);

	/********************************************************
	 * TASK: Auto unit test on save
	 */
	pFable.gulp.task
	(
		'watch-test-brief',
		function()
		{
			pFable.gulp.watch([pFable.settings.Scripts.Source], ['test-brief']);
		}
	);

	/********************************************************
	 * TASK: Auto lint on save
	 */
	pFable.gulp.task
	(
		'watch-lint',
		function()
		{
			pFable.gulp.watch([pFable.settings.Scripts.Source], ['lint']);
		}
	);

	/********************************************************
	 * TASK: Auto debug-build on save
	 */
	pFable.gulp.task
	(
		'watch-scriptcompile-debug',
		function()
		{
			pFable.gulp.watch([pFable.settings.Scripts.Source], ['scriptcompile-debug']);
		}
	);

	/********************************************************
	 * TASK: Auto build the site/assets on save and livereload
	 */
	pFable.gulp.task
	(
		'watch-livesite',
		function()
		{
			pFable.gulp.watch([pFable.settings.CSS.SourceFiles, pFable.settings.Site.Source, pFable.settings.Site.Scripts], ['lint', 'less-debug', 'site-copy-debug', 'asset-copy']);
		}
	);


	pFable.gulp.task
	(
		'watch-livereload',
		function()
		{
			var libLiveReloadServer = require('gulp-livereload');
			libLiveReloadServer.listen();
			pFable.gulp.watch(
					[
						// This assumes index.html gets rebuilt during the build phase.
						pFable.settings.Site.Destination+pFable.settings.Site.FileName
					]
				)
				.on
				(
					'change',
					function(pFile)
					{
						// This is so it waits for build to complete...
						setTimeout(function(){libLiveReloadServer.changed(pFile.path);},500);
					}
				);
		}
	);

	pFable.gulp.task
	(
		'run-server',
		function()
		{
			var tmpWebServer = require(pFable.settings.ServerApplication);
		}
	);

	/********************************************************
	 * TASK: Do all the copying and magic when files change
	 */
	pFable.gulp.task
	(
		'develop',
		['watch-scriptcompile-debug', 'watch-livesite', 'watch-livereload', 'run-server']
	);
};

module.exports = watcherTasks;