

var libSwill = require('swill');

libSwill.addDependencyCopy({ Hash:'async', Output:'js/async.js', Input:'async/dist/async.min.js', InputDebug:'async/dist/async.js'});
libSwill.addDependencyCopy({ Hash:'backbone', Output:'js/backbone.js', Input:'backbone/backbone.min.js', InputDebug:'backbone/backbone.js'});
libSwill.addDependencyCopy({ Hash:'bootstrap', Output:'js/bootstrap.js', Input:'bootstrap/dist/js/bootstrap.min.js', InputDebug:'bootstrap/dist/js/bootstrap.min.js'});
libSwill.addDependencyCopy({ Hash:'jquery', Output:'js/jquery.js', Input:'jquery/dist/jquery.min.js', InputDebug:'jquery/dist/jquery.js'});
libSwill.addDependencyCopy({ Hash:'require', Output:'js/require.js', Input:'requirejs/require.js'});
libSwill.addDependencyCopy({ Hash:'underscore', Output:'js/underscore.js', Input:'underscore/underscore.min.js', InputDebug:'underscore/underscore.js'});
libSwill.addDependencyCopy({ Hash:'mousetrap', Output:'js/mousetrap.js', Input:'mousetrap/mousetrap.min.js', InputDebug:'mousetrap/mousetrap.js'});
libSwill.addDependencyCopy({ Hash:'moment', Output:'js/moment.js', Input:'moment/min/moment-with-locales.min.js', InputDebug:'moment/moment.js'});
libSwill.addDependencyCopy({ Hash:'moment-timezone', Output:'js/moment-timezone.js', Input:'moment-timezone/builds/moment-timezone-with-data.min.js', InputDebug:'moment-timezone/moment-timezone.js'});

// Copy the bootstrap fonts into the web root
libSwill.addAssetCopy({Input:'bower_components/bootstrap/fonts/**/*.*', Output:'fonts/'});