const path = require('path');
const { ROOT } = require('@blog/constants');

const locations = ['app/client', 'packages/components'];

module.exports = {
	content: locations.map((location) => path.resolve(ROOT, location, '**', '*.tsx'))
};
