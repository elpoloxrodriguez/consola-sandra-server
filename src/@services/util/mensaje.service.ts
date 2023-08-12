import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MensajeService {

  pagina$ = new EventEmitter<any>();
  pagina : string = 'Principal'
  contenido$ = new EventEmitter<any>();
  contenido : []
  estatusText$ = new EventEmitter<string>();
  estatusText: string = ''
  
  constructor() { }
}
