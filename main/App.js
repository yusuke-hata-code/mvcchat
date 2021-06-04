import { MessageModel } from '/model/MessageModel.js';

export const App = class {
  constructor({ jsForm, jsMessages, wsURL }) {
    this.jsForm = jsForm;
    this.jsMessages = jsMessages;
    this.ws = new WebSocket(wsURL);
    this.messageModel = new MessageModel();
  }

  // イベントリスナーの登録
  mount() {
    // ユーザがメッセージを入力したとき
    this.jsForm.addEventListener('submit', (e) => {
      e.preventDefault();
      console.log(e.srcElement.input.value);
      // messagaModelに値を追加する
      this.messageModel.addMessage({
        body: e.srcElement.input.value,
        to: '*',
      });
      e.srcElement.input.value = '';
    });

    // WebSocketでメッセージを受け取ったとき
    this.ws.addEventListener('message', (message) => {
      const data = JSON.parse(message.data);
      console.log(data);
      // messagaModelに値を追加する;
      this.messageModel.addMessage(data);
    });
  }
};
