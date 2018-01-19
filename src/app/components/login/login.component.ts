import { Component, OnInit } from "@angular/core";
import { LoginService } from "../../services/login.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { CustomValidators } from "ng2-validation";
import { Router } from "@angular/router";

@Component({
    templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    message = '';

    constructor(
        private loginService: LoginService,
        private formBuilder: FormBuilder,
        private router: Router
    ) {
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, CustomValidators.email]],
            password: ['', [Validators.required]]
        });
    }

    login() {
        this.loginForm.markAsDirty();
        for (let c in this.loginForm.controls) {
            this.loginForm.get(c).markAsDirty();
        }
        if (this.loginForm.invalid) {
            return;
        }
        let model = this.loginForm.value;
        this.loginService.login(model.email, model.password)
            .subscribe(response => {
                this.message = '';
                this.router.navigate(['']);
            }, (response) => {
                this.message = response.json().message;
            });
    }
}