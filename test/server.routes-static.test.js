"use strict";

/*
 * ref:
 *   supertest: https://github.com/visionmedia/supertest
 *   mocha: https://mochajs.org/
 *   test: npx mocha test/server.routes-static.test.js 
 */

let request  = require('supertest');
const assert = require('assert').strict;


/*
 * Configuration
 */
 const VERBOSE = false
 request       = request('http://localhost:3000')


/*
 * Route: Monitor
 */  
describe('GET Status: ', function() {

    it('responds with json', function(done) {
        request
            .get('/status')
            .expect('Content-Type', /html/)
            .expect(200)
            .then(response => {
                done();
                if( VERBOSE ) console.table([response.status, response.type])
            })
            .catch(err => done(err))
     })
})

/*
 * Route: admin
 */ 
describe('GET Admin: ', function() {

    it('responds with json', function(done) {
        request
            .get('/admin')
            // .expect('Content-Type', 'text/plain')
            .expect(302)
            .then(response => {
                done();
                if( VERBOSE ) console.table([response.status, response.type])
            })
            .catch(err => done(err))
     })
})

/*
 * Route: /
 */ 
describe('GET Frontend: ', function() {

    it('responds with json', function(done) {
        request
            .get('/')
            .expect(302)
            .then(response => {
                done();
                if( VERBOSE ) console.table([response.status, response.type])
            })
            .catch(err => done(err))
     })
})


