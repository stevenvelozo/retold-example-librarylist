/// ##### Part of the **[retold](https://stevenvelozo.github.io/retold/)** system
/**
* @license MIT
* @author <steven@velozo.com>
*/
var libNodemon = require('nodemon');

/**
* Meta Tasks for the standard build actions
*
* @class runTasks
*/
var runTasks = function(pFable)
{
	////////////////////////////////////////////////////////////////////
	//////////////////////// Run the Application ///////////////////////
	//================================================================//

	/********************************************************
	 * TASK: Run the server, use nodemon to reload on change
	 */
	pFable.gulp.task
	(
		'run',
		function ()
		{
			Nodemon
			(
				{
					script: pFable.settings.ServerApplication,
					ext: 'js'
				}
			)
			.on('change', ['lint'])
			.on
			(
				'restart',
				function ()
				{
					console.log('The Node server has restarted!');
				}
			);
		}
	);
};

module.exports = runTasks;