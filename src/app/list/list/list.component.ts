import {
    AfterViewInit,
    Component,
    ComponentFactoryResolver,
    OnInit,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListDirective } from './list-directive';
import { ExpensesComponent } from '../expenses/expenses.component';
import { IncomesComponent } from '../incomes/incomes.component';
import { RefillComponent } from '../refill/refill.component';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, AfterViewInit {
    title = '';
    filters = false;
    @ViewChild(ListDirective) appListComponent: ListDirective;

    constructor(
        private route: ActivatedRoute,
        private componentFactoryResolver: ComponentFactoryResolver
    ) {}

    ngOnInit(): void {}

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.route.paramMap.subscribe((data: any) =>
                this.getList(data.params)
            );
        });
    }

    getList({ type }) {
        switch (type) {
            case 'expenses':
                this.title = 'Wydatki';
                this.filters = true;
                return this.getListComponent(type);
            case 'incomes':
                this.title = 'Przychody';
                this.filters = false;
                return this.getListComponent(type);
            case 'refill':
                this.title = 'Tankowanie';
                this.filters = true;
                return this.getListComponent(type);
        }
    }

    getListComponent(pageType: string) {
        const component = this.setChoosenComponent(pageType);
        if (this.appListComponent != null) {
            component
                ? this.createComponentView(
                      component,
                      this.appListComponent.viewContainerRef
                  )
                : this.appListComponent.viewContainerRef.clear();
        }
    }

    private setChoosenComponent(pageType: string): any {
        switch (pageType) {
            case 'expenses':
                return ExpensesComponent;
            case 'incomes':
                return IncomesComponent;
            case 'refill':
                return RefillComponent;
        }
    }

    private createComponentView(
        component: any,
        viewContainerRef: ViewContainerRef
    ): void {
        viewContainerRef.clear();
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
            component
        );
        viewContainerRef.createComponent(componentFactory);
    }
}
