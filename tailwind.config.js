module.exports = {
    prefix: 'mc-',
    purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    darkMode: false, // or 'media' or 'class'
    variants: {
        extend: {}
    },
    plugins: [],
    corePlugins: {
        preflight: false
    }
};
