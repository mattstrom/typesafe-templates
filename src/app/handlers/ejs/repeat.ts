import { NodePath } from '@babel/traverse';
import { identifier, JSXElement } from '@babel/types';
import { getRefValueForAttribute, resolveControlFlowTag } from '../../helpers';


export function handleRepeatElement(path: NodePath<JSXElement>, state: any) {
	const ref = getRefValueForAttribute(path, 'items');
	const { blocks, args } = resolveControlFlowTag(path, state);

	const itemName = args[0] || 'data';

	path.insertBefore(identifier(`<%_ for (const ${itemName} of (${ref} || [])) { _%>`));
	path.insertBefore(blocks);
	path.insertBefore(identifier(`<%_ } _%>`));

	path.remove();
}
