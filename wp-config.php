<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings ** //

if(file_exists(dirname(__FILE__).'/local.php')){
	define( 'DB_NAME', 'local' );
	define( 'DB_USER', 'root' );
	define( 'DB_PASSWORD', 'root' );
	define( 'DB_HOST', 'localhost' );

}else {
	define( 'DB_NAME', 'cemilf47_universitydata' );
	define( 'DB_USER', 'cemilf47_wp546' );
	define( 'DB_PASSWORD', 'L}AS]5}*)o]9' );
	define( 'DB_HOST', 'localhost' );

}

/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
    define('AUTH_KEY',         'Sqnh?V)U|iV)!L8.U,y#!|+t#-yHs(P@u1tA?rcZ>eevb;.G$-GzHtkl}l0J%{<E');
	define('SECURE_AUTH_KEY',  '/Uq8*tM&3Oj~j=kM:PUAyg?l!09$+--u.0cj Wn/nI=YO5SU6(2ftK-]%/ri*c?L');
	define('LOGGED_IN_KEY',    'j%H$7Vg6wVk|+eychYnP7uhZ-heg$v,vYS/t(c(^f%u#Aqip6c(V;o)?E|Woms:M');
	define('NONCE_KEY',        'q,?n-1/e$%ZUw)).Xn?6g#nzCi||V7u+=6nO]2[W)CWq;1g=h;>j*Oi!nU]UH|68');
	define('AUTH_SALT',        '-Xh)_=]{B xNKq<|6 iEev(duZ@4lAof P458&LX|kxF#ow{BEI]3: -gToz_ Tv');
	define('SECURE_AUTH_SALT', 'gg-v8:uqhGIsBP1!re)ooQ6L+m>HO*h4vg=r5q0TfF0}~:n1qBnPW>Kb_w>V-ITK');
	define('LOGGED_IN_SALT',   'vg8[=^g<F|pFU3A]YeD;Wfppg{yU@08Pxqp e^w;y%dP)e4 Nv~L!M;ksQP|hSKH');
	define('NONCE_SALT',       'l`XrbpG2gKwh_H_&#YI@l#Lcv<L-1D#=7O7V|4$GO1I+;%|cUI[z| *Pp{=Fja/4');

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';




/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) )
	define( 'ABSPATH', dirname( __FILE__ ) . '/' );

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
