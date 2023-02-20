import { createGlobalStyle } from 'styled-components';
import { reset } from 'styled-reset';
import { theme } from 'styles/theme';

const GlobalStyle = createGlobalStyle`
  ${reset}
  @font-face {
     font-family: 'DungGeunMo';
     src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/DungGeunMo.woff') format('woff');
     font-weight: normal;
     font-style: normal;
    }

  html {
    font-size: 100%; // 1rem === 16px
    @media screen and ${theme.device.desktop} { // 1440
      font-size: 87.5%; // 1rem === 14px
    }
    @media screen and ${theme.device.tablet} { // 768
      font-size: 75%; // 1rem === 12px
    }
    @media screen and ${theme.device.mobile} { // 425
      font-size: 62.5%; // 1rem === 10px
    }

  }

  *:not(input) {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    outline-style:none;
  }

  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;     
    -webkit-user-drag:none; 
    -moz-user-drag:none; 
    -ms-user-drag:none; 
    -khtml-user-drag: none;
    -webkit-touch-callout: none;
    -webkit-touch-callout: none !important;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0); 	
    cursor: url("https://user-images.githubusercontent.com/67324487/215111447-c34d9bfb-4914-4f4b-a636-e3b7ac6757a8.png"), auto;
  }
  
  body {
    font-family:'DungGeunMo','Galmuri11','Galmuri9','Galmuri7', 'Galmuri14', sans-serif;
    font-size: 1.4rem;
    line-height: 1.43;    
  }
  
  a, a:hover, a:focus {
    color: inherit;
    text-decoration: none;
    cursor: pointer;
  }

  input, button {
    background-color: transparent;
    outline: none;
  }

  ol, ul, li {
    list-style: none;
  }

  img {
    width: 100%;
  }
`;

export default GlobalStyle;
