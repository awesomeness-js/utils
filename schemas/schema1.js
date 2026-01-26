import { uuid } from '../index.js';

const properties = {

	exampleId: {
		type: 'uuid',
		description: 'the id of the vertex',
		default: () => {

			return uuid(); 

		},
		example: '00000000-0000-0000-0000-000000000000',
		immutable: true,
		required: true
	},

	exampleString: {
		type: 'string',
		minLength: 1,
		maxLength: 100,
		example: 'This is my post',
		description: 'main title of the post',
		default: null,
		required: true,
	},

	exampleArray: {
		type: 'array',
		items: {
			type: 'string',
			description: 'any tag, can have spaces',
			minLength: 1,
			maxLength: 100,
		}
	},

	exampleArrayOfObjects: {
		type: 'array',
		items: {
			type: 'object',
			properties: {
				name: {
					type: 'string'
				}
			}
		}
	},

	exampleObject: {
		type: 'object',
		properties: {
			someString:{
				type: 'string',
			},
			someArrayOfObjects:{
				type: 'array',
				items: {
					type: 'object',
					properties: {
						name: {
							type: 'string'
						}
					}
				}
			}
		}
	}
};

const edges = Object.freeze({

});

const edgesIn = Object.freeze({
	author: 'author',
	viewed: 'viewed',
});

const relatedKVs = {
	'blogPost::${id}::body': {
		type: 'array',
		description: 'body of the post - stored off vertex for query performance',
		items: {
			type: 'object',
			description: 'any part of a blog post on order',
			properties: {
				fn: {
					type: 'string',
					description: 'the name of the fn such a "body" (app.print.blogPost.body)',
					validValues: [
						"body",
						"h1",
						"h2",
						"image",
						"div",
						"p",
						"callToAction"
					]
				},
				data: {
					type: 'object',
					description: 'data passed to the fn',
				}
			}
		}
	}
};

export default {
	name: 'Blog Post',
	description: `a blog post`,
	type: 'object',
	properties,
	edges,
	edgesIn,
	relatedKVs
};