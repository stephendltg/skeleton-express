"use strict";

/**
 * test: node test/unit/sanitize.test.js
 */

var test = require('tape');
const sanitize = require('../../utils/sanitize')


test('[sanitize key]', t => {
    t.plan(3)
    t.notOk( sanitize.key())
    let text = sanitize.key('ml/*=--9')
    // t.comment(sanitize.key(text))
    t.equal( sanitize.key(text), 'ml/--9')
    t.error ( sanitize.key(text) !== text, 'sanitize ok')
    t.end()
})

test('[sanitize tag]', t => {
    t.plan(3)
    t.notOk( sanitize.tag())
    let text = sanitize.tag('ml/*=-\{}-9')
    // t.comment(sanitize.tag(text))
    t.equal( sanitize.tag(text), 'ml9')
    t.error ( sanitize.tag(text) !== text, 'sanitize ok')
    t.end()
})


test('[sanitize_allspecialschars]', t => {
    t.plan(3)
    t.notOk( sanitize.allspecialschars())
    let text = sanitize.allspecialschars('<p>mag/\ique</p><script url="/test/tset">test{test:45}</script>sqssd' + "\n\t\r")
    // t.comment(sanitize.allspecialschars(text))
    t.equal( sanitize.allspecialschars(text), 'pmagiquepscript url="testtset"testtest:45scriptsqssd ')
    t.error ( sanitize.allspecialschars(text) !== text, 'sanitize ok')
    t.end()
})

// test('timing test', function (t) {
//     t.plan(2);

//     t.equal(typeof Date.now, 'function');
//     var start = Date.now();

//     setTimeout(function () {
//         t.equal(Date.now() - start, 100);
//     }, 100);
// });

// test('test using promises', async function (t) {
//     const result = await someAsyncThing();
//     t.ok(result);
// });