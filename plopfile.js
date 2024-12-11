/* eslint-disable */
module.exports = plop => {
  plop.setGenerator('component', {
    description: 'Create a component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is your component name?'
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/components/{{pascalCase name}}/{{pascalCase name}}.tsx',
        templateFile: 'plop-templates/Component.js.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{pascalCase name}}/styles.ts',
      },
      {
        type: 'add',
        path: 'src/components/{{pascalCase name}}/index.ts',
        templateFile: 'plop-templates/ComponentIndex.js.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{pascalCase name}}/__tests__/{{pascalCase name}}.spec.tsx',
        templateFile: 'plop-templates/ComponentTest.js.hbs',
      }
    ],
  });
};
