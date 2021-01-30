import { Component, OnInit } from '@angular/core';
import {Cargonaut} from '../../../shared/cargonaut.model';
import {AccountService} from '../../services/account.service';
import {Chat} from '../../../shared/chat.model';
import {ChatMessage} from '../../../shared/chat-message.model';
import {Router} from '@angular/router';
import {ChatService} from '../../services/chat.service';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit {
  myuser: Cargonaut = {}; // the logged in user
  chats: Chat[] = [];
  loaded = false;

  constructor(private accountService: AccountService, private router: Router, private chatService: ChatService) { }

  ngOnInit(): void {
    this.accountService.userSubject.subscribe(value => this.myuser = value); // get latest user object, in case of update user or logout
    this.accountService.isLoggedIn(); // get newest user after
    this.myuser = this.accountService.user;
    this.getChats().then();
    this.loaded = true;
  }

  async getChats() {
    let tempChats: Chat[] = [];
    this.chatService.getAllChatsForUser(this.myuser.id).then(
      res => {
        tempChats = res;
        tempChats.forEach(elem => {
          if (elem.fstMember.id !== this.myuser.id){
            this.accountService.get(elem.fstMember.id).then(
              res2 => elem.fstMember = res2
            );
          } else {
            this.accountService.get(elem.sndMember.id).then(
              res2 => elem.fstMember = res2
            );
          }
          this.chats.push(elem);
        }
      );
      }
    );
  }

  getLastMessage(c: Chat): string{
    return c.messages[c.messages.length - 1].message;
  }

  getLastMessageInOrOut(c: Chat): boolean {
    return c.messages[c.messages.length - 1].author.id === this.myuser.id;
  }

  getSndMember(c: Chat){
    if (c.fstMember.id === this.myuser.id){
      return c.sndMember;
    } else {
      return c.fstMember;
    }
  }

  /*
  removeChat(c: Chat){
    // TODO: add 'remove chat' to server
    const index = this.chats.findIndex(s => s.id === c.id);
    if (index > -1) {
      this.chats.splice(index, 1);
    }
  }*/
}
