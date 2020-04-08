import { Component, Input, OnInit } from '@angular/core';
import { IAccount } from '../../interfaces/account';

@Component({
  selector: 'app-accounts-list',
  templateUrl: './accounts-list.component.html',
  styleUrls: ['./accounts-list.component.scss']
})
export class AccountsListComponent implements OnInit {
    @Input() accounts: IAccount[];

  constructor() { }

  ngOnInit(): void {
  }

}
