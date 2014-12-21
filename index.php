<html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0" />
        <meta name="viewport" content="initial-scale=1.0"/>
        
        <link rel="stylesheet" href="<?php echo get_bloginfo('template_url') ?>/style.css" type="text/css" media="screen" data-skrollr-stylesheet />
	<script type="text/javascript" data-main="<?php echo  get_bloginfo('template_url'); ?>/js/main" src="<?php echo get_bloginfo('template_url') ?>/js/vendor/require/require.js"></script>
        
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

	<title><?php bloginfo('name'); ?> <?php wp_title(':'); ?></title>

	<link rel="alternate" type="application/rss+xml" title="<?php bloginfo('name'); ?> RSS Feed" href="	<?php bloginfo('url'); ?>/feed/" />
	<link rel="pingback" href="<?php bloginfo('pingback_url'); ?>" />
	<link rel="icon" type="image/ico" href="<?php echo bloginfo('template_url') ?>/favicon.ico" />

	<?php wp_head(); ?>
    </head>
    
    
    
    <body>
        <div class="header">
            <div class="nav"></div>
            <h1><a href="/"><i class="fa fa-home"></i><span><?php echo bloginfo('name') ?></span></a></h1>
        </div>
        
        <div class="sidebar"></div>
        <div class="inner_content"></div>
        
        <div class="navigation"></div>
        
        <div class="main" id="skrollr-body"></div>
        <div class="footer"></div>
    </body>

</html>