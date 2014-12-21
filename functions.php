<?php
   
add_post_type_support( 'page', 'excerpt' );
add_theme_support( 'post-thumbnails' );

add_image_size( 'square-medium', 165, 155, true );
add_image_size( 'square-small', 101, 100, true );

add_action ( 'wp_head', 'bbpb_vars' );

function bbpb_vars() {
    $data = array(
        'url' => get_bloginfo( 'url' ),
        'plink' => get_option( 'permalink_structure '),
    );

    print '<script type="text/javascript">bbpb = '.json_encode($data).'</script>';

    # UA-4766250-2
    $guid = get_theme_mod('analytics_uid', '');
    if ($guid) print "<script type=\"text/javascript\">var _gaq = _gaq || [];_gaq.push(['_setAccount', '"+$guid+"']);(function() {var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);})();</script>";
}
    
add_action( 'customize_register', 'bbpb_customize_register' );
    
function bbpb_customize_register($wp_customize) {
    $wp_customize->add_setting('analytics_uid', array(
        'default' => '',
        'type' => 'option',
        'capability' =>  'edit_theme_options')
    );
    
    
    $wp_customize->add_control(
    new WP_Customize_Control(
      $wp_customize,
      'analytics_uid',
      array('label' => 'Google Analytics UID',
      'section' => 'Tracking',
      'settings' => 'analytics_uid')
    )
  );
}

?>
