"use strict";


/*
 * ref:
 *   supertest: https://github.com/visionmedia/supertest
 *   mocha: https://mochajs.org/
 *   test: npx mocha test/server.api.terms.test.js 
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
describe('Table terms: ', function() {

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

   it('Get all terms', function(done) {
       request
           .get('/terms?test=45')
           .set('Content-Type', 'application/json')
           .set('Accept', 'application/json')
           .set('Cookie', [cookie])
           .expect('Content-Type', /json/)
           .expect(200)
           .then(response => {
               done();
               if( VERBOSE ) console.table([response.status, response.type, JSON.stringify(response.body) ])
           })
           .catch(err => done(err))
    })

    it('Get all terms by type', function(done) {
        request
            .get('/terms/post?test=45')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .set('Cookie', [cookie])
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                done();
                if( VERBOSE ) console.table([response.status, response.type, JSON.stringify(response.body) ])
            })
            .catch(err => done(err))
     })

     it('Get all terms by id', function(done) {
        request
            .get('/terms/0')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .set('Cookie', [cookie])
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                done();
                if( VERBOSE ) console.table([response.status, response.type, JSON.stringify(response.body) ])
            })
            .catch(err => done(err))
     })


    it('Post terms', function(done) {
        request
            .post('/terms')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .set('Cookie', [cookie])
            .send({
                name: 'john 89',
                term_meta: [
                    ['twitter', 'stephendltg']
                ],
                description: 'A beautifull readme'
            })
            .expect(201)
            .then(response => {
                done();
                if( VERBOSE ) console.table([response.status, response.type, JSON.stringify(response.body)])
            })
            .catch(err => done(err))
    })


    it('Post terms by type', function(done) {
        request
            .post('/terms/view')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .set('Cookie', [cookie])
            .send({
                name: 'john 849',
                term_meta: [
                    ['twitter', 'stephendltg']
                ],
                description: 'A beautifull readme'
            })
            .expect(201)
            .then(response => {
                done();
                if( VERBOSE ) console.table([response.status, response.type, JSON.stringify(response.body)])
            })
            .catch(err => done(err))
    })

    it('Update Id terms', function(done) {
        request
            .post('/terms/0')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .set('Cookie', [cookie])
            .send({
                name: 'john',
                term_meta: [
                    ['twitter', '#stephendltg']
                ],
                description: 'A beautifull readme'
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                done();
                if( VERBOSE ) console.table([response.status, response.type])
            })
            .catch(err => done(err))
    })

    it('Get all terms', function(done) {
        request
            .get('/terms')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .set('Cookie', [cookie])
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                done();
                if( VERBOSE ) console.table([response.status, response.type, JSON.stringify(response.body) ])
            })
            .catch(err => done(err))
     })

     it('Delete terms', function(done) {
        request
            .delete('/terms/0')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .set('Cookie', [cookie])
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                done();
                if( VERBOSE ) console.table([response.status, response.type, JSON.stringify(response.body)])
            })
            .catch(err => done(err))
    })
})




