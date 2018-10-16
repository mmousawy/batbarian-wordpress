<?php

// [block color='red' class='banner' align='right']
function shortcode_block($params = [], $content = '') {
  extract(shortcode_atts([
    'color' => '',
		'align' => '',
		'class' => ''
	], $params));

	return
		'<div class="main-content ' .
		(!empty($align) ? 'align-' .$align : '') .
		(!empty($class) ? $class : '') .
		'" style="' .
		$block_image .
		($color ? 'background-color:' .$color : '') .
		'"><div class="main-content__wrapper">' .
		do_shortcode($content) .
		'</div></div>';
}

add_shortcode('block', 'shortcode_block');
