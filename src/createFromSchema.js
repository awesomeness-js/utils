import each from './each.js';
import validateSchema from './validateSchema.js';

function cloneValue(value) {

	if (Array.isArray(value)) {

		return value.map(cloneValue);

	}

	if (typeof Buffer !== 'undefined' && Buffer.isBuffer(value)) {

		return Buffer.from(value);

	}

	if (value && typeof value === 'object') {

		const result = {};

		each(value, (itemValue, itemKey) => {

			result[itemKey] = cloneValue(itemValue);

		});

		return result;

	}

	return value;

}

function resolveDefault(schemaItem) {

	if (schemaItem.default === undefined) {

		return undefined;

	}

	const defaultValue = typeof schemaItem.default === 'function'
		? schemaItem.default()
		: schemaItem.default;

	return cloneValue(defaultValue);

}

function buildValue(overrideValue, schemaItem) {

	const hasOverride = overrideValue !== undefined;

	if (schemaItem.type === 'object') {

		if (
			hasOverride
			&& (
				typeof overrideValue !== 'object'
				|| overrideValue === null
				|| Array.isArray(overrideValue)
			)
		) {

			return cloneValue(overrideValue);

		}

		const safeOverride = hasOverride ? overrideValue : {};
		const result = {};

		each(schemaItem.properties, (childSchema, key) => {

			const childOverride = Object.prototype.hasOwnProperty.call(safeOverride, key)
				? safeOverride[key]
				: undefined;
			const childValue = buildValue(childOverride, childSchema);

			if (childValue !== undefined) {

				result[key] = childValue;

			}

		});

		if (hasOverride) {

			return result;

		}

		const explicitDefault = resolveDefault(schemaItem);

		if (explicitDefault !== undefined) {

			return explicitDefault;

		}

		return Object.keys(result).length > 0 ? result : undefined;

	}

	if (schemaItem.type === 'array') {

		if (hasOverride) {

			return cloneValue(overrideValue);

		}

		return resolveDefault(schemaItem);

	}

	if (hasOverride) {

		return cloneValue(overrideValue);

	}

	return resolveDefault(schemaItem);

}

export default function createFromSchema(overrides = {}, schema = {}) {

	if (
		typeof overrides !== 'object'
		|| overrides === null
		|| Array.isArray(overrides)
	) {

		throw {
			message: 'Overrides must be an object.',
			overrides
		};

	}

	validateSchema(schema);

	if (schema.type !== 'object') {

		throw {
			message: 'Schema must be an object schema.',
			schema
		};

	}

	return buildValue(overrides, schema) || {};

}
