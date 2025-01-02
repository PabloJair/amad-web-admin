import { Component, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  BreadcrumbComponent,
  BreadcrumbItem,
  ButtonLoaderComponent,
  DialogService,
  ImageUploadComponent,
  ResultType,
} from '@amad-web-admin/modules/ui-elements';
import {
  FileUploadComponent,
  FileUploadControl,
  FileUploadDropZoneComponent,
  FileUploadListItemComponent,
  FileUploadValidators,
} from '@iplab/ngx-file-upload';
import { MatButton } from '@angular/material/button';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardModule,
  MatCardTitle,
} from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonsStrings } from '@amad-web-admin/modules/core';
import { ProjectNavigationService } from '../commons/project-navigation.service';
import {
  AddOrEditProjectRequest,
  CompanyItem,
  ProjectInformation,
  ProjectItem,
  ProjectStatus,
  Status,
  UploadService,
} from '@amad-web-admin/modules/network';
import { ProjectsFacade } from '../+state/projects.facade';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { SelectLanguagesProjectComponent } from '../select-languages-project/select-languages-project.component';
import { File } from '@ngx-dropzone/cdk';
import { TypeView } from '../select-languages-project/TypeView';
import { NgxMaskDirective } from 'ngx-mask';
import { breadcrumbsEditProject } from '../commons/BreadcrumbsCommons';
import { QrGeneratorService } from '../../../../network/src/lib/qr-generator/qr-generator.service';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    BreadcrumbComponent,
    ButtonLoaderComponent,
    MatButton,
    MatCard,
    MatCardActions,
    MatCardContent,
    MatCardHeader,
    MatFormField,
    MatInput,
    MatLabel,
    MatSlideToggle,
    ReactiveFormsModule,
    MatCardModule,
    NgxMaskDirective,
    ImageUploadComponent,
  ],
  templateUrl: './project-edit.component.html',
  styleUrl: './project-edit.component.scss',
})
export class ProjectEditComponent implements OnDestroy {
  projectItem?: ProjectItem;
  company?: CompanyItem;
  projectInformation?: ProjectInformation;
  protected loading$ = signal(false);
  protected iconUrl: string = CommonsStrings.EMPTY_STRING;
  protected breadcrumbItems: BreadcrumbItem[] = breadcrumbsEditProject;
  protected iconQR?: string;

  editProjectForm = new FormGroup({
    application_name: new FormControl<string>(CommonsStrings.EMPTY_STRING, {
      nonNullable: true,
      validators: Validators.required,
    }),
    application_description: new FormControl<string>(
      CommonsStrings.EMPTY_STRING,
      {
        nonNullable: true,
        validators: Validators.required,
      }
    ),
    status: new FormControl<boolean>(true, {
      nonNullable: true,
      validators: Validators.required,
    }),
    url: new FormControl<string>(CommonsStrings.EMPTY_STRING),
    version: new FormControl<string>(CommonsStrings.EMPTY_STRING, {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.pattern(CommonsStrings.REGEX_VERSION),
      ],
    }),
  });

  constructor(
    public navigation: ProjectNavigationService,
    private uploadImage: UploadService,
    private qrGenerator: QrGeneratorService,
    private projectFacade: ProjectsFacade,
    private _bottomSheet: MatBottomSheet,
    private dialogService: DialogService
  ) {
    this.projectItem = history.state.projectItem;
    this.company = history.state.companyItem;
    this.breadcrumbItems.push({
      color: 'text-yellow-600',
      name: this.projectItem?.application_name ?? '',
    });

    this.projectFacade.getLanguages();
    if (this.projectItem) {
      this.projectFacade.userInformation(this.projectItem);
      this.projectFacade.successUserInformation$.subscribe((value) => {
        this.projectInformation = value;
      });
    }
    this.projectFacade.loaded$.subscribe((value) => this.loading$.set(value));

    this.projectFacade.anySuccess.subscribe((value) => {
      if (value) {
        this.dialogService
          .showSuccess('Atención', 'Proyecto actualizado correctamente')
          .subscribe((value1) => {});
      }
      this.loading$.set(false);
    });
    this.setupData();
  }

  ngOnDestroy(): void {
    this.projectFacade.reset();
  }

  private setupData() {
    this.editProjectForm.controls.application_name.setValue(
      this.projectItem?.application_name ?? ''
    );
    this.editProjectForm.controls.application_description.setValue(
      this.projectItem?.application_description ?? ''
    );
    this.editProjectForm.controls.version.setValue(
      this.projectItem?.version ?? ''
    );
    this.editProjectForm.controls.status.setValue(
      this.projectItem?.status == ProjectStatus.ACTIVE
    );
    this.editProjectForm.controls.url.setValue(this.projectItem?.url_qr ?? '');
    this.iconUrl = this.projectItem?.icon ?? '';
    this.iconQR = this.projectItem?.icon_qr ?? '';
  }

  edit() {
    const value = {
      application_name:
        this.editProjectForm.controls.application_name.value ??
        CommonsStrings.EMPTY_STRING,
      application_description:
        this.editProjectForm.controls.application_description.value ??
        CommonsStrings.EMPTY_STRING,
      status: this.editProjectForm.controls.status.value
        ? ProjectStatus.ACTIVE
        : ProjectStatus.DISABLE,
      version:
        this.editProjectForm.controls.version.value ??
        CommonsStrings.EMPTY_STRING,
      url_qr: this.editProjectForm.controls.url.value ?? '',
      id_cia: this.projectItem?.id_cia,
      icon: this.iconUrl,
      icon_qr: this.iconQR,
      id_app_google: CommonsStrings.EMPTY_STRING,
    } as AddOrEditProjectRequest;

    this.projectFacade.editProject(
      this.projectItem?.id_application ?? -1,
      value
    );
  }

  goToConfiguration() {
    this._bottomSheet.open(SelectLanguagesProjectComponent, {
      data: {
        type: TypeView.CONFIGURATION,
        projectItem: this.projectItem,
        projectInformation: this.projectInformation,
      },
    });
  }

  protected loadImage(file: File, onComplete: (url: string) => void) {
    this.uploadImage.uploadFile(file).subscribe((response) => {
      if (response.status == Status.OK) {
        onComplete(response.data);
      }
    });
  }

  goToLayout() {
    this._bottomSheet.open(SelectLanguagesProjectComponent, {
      data: {
        type: TypeView.LAYOUT,
        projectItem: this.projectItem,
        projectInformation: this.projectInformation,
      },
    });
  }

  goToPersonInformation() {
    this._bottomSheet.open(SelectLanguagesProjectComponent, {
      data: {
        type: TypeView.INFORMATION_PERSONAL,
        projectItem: this.projectItem,
        projectInformation: this.projectInformation,
      },
    });
  }

  onFileSelected($event: File[]) {
    this.loadImage($event[0], (value) => {
      this.iconUrl = value;
      this.edit();
    });
  }

  generateQR() {
    if (this.editProjectForm.controls.url.value) {
      this.qrGenerator
        .generateQR(
          this.editProjectForm.controls.url.value ?? '',
          this.projectItem?.icon ?? ''
        )
        .subscribe((result) => {
          const file = new File(
            [result],
            `${this.projectItem?.id_application}.png`,
            { type: 'image/png' }
          );

          this.loadImage(file, (urlServer) => {
            this.iconQR = urlServer;
            this.edit();
          });
          console.log(URL.createObjectURL(result));
        });
    }
  }
}
