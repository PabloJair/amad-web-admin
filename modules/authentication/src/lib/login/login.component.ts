import { AfterViewInit, Component, signal } from '@angular/core';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { AuthenticationFacade } from '../+state/authentication.facade';
import {
  ApplicationNavigate,
  AuthenticationInformationService,
} from '@amad-web-admin/modules/core';
import { DialogService, ResultType } from '@amad-web-admin/modules/ui-elements';
import { DialogCodeGoogleComponent } from '../dialog-code-google/dialog-code-google.component';

@Component({
  standalone: true,
  imports: [
    MatFormField,
    FormsModule,
    MatInput,
    MatLabel,
    MatButton,
    MatProgressSpinner,
    ReactiveFormsModule,
    MatError,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements AfterViewInit {
  authForm: FormGroup;
  showLoader = signal<boolean>(false);
  token = '';

  constructor(
    private fb: FormBuilder,
    public authenticationFacade: AuthenticationFacade,
    public applicationNavigate: ApplicationNavigate,
    public authenticationInformationService: AuthenticationInformationService,
    private dialogService: DialogService
  ) {
    this.authForm = this.fb.group({
      user: ['', [Validators.required, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngAfterViewInit(): void {
    this.authenticationFacade.selectShowGoogleCode$.subscribe((value) => {
      if (value) {
        this.token = value.token;
        this.showDialogGoogleCode(value.qrCode);
      }
    });
    this.authenticationFacade.fail$.subscribe(() => {
      this.dialogService.showError(
        'Credenciales incorrectas',
        'Revisa tu usuario o contraseña para poder ingresar'
      );
    });

    this.authenticationFacade.loaded$.subscribe((value) => this.showLoader.set(value));
  }

  login2F(googleCode: string, token: string) {
    this.authenticationFacade.login2f({ googleCode }, token);
    const service = this.authenticationFacade.successLogin$.subscribe(() => {
      this.applicationNavigate.navigateToDashboard();
      service.unsubscribe();
    });
  }

  showDialogGoogleCode(qrCode: string) {
    this.dialogService.openAnyDialog(DialogCodeGoogleComponent, qrCode).subscribe((result) => {
      if (result.resultType == ResultType.SUCCESS) {
        this.login2F(result.data.googleCode, this.token);
      } else {
        this.dialogService.showError(
          'Credenciales incorrectas',
          'Es necesario ingresar el código que proporciona Google para iniciar sesión'
        );
      }
    });
  }

  login() {
    this.authenticationFacade.login(this.authForm.getRawValue());
  }
}
