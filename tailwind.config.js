const { colors } = require(`tailwindcss/defaultTheme`);

module.exports = {
  content: ['./src/**/*.{html,js,json}'],
  theme: {
    // MEDIA QUERIES
    screens: {
      sm: '480px',
      md: '768px',
      xl: '1280px',
      smOnly: { max: '767.98px' },
      mdOnly: { min: '768px', max: '1279.98px' },
      notXl: { max: '1279.98px' },
    },
    // BASE FONT
    fontFamily: {
      gotham_pro: ['Gotham Pro', 'sans-serif'], // class="font-montserrat"
      // exo: ['"Exo 2"', 'sans-serif'],
    },
    // SHADOW
    boxShadow: {
      orange: '2px 8px 29px rgba(240, 127, 46, 0.2)', // class="shadow-orange"
      grey: '4px 4px 10px 0px rgba(138, 188, 228, 0.25), -2px -2px 10px 0px rgba(138, 188, 228, 0.15)',
      xlGrey: '10px 10px 40px 0px rgba(5, 45, 78, 0.15), 0px 1px 2px 0px rgba(138, 188, 228, 0.15)',
    },
    // THEME
    extend: {
      backgroundColor: theme => ({
        ...theme('colors'),
      }),
      backgroundImage: {
        check: "url('../images/agree-checkbox.svg')",
      },
      // ALL COLORS
      colors: {
        body: '#ffffff', // class="bg-body"
        black: {
          DEFAULT: '#000000', // class="bg-black text-black border-black"
          light: '#504C5C', // class="bg-black-light text-black-light border-black-light"
          dark: '#052D4E',
        },
        white: {
          DEFAULT: '#ffffff', // class="bg-white text-white border-white"
          dark: '#fafafa', // class="bg-white-dark text-white-dark border-white-dark"
        },
        accent: '#FF7B43', // class="bg-accent text-accent border-accent"
        primary: '#FEC830',
        second: '#F1F7FB',
        blue: {
          light: '#8ABCE4',
          dark: '#8ABCE4',
        },
      },
      // CONTAINER
      container: {
        center: true,
        padding: {
          DEFAULT: '1.25rem',
          sm: '1.25rem',
          md: '2rem',
          xl: '2rem',
        },
      },
      // KEYFRAMES
      keyframes: {
        side: {
          '0%, 100%': { transform: 'translateX(25%)' },
          '50%': { transform: ' translateY(0)' },
        },
        logo: {
          '0%': { transform: 'translateY(-200px)' },
          '40%': { transform: 'translateY(0), rotate(0)' },
          '50%': { transform: 'rotate(0)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        wifi: {
          '0%': { opacity: 0, fill: '#8abce4' },
          '60%': { opacity: 1, fill: 'transparent' },
          '100%': { opacity: 0, fill: 'transparent' },
        },
      },
      // ANIMATION
      animation: {
        side: 'side 1s ease-in-out infinite',
        logo: 'logo 2s linear',
        wifi: 'wifi 2.4s linear infinite',
      },
    },
  },
  plugins: [],
};
