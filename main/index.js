import { App } from './App.js';

const jsForm = document.querySelector('#js-form');
const jsMessages = document.querySelector('js-messages');
const wsURL = 'ws://10.1.234.2:8888';

const app = new App({
  jsForm,
  jsMessages,
  wsURL,
});
app.mount();
