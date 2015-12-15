/// ##### Part of the **[retold](https://stevenvelozo.github.io/retold/)** system
/**
* @license MIT
* @author <steven@velozo.com>
*/
var libDel = require('del');

/**
* Testing and Linting Tasks
*
* @class cleanTasks
*/
var cleanTasks = function(pFable)
{
	// ### TASK: Clean the build directory
	pFable.gulp.task
	(
		'clean',
		function()
		{
			return libDel([pFable.settings.Build.Destination]);
		}
	);

	// ### TASK: Clean the build scripts directory
	pFable.gulp.task
	(
		'clean-scripts',
		function()
		{
			return libDel([pFable.settings.Scripts.Destination]);
		}
	);
};

module.exports = cleanTasks;