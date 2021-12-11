import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  
  public response !: Observable<any>;
  public formLogin !: FormGroup;

  constructor( private http: HttpClient, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
   this.formLogin = this.formBuilder.group({
     email:[''],
     pass:['']
   })
  
  }

  login(){

    var retorno = this.http.post("http://localhost:8080/login", this.formLogin.value)
    .subscribe(response => {
      console.log("Respose: " + response);

      this.router.navigate(['/home']);
    });
  }

}
