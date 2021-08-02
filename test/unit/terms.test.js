"use strict";

/**
 * test: DEBUG=terms node test/unit/terms.test.js
 * run: DEBUG=terms nodemon test/unit/terms.test.js
 */

const test = require('tape');
const debug = require('debug')('terms')
const terms = require('../../controllers/terms');
const chance = require('chance').Chance();

/**
 * Data
 */

const data = [
  {id: 1, name: 'Allée 30', slug: 'allee-30', description: chance.paragraph(), type: 'cell'},
  {id: 2, name: 'Allée 31', slug: 'allee-31', description: chance.paragraph(), type: 'post'},
  {id: 3, name: 'Allée 32', slug: 'allee-32', description: chance.paragraph(), type: 'post'},
  {id: 4, name: 'Allée 33', slug: 'allee-33', description: chance.paragraph(), type: 'cell'},
  {id: 16, name: 'Allée 33', slug: 'allee-34', description: chance.paragraph(), type: 'post'},
  {id: 24, name: 'Allée 36', slug: 'allee-36', description: chance.paragraph(), type: 'post'}
]

test('[Controller terms: insert Data test]', async t => {
  t.plan(1)
  let result = await terms.add(data).catch( e => debug(e))
  t.ok( result )
  t.end()
})

test('[Controller terms: All terms count by type: default post]', async t => {
  t.plan(2)
  let result = await terms.count().catch( e => false)
  t.ok( result )
  t.equal( result[0].count, 4, 'OK' )
  debug('Count post: ' + result[0].count)
  t.end()
})

test('[Controller terms: All terms count by type: cell]', async t => {
  t.plan(2)
  let result = await terms.count('cell').catch( e => false)
  t.ok( result )
  t.equal( result[0].count, 2, 'OK' )
  debug('Count post: ' + result[0].count)
  t.end()
})


test('[Controller terms: All terms distinct by type]', async t => {
  t.plan(1)
  let result = await terms.distinct().catch( e => false)
  t.ok( result )
  debug(result)
  t.end()
})

test('[Controller terms: Update terms e]', async t => {
  t.plan(1)
  let result = await terms.update(24, { name: 'test', description: chance.paragraph(), type: 'cell', slug: 'allee-37' }).catch( e => false)
  t.ok( result )
  debug(result)
  t.end()
})

test('[Controller terms: All terms count by type: cell]', async t => {
  t.plan(2)
  let result = await terms.count('cell').catch( e => false)
  t.ok( result )
  t.equal( result[0].count, 3, 'OK' )
  debug('Count post: ' + result[0].count)
  t.end()
})

test('[Controller terms: Search term by id]', async t => {
  t.plan(2)
  let result = await terms.all({ id: 24}, 'cell').catch( e => false)
  t.ok( result )
  t.equal( result[0].id, 24, 'OK' )
  debug(result)
  t.end()
})

test('[Controller terms: Search term by query & slug]', async t => {
  t.plan(2)
  let result = await terms.all({ search: 'Allée', slug: 'allee-33'}, 'cell').catch( e => console.log(e))
  t.ok( result )
  t.equal( result[0].id, 4, 'OK' )
  debug(result)
  t.end()
})

test('[Controller terms: Search term by query]', async t => {
  t.plan(2)
  let result = await terms.all({ search: 'Allée', limit: 1, offset: 1}, 'cell').catch( e => false)
  t.ok( result )
  t.equal( result[0].id, 1, 'OK' )
  debug(result)
  t.end()
})

/**
 * Delete Data test
 */
test('[Controller terms: Delete Data Test]', async t => {
  const async = async id =>  await terms.del(id).catch( e => false )
  data.filter( _ => _.id).map( _ => {
    async(_.id)
  })
  t.end()
})