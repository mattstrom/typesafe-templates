import { NodePath } from '@babel/traverse';
import { JSXElement } from '@babel/types';

import { evaluateJSXAttribute, getDataForScope, resolveControlFlowTag } from '../../helpers';
import { Handler } from '..';


export const handleIfElement: Handler = (path: NodePath<JSXElement>, state: any) => {
	const $data = getDataForScope(path, '$data');
	const condition = evaluateJSXAttribute(path, 'test');

	const { blocks } = resolveControlFlowTag(path, state);

	if (!blocks || blocks.length === 0) {
		return;
	}

	if (condition) {
		path.insertAfter(blocks)
			.forEach((childPath: NodePath) => {
				childPath.setData('$data', $data);
				childPath.setData('$parent', $data);
			});
	}

	path.remove();
};
