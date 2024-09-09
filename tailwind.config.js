/** @type {import('tailwindcss').Config} */
export default {
    content: ['./resources/views/**/*.blade.php', './resources/js/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#0066AA',
                },
                secondary: {
                    DEFAULT: '#2E2E2E',
                },
            },
            fontFamily: {
                'dm-sans': ['DM Sans', 'system-ui'],
            },
        },
    },
    plugins: [],
}
