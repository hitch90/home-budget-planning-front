import { Component, OnInit } from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
    animations: [
        trigger(
            'inOutAnimation',
            [
                transition(
                    ':enter',
                    [
                        style({ opacity: 0 }),
                        animate('0.3s ease-out',
                            style({ opacity: 1 }))
                    ]
                ),
                transition(
                    ':leave',
                    [
                        style({ opacity: 1 }),
                        animate('0.3s ease-in',
                            style({ opacity: 0 }))
                    ]
                )
            ]
        )
    ]
})
export class HeaderComponent implements OnInit {
    addNav = false;
    balance = 0;
  constructor(
      private accountService: AccountService
  ) { }

  ngOnInit() {
      this.accountService.balance().subscribe(data => this.balance = data);
  }
  
  toggleAddNav() {
      this.addNav = !this.addNav;
  }

}
