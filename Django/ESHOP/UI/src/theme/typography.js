// ----------------------------------------------------------------------

function pxToRem(value) {
  return `${value / 16}rem`;
}

function responsiveFontSizes({ sm, md, lg }) {
  return {
    '@media (min-width:600px)': {
      fontSize: pxToRem(sm)
    },
    '@media (min-width:900px)': {
      fontSize: pxToRem(md)
    },
    '@media (min-width:1200px)': {
      fontSize: pxToRem(lg)
    }
  };
}

const FONT_PRIMARY = 'Montserrat';

const typography = {
  fontFamily: FONT_PRIMARY,
  fontWeightRegular: 400,
  fontWeightMedium: 600,
  fontWeightBold: 1000,
  h1: {
    fontWeight: 1000,
    lineHeight: 80 / 64,
    fontSize: pxToRem(20),
    ...responsiveFontSizes({ sm: 26, md: 28, lg: 30 })
  },
  h2: {
    fontWeight: 800,
    lineHeight: 64 / 48,
    fontSize: pxToRem(32),
    ...responsiveFontSizes({ sm: 18, md: 20, lg: 22 })
  },
  h3: {
    fontWeight: 800,
    lineHeight: 1.5,
    fontSize: pxToRem(24),
    ...responsiveFontSizes({ sm: 16, md: 18, lg: 20 })
  },
  h4: {
    fontFamily: 'Montserrat:wght@700',
    fontWeight: 800,
    lineHeight: 1.5,
    fontSize: pxToRem(10),
    ...responsiveFontSizes({ sm: 14, md: 16, lg: 18 })
  },
  h5: {
    fontWeight: 900,
    lineHeight: 1.5,
    fontSize: pxToRem(18),
    ...responsiveFontSizes({ sm: 13, md: 15, lg: 17 })
  },
  h6: {
    fontWeight: 700,
    lineHeight: 28 / 18,
    fontSize: pxToRem(22),
    ...responsiveFontSizes({ sm: 18, md: 20, lg: 22 })
  },
  subtitle1: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: pxToRem(14)
  },
  subtitle2: {
    fontWeight: 600,
    lineHeight: 22 / 14,
    fontSize: pxToRem(14)
  },
  body1: {
    lineHeight: 1.5,
    fontWeight: 900,
    fontSize: pxToRem(14)
  },
  body2: {
    lineHeight: 22 / 14,
    fontSize: pxToRem(14)
  },
  subheading: {
    fontWeight: 800,
    lineHeight: 1.5,
    color: '#637381',
    fontSize: pxToRem(14)
  },
  caption: {
    fontWeight: 700,
    lineHeight: 1.5,
    color: '#637381',
    fontSize: pxToRem(12)
  },
  overline: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: pxToRem(12),
    letterSpacing: 1.1,
    textTransform: 'uppercase'
  },
  button: {
    fontWeight: 800,
    lineHeight: 24 / 14,
    fontSize: pxToRem(17),
    textTransform: 'none'
  }
};

export default typography;
