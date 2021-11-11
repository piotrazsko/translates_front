import baseConfig from './base';

const config = {
    isActiveDevTool: true,
    baseUrl: 'http://localhost:3000',
};

export default Object.freeze(Object.assign({}, baseConfig, config));
