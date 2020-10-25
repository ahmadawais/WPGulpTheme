<?php
/**
 * Theme Functions
 *
 * Entire theme's function definitions.
 *
 * @since   1.0.0
 * @package WPGulp
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Globals.
define( 'MY_THEME_VER', '1.0.0' );
define( 'MY_THEME_DIR', get_template_directory() );
define( 'MY_THEME_URL', get_template_directory_uri() );

/**
 * Scripts & Styles.
 *
 * Frontend with no conditions, Add Custom styles to wp_head.
 *
 * @since  1.0.0
 */
function my_theme_styles_scripts() {
	// Frontend scripts.
	if ( ! is_admin() ) {
		// Enqueue vendors first.
		wp_enqueue_script( 'vendors', MY_THEME_URL . '/assets/js/vendors.min.js' );

		// Enqueue custom JS after vendors.
		wp_enqueue_script( 'custom', MY_THEME_URL . '/assets/js/custom.min.js' );

		// Minified and Concatenated styles.
		wp_enqueue_style( 'styles', MY_THEME_URL . '/style.min.css', array(), MY_THEME_VER, 'all' );
	}
}

add_action( 'wp_enqueue_scripts', 'my_theme_styles_scripts' );
