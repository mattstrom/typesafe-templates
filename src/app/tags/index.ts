export * from './any';
export * from './array';
export * from './boolean';
export * from './decode';
export * from './encode';
export * from './expr';
export * from './if';
export * from './nullable';
export * from './number';
export * from './object';
export * from './repeat';
export * from './string';

export type ControlFlowTag
	= '$if'
	| '$repeat';

export type ConverterTag
	= '$decode'
	| '$encode'
	| '$nullable';

export type InjectionTag
	= '$any'
	| '$array'
	| '$boolean'
	| '$expr'
	| '$number'
	| '$object'
	| '$string';

export type TagName = ControlFlowTag | ConverterTag | InjectionTag;
