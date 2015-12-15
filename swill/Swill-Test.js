/// ##### Part of the **[retold](https://stevenvelozo.github.io/retold/)** system
/**
* @license MIT
* @author <steven@velozo.com>
*/

/**
* Testing and Linting Tasks
*
* @class testTasks
*/
var testTasks = function(pFable)
{
	// ### TASK: Run all unit tests
	pFable.gulp.task
	(
		'test',
		function()
		{
			var Mocha = require('gulp-mocha');

			// Execute tasks
			pFable.gulp.src(pFable.settings.Tests.Mocha)
				.pipe
				(
					Mocha
					({
						ui: 'tdd',
						reporter: 'spec'
					})
				)
				.on
				(
					'error',
					function()
					{
						console.log('Something blew up during unit tests.');
					}
				);
		}
	);

	// ### TASK: Run all unit tests with the brief reporter
	pFable.gulp.task
	(
		'test-brief',
		function()
		{
			var Mocha = require('gulp-mocha');

			// Execute tasks
			pFable.gulp.src(pFable.settings.Tests.Mocha)
				.pipe
				(
					Mocha
					({
						ui: 'tdd'
					})
				)
				.on
				(
					'error',
					function()
					{
						console.log('Something blew up during unit tests.');
					}
				);
		}
	);

	// ### TASK: Lint the JS with jshint
	pFable.gulp.task
	(
		'lint',
		function()
		{
			var JSHint = require('gulp-jshint');


			pFable.gulp.src(pFable.settings.Scripts.Source.concat(pFable.settings.Scripts.LintIgnore))
				.pipe(JSHint())
				.pipe(JSHint.reporter('jshint-stylish'));
		}
	);
};

module.exports = testTasks;