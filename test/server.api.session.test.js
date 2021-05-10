"use strict";


/*
 * ref:
 *   supertest: https://github.com/visionmedia/supertest
 *   mocha: https://mochajs.org/
 *   test: npx mocha test/server.api.session.test.js 
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
let token
let cookie

/*
 * Route: Monitor
 */  
describe('Table options: ', function() {

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

    it('Get session', function(done) {
        request
            .get('/session')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .set('Cookie', [cookie])
            .expect('Content-Type', /json/)
            .expect(404)
            .then(response => {
                done();
                if( VERBOSE ) console.table([response.status, response.type])
            })
            .catch(err => done(err))
    })

    it('Create cache session', function(done) {
        request
            .post('/session')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .set('Cookie', [cookie])
            .send({name: 'lang'})
            .expect('Content-Type', /json/)
            .expect(201)
            .then(response => {
                done();
                if( VERBOSE ) console.table([response.status, response.type])
            })
            .catch(err => done(err))
    })

    it('Get session', function(done) {
        request
            .get('/session')
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

    it('Delete cache session', function(done) {
        request
            .delete('/session')
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
})




