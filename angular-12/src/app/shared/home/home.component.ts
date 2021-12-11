import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

declare const L: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  lat: number = 0;
  longi: number = 0;
  public mapHome:any;

  public retornoOngsMap!: any;
  public listLocation!: any;
  public listEndereco : string[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getCurrentLocation();
  }

  getCurrentLocation() {
    if (navigator.geolocation) {
     navigator.geolocation.getCurrentPosition(position => {

      this.lat = position.coords.latitude;
      this.longi = position.coords.longitude;
     
      this.mapHome = L.map('mapHome').setView([position.coords.latitude, position.coords.longitude], 13);

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

    var requestLares = {
      latitude: latitude,
      longitude: longitude,
    };

    console.log("Respose getOngs:  " + JSON.stringify(requestLares));
    this.http.post("http://localhost:8080/buscarEstadoCidade", requestLares)
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
      tpUsuario: null
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

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZW5kczI1NiIsImEiOiJja3V5ZGxuaTYwMWNwMnZyMmRyN3B6ZDZsIn0.tfM8nIYL_SO4ks1IMiWO9w', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: 'your.mapbox.access.token'
    }).addTo(this.mapHome);
    L.marker([this.lat, this.longi]).addTo(this.mapHome);
    this.listLocation.forEach((element: any) => {
      L.marker([element.latitude, element.longitude]).addTo(this.mapHome);
    });
  }


}
