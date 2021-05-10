"use strict";


/*
 * ref:
 *   supertest: https://github.com/visionmedia/supertest
 *   mocha: https://mochajs.org/
 *   test: npx mocha test/server.api.auth.test.js 
 */

let request  = require('supertest');
const assert = require('assert').strict;


/*
 * Configuration
 */
 const VERBOSE = false
 request       = request('http://localhost:3000/api/json/v1')


/**
 * Global var
 */
let cookie
let token

/*
 * Route: Monitor
 */  
describe('Auth: ', function() {

    it('Connection', function(done) {
        request
            .get('/auth')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .auth('epyo', 'epyo')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                done();
                if( VERBOSE ) console.table([response.status, response.type])
                cookie = response.headers['set-cookie'].filter(_ => _.match(/epyo/g) )[0].split(';')[0]
                token = response.body[0].token
            })
            .catch(err => done(err))
     })

     it('Check token', function(done) {
        request
            .get('/auth/token')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .set('Authorization', 'Bearer ' + token)
            .set('Cookie', [cookie])
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                done();
                if( VERBOSE ) console.table([response.status, response.type])
            })
            .catch(err => done(err))
     })

     it('Get all user', function(done) {
        request
            .get('/users')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .set('Cookie', [cookie])
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                done();
                if( VERBOSE ) console.table([response.status, response.type])
            })
            .catch(err => done(err))
     })

     it('Logout', function(done) {
        request
            .get('/auth/logout')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .set('Cookie', [cookie])
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                done();
                if( VERBOSE ) console.table([response.status, response.type])
            })
            .catch(err => done(err))
     })

     it('Get all user', function(done) {
        request
            .get('/users')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .set('Cookie', [cookie])
            .expect('Content-Type', /json/)
            .expect(401)
            .then(response => {
                done();
                if( VERBOSE ) console.table([response.status, response.type])
            })
            .catch(err => done(err))
     })


})




