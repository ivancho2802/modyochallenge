import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import {LocalService } from '../../services/local.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private localService: LocalService,
    
  ) {

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  signup(){
    this.localService.saveData("username", this.loginForm.controls['username'].value)
    let username = this.localService.getData('username')

    if(username){
      this.router.navigateByUrl('/home', { replaceUrl: true })
    }

  }

}
