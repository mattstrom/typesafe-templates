import * as babel from '@babel/core';
import { BabelFileResult, Node } from '@babel/core';
import PluginJsxSyntax from '@babel/plugin-syntax-jsx';
import PresetTypescript from '@babel/preset-typescript';
import { File, Program } from '@babel/types';

import { TypesafeTemplateOptions, TypesafeTemplatePlugin } from './plugins';


export interface TransformerOptions {
	plugins: babel.PluginObj<any>[];
}

const defaultOptions: TransformerOptions = {
	plugins: []
};

export async function getAst(code: string): Promise<File | Program | null> {
	return await babel.parseAsync(code, {
		ast: true,
		filename: 'template.tsx', // Arbitrary filename. Used by Babel to discern syntax of `contents`.
		presets: [PresetTypescript],
		plugins: [PluginJsxSyntax]
	});
}

export async function renderFromAst(ast: Node, data: any, options: Partial<TransformerOptions> = {}): Promise<BabelFileResult> {
	const _options = {
		...defaultOptions,
		...options
	};

	const opts: TypesafeTemplateOptions = {
		...defaultOptions,
		data
	};

	return await babel.transformFromAstSync(ast!, undefined, {
		filename: 'template.tsx', // Arbitrary filename. Used by Babel to discern syntax of `contents`.
		presets: [
			PresetTypescript
		],
		plugins: [
			[TypesafeTemplatePlugin, opts],
			..._options.plugins
		]
	})!;
}

export async function render(
	template: string,
	data: any,
	options: Partial<TransformerOptions> = {}
): Promise<babel.BabelFileResult | null> {
	const _options = {
		...defaultOptions,
		...options
	};

	const opts: TypesafeTemplateOptions = {
		...defaultOptions,
		data
	};

	return await babel.transformAsync(template, {
		ast: true,
		filename: 'template.tsx', // Arbitrary filename. Used by Babel to discern syntax of `contents`.
		presets: [
			PresetTypescript
		],
		plugins: [
			PluginJsxSyntax,
			[TypesafeTemplatePlugin, opts],
			..._options.plugins
		]
	});
}

export async function renderFile(
	fileName: string,
	data: any,
	options: Partial<TransformerOptions> = {}
): Promise<babel.BabelFileResult | null> {
	const _options = {
		...defaultOptions,
		...options
	};

	const opts: TypesafeTemplateOptions = {
		...defaultOptions,
		data
	};

	return await babel.transformFileAsync(fileName, {
		ast: true,
		presets: [
			PresetTypescript
		],
		plugins: [
			PluginJsxSyntax,
			[TypesafeTemplatePlugin, opts],
			..._options.plugins
		]
	});
}
