import each from './each.js';
import validateSchema from './validateSchema.js';
import cleanBoolean from './clean/boolean.js';
import cleanInteger from './clean/integer.js';
import cleanNumber from './clean/number.js';
import cleanString from './clean/string.js';
import cleanTimestamp from './clean/timestamp.js';
import cleanUUID from './clean/uuid.js';
import cleanCustom from './clean/custom.js';
import cleanBuffer from './clean/buffer.js';
import cleanArray from './clean/array.js';
import cleanObject from './clean/object.js';

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

function cleanOverrideValue(overrideValue, schemaItem) {

	if (schemaItem.type === 'array') {

		return cleanArray(overrideValue, schemaItem);

	}

	if (schemaItem.type === 'object') {

		return cleanObject(overrideValue, schemaItem);

	}

	if (schemaItem.type === 'boolean') {

		return cleanBoolean(overrideValue, schemaItem);

	}

	if (schemaItem.type === 'integer') {

		return cleanInteger(overrideValue, schemaItem);

	}

	if (schemaItem.type === 'number') {

		return cleanNumber(overrideValue, schemaItem);

	}

	if (schemaItem.type === 'string') {

		return cleanString(overrideValue, schemaItem);

	}

	if (schemaItem.type === 'timestamp') {

		return cleanTimestamp(overrideValue, schemaItem);

	}

	if (schemaItem.type === 'uuid') {

		return cleanUUID(overrideValue, schemaItem);

	}

	if (schemaItem.type === 'custom') {

		return cleanCustom(overrideValue, schemaItem);

	}

	if (schemaItem.type === 'buffer') {

		return cleanBuffer(overrideValue, schemaItem);

	}

	return cloneValue(overrideValue);

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

			return cleanOverrideValue(overrideValue, schemaItem);

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

			return cleanOverrideValue(overrideValue, schemaItem);

		}

		return resolveDefault(schemaItem);

	}

	if (hasOverride) {

		return cleanOverrideValue(overrideValue, schemaItem);

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
