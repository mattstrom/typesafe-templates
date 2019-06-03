import { NodePath } from '@babel/traverse';
import { JSXElement } from '@babel/types';

import { getNodePath } from '../../tests/node-path.helper';
import { InvalidChildNode } from '../errors';
import { resolveControlFlowTag } from './resolve-control-flow-tag';


describe('resolveControlFlowTag()', () => {
	it('should return the expected block context', async () => {
		// Arrange
		const template = `
			<$if test={name === 'Alice'}>
				{(model: Model) => {
					const a = <$string value={model.name} />;
					const b = <$string value={model.name} />;
					const c = <$string value={model.name} />;
				}}
			</$if>
		`;

		const nodePath = await getNodePath<JSXElement>(template, 'body.0.expression');

		// Act
		const context = resolveControlFlowTag(nodePath);

		// Assert
		expect(context).not.toBeNull();
		expect(context).toHaveProperty('args');
		expect(context).toHaveProperty('blocks');

		expect(context.args).toHaveLength(1);
		expect(context.args[0]).toEqual('model');

		expect(context.blocks).toHaveLength(3);
	});

	describe('when child is not a JSX expression container', () => {
		it('should throw an InvalidChildNode error', async () => {
			// Arrange
			const template = `
				<$if test={name === 'Alice'}>
					<div></div>
				</$if>
			`;

			const nodePath = await getNodePath<JSXElement>(template, 'body.0.expression');

			if (!nodePath) {
				fail();
				return;
			}

			// Act & Assert
			expect(() => {
				resolveControlFlowTag(nodePath as NodePath<JSXElement>);
			}).toThrow(InvalidChildNode);
		});
	});

	describe('when child is a JSX expression container', () => {
		it('should not throw an error', async () => {
			// Arrange
			const template = `
				<$if test={name === 'Alice'}>
					{() => {}}
				</$if>
			`;

			const nodePath = await getNodePath<JSXElement>(template, 'body.0.expression');

			if (!nodePath) {
				fail();
				return;
			}

			// Act & Assert
			expect(() => {
				resolveControlFlowTag(nodePath);
			}).not.toThrow(InvalidChildNode);
		});
	});

	describe('when node has more than one child', () => {
		it('should throw an error ', async () => {
			// Arrange
			const template = `
				<$if test={name === 'Alice'}>
					{() => {}}
					{() => {}}
				</$if>
			`;

			const nodePath = await getNodePath<JSXElement>(template, 'body.0.expression');

			if (!nodePath) {
				fail();
				return;
			}

			// Act & Assert
			expect(() => {
				resolveControlFlowTag(nodePath);
			}).toThrow(InvalidChildNode);
		});
	});
});
