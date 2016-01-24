/**
 * Gulpfile.
 *
 * A simple implementation of Gulp.
 *
 * Implements:
 * 			1. Sass to CSS conversion
 * 			2. JS concatenation
 * 			3. Watch files
 *
 * @since 1.0.0
 * @author Ahmad Awais (@mrahmadawais)
 */

 /**
  * Configuration.
  *
  * Project Configuration for gulp tasks.
  *
  * Edit the variables as per your project requirements.
  */

var project             = 'WPGulpTheme'; // Project Name.
var projecturl          = 'wpgulp.dev'; // Project URL. Could be something like localhost:8888.
var tunnelname          = project.toLowerCase(); // Ignorable/Optional: tunnel name is lowercase of project if you choose to use it.


var styleSRC            = './assets/css/style.scss'; // Path to main .scss file
var styleDestination    = './'; // Path to place the compiled CSS file
// Defualt set to root folder


var jsVendorSRC         = './assets/js/vendors/*.js'; // Path to JS vendors folder
var jsVendorDestination = './assets/js/'; // Path to place the compiled JS vendors file
var jsVendorFile        = 'vendors'; // Compiled JS vendors file name
// Default set to vendors i.e. vendors.js


var jsCustomSRC         = './assets/js/custom/*.js'; // Path to JS custom scripts folder
var jsCustomDestination = './assets/js/'; // Path to place the compiled JS custom scripts file
var jsCustomFile        = 'custom'; // Compiled JS custom file name
// Default set to custom i.e. custom.js

// Watch files paths.
var styleWatchFiles     = './assets/css/**/*.scss'; // Path to all *.scss files inside css folder and inside them
var vendorJSWatchFiles  = './assets/js/vendors/*.js'; // Path to all vendors JS files
var customJSWatchFiles  = './assets/js/custom/*.js'; // Path to all custom JS files


/**
 * Load Plugins.
 *
 * Load gulp plugins and assing them semantic names.
 */
var gulp         = require('gulp'); // Gulp of-course

// CSS related plugins.
var sass         = require('gulp-sass'); // Gulp pluign for Sass compilation
var minifycss    = require('gulp-uglifycss'); // Minifies CSS files
var autoprefixer = require('gulp-autoprefixer'); // Autoprefixing magic
const AUTOPREFIXER_BROWSERS = [
    'last 2 version',
    '> 1%',
    'ie >= 9',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4',
    'bb >= 10'
  ]; // Browsers you care about for autoprefixing. Browserlist https://github.com/ai/browserslist


// JS related plugins.
var concat       = require('gulp-concat'); // Concatenates JS files
var uglify       = require('gulp-uglify'); // Minifies JS files

// Utility related plugins.
var rename      = require('gulp-rename'); // Renames files E.g. style.css -> style.min.css
var sourcemaps  = require('gulp-sourcemaps'); // Maps code in a compressed file (E.g. style.css) back to it’s original position in a source file (E.g. structure.scss, which was later combined with other css files to generate style.css)
var notify      = require('gulp-notify'); // Sends message notification to you
var browserSync = require('browser-sync').create(); // Reloads browser and injects CSS. Time-saving synchronised browser testing.
var reload      = browserSync.reload; // For manual browser reload.


/**
 * Task: `browser-sync`.
 *
 * Live Reloads, CSS injections, Localhost tunneling.
 *
 * This task does the following:
 * 		1.
 */
 gulp.task( 'browser-sync', function() {



 	browserSync.init( {

 		// Read here http://www.browsersync.io/docs/options/
 		proxy: projecturl,

 		// Use a specific port (instead of the one auto-detected by Browsersync).
 		// port: 3000,

 		// Tunnel the Browsersync server through a random Public URL
 		// E.g. http://randomstring23232.localtunnel.me
 		tunnel: true,

 		// Attempt to use the URL "http://project.localtunnel.me"
 		// It uses the project name in lowercase.
 		// This can be a cusotm subdomain
 		// E.g. "tunnel: myname," will be "http://myname.localtunnel.me"
 		tunnel: tunnelname,


 		// Inject CSS changes
 		injectChanges: true,

 		// Log information about changed files
 		// logFileChanges: true,

 		// Stop the browser from automatically opening
 		// open: false,


 	} );
 });


