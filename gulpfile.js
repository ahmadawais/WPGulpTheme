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
 * Load Plugins.
 *
 * Load gulp plugins and assing them semantic names.
 */
	var gulp     = require('gulp'); // Gulp of-course

	// CSS related plugins.
	var sass         = require('gulp-sass'); // Gulp pluign for Sass compilation
	var autoprefixer = require('gulp-autoprefixer'); // Autoprefixing magic
	var minifycss    = require('gulp-uglifycss'); // Minifies CSS files
	var cmq          = require('gulp-combine-media-queries'), // Combines media queries

	// JS related plugins.
	var concat       = require('gulp-concat'); // Concatenates JS files
	var uglify       = require('gulp-uglify'); // Minifies JS files

	// Utility related plugins.
	var filter       = require('gulp-filter'); // To filter diferent file types E.g. *.css
	var rename       = require('gulp-rename'); // Renames files E.g. style.css -> style.min.css
	var sourcemaps   = require('gulp-sourcemaps'); // Maps code in a compressed file (E.g. style.css) back to it’s original position in a source file (E.g. structure.scss, which was later combined with other css files to generate style.css)
	var notify       = require('gulp-notify'); // Sends message notification to you

/**
 * Configuration.
 *
 * Project Configuration for gulp tasks.
 */

	var project             = 'WPGulpTheme';
	var source              = './assets/';

	var styleSRC            = './assets/css/style.scss';
	var styleDestination    = './';

	var jsVendorSRC         = './assets/js/vendors/*.js';
	var jsVendorDestination = './assets/js/';
	var jsVendorFile        = 'vendors';

	var jsCustomSRC         = './assets/js/custom/*.js';
	var jsCustomDestination = './assets/js/';
	var jsCustomFile        = 'cutom';


/**
 * Task: styles
 *
 * This task does the following:
 * 		1. Gets the source scss file
 * 		2. Compiles it to CSS
 * 		3. Autoprefixes it
 * 		4. Combines the MediaQueries
 * 		5. Minifies the CSS file
 * 		6. Renames the minified CSS file with suffix .min.css
 *
 * Sass output styles: https://web-design-weekly.com/2014/06/15/different-sass-output-styles/
*/
gulp.task('styles', function () {
	return 	gulp.src( styleSRC )
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
				.pipe( autoprefixer('last 2 version', '> 1%', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4' ) )
				.pipe( sourcemaps.write ( '.' ) )
				.pipe( gulp.dest( styleDestination ) )
				.pipe( filter( '**/*.css' ) ) // Filtering stream to only css files
				.pipe( cmq() ) // Combines Media Queries
				.pipe( rename( { suffix: '.min' } ) )
				.pipe( minifycss( {
					maxLineLen: 80
				}))
				.pipe( gulp.dest( styleDestination ) )
				.pipe( notify( { message: 'TASK: "styles" Completed!', onLast: true } ) )
});


/**
 * Task: vendorJS
 *
 * Look at src/js and concatenate those files, send them to assets/js where we then minimize the concatenated file.
*/
gulp.task( 'vendorsJs', function() {
	return 	gulp.src( jsVendorSRC )
				.pipe( concat( jsVendorFile + '.js' ) )
				.pipe( gulp.dest( jsVendorDestination ) )
				.pipe( rename( {
					basename: "vendors",
					suffix: '.min'
				}))
				.pipe( uglify() )
				.pipe( gulp.dest( jsVendorDestination ) )
				.pipe( notify( { message: 'TASK: "vendorsJs" Completed!', onLast: true } ) );
});


/**
 * Task: customJS
 *
 * Look at src/js and concatenate those files, send them to assets/js where we then minimize the concatenated file.
*/
gulp.task( 'customJS', function() {
	return 	gulp.src( jsCustomSRC )
				.pipe( concat( jsCustomFile + '.js' ) )
				.pipe( gulp.dest( jsCustomDestination ) )
				.pipe( rename( {
					basename: "vendors",
					suffix: '.min'
				}))
				.pipe( uglify() )
				.pipe( gulp.dest( jsCustomDestination ) )
				.pipe( notify( { message: 'TASK: "customJs" Completed!', onLast: true } ) );
});

 // Watch Task
 gulp.task( 'default', [ 'styles', 'vendorsJs', 'customJS' ], function () {
 	gulp.watch( './assets/css/**/*.scss', [ 'styles' ] );
 	gulp.watch( './assets/js/vendors/*.js', [ 'vendorsJs' ] );
 	gulp.watch( './assets/js/custom/*.js', [ 'customJS' ] );
 });
