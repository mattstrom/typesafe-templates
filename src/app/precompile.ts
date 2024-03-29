import * as babel from '@babel/core';
import PresetTypescript from '@babel/preset-typescript';
import PluginJsxSyntax from '@babel/plugin-syntax-jsx';
import outdent from 'outdent';

import { clean, decode, encode } from './helpers';
import { TypesafeTemplateOptions, TypesafeTemplatePlugin } from './plugins';


export interface PrecompilerOptions {
	plugins: babel.PluginObj<any>[];
	precompile?: false | 'ejs' | 'standard';
	comments?: boolean;
}

const defaultOptions: PrecompilerOptions = {
	plugins: [],
	precompile: 'ejs'
};

export async function precompile(
	template: string,
	options: Partial<PrecompilerOptions> = {}
): Promise<string | null> {
	const _options = {
		...defaultOptions,
		...options
	};

	const opts: TypesafeTemplateOptions = {
		...defaultOptions,
		data: {}
	};

	const result = await babel.transformAsync(template, {
		ast: false,
		filename: 'template.tsx', // Arbitrary filename. Used by Babel to discern syntax of `contents`.
		comments: _options.comments,
		presets: [
			PresetTypescript
		],
		plugins: [
			PluginJsxSyntax,
			[TypesafeTemplatePlugin, opts],
			..._options.plugins
		]
	});

	if (!result || !result.code) {
		return null;
	}

	return outdent`
		${result.code}
		${appendLib()}
	`;
}

function appendLib() {
	const funcs = [clean, decode, encode];
	const lib = funcs.map(fn => `${fn}`).join('\n\n');

	const demarcation = `<%# [typesafe-templates] EJS Library Functions %>`;

	return outdent`
		${demarcation}
		<%_
			${lib}
		_%>
	`;
}
