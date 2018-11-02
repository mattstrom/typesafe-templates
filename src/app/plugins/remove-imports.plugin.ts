import * as babel from '@babel/core';
import { NodePath } from '@babel/traverse';
import { ImportDeclaration } from '@babel/types';

export const RemoveImportsPlugin: babel.PluginObj = {
	visitor: {
		ImportDeclaration(path: NodePath<ImportDeclaration>) {
			path.remove();
		}
	}
};
