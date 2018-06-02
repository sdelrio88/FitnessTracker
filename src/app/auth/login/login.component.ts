import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {

    // initialize the form
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.form = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl('', {
        validators: [Validators.required]
      })
    });
  }

  onSubmit() {
    this.authService.login({
      email: this.form.value.email,
      password: this.form.value.password
    });
  }

    // retrieve a FormControl
    getFormControl(name: string) {
      return this.form.get(name);
  }

  // returns TRUE if the FormControl is valid
  isValid(name: string) {
      const e = this.getFormControl(name);
      return e && e.valid;
  }

  // returns TRUE if the FormControl is invalid after user changes
  hasError(name: string) {
      const e = this.getFormControl(name);
      return e && (e.dirty || e.touched) && !e.valid;
  }

}
