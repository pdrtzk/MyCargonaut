import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Chat} from '../../shared/chat.model';
import {Vehicle} from '../../shared/vehicle.model';
import {ChatMessage} from '../../shared/chat-message.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient) { }


  getAllChatsForUser(cargonautId: number): Promise<Chat[]>{
    const chats: Chat[] = [];
    const http = this.http;
    return new Promise<Chat[]>(async (resolve, reject) => {
      await http.get('http://localhost:4200/api/chats/' + cargonautId.toString(), {
      }).toPromise().then((res: any) => {
        res.chats.forEach(elem => {
          chats.push ({
            id: elem.id,
            fstMember: {
              id: elem.fstMember
            },
            sndMember: {
              id: elem.sndMember
            },
            messages: []
          });
        });
        chats.forEach(chat => {
          this.getMessagesForChat(chat).then(
            resM => {
              chat.messages = resM;
            }
          );
          }
        );
        resolve(chats);
      }).catch(error => {
        console.log('Error: ' + error.message);
        reject(error);
      });
    });
  }

  getMessagesForChat(chat: Chat){
    const messages: ChatMessage[] = [];
    const http = this.http;
    return new Promise<ChatMessage[]>(async (resolve, reject) => {
      await http.get('http://localhost:4200/api/chatMessages/' + chat.id.toString(), {
      }).toPromise().then((res: any) => {
        res.messages.forEach(elem => {
          let test: ChatMessage;
          test = {
            id: elem.id,
            author: {
              id: elem.author
            },
            message: elem.message,
            sentAt: new Date(elem.sentAt)
          };
          messages.push(test);
        });
        resolve(messages);
      }).catch(error => {
        console.log('Error: ' + error.message);
        reject(error);
      });
    });
  }

  getChat(chatId: number): Promise<Chat>{
    const http = this.http;
    return new Promise<Chat>(async (resolve, reject) => {
      await http.get('http://localhost:4200/api/chat/' + chatId, {
      }).toPromise().then((res: any) => {
        const chaty: Chat = {
          id: res.chat.id,
          fstMember: {
            id: res.chat.fstMember
          }, sndMember: {
            id: res.chat.sndMember
          },
          messages: []
        };
        this.getMessagesForChat(chaty).then(
          resM => {
            chaty.messages = resM;
            resolve(chaty);
          }
        );
      }).catch(error => {
        console.log('Error: ' + error.message);
        reject(error);
      });
    });
  }

  getChatIdFromCargonauts(cargonaut1: number, cargonaut2: number){
    const http = this.http;
    return new Promise<number>(async (resolve, reject) => {
      await http.post('http://localhost:4200/api/getOrCreateChat', {
        cargonaut1,
        cargonaut2
      }).toPromise().then((res: any) => {
        resolve(res.chatId);
      }).catch(error => {
        console.log('Error: ' + error);
        reject(error);
      });
    });
  }

  sendMessage(msg: ChatMessage){
    const chat = msg.chat.id;
    const message = msg.message;
    const zeit = new Date(msg.sentAt);
    const http = this.http;
    return new Promise<boolean>(async (resolve, reject) => {
      await http.post('http://localhost:4200/api/message/' + msg.author.id, {
        chat,
        message,
        zeit
      }).toPromise().then((res: any) => {
        resolve(true);
      }).catch(error => {
        console.log('Error: ' + error);
        reject(error);
      });
    });
  }
}
