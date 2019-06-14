import generate from '@babel/generator';
import { NodePath } from '@babel/traverse';
import {
	binaryExpression, conditionalExpression, Identifier, identifier, isJSXElement,
	JSXElement, nullLiteral, stringLiteral
} from '@babel/types';

import { getRefValueForAttribute } from '../../helpers';
import { Handler, visitorFactory } from '..';


export const handleNullableElement: Handler = (path: NodePath<JSXElement>, state: any) => {
	const { children } = path.node;

	if (children.length !== 1) {
		throw new Error('$nullable must contain one and only one child');
	}

	const child = path.get('children.0') as NodePath<JSXElement>;

	if (!isJSXElement(child)) {
		throw new Error('Child of $nullable must be a JSX element');
	}

	const ref = getRefValueForAttribute(child, 'value');

	const ternary = conditionalExpression(
		binaryExpression('===', identifier(ref), identifier('undefined')),
		stringLiteral('undefined'),
		conditionalExpression(
			binaryExpression('===', identifier(ref), nullLiteral()),
			stringLiteral('null'),
			child.node
		)
	);

	path.replaceWith(ternary);
	path.parentPath.traverse(visitorFactory());

	path.traverse({
		Identifier(innerPath: NodePath<Identifier>) {
			const { node } = innerPath;

			const regex = /^(['"]?)<%[=\-] (.*) %>\1$/;
			const matches = regex.exec(node.name);

			if (matches) {
				const isString = matches[1];
				const newNode = (isString)
					? identifier(`'\\\'' + ${matches[2]} + '\\\''`)
					: identifier(`${matches[2]}`);

				innerPath.replaceWith(newNode);
			}
		}
	});

	const { code } = generate(ternary);

	path.replaceWith(
		identifier(`<%- ${code} %>`)
	);
};
