/**
* LibraryList Server
*
* @license All Rights Reserved
*
* @author Steven Velozo <steven.velozo@docucluster.com>
*/


// Build the server settings
var libOrator = require('orator').new(
	{
		Product:'LibraryList',
		ProductVersion:require(__dirname+'/../package.json').version,

		MeadowSchemaFilePrefix: __dirname+'/../model/schema/meadow/LibraryList-MeadowSchema-',

		MeadowProvider:'MySQL',
		MySQL:
			{
				Server: "127.0.0.1",
				Port: 3306,
				User: "root",
				Password: "",
				Database: "retoldlibrarylist",
				ConnectionPoolLimit: 20
			},

		LogStreams:
			[
				{ level:'trace', streamtype:'process.stdout' },
				{ type:'rotating-file', period:'1h', level:'trace', path:'./Logs/Fable.log' }
			],

		MemcachedURL: "127.0.0.1:11211",
		SessionStrategy: "memcached",
		SessionTimeout: 900,

		ConfigFile:__dirname+'/../Server-Config.json'
	});

// Configure the static formatters in orator for ie compatibility
libOrator.setupStaticFormatters();

libOrator.enabledModules.CORS = true;
libOrator.enabledModules.FullResponse = true;
// Enable manual body parsing
libOrator.enabledModules.Body = false;
// GZip responses
//libOrator.settings.RestifyParsers.GZip = true;

// Server timeout of 20 seconds
libOrator.webServer.server.setTimeout(20000);

// Add a cookie handler
var libCookieParser = require('restify-cookies');
libOrator.webServer.use(libCookieParser.parse);

// Turn off cache (DANGEROUS? MAYBE.)
libOrator.webServer.pre
(
	function(pRequest, pResponse, fNext)
	{
		pResponse.setHeader('Cache-Control', 'no-cache');
		return fNext();
	}
);

// Mock a session for now
var mockSession = function(pRequest, pResponse, fNext)
{
	pRequest.SessionData = (
	{
		Version: libOrator.settings.ProductVersion,
		SessionID: 'MockSession',
		LoggedIn: true,
		UserRole: 'User',
		UserRoleIndex: 1,
		UserID: 1,
		CustomerID: 1,
		DeviceID: 'WEB-0xA92349',
		Title: 'Office Assistant',
		NameFirst: 'James',
		NameLast: 'Userington',
		Email: 'user@test.com'
	});
	fNext();
};
libOrator.webServer.use(mockSession);

// Markup the fable object with retold
var libRetold = require('retold');
var _Retold = libRetold.new(libOrator.fable);
Object.defineProperty(libOrator.fable, 'Retold',
	{
		get: function() { return _Retold; },
		enumerable: false
	});

// Logic Bundles
var _UserEndpoints = libOrator.fable.Retold.DALMacros.getMeadowEndpoints('User');
_UserEndpoints.connectRoutes(libOrator.webServer);
var _CustomerEndpoints = libOrator.fable.Retold.DALMacros.getMeadowEndpoints('Customer');
_CustomerEndpoints.connectRoutes(libOrator.webServer);

var _BookEndpoints = libOrator.fable.Retold.DALMacros.getMeadowEndpoints('Book');
_BookEndpoints.connectRoutes(libOrator.webServer);

// Map the staged web site to a static server on all other root requests
libOrator.addStaticRoute(__dirname+'/../stage/');

// Start the web server
libOrator.startWebServer();
