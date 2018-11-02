import { types } from '@babel/core';
import { NodePath } from '@babel/traverse';
import { JSXAttribute, JSXElement } from '@babel/types';

import { NonexistentAttribute } from '../errors';
import { evaluateExpression } from './evaluate-expression';
import { getDataValue } from './get-data-value';


export function getJSXElementName(node: NodePath<any>) {
	return node.node.openingElement.name.name;
}

export function getJSXAttribute(path: NodePath<JSXElement>, name: string): NodePath<JSXAttribute> {
	const opening = path.get('openingElement');
	const attributes = opening.get('attributes');

	if (attributes.length === 0) {
		throw new NonexistentAttribute(name);
	}

	const attrIndex = attributes
		.map(attrPath => attrPath.node)
		.filter<JSXAttribute>(types.isJSXAttribute)
		.findIndex(attr =>
			types.isJSXAttribute(attr)
				? attr.name.name === name
				: false
		);

	if (attrIndex === -1) {
		throw new Error(`Attribute '${name}' does not exist on JSX element.`);
	}

	return attributes[attrIndex] as NodePath<JSXAttribute>;
}

export function getDataValueForAttribute(path: NodePath<JSXElement>, name: string) {
	const attr = getJSXAttribute(path, name);
	return getDataValue(attr.get('value') as NodePath);
}

export function evaluateJSXAttribute(path: NodePath<JSXElement>, name: string): any {
	const attr = getJSXAttribute(path, name);

	if (attr === undefined) {
		return undefined;
	}

	const attrValue = attr.get('value');

	return attrValue.isJSXExpressionContainer()
		? evaluateExpression(attrValue)
		: null;
}
