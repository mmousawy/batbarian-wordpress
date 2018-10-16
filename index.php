<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title><?= get_bloginfo('name')  ?></title>
	<link rel="stylesheet" href="<?= get_template_directory_uri(); ?>/style.css">
</head>
<body>
<div class="topbar">
<div class="topbar__wrapper">
<?php
if (is_active_sidebar('topbar-widget-1')) {
dynamic_sidebar('topbar-widget-1');
}
if (is_active_sidebar('topbar-widget-2')) {
dynamic_sidebar('topbar-widget-2');
}
?>
</div>
</div>
<?php
if (is_front_page()) {
	get_header('home');
}

while (have_posts()) : the_post();
	stripslashes(the_content());
endwhile;

wp_reset_query();

if (is_front_page()) {
	get_footer('home');
}
?>
</body>
</html>
