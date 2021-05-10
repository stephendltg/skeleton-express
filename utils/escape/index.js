"use strict";

const sanitize = require('../sanitize')

const strpos = function (haystack, needle, offset) {
	//   example 1: strpos('Kevin van Zonneveld', 'e', 5)
	//   returns 1: 14
	var i = (haystack + "").indexOf(needle, offset || 0);
	return i === -1 ? false : i;
}

/**
 * Nettoyer les urls.
 */
module.exports.esc_url_raw = function( url ) {
	let good_protocol = false;

	let protocols = ['http', 'https', 'ftp', 'ftps', 'mailto', 'news', 'irc', 'gopher', 'nntp', 'feed', 'telnet', 'mms', 'rtsp', 'svn', 'tel', 'fax', 'xmpp', 'webcal'];
	if( '' == url ) return url;

	// On évite les liens placer pour les ancres
	if( 0 === strpos( url, '#' ) ){
		return '#' + sanitize.class(url);
	}

	url = url.replace(/[^a-z0-9-~+_.?#=!&;,/:%@$\|*\'()\\x80-\\xff]/gi, '');
	if( 0 !== strpos( url, 'mailto:' ) ){
		url = url
			.replace(/\%0d/gi, '')
			.replace(/\%0a/gi, '')
			.replace(/\%0D/gi, '')
			.replace(/\%0A/gi, '')
	}

    url = url.replace(';//', '://');

    if ( strpos(url, ':') === false && !['/', '#', '?'].includes(url[0]) && !url.match(/^[a-z0-9-]+?\.php/i) ){
		url = 'http://' + url;
    }

    if( '/' === url[0] ){
		good_protocol = false;
    } else {   
		protocols.forEach( (protocol) => {
			if ( 0 === strpos( url, protocol ) ) good_protocol = true;
		});
    }
 
	return good_protocol ? url : '';
}