var assert = require('assert');
var sinon = require('sinon');
chrome = sinon.stub();
runtime = sinon.stub();
onMessage = sinon.stub();
onMessage.addListener = sinon.stub();
runtime.onMessage = onMessage;
chrome.runtime = runtime;
var cs = require('../src/flow_content_script.js');
console.log(cs)
suite('flow_content_script');

test('#trim', function() {
	assert.equal('Juoksu', cs.trim('  Juoksu  '));
});