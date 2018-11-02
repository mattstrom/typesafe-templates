import { Node } from '@babel/types';
import { NotSupportedError } from './not-supported.error';


export class NodeTypeNotSupportedError extends NotSupportedError {
	constructor(node: Node, methodName?: string) {
		super(`Node type '${node.type}' is not supported.` + (methodName && ` Method: ${methodName}`));
	}
}
