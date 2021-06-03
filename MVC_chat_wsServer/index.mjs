/*
1. 誰かにメッセージを送りたい場合、サーバにJSON.stringfy()したオブジェクトを送ってください
オブジェクトのプロパティは以下の通り
{
  body: 'メッセージの内容',
  to: '宛先(ip:port)、*でブロードキャスト',
  option: '好きなメタデータを送る用、省略可能',
}
宛先は3. のボディから抽出してください

2. サーバからのメッセージはJSON.parse()してください
プロパティは以下のようになっている
{
  body: 'メッセージの内容',
  from: '送信元',
  isBroad: true/false, //ブロードキャストで送られていたらtrue
  option: 'メタデータ',
}

3. wsサーバにクライアントが接続/切断したときはサーバからブロードキャストが送られます
{
  body: ['接続しているクライアントのip:port'],
  from: 'server',
  isBroad: true,
  option: 'ip:port Connected/Disconnected',
}

*/

import WebSocket from 'ws';

const color = {
  green: '\u001b[32m',
  red: '\u001b[31m',
  blue: '\u001b[34m',
  magenta: '\u001b[35m',
  reset: '\u001b[0m',
};

const port = 7000;
const wss = new WebSocket.Server({ port });
console.debug(`WebSocker Server Listen on ${port}`);

wss.on('connection', (ws, req) => {
  console.debug(
    `👍 ${color.magenta}${req.socket.remoteAddress}:${req.socket.remotePort}${color.reset} Connected`
  );
  broadcast({
    body: getIPs(),
    from: 'server',
    isBroad: true,
    option: `${req.socket.remoteAddress}:${req.socket.remotePort} Connected`,
  });

  ws.on('message', (data) => {
    console.debug(
      `${color.blue}<-${color.reset} ${color.magenta}${req.socket.remoteAddress}:${req.socket.remotePort}${color.reset}`
    );
    console.debug(data);
    try {
      data = JSON.parse(data);

      if (data.to === '*') {
        broadcast(
          {
            body: data.body ?? '',
            from: `${req.socket.remoteAddress}:${req.socket.remotePort}`,
            isBroad: true,
            option: data.option ?? '',
          },
          ws
        );
      } else {
        unicast(
          {
            body: data.body ?? '',
            from: `${req.socket.remoteAddress}:${req.socket.remotePort}`,
            isBroad: false,
            option: data.option ?? '',
          },
          data.to ?? ''
        );
      }
    } catch (e) {
      console.error(`❌ JSON Parse Error ${data}`);
    }
  });

  ws.on('close', () => {
    console.debug(
      `👋 ${color.magenta}${req.socket.remoteAddress}:${req.socket.remotePort}${color.reset} Disconnected`
    );
    broadcast({
      body: getIPs(),
      from: 'server',
      isBroad: true,
      option: `${req.socket.remoteAddress}:${req.socket.remotePort} Disconnected`,
    });
  });
});

const broadcast = (message, ws = false, clients = wss.clients) => {
  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      if (ws === false || ws !== client) {
        client.send(JSON.stringify(message));
        console.debug(
          `${color.green}->${color.reset} ${color.magenta}${client._socket.remoteAddress}:${client._socket.remotePort}${color.reset}`
        );
        console.debug(`${JSON.stringify(message, null, 2)}`);
      }
    }
  });
};

const unicast = (message, target, clients = wss.clients) => {
  clients.forEach((client) => {
    if (`${client._socket.remoteAddress}:${client._socket.remotePort}` === target) {
      client.send(JSON.stringify(message));
      console.debug(
        `${color.green}->${color.reset} ${color.magenta}${client._socket.remoteAddress}:${client._socket.remotePort}${color.reset}`
      );
      console.debug(`${JSON.stringify(message, null, 2)}`);
    }
  });
};

const getIPs = (clients = wss.clients) => {
  return [...clients].map(
    (client) => `${client._socket.remoteAddress}:${client._socket.remotePort}`
  );
};
