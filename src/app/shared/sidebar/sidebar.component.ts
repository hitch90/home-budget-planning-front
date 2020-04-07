import { Component, OnInit } from '@angular/core';
import { sidebarMenu } from './sidebar';
import { AuthenticationService } from '../../services/authentication.service';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import {Router} from '@angular/router';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    menu = sidebarMenu;
    signout = faSignOutAlt;
    plus = faPlus;
    $currentUser;
    constructor(private authService: AuthenticationService, private router: Router) {}

    ngOnInit(): void {
        this.$currentUser = this.authService.currentUser;
    }
    
    logout() {
        this.authService.logout();
        this.router.navigate(['/login']);
    }
}
