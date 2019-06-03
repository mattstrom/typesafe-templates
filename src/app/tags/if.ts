import { types as t } from '@babel/core';
import { NodePath } from '@babel/traverse';
import {
	ArrowFunctionExpression, BlockStatement, FunctionExpression, JSXElement, JSXExpressionContainer
} from '@babel/types';
import { evaluateJSXAttribute, getDataForScope } from '../helpers';

import { Handler } from './tags';


/**
 *  Noop function to provides type definition for JSX element.
 */
export function $if(props: { test: any }): boolean {
	return true;
}

export const handleIfElement: Handler = (path: NodePath<JSXElement>, state: any) => {
	const $data = getDataForScope(path, '$data');
	const condition = evaluateJSXAttribute(path, 'test');

	const children = path.node.children;
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
		.map(func => {
			return (func.body as BlockStatement).body[0];
		});

	if (condition) {
		path.insertAfter(blocks)
			.forEach((childPath: NodePath) => {
				childPath.setData('$data', $data);
				childPath.setData('$parent', $data);
			});
	}

	path.remove();
};
