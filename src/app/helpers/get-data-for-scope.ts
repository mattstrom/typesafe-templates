import { NodePath } from '@babel/traverse';

export function getDataForScope(path: NodePath, key: string = '$data'): any {
	const parent = path.find(parentPath => parentPath.getData(key));

	return (parent)
		? parent.getData(key)
		: null;
}
