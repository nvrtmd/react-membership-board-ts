import { createGlobalStyle } from 'styled-components';
import { reset } from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}
  @font-face {
     font-family: 'DungGeunMo';
     src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/DungGeunMo.woff') format('woff');
     font-weight: normal;
     font-style: normal;
    }

  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;      	
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