/**
 * Task: styles
 *
 * Compiles Sass, Autoprefixes it and Minifies CSS.
 *
 * This task does the following:
 * 		1. Gets the source scss file
 * 		2. Compiles Sass to CSS
 * 		3. Writes Sourcemaps for it
 * 		4. Autoprefixes it and generates style.css
 * 		5. Renames the CSS file with suffix .min.css
 * 		6. Minifies the CSS file and generates style.min.css
 * 		7. Injects CSS or reloads the browser via browserSync
 */
gulp.task('styles', function () {
 	gulp.src( styleSRC )
		.pipe( sourcemaps.init() )
		.pipe( sass( {
			errLogToConsole: true,
			outputStyle: 'compact',
			//outputStyle: 'compressed',
			// outputStyle: 'nested',
			// outputStyle: 'expanded',
			precision: 10
		} ) )
		.pipe( sourcemaps.write( { includeContent: false } ) )
		.pipe( sourcemaps.init( { loadMaps: true } ) )
		.pipe( autoprefixer( AUTOPREFIXER_BROWSERS ) )

		.pipe( sourcemaps.write ( styleDestination ) )
		.pipe( gulp.dest( styleDestination ) )


		.pipe( rename( { suffix: '.min' } ) )
		.pipe( minifycss( {
			maxLineLen: 10
		}))
		.pipe( gulp.dest( styleDestination ) )
		.pipe( browserSync.stream() )
		.pipe( notify( { message: 'TASK: "styles" Completed!', onLast: true } ) )
});


/**
 * Task: vendorJS
 *
 * Concatenate and uglify vendor JS scripts.
 *
 * This task does the following:
 * 		1. Gets the source folder for JS vendor files
 * 		2. Concatenates all the files and generates vendors.js
 * 		3. Renames the JS file with suffix .min.js
 * 		4. Uglifes/Minifies the JS file and generates vendors.min.js
 */
gulp.task( 'vendorsJs', function() {
	gulp.src( jsVendorSRC )
		.pipe( concat( jsVendorFile + '.js' ) )
		.pipe( gulp.dest( jsVendorDestination ) )
		.pipe( rename( {
			basename: jsVendorFile,
			suffix: '.min'
		}))
		.pipe( uglify() )
		.pipe( gulp.dest( jsVendorDestination ) )
		.pipe( notify( { message: 'TASK: "vendorsJs" Completed!', onLast: true } ) );
});


/**
 * Task: customJS
 *
 * Concatenate and uglify custom JS scripts.
 *
 * This task does the following:
 * 		1. Gets the source folder for JS custom files
 * 		2. Concatenates all the files and generates custom.js
 * 		3. Renames the JS file with suffix .min.js
 * 		4. Uglifes/Minifies the JS file and generates custom.min.js
 */
gulp.task( 'customJS', function() {
 	gulp.src( jsCustomSRC )
		.pipe( concat( jsCustomFile + '.js' ) )
		.pipe( gulp.dest( jsCustomDestination ) )
		.pipe( rename( {
			basename: jsCustomFile,
			suffix: '.min'
		}))
		.pipe( uglify() )
		.pipe( gulp.dest( jsCustomDestination ) )
		.pipe( notify( { message: 'TASK: "customJs" Completed!', onLast: true } ) );
});

 /**
  * Watch Tasks.
  *
  * Watches for file changes and runs specific tasks.
  */

 gulp.task( 'default', ['styles', 'vendorsJs', 'customJS', 'browser-sync'], function () {
 	gulp.watch( styleWatchFiles, [ 'styles' ] );
 	gulp.watch( vendorJSWatchFiles, [ 'vendorsJs', reload ]  );
 	gulp.watch( customJSWatchFiles, [ 'customJS', reload ]  );
 });
