const path = require('path');

module.exports = new (function () {
	this.ROOT = path.resolve(__dirname, '..', '..', '..');
})();
