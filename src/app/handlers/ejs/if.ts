import { NodePath } from '@babel/traverse';
import { identifier, JSXElement } from '@babel/types';

import { getRefValueForAttribute, resolveControlFlowTag } from '../../helpers';


export function handleIfElement(path: NodePath<JSXElement>, state: any) {
	const ref = getRefValueForAttribute(path, 'test');
	const { blocks, args } = resolveControlFlowTag(path, state);

	path.insertBefore(identifier(`<%_ if (${ref}) { _%>`));
	path.insertBefore(blocks);
	path.insertBefore(identifier(`<%_ } _%>`));

	path.remove();
}
