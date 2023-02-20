import ReactDOM from 'react-dom/client';
import axios from 'axios';
import App from 'App';
import GlobalStyle from 'styles/GlobalStyle';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <>
    <GlobalStyle />
    <App />
  </>,
);
