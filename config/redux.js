"use strict";

/**
 * Name: app
 * Description: 
 * Sub Module: Bus event && cache
 * Author: stephen D.
 * Version: 1.0.0
 */

/** --------------------------------------------------------------------------------------------- */
/** DEFINES ===================================================================================== */
/** --------------------------------------------------------------------------------------------- */

const debug    = require('debug')(NAME + ':bus')

// Init dictonnary
const dictonnary = new Map([
    ['auth:profiles:999', {
        value: {
            role: 'admin',
            methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS']
        }, 
        expiration: 0 
    }],
    ['attachments:upload:fields', {
        value: [
            { name: 'attachment', maxCount: 1 },
            { name: 'attachments', maxCount: 8 }
        ], 
        expiration: 0 
    }],
    ['attachments:upload:mimetype', {
        value: [
            '.png',
            '.jpeg',
            '.jpg',
            '.ico',
            '.wav',
            '.mp3',
            '.weba',
            '.webp',
            '.mp4',
            '.webm',
            '.mpeg',
            '.svg',
            '.pdf',
            '.zip',
            '.md'
        ], 
        expiration: 0 
    }],
])
const redux    = require('@stephendltg/e-bus/src')( (k,v) => debug(`${k}: ${v}`), dictonnary)

module.exports = redux
