"use strict";

	const sanitize = require('../sanitize')
	
	const size = ( value ) => {
		if (typeof value == 'number') return value;
		if (typeof value == 'string') return value.trim().length;
		if (Array.isArray( value ) ) return value.length;
		if (typeof value == 'object') return Object.keys(value).length;
	};

	const is = ( value ) => typeof value !== 'undefined' && value !== null;

	const is_match = ( value, regex ) => value.match(new RegExp(regex, 'i'));

	const is_alpha = ( value ) => is_match( value , '^([a-z])+$' );

	const is_alphanum = ( value ) => is_match( value , '^[a-z0-9]+$' );

	const is_num = ( value ) => is_match( value , '^[0-9]+$' );

	const is_between = ( value, min, max) => is_min( value, min ) && is_max( value, max );

	const is_date = function( value ) {
		if( typeof value == 'number' ){
			value = new Date( value );
		}
		value = Date.parse( value );
		if(!value )	return false;
		return true;
	};

	const is_different = ( value , other ) => value !== other;

	const is_email = ( value ) => ( '' == sanitize.email(value) ) ? false : true;

	const is_filename = ( value ) => is_match( value , '^[a-z0-9@._-]+$' ) && is_min( value , 3 );

	const is_in = ( value , where ) => where.includes( value );

	const is_integer = ( value ) => Number.isInteger(value);

	const is_ip = function( value ){
		const regex= /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
		return value.trim().match(regex);
	}

	const is_mac = function( value ){
		const regex = /^([A-Fa-f0-9]{2}:){5}[A-Fa-f0-9]{2}$/;
		return value.trim().match(regex);
	}

	const is_low = ( value , low ) => size(value) < low;

	const is_max = ( value , max ) => size( value ) <= max;

	const is_min = ( value , min ) => size( value ) >= min;

	const is_notin = ( value , notin ) => !is_in( value , notin );

	const is_same = ( value , other ) => value === other;

	const is_size = ( value , size_to_compare ) => size(value) == size_to_compare;

	const is_sup = ( value , is_sup ) => size(value) > is_sup;
	
	/* export */
	module.exports = {
		size: size,
		is:{
			exist: is,
			email: is_email,
			date: is_date,
			ip: is_ip,
			mac: is_mac,
			filename: is_filename,
			match: is_match,
			alpha: is_alpha,
			alphanum: is_alphanum,
			num: is_num,
			integer: is_integer,
			In: is_in,
			notIn: is_notin,
			size: is_size,
			low: is_low,
			max: is_max,
			sup: is_sup,
			min: is_min,
			same: is_same,
			different: is_different,
			between: is_between
		}
	}