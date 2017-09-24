<?php
/**
 * Index
 *
 * Theme index.
 *
 * @since   1.0.0
 * @package WP
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header(); ?>

<div class="wrap">
	<div class="content">
		<h1><?php esc_html_e( 'WP Gulp Boilerplate!', 'WP' ); ?></h1>
		<p>
			<?php
				esc_html_e( 'A simple to use gulp boilerplate for gulp beginners and WordPress developers. This is a demo theme and for production make sure you use the ', 'WP' );
				echo '<a href="https://github.com/ahmadawais/WPGulp/">WPGulp →</a>';
				esc_html_e( ' repository for using gulpfile.js in your theme or plugin.', 'WP' );
				echo '<div><strong>🌟 <a href="https://github.com/ahmadawais/WPGulp">STAR WPGULP</strong> →</div>';
			?>
		</p>
	</div>
	<!-- /.content -->
</div>
<!-- /.wrap -->

<?php get_footer(); ?>
