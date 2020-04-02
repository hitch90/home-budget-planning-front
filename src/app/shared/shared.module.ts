import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AlertComponent } from './alert/alert.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        BrowserAnimationsModule,
        FontAwesomeModule
    ],
    declarations: [AlertComponent, SidebarComponent, LoaderComponent],
    exports: [SidebarComponent, AlertComponent, LoaderComponent]
})
export class SharedModule {}
