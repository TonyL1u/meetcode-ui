module.exports = {
    mode: 'jit',
    prefix: 'mc-',
    purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}', './pages/**/*.{vue,js,ts,jsx,tsx}', './playground/**/*.{vue,js,ts,jsx,tsx}'],
    darkMode: false, // or 'media' or 'class'
    variants: {
        extend: {}
    },
    plugins: [],
    corePlugins: {
        preflight: false
    }
};
