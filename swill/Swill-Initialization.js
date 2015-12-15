Path.Dependencies.Output =
	{
		require: 'js/require.js',
		underscore: 'js/underscore.js',
		bootstrapjs: 'js/bootstrap.js',
		bootstrappopoverx: 'js/bootstrap-popoverx.js',
		bootbox: 'js/bootbox.js',
		jquery: 'js/jquery.js',
		jquerysparkline: 'js/jquery-sparkline.js',
		jqueryzoom: 'js/jquery-zoom.js',
		jquerycookie: 'js/jquery.cookie.js',
		bootstrappopoverxcss: 'css/bootstrap-popover-x.css',
		date: 'js/date.js',
		moment: 'js/moment.js',
		momenttimezone: 'js/moment-timezone.js',
		autonumeric: 'js/autonumeric.js',
		dropzone: 'js/dropzone.js',
		marked: 'js/marked.js',
		proj4: 'js/proj4.js',
		purl: 'js/purl.js',
		excanvas: 'js/excanvas.js',
		mousetrap: 'js/mousetrap.js'
	};
Path.Dependencies.Input =
	{
		require: Path.Dependencies.Source + 'requirejs/require-2.1.11.min.js',
		underscore: Path.Dependencies.Source + 'underscore/underscore-min.js',
		bootstrapjs: Path.Dependencies.Source + 'bootstrap/js/bootstrap.min.js',
		bootstrappopoverx: Path.Dependencies.Source + 'bootstrap-popover-x/js/bootstrap-popover-x.js',
		bootbox: Path.Dependencies.Source + 'bootbox/bootbox.min.js',
		jquery: Path.Dependencies.Source + 'jquery/jquery-2.1.0.min.js',
		jquerysparkline: Path.Dependencies.Source + 'jquery-sparkline/jquery.sparkline.min.js',
		jqueryzoom: Path.Dependencies.Source + 'jquery-zoom/jquery.zoom.min.js',
		jquerycookie: Path.Dependencies.Source + 'jquery-cookie/jquery.cookie.js',
		bootstrappopoverxcss: Path.Dependencies.Source + 'bootstrap-popover-x/css/bootstrap-popover-x.min.css',
		date: Path.Dependencies.Source + 'date/date.min.js',
		moment: Path.Dependencies.Source + 'moment/moment.min.js',
		momenttimezone: Path.Dependencies.Source + 'moment-timezone/moment-timezone-with-data.min.js',
		autonumeric: Path.Dependencies.Source + 'autonumeric/autoNumeric.js',
		dropzone: Path.Dependencies.Source + 'dropzone/dropzone.js',
		marked: Path.Dependencies.Source + 'marked/marked.js',
		proj4: Path.Dependencies.Source + 'proj4/proj4.js',
		purl: Path.Dependencies.Source + 'purl/purl.js',
		excanvas: Path.Dependencies.Source + 'excanvas/excanvas.min.js',
		mousetrap: Path.Dependencies.Source + 'mousetrap/mousetrap.js'
	};
