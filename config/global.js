"use strict";

/**
 * Name: epyo-visiom
 * Description: Server epyo-visiom
 * Sub Module: global
 * Author: Epyo - stephen D.
 * Version: 1.0.0
 */


/** --------------------------------------------------------------------------------------------- */
/** DEFINES ===================================================================================== */
/** --------------------------------------------------------------------------------------------- */

global.ABSPATH  = process.cwd().replace(/\/*$/, "") + '/';
global.PORT     = normalizePort(process.env.PORT || '3000')
global.NAME     = (process.env.NAME || 'epyo').toLowerCase().replace(/[^a-z0-9_-]/gi, '')


/** --------------------------------------------------------------------------------------------- */
/** MAIN ======================================================================================== */
/** --------------------------------------------------------------------------------------------- */

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
    let port = parseInt(val, 10)
    if (isNaN(port)) return val
    if (port >= 0) return port
    return false
}