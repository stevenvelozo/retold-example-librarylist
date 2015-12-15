

var libSwill = require(__dirname+'/swill/Swill.js');

libSwill.addDependencyCopy({ Hash:'async', Output:'js/async.js', Input:'async/dist/async.min.js', InputDebug:'async/dist/async.js'});
libSwill.addDependencyCopy({ Hash:'backbone', Output:'js/backbone.js', Input:'backbone/backbone.min.js', InputDebug:'backbone/backbone.js'});
libSwill.addDependencyCopy({ Hash:'bootstrap', Output:'js/bootstrap.js', Input:'bootstrap/dist/js/bootstrap.min.js', InputDebug:'bootstrap/dist/js/bootstrap.min.js'});
libSwill.addDependencyCopy({ Hash:'jquery', Output:'js/jquery.js', Input:'jquery/dist/jquery.min.js', InputDebug:'jquery/dist/jquery.js'});
libSwill.addDependencyCopy({ Hash:'require', Output:'js/require.js', Input:'requirejs/require.js'});
libSwill.addDependencyCopy({ Hash:'underscore', Output:'js/underscore.js', Input:'underscore/underscore.min.js', InputDebug:'underscore/underscore.js'});

// Copy the bootstrap fonts into the web root
libSwill.addAssetCopy({Input:'bower_components/bootstrap/fonts/**/*.*', Output:'fonts/'});