<?php
if (is_active_sidebar('footer-widget-1')) {
	dynamic_sidebar('footer-widget-1');
}
?>
<script> window.themeUri = "<?= get_template_directory_uri(); ?>"; </script>
<script src="<?= get_template_directory_uri(); ?>/js/intro.js"></script>
<script src="<?= get_template_directory_uri(); ?>/js/gallery.js"></script>
