import * as babel from '@babel/core';
import { NodePath } from '@babel/traverse';
import { ImportDeclaration, JSXElement, Program } from '@babel/types';

import { UnexpectedType } from '../errors';
import { Handler } from '../handlers';
import standardHandlers from '../handlers/standard';
import ejsHandlers from '../handlers/ejs';
import { getJSXElementName } from '../helpers';
import { TagName } from '../tags';


export interface TypesafeTemplateOptions {
	data: object;
	precompile?: false | 'standard' | 'ejs';
}

export interface State {
	opts: TypesafeTemplateOptions;
}

export function TypesafeTemplatePlugin(context: typeof babel) {
	let handlers: Map<TagName, Handler> = standardHandlers;

	const visitor = {
		Program(path: NodePath<Program>, state: State) {
			path.setData('$data', state.opts.data);
			path.setData('$parent', undefined);
			path.setData('$root', state.opts.data);

			if (!state.opts.precompile) {
				return;
			}

			switch (state.opts.precompile) {
				case 'ejs': {
					handlers = ejsHandlers;
					break;
				}
				case 'standard': {
					handlers = standardHandlers;
					break;
				}
				default: {
					throw new Error(`'${state.opts.precompile}' is not a recognized value for 'precompile'.`);
				}
			}
		},
		ImportDeclaration(path: NodePath<ImportDeclaration>, state: State) {
			/* Removes imports from this library in templates. */

			if (path.node.source.value === 'typesafe-templates') {
				path.remove();
			}
		},
		JSXElement(path: NodePath<JSXElement>, state: State) {
			const name = getJSXElementName(path);

			if (!handlers.has(name)) {
				return;
			}

			try {
				const handler = handlers.get(name) as Handler;
				handler(path, state);

				return;
			} catch (e) {
				if (e instanceof TypeError) {
					throw new UnexpectedType(path, e);
				}

				throw e;
			}
		}
	};

	return { visitor } as babel.PluginObj;
}
