import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  ApplicationNavigate,
  AuthenticationInformationService,
} from '@amad-web-admin/modules/core';

@Component({
    imports: [RouterModule, FormsModule, MatFormFieldModule, MatInputModule],
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(
    private authService: AuthenticationInformationService,
    private applicationNavigate: ApplicationNavigate
  ) {
    if (!authService.isAuthenticate()) {
      applicationNavigate.navigateToAuthentication();
    }
  }
}
