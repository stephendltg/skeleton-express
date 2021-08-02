"use strict";


/*
 * ref:
 *   supertest: https://github.com/visionmedia/supertest
 *   mocha: https://mochajs.org/
 *   test: npx mocha test/server.api.posts.test.js 
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
describe('Table posts: ', function() {

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

    it('Get all posts', function(done) {
       request
           .get('/post')
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

    it('Get all posts', function(done) {
      request
          .get('/post/0')
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


    it('Create post', function(done) {
      request
          .post('/post')
          .set('Content-Type', 'application/json')
          .set('Accept', 'application/json')
          .set('Cookie', [cookie])
          .send({
              title: 'my post',
              meta: [
                  ['twitter', 'stephendltg']
              ],
              excerpt: 'A beautifull readme',
              terms: [0,1, {test: 45}, 'mlml', -45, '4']
          })
          .expect(201)
          .then(response => {
              done();
              ID = response.body[0]
              if( VERBOSE ) console.table([response.status, response.type, JSON.stringify(response.body)])
          })
          .catch(err => done(err))
    })

    it('Update post Id', function(done) {
      request
          .post('/post/' + ID)
          .set('Content-Type', 'application/json')
          .set('Accept', 'application/json')
          .set('Cookie', [cookie])
          .send({
              title: 'my post2',
              meta: [
                  ['twitter', 'stephendltg']
              ],
              excerpt: 'A beautifull readme',
              terms: [0,14, {test: 45}, 'mlml', -45, '4']
          })
          .expect(200)
          .then(response => {
              done();
              if( VERBOSE ) console.table([response.status, response.type, JSON.stringify(response.body)])
          })
          .catch(err => done(err))
    })

    it('Delete post Id', function(done) {
      request
          .delete('/post/' + ID)
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

    it('Create post by type', function(done) {
      request
          .post('/post/template')
          .set('Content-Type', 'application/json')
          .set('Accept', 'application/json')
          .set('Cookie', [cookie])
          .send({
              title: 'my template',
              meta: [
                  ['twitter', 'stephendltg']
              ],
              excerpt: 'A beautifull readme',
          })
          .expect(201)
          .then(response => {
              done();
              ID = response.body[0]
              if( VERBOSE ) console.table([response.status, response.type, JSON.stringify(response.body)])
          })
          .catch(err => done(err))
    })

    it('Get posts by type & Id', function(done) {
      request
          .get('/post/' + ID)
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

    it('Update post Id by type', function(done) {
      request
          .post('/post/' + ID)
          .set('Content-Type', 'application/json')
          .set('Accept', 'application/json')
          .set('Cookie', [cookie])
          .send({
              title: 'my template 54',
              meta: [
                  ['twitter', 'stephendltg']
              ],
              excerpt: 'A beautifull readme',
              terms: [0,22]
          })
          .expect(200)
          .then(response => {
              done();
              if( VERBOSE ) console.table([response.status, response.type, JSON.stringify(response.body)])
          })
          .catch(err => done(err))
    })

    it('Get all posts', function(done) {
       request
           .get('/post/template')
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

    it('Delete post Id', function(done) {
      request
          .delete('/post/' + ID)
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




