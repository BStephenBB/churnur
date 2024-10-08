// lots of inspo from Github's design system
export const theme = {
  space: (multiple: number) => `${multiple * 4}px`,
  space0: '0px',
  space1: '4px',
  space2: '8px',
  space3: '16px',
  space4: '24px',
  space5: '32px',
  space6: '40px',

  shadow: {
    small: '0 1px 0 rgba(27,31,35,0.04)',
    medium: '0 3px 6px rgba(149,157,165,0.15)',
    large: '0 8px 24px rgba(149,157,165,0.2)',
    extraLarge: '0 12px 48px',
  },

  breakpoints: {
    // sm: '544px',
    // md: '768px',
    // lg: '1012px',
    // xl: '1280px', // 13 in???
    md: '1300px', // 1280 is chris' screen width
  },

  text: {
    0: '12px',
    1: '14px',
    2: '16px',
    3: '20px',
    4: '24px',
    5: '32px',
    6: '40px',
    7: '48px',
  },

  // colors from https://primer.style/css/support/color-system (github's color scheme)
  color: {
    text: '#24292e',
    primary: '#2563EB',
    white: 'white',
    black: 'black',

    gray0: '#fafbfc',
    gray1: '#f6f8fa',
    gray2: '#e1e4e8',
    gray3: '#d1d5da',
    gray4: '#959da5',
    gray5: '#6a737d',
    gray6: '#586069',
    gray7: '#444d56',
    gray8: '#2f363d',
    gray9: '#24292e', // text color

    blue0: '#f1f8ff',
    blue1: '#dbedff',
    blue2: '#c8e1ff',
    blue3: '#79b8ff',
    blue4: '#2188ff', // make this primary
    blue5: '#0366d6',
    blue6: '#005cc5',
    blue7: '#044289',
    blue8: '#032f62',
    blue9: '#05264c',

    green0: '#f0fff4',
    green1: '#dcffe4',
    green2: '#bef5cb',
    green3: '#85e89d',
    green4: '#34d058',
    green5: '#28a745',
    green6: '#22863a',
    green7: '#176f2c',
    green8: '#165c26',
    green9: '#144620',

    purple0: '#f5f0ff',
    purple1: '#e6dcfd',
    purple2: '#d1bcf9',
    purple3: '#b392f0',
    purple4: '#8a63d2',
    purple5: '#6f42c1',
    purple6: '#5a32a3',
    purple7: '#4c2889',
    purple8: '#3a1d6e',
    purple9: '#29134e',

    yellow0: '#fffdef',
    yellow1: '#fffbdd',
    yellow2: '#fff5b1',
    yellow3: '#ffea7f',
    yellow4: '#ffdf5d',
    yellow5: '#ffd33d',
    yellow6: '#f9c513',
    yellow7: '#dbab09',
    yellow8: '#b08800',
    yellow9: '#735c0f',

    orange0: '#fff8f2',
    orange1: '#ffebda',
    orange2: '#ffd1ac',
    orange3: '#ffab70',
    orange4: '#fb8532',
    orange5: '#f66a0a',
    orange6: '#e36209',
    orange7: '#d15704',
    orange8: '#c24e00',
    orange9: '#a04100',

    red0: '#ffeef0',
    red1: '#ffdce0',
    red2: '#fdaeb7',
    red3: '#f97583',
    red4: '#ea4a5a',
    red5: '#d73a49',
    red6: '#cb2431',
    red7: '#b31d28',
    red8: '#9e1c23',
    red9: '#86181d',

    pink0: '#ffeef8',
    pink1: '#fedbf0',
    pink2: '#f9b3dd',
    pink3: '#f692ce',
    pink4: '#ec6cb9',
    pink5: '#ea4aaa',
    pink6: '#d03592',
    pink7: '#b93a86',
    pink8: '#99306f',
    pink9: '#6d224f',
  },
} as const

export type Color = keyof typeof theme.color

export type Theme = typeof theme
