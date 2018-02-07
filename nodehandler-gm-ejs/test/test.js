const builder = require('../src');
const expect = require('chai').expect;
const { mocknode } = require('axway-flow-sdk');

describe('nodehandler-gm-ejs', () => {
	describe('#constructor', () => {
		it('[EJS-1] should define gm-ejs node specs', () => {
			expect(builder).to.exist;
			expect(mocknode('gm-ejs')).to.exist;
		});
	});

	describe('EJS', () => {
		it('[EJS-2] should define gm-ejs spec.', () => {
			const spec = builder.specs['gm-ejs'];
			expect(spec).to.exist;
			expect(spec.name).to.equal('EJS');
			expect(spec.description).to.equal('Compose strings and objects using EJS templates. See http://ejs.co/.');
			expect(spec.icon).to.exist;
			expect(spec.category).to.equal('core');
			expect(Object.keys(spec.methods)).to.have.members([ 'formatStr', 'formatObj' ]);
		});

		it('[EJS-3] should format template with values from object', () => {
			const template = 'Hello <%=firstname%> <%=surname%>';
			const data = { firstname: 'Clark', surname: 'Kent' };

			return mocknode(builder).node('gm-ejs').invoke('formatStr', { template, data })
				.then((result) => {
					expect(result).to.deep.equal({
						next: [ null, 'Hello Clark Kent' ]
					});
				});
		});

		it('[EJS-4] should format template with values from string array', () => {
			const template = '<%=people.join(",");%>';
			const data = {
				people: [ 'tom', 'dick', 'harry' ]
			};

			return mocknode(builder).node('gm-ejs').invoke('formatStr', { template, data })
				.then((result) => {
					expect(result).to.deep.equal({
						next: [ null, 'tom,dick,harry' ]
					});
				});
		});

		it('[EJS-5] should format template with values from object array', () => {
			const template = '<%= people.map(p => p.name).join(","); %>';
			const data = {
				people: [
					{ name: 'tom' },
					{ name: 'dick' },
					{ name: 'harry' }
				]
			};

			return mocknode(builder).node('gm-ejs').invoke('formatStr', { template, data })
				.then((result) => {
					expect(result).to.deep.equal({
						next: [ null, 'tom,dick,harry' ]
					});
				});
		});

		it('[EJS-6] should error on format of invalid template', () => {
			const template = '<%= foo';
			const data = {
				people: [ 'tom', 'dick', 'harry' ]
			};

			return mocknode(builder).node('gm-ejs').invoke('formatStr', { template, data })
				.then((result) => {
					expect(result).to.have.property('error');
					expect(result.error[0]).to.be.null;
					expect(result.error[1].message).to.be.equal('Could not find matching close tag for "<%=".');
				});
		});

		it('[EJS-7] should format object from template', () => {
			const template = `{
				"name": "<%=first%> <%=last%>",
				"age": <%=age%>,
				"gender": "<%= male ? 'm' : 'f'%>"
			}`;
			const data = {
				first: 'Clark',
				last: 'Kent',
				age: 27,
				male: true
			};

			return mocknode(builder).node('gm-ejs').invoke('formatObj', { template, data })
				.then((result) => {
					expect(result).to.deep.equal({
						next: [ null, {
							name: 'Clark Kent',
							age: 27,
							gender: 'm'
						} ]
					});
				});
		});

		it('[EJS-8] should format object should trigger error if template is not valid', () => {
			const template = `{
				"name": "<%=first%> <%=last",
				"age": <%=age%>,
				"gender": "<%= male ? 'm' : 'f'%>"
			}`;
			const data = {
				first: 'Clark',
				last: 'Kent',
				age: 27,
				male: true
			};

			return mocknode(builder).node('gm-ejs').invoke('formatObj', { template, data })
				.then((result) => {
					expect(result).to.have.property('error');
					expect(result.error[0]).to.be.null;
					expect(result.error[1].message).to.be.equal('Could not find matching close tag for "<%=".');
				});
		});
	});
});
