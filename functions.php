<?php

require 'shortcodes.php';


// Disable auto texturize crap (for i.e. magic quotes and ellipsis)
remove_filter( 'the_content', 'wptexturize' );

// Disable auto <p> tags around shortcodes
function shortcode_empty_paragraph_fix($content) {
	$array = array (
		'<p>[' => '[',
		']</p>' => ']',
		']<br />' => ']'
	);

	$content = strtr($content, $array);

	return $content;
}

add_filter('the_content', 'shortcode_empty_paragraph_fix');

// Register widget areas
register_sidebar([
	'name' => 'Topbar widget (1)',
	'id' => 'topbar-widget-1',
	'description' => 'Appears first in the topbar',
	'before_widget' => '<aside id="%1$s" class="widget %2$s">',
	'after_widget' => '</aside>',
	'before_title' => '<h3 class="widget__title">',
	'after_title' => '</h3>',
]);

register_sidebar([
	'name' => 'Topbar widget (2)',
	'id' => 'topbar-widget-2',
	'description' => 'Appears second in the topbar',
	'before_widget' => '<aside id="%1$s" class="widget %2$s">',
	'after_widget' => '</aside>',
	'before_title' => '<h3 class="widget__title">',
	'after_title' => '</h3>',
]);
