typesafe-templates
====================
Template engine for writing compiler-checked templates in TypeScript by leveraging JSX to generate JavaScript code from 
TypeScript code files rather than text templates.

Under the hood, `typesafe-templates` uses Babel to build an AST, which is then traversed to find and replace JSX nodes.
Such a tool can be useful for pre-generating customized Javascript files that vary by user. 

### Example
_template.tsx_
```typescript jsx
interface Message {
    name: string;
    lang: 'en' | 'es';
}

(function() {
    <$repeat items={$.messages}>
        {($: Message) => {
            <$if test={$.lang === 'en'}>
                console.log('Good morning' + <$string value={$.name} />);
            </$if>;
        	<$if test={$.lang === 'es'}>
                console.log('Bueño dias' + <$string value={$.name} />);
            </$if>;
        }}
    </$repeat>
})();
```

_script.ts_
```typescript jsx
import { renderFile } from 'typesafe-templates';

async function main() {
    const data: { messages: Message[] } = {
        messages: [
            { name: 'Alice', lang: 'en' },
            { name: 'Bob', lang: 'en' },
            { name: 'Dora', lang: 'es' },
            { name: 'Diego', lang: 'es' }
        ]
    };
    
    const { code } = await renderFile('./template.tsx', data);
    console.log(code);
}
```

Output
```javascript
(function() {
    console.log('Good morning, Alice');
    console.log('Good morning, Bob');
    console.log('Bueño dias, Dora');
    console.log('Bueño dias, Diego');
})();
```

### Installation

```bash
npm install typesafe-templates
```

> Use the `--save-dev` flag if you will be generating templates as part of a development task.

### Usage

### Elements

#### Control Elements
Control elements are similiar to JavaScript control blocks. They wrap a block of code and control
its output into the rendered code. In JSX terms, they require `props.children` to be defined.
##### `<$if test={} />`
Controls whether the wrapped contents will appear in the output.

##### `<$repeat items={} />`
Repeats the wrapped contents for each item in `items`. For each copy, a new data scope is created
and set to value of the current item.

The `$repeat` element expects the `children` prop to be a function or arrow function expression; however, this
surrounding function will be removed in the final output.

Example:
```typescript jsx
<$repeat items={$.messages}>
    {($: Message) => {
    	console.log(<$string value={$.name}>)
    }}
</$repeat>
```

#### Injection Elements
##### `<$boolean value={} />`
Outputs a boolean literal.

##### `<$expr code={} />`
Takes in a string representing an expression, parses it into AST, and adds the resultant node into the output.

##### `<$number value={} />`
Outputs a numeric literal.

##### `<$string value={} />`
Outputs a string literal.

