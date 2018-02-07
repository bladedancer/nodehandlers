const builder = require('../src');
const expect = require('chai').expect;
const { mocknode, validate } = require('axway-flow-sdk');

describe('nodehandler-gm-mustache', () => {
	describe('#constructor', () => {
		it('[MUSTACHE-1] should define gm-mustache node specs', () => {
			expect(builder).to.exist;;
			expect(mocknode('gm-mustache')).to.exist;
		});
	});

	describe('Mustsache', () => {
		it('[MUSTACHE-2] should define gm-mustache spec.', () => {
			const spec = builder.specs['gm-mustache'];
			expect(spec).to.exist;
			expect(spec.name).to.equal('Mustache');
			expect(spec.description).to.equal('Compose strings and objects using Mustache templates. See http://mustache.github.io/.');
			expect(spec.icon).to.exist;
			expect(spec.category).to.equal('core');
			expect(Object.keys(spec.methods)).to.have.members([ 'formatStr', 'formatObj' ]);
		});

		it('[MUSTACHE-3] should format template with values from object', () => {
			const template = 'Hello {{firstname}} {{surname}}';
			const data = { firstname: 'Clark', surname: 'Kent' };

			return mocknode(builder).node('gm-mustache').invoke('formatStr', { template, data })
				.then((result) => {
					expect(result).to.deep.equal({
						next: [ null, 'Hello Clark Kent' ]
					});
				});
		});

		it('[MUSTACHE-4] should format template with values from string array', () => {
			const template = '{{people}}';
			const data = {
				people: [ 'tom', 'dick', 'harry' ]
			};

			return mocknode(builder).node('gm-mustache').invoke('formatStr', { template, data })
				.then((result) => {
					expect(result).to.deep.equal({
						next: [ null, 'tom,dick,harry' ]
					});
				});
		});


		it('[MUSTACHE-5] should format template with values from object array', () => {
			const template = '{{#people}}{{name}},{{/people}}';
			const data = {
				people: [
					{ name: 'tom' },
					{ name: 'dick' },
					{ name: 'harry' }
				]
			};

			return mocknode(builder).node('gm-mustache').invoke('formatStr', { template, data })
				.then((result) => {
					expect(result).to.deep.equal({
						next: [ null, 'tom,dick,harry,' ]
					});
				});
		});


		it('[MUSTACHE-6] should error on format of invalid template', () => {
			const template = '{{#people}}{{/animals}}';
			const data = {
				people: [ 'tom', 'dick', 'harry' ]
			};

			return mocknode(builder).node('gm-mustache').invoke('formatStr', { template, data })
				.then((result) => {
					expect(result).to.have.property('error');
					expect(result.error[0]).to.be.null;
					expect(result.error[1].message).to.be.equal('Unclosed section "people" at 11');
				});
		});

		it('[MUSTACHCE-7] should format object from template', () => {
			const template = `{
				"name": "{{first}} {{last}}",
				"age": {{age}},
				"gender": "{{#male}}m{{/male}}{{^male}}f{{/male}}"
			}`;
			const data = {
				first: 'Clark',
				last: 'Kent',
				age: 27,
				male: true
			};

			return mocknode(builder).node('gm-mustache').invoke('formatObj', { template, data })
				.then((result) => {
					expect(result).to.deep.equal({
						next: [ null, {
							name: 'Clark Kent',
							age: 27,
							gender: 'm'
						}]
					});
				});
		});

		it('[MUSTACHCE-8] should format object should trigger error if template is not valid', () => {
			const template = `{
				"name": "{{first}} {{last}}",
				"age": {{age}},
				"gender": "{{#male}}m{{/badmale}}{{^male}}f{{/male}}"
			}`;
			const data = {
				first: 'Clark',
				last: 'Kent',
				age: 27,
				male: true
			};

			return mocknode(builder).node('gm-mustache').invoke('formatObj', { template, data })
			.then((result) => {
				expect(result).to.have.property('error');
				expect(result.error[0]).to.be.null;
				expect(result.error[1].message).to.be.equal('Unclosed section "male" at 81');
			});
		});
	});
});
