import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { CustomValidators } from "ng2-validation";
import { UserService } from "../../services/user.service";
import { User } from "../../models/user";

@Component({
    templateUrl: 'register.component.html'
})
export class RegisterComponent implements OnInit {

    userForm: FormGroup;
    message = '';
    severity = '';

    constructor(
        private formBuilder: FormBuilder,
        private userService: UserService
    ) {
    }

    ngOnInit() {
        this.initForm();
    }

    initForm() {
        let passwordControl = this.formBuilder.control('', [Validators.required, this.strongPassword]);
        this.userForm = this.formBuilder.group({
            name: ['', [Validators.required]],
            email: ['', [Validators.required, CustomValidators.email]],
            password: passwordControl,
            passwordConfirm: ['', [CustomValidators.equalTo(passwordControl)]]
        })
    }

    strongPassword(control: FormControl) {
        let isWeak = false;
        let message = '';
        let password: string = control.value;

        if (password.length == 0) {
            return null;
        }

        if (password.length < 8) {
            isWeak = true;
            message = 'Password must be at least 8 characters.'
        }

        if (/\d/.test(password) == false) {
            isWeak = true;
            message = 'Password must contain a number.'
        }

        if (/[a-z]/.test(password) == false) {
            isWeak = true;
            message = 'Password must contain a lower case letter.'
        }

        if (/[A-Z]/.test(password) == false) {
            isWeak = true;
            message = 'Password must contain an upper case letter.'
        }

        if (/[\.\(\)@_~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/.test(password) == false) {
            isWeak = true;
            message = 'Password must contain a special character.'
        }

        return !isWeak ? null : {
            strongPassword: {
                valid: false,
                message: message
            }
        }
    }

    register() {
        for (let c in this.userForm.controls) {
            this.userForm.get(c).markAsDirty();
        }
        if (this.userForm.invalid) {
            return;
        }

        let model = this.userForm.value;
        let user = new User;
        user.name = model.name;
        user.email = model.email;

        this.userService.register(user, model.password)
            .subscribe(response => {
                this.message = 'You are now registered.'
                this.severity = 'success';
                for (let c in this.userForm.controls) {
                    this.userForm.get(c).setValue('');
                    this.userForm.get(c).markAsPristine();
                }
            }, response => {
                if (response.status == 422) {
                    let messages = response.json().messages;
                    let message = '';
                    for (let o in messages) {
                        message = messages[o];
                        break;
                    }
                    this.message = message;
                    this.severity = 'danger';
                } else {
                    this.message = 'An error occurred.';
                    this.severity = 'danger';
                }
            });
    }
}