import { Component, signal } from '@angular/core';
import {
  BreadcrumbComponent,
  BreadcrumbItem,
  ButtonLoaderComponent,
} from '@amad-web-admin/modules/ui-elements';
import { MatCardModule } from '@angular/material/card';
import { CommonsStrings, NavigationRoutes } from '@amad-web-admin/modules/core';
import { MatButtonModule } from '@angular/material/button';
import {
  AddOrEditProjectRequest,
  CompanyItem,
  ProjectStatus,
  Status,
  UploadService,
} from '@amad-web-admin/modules/network';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import {
  FileUploadComponent,
  FileUploadControl,
  FileUploadDropZoneComponent,
  FileUploadListItemComponent,
  FileUploadValidators,
} from '@iplab/ngx-file-upload';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { ProjectNavigationService } from '../commons/project-navigation.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { File } from '@ngx-dropzone/cdk';
import { ProjectsFacade } from '../+state/projects.facade';
import { Subscription } from 'rxjs';

@Component({
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    BreadcrumbComponent,
    FileUploadComponent,
    MatSlideToggle,
    ReactiveFormsModule,
    FileUploadDropZoneComponent,
    FileUploadListItemComponent,
    ButtonLoaderComponent,
  ],
  providers: [ProjectsFacade],
  templateUrl: './project-add.component.html',
  styleUrl: './project-add.component.scss',
})
export class ProjectAddComponent {
  companyItem?: CompanyItem;

  private add$$?: Subscription;
  protected loading$ = signal(false);
  public readonly fileUploadControl = new FileUploadControl(
    {
      listVisible: true,
      accept: [
        CommonsStrings.MIME_TYPE_PNG,
        CommonsStrings.MIME_TYPE_JPG,
        CommonsStrings.MIME_TYPE_JPEG,
      ],
      discardInvalid: true,
      multiple: false,
    },
    [
      FileUploadValidators.accept([
        CommonsStrings.MIME_TYPE_PNG,
        CommonsStrings.MIME_TYPE_JPG,
        CommonsStrings.MIME_TYPE_JPEG,
      ]),
      FileUploadValidators.filesLimit(1),
    ]
  );

  addCompanyForm = new FormGroup({
    application_name: new FormControl<string>(CommonsStrings.EMPTY_STRING, {
      nonNullable: true,
      validators: Validators.required,
    }),
    application_description: new FormControl<string>(CommonsStrings.EMPTY_STRING, {
      nonNullable: true,
      validators: Validators.required,
    }),
    status: new FormControl<boolean>(true, {
      nonNullable: true,
      validators: Validators.required,
    }),
    url: new FormControl<string>(CommonsStrings.EMPTY_STRING),
    version: new FormControl<string>(CommonsStrings.EMPTY_STRING, {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(CommonsStrings.REGEX_VERSION)],
    }),
    icon: new FormControl(null, {
      nonNullable: true,
      validators: [
        FileUploadValidators.filesLimit(1),
        FileUploadValidators.accept([CommonsStrings.MIME_TYPE_JPG, CommonsStrings.MIME_TYPE_PNG]),
        Validators.required,
      ],
    }),
  });

  constructor(
    public navigation: ProjectNavigationService,
    private uploadImage: UploadService,
    private projectFacade: ProjectsFacade
  ) {
    this.companyItem = history.state.companyItem;
    this.breadcrumbItems.push({
      color: 'text-yellow-600',
      name: this.companyItem?.nombre ?? '',
    });

    this.add$$ = this.projectFacade.anySuccess.subscribe((value) => {
      this.loading$.set(false);
      navigation.navigateToList();
    });
  }

  protected loadImage(file: File, onComplete: (url: string) => void) {
    this.uploadImage.uploadFile(file).subscribe((response) => {
      if (response.status == Status.OK) {
        onComplete(response.data);
      }
    });
  }

  protected breadcrumbItems: BreadcrumbItem[] = [
    {
      color: 'text-blue-600',
      name: 'Dashboard',
      link: `/${NavigationRoutes.dashboard.DASHBOARD}`,
    },
    {
      color: 'text-blue-600',
      name: 'Proyectos',
      link: `/${NavigationRoutes.dashboard.DASHBOARD}/${NavigationRoutes.projects.PROJECT}`,
    },
    {
      color: 'text-yellow-600',
      name: 'Nuevo proyecto',
    },
  ];

  add() {
    this.loading$.set(true);

    const request: AddOrEditProjectRequest = {
      application_description: this.addCompanyForm.controls.application_description.value,
      icon: '',
      application_name: this.addCompanyForm.controls.application_name.value,
      status: this.addCompanyForm.controls.status.value
        ? ProjectStatus.ACTIVE
        : ProjectStatus.DISABLE,
      version: this.addCompanyForm.controls.version.value,
      id_cia: this.companyItem?.id_cia ?? 0,
      icon_qr: '',
      url_qr: '',
      id_app_google: '',
    };

    this.loadImage(this.fileUploadControl.value[0], (url) => {
      request.icon = url;
      console.log(request);

      this.projectFacade.addProject(request);
    });
  }
}
