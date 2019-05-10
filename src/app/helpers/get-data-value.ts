import { types } from '@babel/core';
import { NodePath } from '@babel/traverse';
import { isTSAsExpression, isTSNonNullExpression, TSAsExpression, TSNonNullExpression } from '@babel/types';

import { NodeTypeNotSupportedError } from '../errors';
import { getDataForScope } from './get-data-for-scope';


export function getDataValue(path: NodePath | null): any {
	if (!path) {
		return null;
	}

	const $data = getDataForScope(path);

	if (path.isJSXExpressionContainer()) {
		return getDataValue(path.get('expression'));
	} else if (isTSAsExpression(path.node)) {
		const subpath = (path as NodePath<TSAsExpression>).get('expression');
		return getDataValue(subpath);
	} else if (isTSNonNullExpression(path.node)) {
		const subpath = (path as NodePath<TSNonNullExpression>).get('expression');
		return getDataValue(subpath);
	} else if (path.isMemberExpression()) {
		const node = path.node;
		const key = (types.isIdentifier(node.property))
			? node.property.name
			: node.property;

		return $data[key];
	} else if (path.isStringLiteral() || path.isBooleanLiteral() || path.isNumberLiteral()) {
		return path.node.value;
	} else {
		throw new NodeTypeNotSupportedError(path.node, getDataValue.name);
	}
}
