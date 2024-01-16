import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const theme = {
    defaultTheme: 'light',
    themes: {
      light: {
        dark: false,
        colors: {
          navBackground: '#F4F5FA',
          background: '#F4F5FA',
            primary: '#5D87FF',
            secondary: '#49BEFF',
            info: '#539BFF',
            success: '#13DEB9',
            accent: '#FFAB91',
            warning: '#FFAE1F',
            error: '#FA896B',
            danger: '#ff3b3b',
            muted:'#5a6a85',
            lightprimary: '#ECF2FF',
            lightsecondary: '#E8F7FF',
            lightsuccess: '#E6FFFA',
            lighterror: '#FDEDE8',
            lightwarning: '#FEF5E5',
            textPrimary: '#2A3547',
            textSecondary: '#2A3547',
            borderColor: '#e5eaef',
            inputBorder: '#000',
            containerBg: '#ffffff',
            hoverColor: '#f6f9fc',
            surface: '#FFFFFF',
            'on-surface-variant': '#fff',
            'on-surface': '#454545',
            'on-background': '#454545',
            grey100: '#F2F6FA',
            grey200: '#EAEFF4'
        },
        variables: {
            'border-color': '#eeeeee',
            'carousel-control-size': 10
        },
      },
      dark: {
        dark: true,
        colors: {
          navBackground: '#312D4B',
          'primary': '#9155FD',
          'secondary': '#8A8D93',
          'on-secondary': '#fff',
          'success': '#56CA00',
          'info': '#16B1FF',
          'warning': '#FFB400',
          'error': '#FF4C51',
          'danger': '#ff3b3b',
          'on-primary': '#FFFFFF',
          'on-success': '#FFFFFF',
          'on-warning': '#FFFFFF',
          'background': '#28243D',
          'on-background': '#E7E3FC',
          'surface': '#312D4B',
          'on-surface': '#E7E3FC',
          'grey-50': '#2A2E42',
          'grey-100': '#474360',
          'grey-200': '#4A5072',
          'grey-300': '#5E6692',
          'grey-400': '#7983BB',
          'grey-500': '#8692D0',
          'grey-600': '#AAB3DE',
          'grey-700': '#B6BEE3',
          'grey-800': '#CFD3EC',
          'grey-900': '#E7E9F6',
          'perfect-scrollbar-thumb': '#4A5072',
          'skin-bordered-surface': '#312d4b',

          borderColor: '#3b3a3a',
          inputBorder: '#000',
        },
        variables: {
            'border-color': '#eeeeee',
            'carousel-control-size': 10
        },
      },
    },
  }
  


export default createVuetify({
    components,
    directives,

    theme: theme,
    defaults: {
        VBtn: {},
        VCard: {
            rounded: 'md'
        },
        VTextField: {
            rounded: 'lg'
        },
        VTooltip: {
            // set v-tooltip default location to top
            location: 'top'
        }
    }
});
