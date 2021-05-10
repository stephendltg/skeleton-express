"use strict";

const strpos = function (haystack, needle, offset) {
	var i = (haystack + "").indexOf(needle, offset || 0);
	return i === -1 ? false : i;
}
	
const stripTags = function(text) {
	text = text || "";
	text = text
		.replace(/<!--[\s\S]*?(-->|$)/g, "")
		.replace(/<(script|style)[^>]*>[\s\S]*?(<\/\1>|$)/gi, "")
		.replace(/<\/?[a-z][\s\S]*?(>|$)/gi, "");
	return text
}
	
	
/**
 * Enlève tous les accents
 */
const remove_accent = function( text ){
	text = text || "";
	let char_not_clean = '@ÀÁÂÃÄÅÇÈÉÊËÌÍÎÏÒÓÔÕÖÙÚÛÜÝàáâãäåçèéêëìíîïðòóôõöúûüýÿ©';
	let clean = 'aaaaaaaceeeeiiiiooooouuuuyaaaaaaceeeeiiiioooooouuuuyyc';
	text = text
		.split('')
		.map( (letter) => {
			const accentIndex = char_not_clean.indexOf(letter);
			return accentIndex !== -1 ? clean[accentIndex] : letter; 
		})
		.join('')
		.replace(/\?/, '')
		.toLowerCase();
	return text
}
	
/**
 * Enlève tous les caractères spéciaux
 */
const sanitize_allspecialschars = function( text ) {
	text = text || "";
	let special_chars = '[\<>{}\\[\\]\\/\\\\]';
	return text
		.replace( new RegExp(special_chars, 'gi'), '' )
		.replace( /\%20/gi, ' ' )
		.replace( /[\r\n\t]+/gi, ' ' );
}
		
/*
 * Nettoie une clé
 */	
const sanitize_key = function( key ) {
	key = key || "";
	return key
		.toLowerCase()
		.replace( /[^a-z0-9\/_-]/gi, '' );
}
		
/*
 * Nettoie tag html
 */
const sanitize_tag = function( tag_name ) {
	tag_name = tag_name || "";
	return tag_name
		.replace(/[^a-zA-Z0-9_]/gi, '')
	.toLowerCase();
}

/*
 * Nettoie class html
 */
const sanitize_html_class = function( classname ) {
	classname = classname || "";
	return classname
		.replace( /%[a-fA-F0-9][a-fA-F0-9]/gi, '' )
		.replace( /[^A-Za-z0-9_-]/gi, '' );
}

/**
 * Nettoie un nom d'utilisateur
 */
const sanitize_user = function( username ){
    username = username || "";
	username = stripTags( username );
	username = remove_accent( username );	
    return username
		.replace( /%([a-fA-F0-9][a-fA-F0-9])/gi, '' )
		.replace( /[^a-z0-9 _.\-@]/gi, '' )
		.trim()
		.replace( /\s+/gi, ' ' );
}
	
/**
 * Nettoie un nom de fichier
 */
const sanitize_file_name = function( filename ) {
	filename = filename || "";
	let special_chars = '[/?\\[\\]=<>:;,\'"&$#*()|~`!{}\\\\]';  	    	
    filename = filename
		.replace( new RegExp(special_chars, 'gi') , '' )
		.replace( /\%20/gi, '-')
		.replace( /\+/gi, '-' )
		.replace( /[\r\n\t -]+/gi, '-' )
	let last_char = ['.','-','_'].indexOf(filename[filename.length-1]);
	while( last_char > -1 ){
		filename = filename.substring( 0, filename.length-1);
		last_char = ['.','-','_'].indexOf(filename[filename.length-1]);
	}
	return remove_accent( filename );
}
	
	

/**
 * Nettoie un mot de tout caractères
 */
const sanitize_words = function( words ) {
	words = words || "";   
	let special_chars = '[/?\\[\\]=<>:;,\\.\\_\\-\'"&$#*()|~`!{}\\\\]';	    
	return words
		.replace( /\x{00a0}/gi, ' ' )
		.replace( new RegExp( special_chars, 'gi' ), '' )
		.replace( /\%20/gi, ' ' )
		.replace( /\+/gi, ' ' )
		.replace( /[\r\n\t ]+/gi, ' ' );    
}
	
/*
 * nettoie email
 */
const sanitize_email = function( email ){
	email = email || '';
    if(email.length < 3 ) return '';
	if( strpos(email, '@', 1 ) === false ) return '';
	let[ local, domain ] = email.split('@');
	local = local.replace( new RegExp( '[^a-zA-Z0-9!#$%&\'*+\/=?^_`{|}~\.-]', 'gi'), '' );
	if ( '' === local ) return '';
	domain = domain
		.replace( /\.{2,}/gi, '' )
		.replace( /[\r\n\t\0 ]+/gi, '' )
				
	let last_char = ['.'].indexOf(domain[domain.length-1]);
	while( last_char > -1 ){
		domain = domain.substring( 0, domain.length-1);
		last_char = ['.'].indexOf(domain[domain.length-1]);
	} 	
	if ( '' === domain ) return '';
    //Split the domain into subs
	let subs = domain.split( '.' );
    if ( 2 > subs.length ) return '';
    // Create an array that will contain valid subs
    let new_subs = [];
    subs.forEach( (sub) => {
		sub = sub.replace( /[^a-z0-9-]+/gi, '' );
		if ( '' !== sub ) new_subs.push(sub);
	})
	if ( 2 > new_subs.length ) return '';
	domain = new_subs.join( '.' );
	email = local + '@' + domain;
	return email;
}

	
/* exports */
module.exports = { 
	stripTags: stripTags,
	remove_accent: remove_accent,
	key: sanitize_key,
	class: sanitize_html_class,
	user: sanitize_user,
	file: sanitize_file_name,
	words: sanitize_words,
	allspecialschars: sanitize_allspecialschars,
	tag: sanitize_tag,
	email: sanitize_email
}
