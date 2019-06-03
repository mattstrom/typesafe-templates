import { traverse } from '@babel/core';
import { NodePath } from '@babel/traverse';
import { isProgram, Node } from '@babel/types';

import { getAst } from '../app';

type TypedNodePath<T> =
	T extends Array<Node | null | undefined> ? Array<NodePath<T[number]>> :
	T extends Node | null | undefined ? NodePath<T> :
	never;

export async function getNodePath<T extends Node | Array<Node>>(code: string, selector: string) {
	const ast = await getAst(code);
	let path!: NodePath<T>;

	traverse(ast!, {
		Program(_path: NodePath<any>) {
			path = _path;
			_path.stop();
		},
	});

	if (!path || !isProgram(path!)) {
		throw new Error('');
	}

	return path.get(selector) as TypedNodePath<T>;
}
