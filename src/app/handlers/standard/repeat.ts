import { NodePath } from '@babel/traverse';
import { JSXElement } from '@babel/types';

import { getDataForScope, getDataValueForAttribute, resolveControlFlowTag } from '../../helpers';


export function handleRepeatElement(path: NodePath<JSXElement>, state: any) {
	const $data = getDataForScope(path);
	const items = getDataValueForAttribute(path, 'items');

	if (!Array.isArray(items) || items.length === 0) {
		path.remove();
		return;
	}

	items.forEach(item => {
		const { blocks } = resolveControlFlowTag(path, state);

		path.insertBefore(blocks)
			.forEach((childPath: NodePath) => {
				childPath.setData('$data', item);
				childPath.setData('$parent', $data);
			});
	});

	path.remove();
}
