module.exports = {
  root: true,
  'extends': 'airbnb',
  'parser': 'babel-eslint',
  'plugins': ['import'],
  'settings': {
    'import/resolver': {
      node: {
        paths: ['src'],
        alias: {
          _assets: './src/assets',
          _components: './src/components',
          _atoms: './src/components/atoms',
          _molecules: './src/components/molecules',
          _organisms: './src/components/organisms',
          _navigations: './src/navigations',
          _scenes: './src/scenes',
          _services: './src/services',
          _styles: './src/styles',
          _utils: './src/utils',
          _actions: './src/redux/actions',
        },
      },
    },
  },
  'env': {
    'jest': true,
  },
  'rules': {
    'no-use-before-define': 'off',
    'react/jsx-filename-extension': 'off',
    'react/prop-types': 'off',
    'comma-dangle': 'off',
  },
  'globals': {
    "fetch": false
  },
}