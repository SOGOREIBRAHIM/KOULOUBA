<?php
/**
 * La configuration de base de votre installation WordPress.
 *
 * Ce fichier contient les réglages de configuration suivants : réglages MySQL,
 * préfixe de table, clés secrètes, langue utilisée, et ABSPATH.
 * Vous pouvez en savoir plus à leur sujet en allant sur
 * {@link https://fr.wordpress.org/support/article/editing-wp-config-php/ Modifier
 * wp-config.php}. C’est votre hébergeur qui doit vous donner vos
 * codes MySQL.
 *
 * Ce fichier est utilisé par le script de création de wp-config.php pendant
 * le processus d’installation. Vous n’avez pas à utiliser le site web, vous
 * pouvez simplement renommer ce fichier en "wp-config.php" et remplir les
 * valeurs.
 *
 * @link https://wordpress.org/documentation/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Réglages MySQL - Votre hébergeur doit vous fournir ces informations. ** //
/** Nom de la base de données de WordPress. */
define( 'DB_NAME', 'koulouba' );

/** Utilisateur de la base de données MySQL. */
define( 'DB_USER', 'root' );

/** Mot de passe de la base de données MySQL. */
define( 'DB_PASSWORD', '' );

/** Adresse de l’hébergement MySQL. */
define( 'DB_HOST', 'localhost' );

/** Jeu de caractères à utiliser par la base de données lors de la création des tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** Type de collation de la base de données.
  * N’y touchez que si vous savez ce que vous faites.
  */
define('DB_COLLATE', '');

/**#@+
 * Clés uniques d’authentification et salage.
 *
 * Remplacez les valeurs par défaut par des phrases uniques !
 * Vous pouvez générer des phrases aléatoires en utilisant
 * {@link https://api.wordpress.org/secret-key/1.1/salt/ le service de clefs secrètes de WordPress.org}.
 * Vous pouvez modifier ces phrases à n’importe quel moment, afin d’invalider tous les cookies existants.
 * Cela forcera également tous les utilisateurs à se reconnecter.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'eK23iR,+FHBd9.*Y=-M.!b(?q~.I=;5!PKQa4p%1OuN1?)`.-hS|Pbq~^D5!U)6k' );
define( 'SECURE_AUTH_KEY',  '|dfaKDh0|2a+U{SP9~)~e2dNJ@6$<023FW5rC_@o=WO>vo$cp>Y~|>N!:PeHuRnz' );
define( 'LOGGED_IN_KEY',    's!DVi/wqHIJ.+EE6X8 bI335F#dV$hg^@VHeA@t56i(i|!ZnW3 }A[9+J,g+mQxO' );
define( 'NONCE_KEY',        '/y<uP?1}|N2F39$s`*}ZAj!1SL]@,bKqIc*9}@y9sr6qCS5%p8e9:FJJ7v~L+)zo' );
define( 'AUTH_SALT',        'U4Y_ObM*@$]+1_SAjT$A_ti[SKnnN<$;#RSz2Yg3Y~tG@V@ru9y~3=TA.@O&F~Wh' );
define( 'SECURE_AUTH_SALT', 'BLdV!o;+=8rT+hwCgo-ZEg`<hnrYMm[ZOi4=!t_ZnS.ttAXNr!kg.v2BPzm0C;X*' );
define( 'LOGGED_IN_SALT',   '%;eBEv!L=*2,>a#l4lX: 1(E`[UZ2-.eP)ty.P}&_iTa*8?`~jEh1Me@s:4<V#5Q' );
define( 'NONCE_SALT',       'yzhlAvZ@B&k?DwAlDXs3*Pa]4K@.m^HO,dcAcDg?UTa1l0ux7^/96UkoOgwhYP$d' );
/**#@-*/

/**
 * Préfixe de base de données pour les tables de WordPress.
 *
 * Vous pouvez installer plusieurs WordPress sur une seule base de données
 * si vous leur donnez chacune un préfixe unique.
 * N’utilisez que des chiffres, des lettres non-accentuées, et des caractères soulignés !
 */
$table_prefix = 'wp_';

/**
 * Pour les développeurs et développeuses : le mode déboguage de WordPress.
 *
 * En passant la valeur suivante à "true", vous activez l’affichage des
 * notifications d’erreurs pendant vos essais.
 * Il est fortemment recommandé que les développeurs d’extensions et
 * de thèmes se servent de WP_DEBUG dans leur environnement de
 * développement.
 *
 * Pour plus d’information sur les autres constantes qui peuvent être utilisées
 * pour le déboguage, rendez-vous sur la documentation.
 *
 * @link https://fr.wordpress.org/support/article/debugging-in-wordpress/
 */
define('WP_DEBUG', false);

/* C’est tout, ne touchez pas à ce qui suit ! Bonne publication. */

/** Chemin absolu vers le dossier de WordPress. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Réglage des variables de WordPress et de ses fichiers inclus. */
require_once(ABSPATH . 'wp-settings.php');
