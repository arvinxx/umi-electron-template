const { resolve } = require('path');

export const isDev = process.env.NODE_ENV === 'development';

export const srcPath = resolve(__dirname, '../src');
