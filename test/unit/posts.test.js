"use strict";

/**
 * test: DEBUG=posts node test/unit/posts.test.js
 * run: DEBUG=posts nodemon test/unit/posts.test.js
 */

const test = require('tape');
const debug = require('debug')('posts')
const posts = require('../../controllers/posts');


test('[Controller posts: request]', async t => {
  t.plan(1)
  let result = await posts.all({}).catch( e => console.log(e))
  t.ok( result )
  debug(result)
  t.end()
})
