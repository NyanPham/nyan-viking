module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        fadeIn: 'fadeIn 1000ms ease-in-out forwards',
        fadeOut: 'fadeOut 500ms ease-in-out forwards',
        slideIn: 'slideIn 1000ms ease-in-out forwards',
        flipTop: 'flipTop 250ms ease-in',
        flipBottom: 'flipBottom 250ms 200ms ease-out',
        slideFromLeft: 'slideFromLeft 550ms 200ms ease-in-out forwards',
        slideFromBottom: 'slideFromBottom 550ms 200ms ease-in-out forwards',
        slideFromLeft200: 'slideFromLeft 550ms 400ms ease-in-out forwards',
        slideFromBottom200: 'slideFromBottom 550ms 400ms ease-in-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10%)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeOut: {
          '0%': { opacity: '1', transform: 'translateY(0)' },
          '100%': { opacity: '0', transform: 'translateY(10%)' },
        },
        slideIn: {
          '0%': { transform: 'translateX(110%)' },
          '100%': { transform: 'translateX(0) '},
        },
        flipTop: {
          '100%' : { transform: 'rotateX(90deg)' },
        },
        flipBottom: {
          '100%' : { transform: 'rotateX(0deg)' },
        },
        slideFromLeft: {
          '0%': { opacity: '0', transform: 'translateX(-16px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' }
        },
        slideFromBottom: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      }
    },
  },
  plugins: [],
}
