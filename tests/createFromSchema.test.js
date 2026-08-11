import { expect, test } from 'vitest';
import utils from '../index.js';

test('createFromSchema should return defaults and apply overrides', () => {

	const schema = {
		type: 'object',
		properties: {
			name: {
				type: 'string',
				default: 'Anonymous'
			},
			active: {
				type: 'boolean',
				default: true
			},
			roles: {
				type: 'array',
				default: ['user'],
				items: {
					type: 'string'
				}
			},
			profile: {
				type: 'object',
				properties: {
					age: {
						type: 'integer',
						default: 18
					},
					city: {
						type: 'string',
						default: 'Unknown'
					}
				}
			},
			id: {
				type: 'string',
				default: () => 'generated-id'
			}
		}
	};

	const result = utils.createFromSchema({
		name: 'Scott',
		profile: {
			city: 'Austin'
		}
	}, schema);

	expect(result).toStrictEqual({
		name: 'Scott',
		active: true,
		roles: ['user'],
		profile: {
			age: 18,
			city: 'Austin'
		},
		id: 'generated-id'
	});

});

test('createFromSchema should treat undefined overrides as missing values', () => {

	const schema = {
		type: 'object',
		properties: {
			count: {
				type: 'integer',
				default: 5
			}
		}
	};

	const result = utils.createFromSchema({ count: undefined }, schema);

	expect(result).toStrictEqual({ count: 5 });

});

test('createFromSchema should clean override values using schema rules', () => {

	const schema = {
		type: 'object',
		properties: {
			count: {
				type: 'integer',
				default: 0
			},
			price: {
				type: 'number',
				default: 0
			},
			createdAt: {
				type: 'timestamp'
			},
			profile: {
				type: 'object',
				properties: {
					age: {
						type: 'integer',
						default: 18
					}
				}
			}
		}
	};

	const result = utils.createFromSchema({
		count: '42',
		price: '19.95',
		createdAt: '2024-01-01T00:00:00.000Z',
		profile: {
			age: '31'
		}
	}, schema);

	expect(result).toStrictEqual({
		count: 42,
		price: 19.95,
		createdAt: '2024-01-01T00:00:00.000Z',
		profile: {
			age: 31
		}
	});

});

test('createFromSchema should throw for non-object schema', () => {

	const badSchema = {
		type: 'string'
	};

	expect(() => {

		utils.createFromSchema({}, badSchema);

	}).toThrow();

});
