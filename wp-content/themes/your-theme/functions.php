<?php
/**
 *  functions.php: 
 *    - required
 *    Theme's functions and configurations MUST be here
 */
function load_assets() {
  $dev = true;

  $path = $dev? "https://localhost:8080" : get_template_directory_uri().'/assets/build';

  wp_enqueue_script( 'theme_js', "$path/index.min.js", array(), '1.0.0' , true );
  wp_enqueue_style( 'theme_css', "$path/style.min.css", array(), '1.0.0', false );

}

add_action( 'wp_enqueue_scripts', 'load_assets' );
