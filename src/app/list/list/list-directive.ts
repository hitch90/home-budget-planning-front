import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
    selector: '[appListComponent]'
})
export class ListDirective {
    constructor(public viewContainerRef: ViewContainerRef) { }
}
