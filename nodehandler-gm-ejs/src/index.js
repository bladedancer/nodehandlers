const sdk = require('axway-flow-sdk');
const action = require('./action');

const nodes = sdk.init(module);

// doT
nodes.add('gm-ejs', {
	name: 'EJS',
	icon: 'icon.svg',
	description: 'Compose strings and objects using EJS templates. See http://ejs.co/.',
	category: 'core'
})
	.method('formatStr', {
		name: 'Format string',
		description: 'Compose a string by evaluating a template. See http://ejs.co/.'
	})
	.parameter('template',
		{
			description: 'The EJS template.',
			type: 'string',
			format: 'multiline'
		},
		true /* required */
	)
	.parameter('data',
		{
			description: 'The data to evaluate the template with. Use $ to access the entire context.',
			type: 'object'
		},
		true /* required */
	)
	.output('next', {
		name: 'Next',
		context: '$.value',
		schema: {}
	})
	.output('error', {
		name: 'Error',
		context: '$.error',
		description: 'This output is triggered if the evaluated template is not valid. The output value is error object.',
		schema: {}
	})
	.action(action.formatStr)
	.method('formatObj', {
		name: 'Format object',
		description: 'Compose an object by evaluating a template. The evaluated template is JSON parsed and so must be a valid JSON encoded string. See http://ejs.co/.'
	})
	.parameter('template',
		{
			description: 'The EJS template.',
			type: 'string',
			format: 'multiline'
		},
		true /* required */
	)
	.parameter('data',
		{
			description: 'The data to evaluate the template with. Use $ to access the entire context.',
			type: 'object'
		},
		true /* required */
	)
	.output('next', {
		name: 'Next',
		context: '$.value',
		schema: {}
	})
	.output('error', {
		name: 'Error',
		context: '$.error',
		description: 'This output is triggered if the evaluated template is not a valid JSON string. The output value is the error object.',
		schema: {}
	})
	.action(action.formatObj);

exports = module.exports = nodes;
