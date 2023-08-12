import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';


export interface Comunicaciones{
  id ?: string
  host ?: string
  mac ?: string
  tipo ?: string
  descripcion ?: string
  estatus ?: boolean
}
export interface IComunicaciones{
  coleccion ?: string
  objeto ?: Comunicaciones
}

@Injectable({
  providedIn: 'root'
})

export class ComunicationsService {

//Dirección Get para servicios en la página WEB
URL =  environment.API

httpOptions = {
 headers: new HttpHeaders({ 'Content-Type': 'application/json',
 'Authorization': 'Bearer ' + sessionStorage.getItem('token') })
};

constructor(private http : HttpClient) { 

}

Guardar(xCon : IComunicaciones, sApi : string) : Observable<any>{
 
 var url = this.URL + sApi;
 return this.http.post<any>(url, xCon, this.httpOptions);
}

Listar() : Observable<any>{
 //console.log("Entrando en la funcion" + this.httpOptions)
 var url = this.URL + 'lcoleccion/sys-conection';
 return this.http.get<any>(url, this.httpOptions);
}

ListarDrivers() : Observable<any>{
 var url = this.URL + 'drivers';
 return this.http.get<any>(url, this.httpOptions);
}

ListarConexiones() : Observable<any>{
 var url = this.URL + 'conexiones';
 return this.http.get<any>(url, this.httpOptions);
}

ScanMac(sip : string) : Observable<any>{
 var url = this.URL + 'sh';
 var xCon = {
   script: "getmac.sh",
   flag: "",
   ip: sip
 }
 console.log(xCon, url);
 return this.http.post<any>(url, xCon, this.httpOptions);
}

ScanNmap(sip : string) : Observable<any>{
 var url = this.URL + 'sh';
 var xCon = {
   script: "getscan.sh",
   flag: "",
   ip: sip
 }
 return this.http.post<any>(url, xCon, this.httpOptions);
}


}
