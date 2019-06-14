import * as babel from '@babel/core';

import { visitorFactory, VisitorOptions } from '../handlers';


export type TypesafeTemplateOptions = VisitorOptions;

export function TypesafeTemplatePlugin(context: typeof babel) {
	return { visitor: visitorFactory() } as babel.PluginObj;
}
