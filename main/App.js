/*class EventTarget extends EventTarget {
  constructor() {
    super();
    this.listener = new Map();
  }
}*/

export class App {
  mount() {
    const formElement = document.querySelector('#form');
    const inputElement = document.querySelector('#form-input');
    const inputbody = document.getElementById('form-input');

    const socket = new WebSocket('ws://10.1.234.2:8888');
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
    console.log(`${inputElement.value}`);
  }
}
