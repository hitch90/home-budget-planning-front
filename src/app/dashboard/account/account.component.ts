import { Component, Input, OnInit } from '@angular/core';
import { formatValue } from '../../helpers/format-value';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
    @Input() account;
  constructor() { }

  ngOnInit(): void {
  }
  
  showLogo() {
      const findTerm = (term) => {
          if (this.account.name.toLowerCase().includes(term)) {
              return this.account.name;
          }
      };
      switch (this.account.name) {
          case findTerm('pko'): 
            return 'pko.png';
          case findTerm('revolut'):
              return 'revolut.png';
          case findTerm('pekao'):
              return 'pekao.png';
          case findTerm('ing'):
              return 'ing.png';
          default:
              return 'wallet.png';
      }
  }

    formatVal(val): number {
        return formatValue(val);
    }

}
