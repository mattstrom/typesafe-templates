import { types } from '@babel/core';
import { NodePath } from '@babel/traverse';
import {
	Identifier,
	isIdentifier,
	isMemberExpression,
	isTSAsExpression, isTSNonNullExpression, MemberExpression, TSAsExpression, TSNonNullExpression
} from '@babel/types';

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

export function getRefValue(path: NodePath | null): any {
	if (!path) {
		return null;
	}

	if (path.isJSXExpressionContainer()) {
		return getRefValue(path.get('expression'));
	} else if (isTSAsExpression(path.node)) {
		const subpath = (path as NodePath<TSAsExpression>).get('expression');
		return getRefValue(subpath);
	} else if (isTSNonNullExpression(path.node)) {
		const subpath = (path as NodePath<TSNonNullExpression>).get('expression');
		return getRefValue(subpath);
	} else if (path.isBinaryExpression()) {
		const left = getRefValue(path.get('left'));
		const right = getRefValue(path.get('right'));
		const operator = getRefValue(path.get('operator'));

		return `${left} ${operator} ${right}`;
	} else if (path.isMemberExpression()) {
		return getRefFromMemberExpression(path.node);
	} else if (path.isStringLiteral()) {
		return `'${path.node.value}'`;
	} else if (path.isBooleanLiteral() || path.isNumericLiteral()) {
		return path.node.value;
	} else if (path.isIdentifier()) {
		return path.node.name;
	} else if (path.key === 'operator') {
		return path.node;
	} else {
		throw new NodeTypeNotSupportedError(path.node, getRefValue.name);
	}
}

export function getRefFromMemberExpression(member: MemberExpression): string {
	const obj = (isMemberExpression(member.object))
		? getRefFromMemberExpression(member.object)
		: (member.object as Identifier).name;

	const property = member.property;

	if (!isIdentifier(property)) {
		throw new Error('Reference expression not supported');
	}

	return `${obj}.${property.name}`;
}
