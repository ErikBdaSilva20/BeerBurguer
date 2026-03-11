export const appearance = {
  theme: 'night',

  variables: {
    /* 🎨 Cores adaptadas ao tema DevBurguer */
    colorPrimary: '#ffee00', // yellow primary
    colorPrimaryText: '#000000',

    colorBackground: '#1a1a1a',
    colorComponentBackground: '#2b2b2b',
    colorComponentBorder: '#363636',
    colorComponentDivider: '#363636',

    colorText: '#ffffff',
    colorTextSecondary: '#94a3b8',
    colorTextPlaceholder: '#625e5e',

    colorDanger: '#ff3205', // danger theme
    colorSuccess: '#61a120', // success theme
    colorWarning: '#ff8c05', // secondary theme

    /* 🔤 Tipografia */
    fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
    fontSizeBase: '15px',
    fontWeightNormal: '400',
    fontWeightMedium: '500',

    /* 📐 Layout */
    borderRadius: '10px',
    spacingUnit: '6px',

    /* 🌗 Estados */
    focusRingColor: '#22c55e',
    focusRingWidth: '2px',
  },

  rules: {
    /* Inputs */
    '.Input': {
      backgroundColor: '#2b2b2b',
      border: '1px solid #363636',
      padding: '12px 14px',
      boxShadow: 'none',
      transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
    },

    '.Input:hover': {
      borderColor: '#ff8c05',
    },

    '.Input:focus': {
      borderColor: '#ffee00',
      boxShadow: '0 0 0 1px #ffee00',
    },

    /* Labels */
    '.Label': {
      color: '#ffffff',
      fontWeight: '600',
      marginBottom: '6px',
      fontSize: '14px',
    },

    /* Tabs (cartão / pix / etc) */
    '.Tab': {
      backgroundColor: '#2b2b2b',
      border: '1px solid #363636',
      padding: '12px 16px',
    },

    '.Tab:hover': {
      backgroundColor: '#1a1a1a',
      borderColor: '#ff8c05',
    },

    '.Tab--selected': {
      backgroundColor: '#2b2b2b',
      borderColor: '#ffee00',
      boxShadow: '0 0 0 1px #ffee00',
    },

    /* Botão padrão do PaymentElement */
    '.Button': {
      backgroundColor: '#ffee00',
      color: '#000000',
      borderRadius: '12px',
      fontWeight: '700',
      padding: '14px',
      textTransform: 'uppercase',
    },

    '.Button:hover': {
      backgroundColor: '#ffffff',
    },

    /* Mensagens de erro */
    '.Error': {
      color: '#ff3205',
      fontSize: '13px',
      marginTop: '6px',
    },

    /* Dividers */
    '.Divider': {
      backgroundColor: '#1e293b',
    },
  },
};
