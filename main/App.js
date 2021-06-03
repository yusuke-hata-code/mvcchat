export class App {
  mount() {
    const formElement = document.querySelector('#form');
    const inputElement = document.querySelector('#form-input');
    console.log(formElement.value);

    const socket = new WebSocket('ws://10.1.234.2:8888');
    // 接続が開いたときのイベント
    socket.addEventListener('open', function (event) {
      socket.send(JSON.stringify({ body: '', to: '*' }));
    });
    // メッセージの待ち受け
    socket.addEventListener('message', function (event) {
      console.log('Message from server ', event.data);
    });
    //event.preventDefault();
    console.log(`${inputElement.value}`);
  }
}
