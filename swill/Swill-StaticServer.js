/**
* LibraryList Server
*
* @license MIT
*
* @author Steven Velozo <steven@velozo.com>
*/


// Build the server settings
var libOrator = require('orator').new(
	{
		Product:'Swill',
		ProductVersion:require(__dirname+'/../package.json').version
	});

// Map the staged web site to a static server on all other root requests
libOrator.addStaticRoute(__dirname+'/../stage/');

// Start the web server
libOrator.startWebServer();
