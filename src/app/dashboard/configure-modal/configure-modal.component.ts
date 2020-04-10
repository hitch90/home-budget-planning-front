import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-configure-modal',
  templateUrl: './configure-modal.component.html',
  styleUrls: ['./configure-modal.component.scss']
})
export class ConfigureModalComponent implements OnInit, OnChanges {
    @Input() categories = [];
    @Input() accounts = [];

    constructor() {
    }

    ngOnInit(): void {
        console.log(this.categories)
        console.log(this.accounts)
    }
    
    ngOnChanges(changes: SimpleChanges): void {
        console.log(changes);
    }

}
