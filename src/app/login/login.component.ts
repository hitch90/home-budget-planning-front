import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    authForm: FormGroup;
    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authService: AuthenticationService
    ) { }

    ngOnInit() {
        this.authForm = this.formBuild();
    }

    formBuild() {
        return this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    login() {
        const loginData = this.authForm.getRawValue();
        this.authService.login(loginData).subscribe(data => {
            this.router.navigate(['/dashboard']);
        });
    }
}
