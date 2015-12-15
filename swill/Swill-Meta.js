/// ##### Part of the **[retold](https://stevenvelozo.github.io/retold/)** system
/**
* @license MIT
* @author <steven@velozo.com>
*/
var libRunSequence = require('run-sequence');

/**
* Meta Tasks for the standard build actions
*
* @class metaTasks
*/
var metaTasks = function(pFable)
{
	// ### TASK: Build and stage the full application
	pFable.gulp.task
	(
		'build',
		['less', 'site-copy', 'asset-copy', 'dependencies', 'scriptcompile']
	);

	// ### TASK: Clean, then build and stage the full application
	pFable.gulp.task
	(
		'build-clean',
		['clean'],
		function (pCallback)
		{
			// This works like async waterfall, but allows you to pass in gulp tasks.
			libRunSequence
				(
					'build',
					pCallback
				);
		}
	);

	// ### TASK: Build and stage the full application for debug
	pFable.gulp.task
	(
		'build-debug',
		['less-debug', 'site-copy-debug', 'asset-copy', 'dependencies-debug', 'scriptcompile-debug']
	);
};

module.exports = metaTasks;