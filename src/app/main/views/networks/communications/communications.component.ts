import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';

import { CoreTranslationService } from '@core/services/translation.service';
import { ApiService, IAPICore } from '@services/apicore/api.service';

import { Comunicaciones, ComunicationsService, IComunicaciones } from '@services/networks/comunications.service';

import { WsocketsService } from '@services/websockets/wsockets.service';


@Component({
  selector: 'app-communications',
  templateUrl: './communications.component.html',
  styleUrls: ['./communications.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class CommunicationsComponent implements OnInit {

  public xAPI : IAPICore = {
    funcion: '',
    parametros: '',
    relacional: false,
    concurrencia : false,
    protocolo: '',
    ruta : '',
    retorna : false,
    migrar : false,
    modulo : '',
    valores : {},
    coleccion : '',
    http : 0,
    https : 0,
    consumidores : 0,
    puertohttp : 0,
    puertohttps : 0,
    driver : '',
    query : '',
    metodo : '',
    tipo : '',
    prioridad : '',
    entorno: '',
    logs : false
  };

  public Conn : Comunicaciones = {
    id : '',
    host : '',
    mac : '',
    tipo : '',
    descripcion : '',
    estatus : false,
  }

  public IConn : IComunicaciones = {
    coleccion: 'sys-conection',
    objeto : this.Conn,
  }

  // Private
  private _unsubscribeAll: Subject<any>;
  private tempData = [];

  host: string = ''
  mac: string = ''
  descripcion: string = ''
  identificador: string = ''
  estatus = 0
  rowData: any;
  dispositivo: string = '0'
  dispositivos = []


  // public
  public contentHeader: object;
  public rows: any;
  public selected = [];
  public kitchenSinkRows: any;
  public basicSelectedOption: number = 10;
  public ColumnMode = ColumnMode;
  public expanded = {};
  public editingName = {};
  public editingStatus = {};
  public editingAge = {};
  public editingSalary = {};
  public chkBoxSelected = [];
  public SelectionType = SelectionType;
  public exportCSVData;

  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild('tableRowDetails') tableRowDetails: any;


  constructor(
    private apiService : ApiService,
    private ws : WsocketsService,
  ) { }

  async ngOnInit() {

    await this.CargarLista()

     // content header
     this.contentHeader = {
      headerTitle: 'Datatables',
      actionButton: true,
      breadcrumb: {
        type: '',
        links: [
          {
            name: 'Home',
            isLink: true,
            link: '/'
          },
          {
            name: 'Forms & Tables',
            isLink: true,
            link: '/'
          },
          {
            name: 'Datatables',
            isLink: false
          }
        ]
      }
    };
  }

  filterUpdate(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.tempData.filter(function (d) {
      return d.full_name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.kitchenSinkRows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  onActivate(event) {
    // console.log('Activate Event', event);
  }

  onSelect({ selected }) {
    console.log('Select Event', selected, this.selected);
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  async CargarLista(){
    this.xAPI.funcion = "LstComunicaciones";
    this.xAPI.parametros = 'SRV';
     await this.apiService.Ejecutar(this.xAPI).subscribe(
      (data) => {
          this.rows = data;
          setTimeout(() => {
            this.rows = data;
            this.tempData = this.rows;
        }, 450);
      },
      (error) => {
        console.log(error)
      }
    ) 
  }


  

}
