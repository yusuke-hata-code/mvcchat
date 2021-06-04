/*class EventTarget extends EventTarget {
  constructor() {
    super();
    this.listener = new Map();
  }
}*/

import { MessageModel } from './model/MessageModel';

export class App {
  constructor() {
    this.message = new MessageModel();
  }

  mount() {
    this.chatListView = new chatListView();
    this.chatListModel = new chatListModel([]);
    this.inputbody = document.getElementById('form-input');

    this.MessageModel.onChange(() => {
      const MessageElement = element`<ul />`;
      const MessageItems = this.MessageModel.getMessageItems();
    });
  }
  /* 
      // 接続が開いたときのイベント
      socket.addEventListener('open', function (event) {});

      formElement.addEventListener('submit', (event) => {
        event.preventDefault();
        socket.send(JSON.stringify({ body: `${inputbody.value}`, to: '*' }));
      });
      // メッセージの待ち受け
      socket.addEventListener('message', function (event) {
        console.log('Message from server ', event.data);
      });
    };
  }*/
}

export const App = class {
  constructor({ Form, FormInput, Messages, wsURL, messageModel }) {
    this.form = Form;
    this.formInput = FormInput;
    this.Messages = Messages;
    this.ws = new WebSocket(wsURL);
    this.messageModel = new MessageModel();
  }

  //イベントリスナーの登録
  mount() {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      console.log(e.srcElement.input.value);
      //TODO: Modelに値を追加する
    });

    this.ws.addEventListener('message', (message) => {
      console.log(message);
      //TODO: Modelに値を追加する
    });
  }
};
