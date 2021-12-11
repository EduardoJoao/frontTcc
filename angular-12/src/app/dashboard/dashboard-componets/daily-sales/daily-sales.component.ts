import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

declare const L: any;


@Component({
  selector: 'app-daily-sales',
  templateUrl: './daily-sales.component.html',
  styleUrls: ['./daily-sales.component.css']
})
export class DailySalesComponent implements OnInit {

  public response !: Observable<any>;
  public formLares !: FormGroup;
  public retornoOngs!: any;
  public retornoOngsMap!: any;
  public listLocation!: any;
  public listEndereco : string[] = [];
  listvalid: boolean = false;
  checked: boolean = false;

  lat: number = 0;
  longi: number = 0;

  public map:any;

  tpUsuario: any;

  constructor(private http: HttpClient, private formBuilder: FormBuilder) { }


  ngOnInit(): void {
    this.formLares = this.formBuilder.group({
      estado:[''],
      cidade:['']
    })
  }
  

  pesquisarItemsBtn(valor: String){
    console.log("Eu " + valor);
    this.tpUsuario = valor;
    var requestLares = {
      estado: this.formLares.get('estado')?.value,
      cidade: this.formLares.get('cidade')?.value,
      tpUsuario: valor
    };

    var retorno = this.http.post("http://localhost:8080/buscarLares", requestLares)
    .subscribe(response => {
      console.log("Respose: " + response);
      this.retornoOngs = response;
      this.getCurrentLocation();
    });
  }


  getCurrentLocation() {
    if (navigator.geolocation) {
     navigator.geolocation.getCurrentPosition(position => {

      this.lat = position.coords.latitude;
      this.longi = position.coords.longitude;
     
      this.map = L.map('map').setView([position.coords.latitude, position.coords.longitude], 13);

      this.getOngs(this.lat.toString(), this.longi.toString());
      });

      
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  getOngs(latitude: String, longitude: String){

    var locationUser;

    console.log("Respose getOngs:  " + latitude);
    console.log("Respose getOngs:  " + longitude);

    var requestLongitude = {
      latitude: latitude,
      longitude: longitude,
    };

    console.log("Respose getOngs:  " + JSON.stringify(requestLongitude));
    this.http.post("http://localhost:8080/buscarEstadoCidade", requestLongitude)
    .subscribe(response => {
      console.log("Respose getOngs:  " + response);
      locationUser = response
      this.getListOngs(locationUser);
    });

    
  }

  getListOngs(locationUser: any){
    console.log( JSON.stringify(locationUser));
    var requestLares = {
      estado: this.verificaEstado(locationUser.estado),
      cidade: locationUser.cidade,
      tpUsuario: this.tpUsuario
    };

    var retorno = this.http.post("http://localhost:8080/buscarLares", requestLares)
    .subscribe(response => {
      console.log("Respose getListOngs: " + JSON.stringify(response));
      this.retornoOngsMap = response;

      this.retornoOngsMap.forEach((element: any) => {
        this.listEndereco.push(element.endereco)

      });
      this.getListOngsLocation(this.listEndereco)
      
    });

  }

    verificaEstado(estado: String){
    switch (estado) {
      case 'Acre':
          return 'AC'
      case 'Alagoas':
        return 'AL'
      case 'Amapá':
        return 'AP'
      case 'Amazonas':
        return 'AM'   
      case 'Bahia':
        return 'BA'
      case 'Ceará':
        return 'CE' 
      case 'Espírito Santo':
        return 'ES'
      case 'Goiás':
        return 'GO'
      case 'Maranhão':
        return 'MA'
      case 'Mato Grosso':
        return 'MT'
      case 'Mato Grosso do Sul':
        return 'MS'
      case 'Minas Gerais':
        return 'MG'   
      case 'Pará':
        return 'PA'
      case 'Paraíba':
        return 'PB' 
      case 'Paraná':
        return 'PR'
      case 'Pernambuco':
        return 'PE'
      case 'Piauí':
        return 'PI'
      case 'Rio de Janeiro':
        return 'RJ'
      case 'Rio Grande do Norte':
        return 'RN'
      case 'Rio Grande do Sul':
        return 'RS'   
      case 'Rondônia':
        return 'RO'
      case 'Roraima':
        return 'RR' 
      case 'Santa Catarina':
        return 'SC'
      case 'São Paulo':
        return 'SP'
      case 'Sergipe':
        return 'SE' 
      case 'Tocantins':
        return 'TO'
      case 'Distrito Federal':
        return 'DF'
      default:
        return null;
    }
  }


  getListOngsLocation(list: any){
    console.log("List: "+ list);
    
    var retorno = this.http.post("http://localhost:8080/buscarLatLon", list)
    .subscribe(response => {
      console.log("Respose getListOngsLocation: " + JSON.stringify(response));
      this.listLocation = response;
      
    this.setLocation();
    });

  }

  setLocation(){

    if(this.listLocation){
      this.listvalid = !this.listvalid;
    }

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZW5kczI1NiIsImEiOiJja3V5ZGxuaTYwMWNwMnZyMmRyN3B6ZDZsIn0.tfM8nIYL_SO4ks1IMiWO9w', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: 'your.mapbox.access.token'
    }).addTo(this.map);
    L.marker([this.lat, this.longi]).addTo(this.map);
    this.listLocation.forEach((element: any) => {
      L.marker([element.latitude, element.longitude]).addTo(this.map);
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


}
