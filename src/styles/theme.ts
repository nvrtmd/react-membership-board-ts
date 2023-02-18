const color = {
  primary: '',
  secondary: '',
  tertiary: '',
  white: '#fff',
  black: '#0b0b0b',
  grey: '#6e6e6e',
  lightGrey: '#d1d1d1',
  navy: '#0000aa',
  red: '#ff0000',
};

const layout = {
  bottomNavBarHeight: '2.8rem',
};

const breakpoint = {
  desktop: '1440px',
  tablet: '768px',
  mobile: '425px',
  narrow: '170px',
};

const heightBreakpoint = {
  long: '615px',
  medium: '500px',
  short: '400px',
  extraShort: '330px',
};

const device = {
  desktop: `(max-width: ${breakpoint.desktop})`,
  tablet: `(max-width: ${breakpoint.tablet})`,
  mobile: `(max-width: ${breakpoint.mobile})`,
  narrow: `(max-width: ${breakpoint.narrow})`,
  long: `(max-height: ${heightBreakpoint.long})`,
  extraShort: `(max-height: ${heightBreakpoint.extraShort})`,
};

export const theme = {
  color,
  layout,
  device,
  breakpoint,
  heightBreakpoint,
};
