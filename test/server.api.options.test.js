"use strict";


/*
 * ref:
 *   supertest: https://github.com/visionmedia/supertest
 *   mocha: https://mochajs.org/
 *   test: npx mocha test/server.api.options.test.js 
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
                cookie = response.headers['set-cookie'].filter(_ => _.match(/app/g) )[0].split(';')[0]
                token = response.body[0].token
            })
            .catch(err => done(err))
     })

    it('Get all options', function(done) {
        request
            .get('/options')
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

    it('Get settings', function(done) {
        request
            .get('/options/settings')
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

    it('Delete field option', function(done) {
        request
            .delete('/options/test')
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

    it('Create option', function(done) {
        request
            .post('/options')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .set('Cookie', [cookie])
            .send({name: 'test', value: {value: 456}})
            .expect('Content-Type', /json/)
            .expect(201)
            .then(response => {
                done();
                if( VERBOSE ) console.table([response.status, response.type])
            })
            .catch(err => done(err))
    })

    it('Create option - bad params', function(done) {
        request
            .post('/options')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .set('Cookie', [cookie])
            .send({name: '*/', value: ''})
            .expect('Content-Type', /json/)
            .expect(400)
            .then(response => {
                done();
                if( VERBOSE ) console.table([response.status, response.type])
            })
            .catch(err => done(err))
    })

    it('Update option', function(done) {
        request
            .post('/options/test')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .set('Cookie', [cookie])
            .send({value: 'en'})
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                done();
                if( VERBOSE ) console.table([response.status, response.type])
            })
            .catch(err => done(err))
    })

    it('Update option empty value', function(done) {
        request
            .post('/options/test')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .set('Cookie', [cookie])
            .send({value: ''})
            .expect('Content-Type', /json/)
            .expect(400)
            .then(response => {
                done();
                if( VERBOSE ) console.table([response.status, response.type])
            })
            .catch(err => done(err))
    })

    it('Get field option', function(done) {
        request
            .get('/options/test')
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

    it('Delete field option', function(done) {
        request
            .delete('/options/test')
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

    it('Get field option', function(done) {
        request
            .get('/options/test')
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

    it('Update settings', function(done) {
        request
            .post('/options/settings')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .set('Cookie', [cookie])
            .expect('Content-Type', /json/)
            .send([["lang", "fr"],["test", "hello world"]])
            .expect(200)
            .then(response => {
                done();
                if( VERBOSE ) console.table([response.status, response.type])
            })
            .catch(err => done(err))
    })

    it('Delete settings lang', function(done) {
        request
            .delete('/options/lang')
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




