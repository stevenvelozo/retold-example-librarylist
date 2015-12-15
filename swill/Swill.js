// ##### Part of the **[retold](https://stevenvelozo.github.io/retold/)** system
/**
* @license MIT
* @author <steven@velozo.com>
*/

/**
* Swill Web Site Build File
*
* @class Swill
* @constructor
*/
var Swill = function()
{
	var createNew = function(pSettings)
	{
		// If the API user passed in seettings, use them.
		var tmpSettings = (typeof(pSettings) === 'object') ? pSettings : {};

		// Restify for the routing and API serving
		var libGulp = require('gulp');

		// Default Settings
		var _SettingsDefaults = require('./Swill-Settings-Defaults.js')((typeof(tmpSettings.SwillRoot) !== 'undefined') ? tmpSettings.SwillRoot : __dirname+'/../');

		var _Fable = require('fable').new(tmpSettings);
		// Merge in default settings
		_Fable.settingsManager.fill(_SettingsDefaults);

		// Now add the gulp object to fable
		_Fable.gulp = libGulp;

		// Load the task sets
		require('./Swill-Test.js')(_Fable);
		require('./Swill-Clean.js')(_Fable);
		require('./Swill-Run.js')(_Fable);
		require('./Swill-Build.js')(_Fable);
		require('./Swill-Meta.js')(_Fable);
		require('./Swill-Watchers.js')(_Fable);


		// Define the default task for gulp
		libGulp.task ('default', ['test', 'lint']);

		// Add a dependency to the configuration
		var addDependencyCopy = function(pOptions)
		{
			if ((typeof(pOptions) !== 'object') || !pOptions.hasOwnProperty('Input') || !pOptions.hasOwnProperty('Output'))
			{
				_Fable.log.error('Attempt to create a dependency copy operation with an invalid options argument.  Options must be an object with at least Input and Output properties.')
				return false;
			}

			// If the user passed in a hash, use that.  Otherwise generate a unique hash.
			var tmpDependencyHash = (pOptions.hasOwnProperty('Hash')) ? pOptions.Hash : 'HASH_'+_Fable.getUUID();

			_Fable.settings.Dependencies.Input[tmpDependencyHash] = pOptions.Input;
			_Fable.settings.Dependencies.Output[tmpDependencyHash] = pOptions.Output;

			// The debug versions are usually not the minified.
			if (pOptions.hasOwnProperty('InputDebug'))
			{
				 _Fable.settings.Dependencies.InputDebug[tmpDependencyHash] = pOptions.InputDebug;
			}
			else
			{
				 _Fable.settings.Dependencies.InputDebug[tmpDependencyHash] = pOptions.Input;
			}

			return true;
		};

		// Add an asset copy task
		var addAssetCopy = function(pOptions)
		{
			if ((typeof(pOptions) !== 'object') || !pOptions.hasOwnProperty('Input') || !pOptions.hasOwnProperty('Output'))
			{
				_Fable.log.error('Attempt to create an asset copy operation with an invalid options argument.  Options must be an object with at least Input and Output properties.')
				return false;
			}

			// If the user passed in a hash, use that.  Otherwise generate a unique hash.
			var tmpAssetHash = (pOptions.hasOwnProperty('Hash')) ? pOptions.Hash : 'HASH_'+_Fable.getUUID();

			_Fable.settings.Assets.Input[tmpAssetHash] = pOptions.Input;
			_Fable.settings.Assets.Output[tmpAssetHash] = pOptions.Output;
		};

		// Container Object for our Factory Pattern
		var tmpNewSwill = (
		{
			addDependencyCopy: addDependencyCopy,
			addAssetCopy: addAssetCopy,

			new: createNew
		});

		var getGulp = function() { return _Gulp; };
		Object.defineProperty(tmpNewSwill, 'gulp', {get: getGulp });

		// Add fable services to the object, for sharing with other modules.
		_Fable.addServices(tmpNewSwill);

		return tmpNewSwill;
	};

	return createNew();
};

module.exports = new Swill();
