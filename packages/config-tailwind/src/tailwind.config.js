const path = require('path');
const { ROOT } = require('@blog/constants/node');
const defaultTheme = require('tailwindcss/defaultTheme');

const locations = ['app/client', 'packages/components'];

module.exports = {
	content: locations.map((location) => path.resolve(ROOT, location, '**', '*.(tsx|html)')),
	theme: {
		extend: {
			fontFamily: {
				sans: ['Noto Sans', ...defaultTheme.fontFamily.sans],
				'sans-headings': ['Secular One', ...defaultTheme.fontFamily.sans]
			},
			screens: {
				'2xl': { max: '1535px' },
				xl: { max: '1279px' },
				lg: { max: '1023px' },
				md: { max: '767px' },
				sm: { max: '639px' }
			}
		}
	}
};