Path.Dependencies.InputDebug =
	{
		require: Path.Dependencies.Source + 'requirejs/require-2.1.11.js',
		underscore: Path.Dependencies.Source + 'underscore/underscore.js',
		bootstrapjs: Path.Dependencies.Source + 'bootstrap/js/bootstrap.js',
		bootstrappopoverx: Path.Dependencies.Source + 'bootstrap-popover-x/js/bootstrap-popover-x.js',
		bootbox: Path.Dependencies.Source + 'bootbox/bootbox.js',
		jquery: Path.Dependencies.Source + 'jquery/jquery-2.1.0.js',
		jquerysparkline: Path.Dependencies.Source + 'jquery-sparkline/jquery.sparkline.js',
		jqueryzoom: Path.Dependencies.Source + 'jquery-zoom/jquery.zoom.js',
		jquerycookie: Path.Dependencies.Source + 'jquery-cookie/jquery.cookie.js',
		bootstrappopoverxcss: Path.Dependencies.Source + 'bootstrap-popover-x/css/bootstrap-popover-x.css',
		date: Path.Dependencies.Source + 'date/date.js',
		moment: Path.Dependencies.Source + 'moment/moment.js',
		momenttimezone: Path.Dependencies.Source + 'moment-timezone/moment-timezone-with-data.js',
		autonumeric: Path.Dependencies.Source + 'autonumeric/autoNumeric.js',
		dropzone: Path.Dependencies.Source + 'dropzone/dropzone.js',
		marked: Path.Dependencies.Source + 'marked/marked.js',
		proj4: Path.Dependencies.Source + 'proj4/proj4.js',
		purl: Path.Dependencies.Source + 'purl/purl.js',
		excanvas: Path.Dependencies.Source + 'excanvas/excanvas.min.js',
		mousetrap: Path.Dependencies.Source + 'mousetrap/mousetrap.min.js',
	};
Path.Site =
	{
		Source: './html/**/*.html',
		Head: './html/index-head.html',
		Templates: './html/templates/**/*.html',
		Static: './html/static/**/*.html',
		Pict: './html/pict/**/*.html',
		RecordSets: './html/recordsets/**/*.html',
		Tail: './html/index-tail.html',
		FileName: 'index.html',
		Scripts: './scripts/**/*.js',
		Destination: Path.Build.Destination
	};
Path.CSS =
	{
		Source: './less/theme.less',
		SourceFiles: './less/**/*.less',
		Destination: Path.Build.Destination + 'css/'
	};
Path.Assets =
	{
		Source: './assets/',
		Destination: Path.Build.Destination
	};
Path.Assets.Output =
	{
		fonts: 'fonts',
		images: 'images',
		favicon: '.',
		select2: 'dependencies/js/select2',
		editor: 'dependencies/js/editor',
		dropzone: 'dependencies/js/dropzone',
		leaflet: 'dependencies/js/leaflet',
		leafletawesomemarkers: 'dependencies/js/leaflet-awesomemarkers',
		leafletlabel: 'dependencies/js/leaflet-label',
		leafletmarkercluster: 'dependencies/js/leaflet-markercluster',
		bootstrapdatetimepicker: 'dependencies/js/bootstrap-datetimepicker',
		jqueryui: 'dependencies/js/jquery-ui',
		toastr: 'dependencies/js/toastr',
		c3: 'dependencies/js/c3',
		ping: 'ping'
	};
Path.Assets.Input =
	{
		fonts: Path.Assets.Source + 'fonts/**/*.*',
		fonts: Path.Assets.Source + 'fonts/**/*.*',
		images: Path.Assets.Source + 'images/**/*.*',
		favicon: Path.Assets.Source + 'favicon/**/*.*',
		select2: Path.Dependencies.Source + 'select2/**/*.*',
		editor: Path.Dependencies.Source + 'editor/**/*.*',
		dropzone: Path.Dependencies.Source + 'dropzone/**/*.*',
		leaflet: Path.Dependencies.Source + 'leaflet/**/*.*',
		leafletawesomemarkers: Path.Dependencies.Source + 'leaflet-awesomemarkers/**/*.*',
		leafletlabel: Path.Dependencies.Source + 'leaflet-label/**/*.*',
		leafletmarkercluster: Path.Dependencies.Source + 'leaflet-markercluster/**/*.*',
		bootstrapdatetimepicker: Path.Dependencies.Source + 'bootstrap-datetimepicker/**/*.*',
		jqueryui: Path.Dependencies.Source + 'jquery-ui/**/*.*',
		toastr: Path.Dependencies.Source + 'toastr/**/*.*',
		c3: Path.Dependencies.Source + 'c3/**/*.*',
		ping: Path.Assets.Source + 'ping/**/*.*'
	};
