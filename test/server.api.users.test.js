"use strict";


/*
 * ref:
 *   supertest: https://github.com/visionmedia/supertest
 *   mocha: https://mochajs.org/
 *   test: npx mocha test/server.api.users.test.js 
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
let ID
let token
let cookie

/*
 * Route: Monitor
 */  
describe('Tabe Users: ', function() {

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
                cookie = response.headers['set-cookie'].filter(_ => _.match(/app/g) )[0].split(';')[0]
                token = response.body[0].token
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

     it('Get user ID', function(done) {
        request
            .get('/users/1')
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

     it('Create user', function(done) {
        request
            .post('/users')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .set('Cookie', [cookie])
            .send({
                user_login: "JEAN",
                user_email: "jean@epyo.eu",
                user_pass: "epyo",
                user_meta: [["lang", "fr"]]
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                ID = response.body
                done();
                if( VERBOSE ) console.table([response.status, response.type])
                
            })
            .catch(err => done(err))
     })

     it('Get user ID after create', function(done) {
        request
            .get('/users/' + ID)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .set('Cookie', [cookie])
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                done();
                if( VERBOSE ) console.table([response.status, response.type])
                if( VERBOSE ) console.log(response.body)
            })
            .catch(err => done(err))
    })


     it('Update user', function(done) {
        request
            .post('/users/' + ID)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .set('Cookie', [cookie])
            .send({
                user_login: 'RENE',
                user_meta: [['lang', 'fr']]
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                done();
                if( VERBOSE ) console.table([response.status, response.type])
            })
            .catch(err => done(err))
    })

    it('Get user ID after update', function(done) {
        request
            .get('/users/' + ID)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .set('Cookie', [cookie])
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                done();
                if( VERBOSE ) console.table([response.status, response.type])
                if( VERBOSE ) console.log(response.body)
            })
            .catch(err => done(err))
    })

    it('Delete user', function(done) {
        request
            .delete('/users/' + ID)
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




