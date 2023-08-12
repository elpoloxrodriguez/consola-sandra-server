import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { NgbModalConfig, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap'
import { CoreMenuService } from '@core/components/core-menu/core-menu.service';
import { LoginService } from '@services/seguridad/login.service';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private ruta: Router,
    private _coreMenuService: CoreMenuService,
    private loginService: LoginService) {
    config.backdrop = false;
    config.keyboard = false;
  }

  public contentHeader: object

  public Token

  closeResult: string = ''


  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  irA(base: string, ruta: string) {
    this.ruta.navigate([base, ruta])
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

  activarFormulario(content) {
    this.modalService.open(content, {
      centered: true,
      size: 'xl',
      scrollable: true
    }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
  }

  /**
   * On init
   */
  async ngOnInit() {
    this.contentHeader = {
      headerTitle: 'Dashboard',
      actionButton: true,
      breadcrumb: {
        type: '',
        links: [
          {
            name: 'Inicio',
            isLink: true,
            link: '/'
          },
          {
            name: 'Principal',
            isLink: false
          }
        ]
      }
    }

  }



}