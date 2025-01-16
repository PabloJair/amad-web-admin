import { AfterViewInit, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AudioComponent,
  BreadcrumbComponent,
  BreadcrumbItem,
  ButtonLoaderComponent,
  ImageUploadComponent,
} from '@amad-web-admin/modules/ui-elements';
import {
  FilesAcceptValidator,
  FileUploadComponent,
  FileUploadControl,
  FileUploadDropZoneComponent,
  FileUploadListItemComponent,
  FileUploadValidators,
} from '@iplab/ngx-file-upload';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButton, MatIconButton } from '@angular/material/button';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardTitle,
} from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { CommonsStrings, NavigationRoutes } from '@amad-web-admin/modules/core';
import { ProjectNavigationService } from '../commons/project-navigation.service';
import {
  ApplicantProject,
  ApplicantProjectStatus,
  createDefaultApplicantProject,
  JsonProject,
  ProjectItem,
  UpdateJsonProjectLayout,
  UploadService,
} from '@amad-web-admin/modules/network';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ProjectsFacade } from '../+state/projects.facade';
import { MatIconModule } from '@angular/material/icon';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'lib-project-preconfiguration',
  standalone: true,
  imports: [
    CommonModule,
    BreadcrumbComponent,
    ButtonLoaderComponent,
    FilesAcceptValidator,
    FileUploadDropZoneComponent,
    FileUploadListItemComponent,
    FileUploadComponent,
    FormsModule,
    MatButton,
    MatCard,
    MatCardActions,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatFormField,
    MatInput,
    MatLabel,
    MatSlideToggle,
    ReactiveFormsModule,
    MatCheckboxModule,
    AudioComponent,
    MatIconModule,
    MatIconButton,
    NgxMaskDirective,
    ImageUploadComponent,
  ],
  templateUrl: './project-preconfiguration.component.html',
  styleUrl: './project-preconfiguration.component.scss',
})
export class ProjectPreconfigurationComponent {
  projectItem!: {
    jsonProject: JsonProject;
    codeLanguage: string;
    project: ProjectItem;
  };
  appProject!: ApplicantProject;

  loaderFiles = false;
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
      name: 'Configuraciones',
    },
  ];

  addConfigurationForm = new FormGroup({
    urlSound: new FormControl<string>(''),
    urlAnalytics: new FormControl<string>(''),
    appId: new FormControl<string>(''),
    offline: new FormControl<boolean>(true),
    interceptorPhone: new FormControl<string[]>([]),
    activeGeoLocalization: new FormControl<boolean>(false),
    showState: new FormControl<boolean>(false),
    status: new FormControl<boolean>(false),
    mp3: new FormControl(null, {
      nonNullable: true,
      validators: [
        FileUploadValidators.filesLimit(1),
        FileUploadValidators.accept([CommonsStrings.MIME_TYPE_MP3]),
      ],
    }),
  });

  constructor(
    public navigation: ProjectNavigationService,
    public projectFacade: ProjectsFacade,
    public uploadImage: UploadService
  ) {
    this.projectItem = this.navigation.getJsonConfiguration();
    this.appProject =
      this.projectItem.jsonProject.json.length > 0
        ? (JSON.parse(this.projectItem.jsonProject.json) as ApplicantProject)
        : createDefaultApplicantProject();
    this.breadcrumbItems.push({
      color: 'text-yellow-600',
      name: `${this.projectItem.project.application_name}`,
    });
    this.breadcrumbItems.push({
      color: 'text-yellow-600',
      name: `${this.projectItem.codeLanguage}`,
    });

    this.setup();
  }

  private setup() {
    this.addConfigurationForm.controls.activeGeoLocalization.setValue(
      this.appProject.preconfiguration.activeGeoLocalization
    );
    this.addConfigurationForm.controls.offline.setValue(
      this.appProject.preconfiguration.offline
    );
    this.addConfigurationForm.controls.showState.setValue(
      this.appProject.preconfiguration.showState
    );
    this.addConfigurationForm.controls.interceptorPhone.setValue(
      this.appProject.preconfiguration.interceptorPhone
    );
    this.addConfigurationForm.controls.urlSound.setValue(
      this.appProject.preconfiguration.urlSound
    );
    this.addConfigurationForm.controls.urlAnalytics.setValue(
      this.appProject.preconfiguration.urlAnalytics
    );
    this.addConfigurationForm.controls.urlAnalytics.setValue(
      this.appProject.appId
    );
    this.addConfigurationForm.controls.status.setValue(
      this.appProject.status == ApplicantProjectStatus.ACTIVE
    );
  }

  edit() {
    this.appProject.preconfiguration.activeGeoLocalization =
      this.addConfigurationForm.controls.activeGeoLocalization.value ?? false;
    this.appProject.preconfiguration.showState =
      this.addConfigurationForm.controls.showState.value ?? false;
    this.appProject.preconfiguration.offline =
      this.addConfigurationForm.controls.offline.value ?? false;
    this.appProject.preconfiguration.interceptorPhone =
      this.addConfigurationForm.controls.interceptorPhone.value ?? [];

    this.appProject.preconfiguration.urlAnalytics =
      this.addConfigurationForm.controls.urlAnalytics.value ?? '';
    this.appProject.status = this.addConfigurationForm.controls.status.value
      ? ApplicantProjectStatus.ACTIVE
      : ApplicantProjectStatus.DISABLE;
    this.appProject.appId =
      this.addConfigurationForm.controls.appId.value ?? '';

    this.uploadJson();
  }

  onFileSelected($event: File[], isFileSound: boolean) {
    this.loaderFiles = true;
    if ($event.length > 0) {
      this.loaderFiles = false;
      this.uploadImage.uploadFile($event[0]).subscribe((value) => {
        if (isFileSound) {
          this.appProject.preconfiguration.urlSound = value.data;
        } else {
          this.appProject.preconfiguration.welcomeVideo = value.data;
        }
        this.uploadJson();
      });
    }
  }

  private uploadJson() {
    const updateJson: UpdateJsonProjectLayout = {
      id_application: this.projectItem.project.id_application,
      json: JSON.stringify(this.appProject),
      language: this.projectItem.codeLanguage,
      status: 1,
    };
    this.projectFacade.UpdateJsonProject(
      updateJson,
      this.projectItem.jsonProject.id_json
    );

    const success$ = this.projectFacade.anySuccess.subscribe((value) => {
      if (value) {
        success$.unsubscribe();
      }
    });
    this.projectFacade.UpdateJsonProject(
      updateJson,
      this.projectItem.jsonProject.id_json
    );
  }

  addOtherPhone(value: string) {
    this.appProject.preconfiguration.interceptorPhone.push(value);
  }

  deleteInterceptorPhone(item: string) {
    this.appProject.preconfiguration.interceptorPhone =
      this.appProject.preconfiguration.interceptorPhone.filter(
        (value) => value != item
      );
  }

  protected readonly CommonsStrings = CommonsStrings;
}
