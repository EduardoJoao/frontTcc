import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  public response !: Observable<any>;
  public formCadastro !: FormGroup;

  constructor(private http: HttpClient, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.formCadastro = this.formBuilder.group({
      nome:[''],
      cpfCnpj:[''],
      contato:[''],
      cep:[''],
      endereco:[''],
      bairro:[''],
      cidade:[''],
      estado:[''],
      tpUsuario:[''],
      email:[''],
      password:[''],
      confirmacao:[''],
    })
  }

  cadastrar(){
    var retorno = this.http.post("http://localhost:8080/cadastro", this.formCadastro.value)
    .subscribe(response => {
      console.log("Respose: " + response);
      this.router.navigate(['/home']);
    });
  }

  estados = [
    {id: 2, valor: 'AC', name: 'AC'},
    {id: 3, valor: 'AL', name: 'AL'},
    {id: 4, valor: 'AM', name: 'AM'},
    {id: 5, valor: 'AP', name: 'AP'},
    {id: 6, valor: 'BA', name: 'BA'},
    {id: 7, valor: 'CE', name: 'CE'},
    {id: 8, valor: 'DF', name: 'DF'},
    {id: 9, valor: 'ES', name: 'ES'},
    {id: 10, valor: 'GO', name: 'GO'},
    {id: 11, valor: 'MA', name: 'MA'},
    {id: 12, valor: 'MG', name: 'MG'},
    {id: 13, valor: 'MS', name: 'MS'},
    {id: 14, valor: 'MT', name: 'MT'},
    {id: 15, valor: 'PA', name: 'PA'},
    {id: 16, valor: 'PB', name: 'PB'},
    {id: 17, valor: 'PE', name: 'PE'},
    {id: 18, valor: 'PI', name: 'PI'},
    {id: 19, valor: 'PR', name: 'PR'},
    {id: 20, valor: 'RN', name: 'RN'},
    {id: 21, valor: 'RO', name: 'RO'},
    {id: 22, valor: 'RR', name: 'RR'},
    {id: 23, valor: 'RS', name: 'RS'},
    {id: 24, valor: 'SC', name: 'SC'},
    {id: 25, valor: 'SE', name: 'SE'},
    {id: 26, valor: 'SP', name: 'SP'},
    {id: 27, valor: 'TO', name: 'TO'}
  ];

  tpUsuarios = [
    {id: 2, valor: 'ong', name: 'ONG'},
    {id: 3, valor: 'lar', name: 'Lar Temporário'}
  ];

}
