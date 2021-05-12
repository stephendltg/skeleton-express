"use strict";


/*
 * ref:
 *   supertest: https://github.com/visionmedia/supertest
 *   mocha: https://mochajs.org/
 *   test: npx mocha test/server.api.attachments.test.js 
 */

let request  = require('supertest');
const should = require('chai').should();
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
let Id

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

    it('Get all attachments', function(done) {
        request
            .get('/attachments')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .set('Cookie', [cookie])
            .expect('Content-Type', /json/)
            .expect(200)
            .expect((res) => {
                should.exist(res.body)
                res.body.should.be.a('array');
                // res.body.should.to.be.empty
            })
            .then(response => {
                done();
                if( VERBOSE ) console.table([response.status, response.type])
            })
            .catch(err => done(err))
    })

    it('Post attachments', function(done) {
        request
            .post('/attachments')
            .set('Cookie', [cookie])
            .attach('attachment', './README.md')
            .expect(201)
            .then(response => {
                done();
                Id = response.body.join('')
                if( VERBOSE ) console.table([response.status, response.type])
            })
            .catch(err => done(err))
    })

    it('Get Id attachments', function(done) {
        request
            .get('/attachments/' + Id)
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

    it('Update Id attachments', function(done) {
        request
            .post('/attachments/' + Id)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .set('Cookie', [cookie])
            .send({
                title: 'john',
                meta: [
                    ['twitter', 'stephendltg']
                ],
                excerpt: 'A beautifull readme'
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                done();
                if( VERBOSE ) console.table([response.status, response.type])
            })
            .catch(err => done(err))
    })

    it('Get Id attachments', function(done) {
        request
            .get('/attachments/' + Id)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .set('Cookie', [cookie])
            .expect('Content-Type', /json/)
            .expect((res) => {
                should.exist(res.body[0].title)
                res.body[0].title.should.equal('john')
                res.body[0].meta.should.be.a('array');
            })
            .expect(200)
            .then(response => {
                done();
                if( VERBOSE ) console.table([response.status, response.type])
            })
            .catch(err => done(err))
    })

    it('Delete attachments', function(done) {
        request
            .delete('/attachments/' + Id)
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

    it('Post category attachments', function(done) {
        request
            .post('/attachments/test')
            .set('Cookie', [cookie])
            .attach('attachment', './README.md')
            .expect(201)
            .then(response => {
                done();
                Id = response.body.join('')
                if( VERBOSE ) console.table([response.status, response.type])
            })
            .catch(err => done(err))
    })

    it('Post bad format category attachments', function(done) {
        request
            .post('/attachments/9999')
            .set('Cookie', [cookie])
            .attach('attachment', './README.md')
            .expect(404)
            .then(response => {
                done();
                if( VERBOSE ) console.table([response.status, response.type])
            })
            .catch(err => done(err))
    })

    it('Get category attachments', function(done) {
        request
            .get('/attachments/test')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .set('Cookie', [cookie])
            .expect('Content-Type', /json/)
            .expect(200)
            .expect((res) => {
                should.exist(res.body)
                res.body.should.be.a('array');
                res.body.should.not.be.empty
            })
            .then(response => {
                done();
                if( VERBOSE ) console.table([response.status, response.type])
            })
            .catch(err => done(err))
    })

    it('Delete category attachments', function(done) {
        request
            .delete('/attachments/' + Id)
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




