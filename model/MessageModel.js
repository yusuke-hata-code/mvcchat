export const MessageModel = class {
  constructor(messages = []) {
    this.mesagges = [];
  }

  /**
   * 受け取ったオブジェクトをmessagesに入れる
   *
   * @param {{ body: string, option: string, from: string, isBroad: Boolean, to: string }} isSendがtrueの場合は送信用
   */
  addMessage = ({ body, option, from, isBroad, to }) => {
    this.mesagges.push({ body, option, from, isBroad, to });
    console.log(this.mesagges);
    //toがあれば送信→viewしてnewする　そうでなければ受信する→描画
  };
  //
};
