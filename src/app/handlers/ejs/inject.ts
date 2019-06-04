import { NodePath } from '@babel/traverse';
import { identifier, JSXElement } from '@babel/types';
import { getRefValueForAttribute } from '../../helpers';


export function handleInjectionElement(path: NodePath<JSXElement>, state: any) {
	const ref = getRefValueForAttribute(path, 'value');

	path.replaceWith(
		identifier(`<%= ${ref} %>`)
	);
}

export function handleArrayElement(path: NodePath<JSXElement>, state: any) {
	const ref = getRefValueForAttribute(path, 'value');

	path.replaceWith(
		identifier(`<%- JSON.stringify(${ref}) %>`)
	);
}

export function handleObjectElement(path: NodePath<JSXElement>, state: any) {
	const ref = getRefValueForAttribute(path, 'value');

	path.replaceWith(
		identifier(`<%- JSON.stringify(${ref}) %>`)
	);
}

export function handleStringElement(path: NodePath<JSXElement>, state: any) {
	const ref = getRefValueForAttribute(path, 'value');

	path.replaceWith(
		identifier(`'<%- ${ref}.replace(/'/g, "\\\\\'") %>'`)
	);
}
