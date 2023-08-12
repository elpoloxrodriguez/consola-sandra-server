import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { CoreConfigService } from '@core/services/config.service';

import { IToken, LoginService } from '@services/seguridad/login.service';

import { Router } from '@angular/router';

import { environment } from 'environments/environment';
import { ToastrService } from 'ngx-toastr';
import { UtilService } from '@services/util/util.service';


@Component({
  selector: 'app-auth-login-v1',
  templateUrl: './auth-login-v1.component.html',
  styleUrls: ['./auth-login-v1.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AuthLoginV1Component implements OnInit {
  //  Public
  public coreConfig: any;
  public loginForm: UntypedFormGroup;
  public submitted = false;
  public passwordTextType: boolean;
  public usuario : string;
  public clave: string;

  public loading = false;
  public isHidden: boolean = true;

  public iToken: IToken = {
    token: '',
  };

  public itk: IToken;


  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {CoreConfigService} _coreConfigService
   * @param {FormBuilder} _formBuilder
   */
  constructor(
    private _coreConfigService: CoreConfigService,
    private _formBuilder: UntypedFormBuilder,
    private router: Router,
    private loginService: LoginService, 
    private toastrService: ToastrService,
    private utilservice: UtilService,
    ) {
      if (sessionStorage.getItem("token") != undefined ){
        this.router.navigate(['principal']);
      }
    this._unsubscribeAll = new Subject();

    // Configure the layout
    this._coreConfigService.config = {
      layout: {
        navbar: {
          hidden: true
        },
        menu: {
          hidden: true
        },
        footer: {
          hidden: true
        },
        customizer: false,
        enableLocalStorage: false
      }
    };
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  /**
   * Toggle password
   */
  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }


  public version = "1.0.0"
  public fecha = ""

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    this.version = environment.version
    this.fecha = environment.fecha

    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', Validators.required]
    });

    // Subscribe to config changes
    this._coreConfigService.config.pipe(takeUntil(this._unsubscribeAll)).subscribe(config => {
      this.coreConfig = config;
    });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  async login(position, status){
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    } else {
    this.loading = true;
    await this.loginService.getLogin(this.loginForm.value.email, this.loginForm.value.password).subscribe(
      (data) => { // Success
        this.itk = data;
        sessionStorage.setItem("token", this.itk.token );
        this.loading = false;
        this.isHidden = false;
        this.router.navigate(['home']).then(() => { window.location.reload() });
      },
      (error) => {
        this.loading = false;
        this.isHidden = false;
        this.utilservice.AlertMini('top-end','error','Error al acceder a los datos de conexion del Bus Empresarial',3000)
      }
    );
    }
  }

  
}
