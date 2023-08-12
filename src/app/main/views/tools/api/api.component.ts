import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { ApiService, IAPICore } from '@services/apicore/api.service';
import { NgbModal, NgbModalConfig, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import JSONFormatter from 'json-formatter-js';


@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: { class: 'ecommerce-application' }
})
export class ApiComponent implements OnInit {



  public contentHeader: object;
  public developer = []
  public quality = []
  public production = []

  public shopSidebarToggle = false;
  public shopSidebarReset = false;
  public gridViewRef = false;
  public products;
  public wishlist;
  public cartList;
  public page = 1;
  public pageSize = 9;
  public searchText = '';

  closeResult: string = ''

  codeTypeJs = ''
  data: any;
  xentorno: string = ''
  resultado: any;
  xresultado: any;
  xparametro: string = ''
  valores: string = ''



  xAPI: IAPICore;




  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private apiService: ApiService,
  ) {
    config.backdrop = false;
    config.keyboard = false;
  }


    /**
   * Update to List View
   */
     listView() {
      this.gridViewRef = false;
    }
  
    /**
     * Update to Grid View
     */
    gridView() {
      this.gridViewRef = true;
    }

      /**
   * Sort Product
   */
  sortProduct(sortParam) {
    // this._ecommerceService.sortProduct(sortParam);
    console.info(sortParam);
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  codeMOEsquemaJson: any = {
      theme: 'idea',
      mode: 'application/ld+json',
      lineNumbers: true,
      lineWrapping: true,
      foldGutter: true,
      // gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter', 'CodeMirror-lint-markers'],
      autoCloseBrackets: true,
      matchBrackets: true,
      lint: true,
      autofocus: true
  };

  codeJson: any = {
    theme: 'idea',
    mode: 'text/typescript',
    lineNumbers: true,
    lineWrapping: true,
    foldGutter: true,
    // gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter', 'CodeMirror-lint-markers'],
    autoCloseBrackets: true,
    matchBrackets: true,
    lint: true
  };

  clickRefresh(e) {
    this.codeJson = {
      theme: 'idea',
      mode: 'text/typescript',
      lineNumbers: true,
      lineWrapping: true,
      foldGutter: true,
      // gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter', 'CodeMirror-lint-markers'],
      autoCloseBrackets: true,
      matchBrackets: true,
      lint: true
    }
  }

  activarFormulario(content, item) {
    console.log(item);
    this.modalService.open(content, {
      centered: true,
      size: 'lg',
      scrollable: true
    }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
      var api = item.entorno == "produccion" ? "/v1/" : "/devel/"
    this.xentorno = api + "api/crud:" + item.id;
    this.data = item
    if (item.entradas != undefined) {
      this.codeTypeJs = this.apiService.GenerarCodigo(item.entradas, item.funcion, this.xentorno)
      this.clickRefresh(0)
    }
  }


  RegistrarAPI(content) {
    console.log(content);
    this.modalService.open(content, {
      centered: true,
      size: 'lg',
      scrollable: true
    }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
  }


  async ListarApis() {
    this.developer = []
    this.quality = []
    this.production = []
    await this.apiService.Listar().subscribe(
      (data) => {
        data.forEach(e => {
          switch (e.entorno) {
            case "desarrollo":
              this.developer.push(e)
              break;
              case "calidad":
                this.quality.push(e)
                break;
                case "produccion":
                  this.production.push(e)
                  break;
                  default:
                    break;
                  }
                });
                
      },
      (error) => {
        console.error(error)
      }
    );
  }

  async ejecutarApi() {

    this.xAPI = this.data;
    this.xAPI.parametros = this.xparametro
    this.xAPI.valores = this.valores
    console.log(this.xAPI);
    await this.apiService.Ejecutar(this.xAPI).subscribe(
      (data) => {
        const formatter = new JSONFormatter(data);
        document.getElementById("xrs").appendChild(formatter.render());
      },
      (error) => {
        this.resultado = error;
      }
    )
  }

  async ngOnInit() {
    this.ListarApis()
    this.products = this.developer;

    this.contentHeader = {
      headerTitle: 'Herramientas',
      actionButton: true,
      breadcrumb: {
        type: '',
        links: [
          {
            name: 'APIRESTFULL',
            isLink: true,
            link: '/'
          },
          {
            name: 'Lista de APIS',
            isLink: false
          }
        ]
      }
    }
  }

}
