import { Component, OnInit } from '@angular/core';

import { MessageService } from '../message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  // 因为在 template 中用到，所以使用 public
  constructor(public messageService: MessageService) { }

  ngOnInit(): void {
  }

  clear(): void {
    this.messageService.clear();
  }

}
