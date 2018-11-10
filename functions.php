<?php

require 'shortcodes.php';

// Add custom gallery filter

add_filter('post_gallery','customGallery', 10, 2);

function customGallery($string, $attr) {
	$output = '<div class="gallery">';
	$posts = get_posts([
		'include' => $attr['ids'],
		'post_type' => 'attachment'
	]);

	foreach($posts as $imagePost) {
		$original_image = wp_get_attachment_image_src($imagePost->ID, 'original')[0];
		$thumbnail_image = wp_get_attachment_image_src($imagePost->ID, 'large')[0];

		$output .= <<<HTML
<div class="gallery__item">
	<a href="{$original_image}">
		<img src="{$thumbnail_image}">
	</a>
</div>
HTML;
	}

	$output .= '</div>';

	return $output;
}

// Disable gallery inline CSS
add_filter('use_default_gallery_style', '__return_false');

// Disable auto texturize filter (for i.e. magic quotes and ellipsis)
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
function registerWidgets() {
	register_sidebar([
		'name' => 'Topbar widget (1)',
		'id' => 'topbar-widget-1',
		'description' => 'Appears first in the topbar',
		'before_widget' => '<aside id="%1$s" class="widget %2$s">',
		'after_widget' => '</aside>',
		'before_title' => '<h3 class="widget__title">',
		'after_title' => '</h3>'
	]);

	register_sidebar([
		'name' => 'Topbar widget (2)',
		'id' => 'topbar-widget-2',
		'description' => 'Appears second in the topbar',
		'before_widget' => '<aside id="%1$s" class="widget %2$s">',
		'after_widget' => '</aside>',
		'before_title' => '<h3 class="widget__title">',
		'after_title' => '</h3>'
	]);

	register_sidebar([
		'name' => 'Footer widget (1)',
		'id' => 'footer-widget-1',
		'description' => 'Appears in the footer, copyright area',
		'before_widget' => '<footer id="%1$s" class="widget %2$s"><div class="main-content__wrapper">',
		'after_widget' => '</div></footer>'
	]);
}

add_action('widgets_init', 'registerWidgets');
