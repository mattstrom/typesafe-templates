import * as babel from '@babel/core';
import { NodePath } from '@babel/traverse';
import {
	ArrowFunctionExpression, FunctionExpression, JSXElement,
	JSXExpressionContainer
} from '@babel/types';

import { getDataForScope, getDataValueForAttribute, getJSXElementName } from '../helpers';
import t = babel.types;


/**
 *  Noop function that provides type definition for JSX element.
 */
export function $repeat(props: { items: string | any[]; }): void {}

export function isRepeatElement(node: NodePath) {
	const name = getJSXElementName(node);
	return (name === '$repeat');
}

export function handleRepeatElement(path: NodePath<JSXElement>, state: any) {
	const $data = getDataForScope(path);
	const items = getDataValueForAttribute(path, 'items');

	if (!Array.isArray(items) || items.length === 0) {
		path.remove();
		return;
	}

	const children = path.node.children;

	items.forEach((item: any) => {
		const clones: JSXExpressionContainer[] = children
			.filter(child => {
				return t.isJSXExpressionContainer(child)
					&& (t.isArrowFunctionExpression(child.expression)
						|| t.isFunctionExpression(child.expression));
			})
			.map(child => t.cloneDeep(child) as JSXExpressionContainer);

		if (clones.length === 0) {
			return;
		}

		const blocks = clones
			.map(clone => clone.expression as (ArrowFunctionExpression | FunctionExpression))
			.filter(func => t.isBlockStatement(func.body))
			.reduce((acc: any[], func) => {
				return (t.isBlockStatement(func.body))
					? acc.concat(func.body.body)
					: acc;
			}, []);

		path.insertBefore(blocks)
			.forEach((childPath: NodePath) => {
				childPath.setData('$data', item);
				childPath.setData('$parent', $data);
			});
	});

	path.remove();
}
