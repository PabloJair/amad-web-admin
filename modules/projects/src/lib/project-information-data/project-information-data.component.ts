import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  BreadcrumbComponent,
  BreadcrumbItem,
  ButtonLoaderComponent,
} from '@amad-web-admin/modules/ui-elements';
import {
  CommonsStrings,
  createFileUploadImageControlDefault,
  NavigationRoutes,
} from '@amad-web-admin/modules/core';
import { ProjectsFacade } from '@amad-web-admin/modules/projects';
import { ProjectNavigationService } from '../commons/project-navigation.service';
import { ProjectSelectLocationComponent } from '../project-select-location/project-select-location.component';
import {
  ApplicantProject,
  getJsonData,
  JsonProject,
  LocationConfiguration,
  PersonalInformation,
  ProjectItem,
  TypeInputPersonalInformation,
  UploadService,
} from '@amad-web-admin/modules/network';

import { NgxSpinnerComponent, NgxSpinnerService } from 'ngx-spinner';
import {
  FileUploadComponent,
  FileUploadDropZoneComponent,
  FileUploadListItemComponent,
} from '@iplab/ngx-file-upload';
import { MatInputModule } from '@angular/material/input';
import { getBreadcrumbInformationPersonal } from '../commons/BreadcrumbsCommons';

@Component({
  selector: 'lib-project-information-data',
  standalone: true,
  imports: [
    CommonModule,
    BreadcrumbComponent,
    MatCardModule,
    CdkDropList,
    ButtonLoaderComponent,
    MatButton,
    MatChipsModule,
    MatIconModule,
    CdkDrag,
    NgxSpinnerComponent,
    FileUploadComponent,
    FileUploadDropZoneComponent,
    FileUploadListItemComponent,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
  templateUrl: './project-information-data.component.html',
  styleUrl: './project-information-data.component.scss',
})
export class ProjectInformationDataComponent {
  // Protected variables
  protected locationConfiguration?: LocationConfiguration;
  protected readonly TypeInputPersonalInformation =
    TypeInputPersonalInformation;

  // Public variables
  public readonly fileUploadControl = createFileUploadImageControlDefault();

  private readonly defaultPersonalInformation: PersonalInformation = {
    title: '',
    locationInformation: undefined,
    urlImage: '',
    showTypesData: [],
  };
  personalInformation = signal<PersonalInformation>(
    this.defaultPersonalInformation
  );
  public selectedFields: TypeInputPersonalInformation[] = [];
  public fields: TypeInputPersonalInformation[] = [
    TypeInputPersonalInformation.NAME,
    TypeInputPersonalInformation.EMAIL,
    TypeInputPersonalInformation.PHONE,
    TypeInputPersonalInformation.LOCALIZATION_CONFIGURATION,
  ];

  public readonly projectItem: {
    jsonProject: JsonProject;
    codeLanguage: string;
    project: ProjectItem;
  };

  constructor(
    public readonly navigation: ProjectNavigationService,
    private readonly dialog: MatDialog,
    public readonly projectFacade: ProjectsFacade,
    private readonly spinnerService: NgxSpinnerService,
    public uploadImage: UploadService
  ) {
    this.projectItem = this.navigation.getJsonConfiguration();
    this.initializeData();

    // Show spinner based on facade state
    this.projectFacade.loaded$.subscribe((value) => {
      value ? this.spinnerService.show() : this.spinnerService.hide();
    });
  }

  /** Handle Drag and Drop events */
  drop(event: CdkDragDrop<TypeInputPersonalInformation[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  /** Edit or update JSON configuration */
  edit() {
    if (this.requiresLocationConfig()) {
      this.personalInformation().locationInformation =
        this.locationConfiguration;
      this.personalInformation().showTypesData = this.selectedFields;
      this.saveImage();
    } else {
      this.showDialogLocalizationConfig();
    }
  }

  saveImage() {
    let jsonData = getJsonData(this.projectItem.jsonProject);

    this.spinnerService.show().then();
    if (this.fileUploadControl.value[0]) {
      this.uploadImage
        .uploadFile(this.fileUploadControl.value[0])
        .subscribe((value) => {
          this.personalInformation().urlImage = value.data;
          jsonData.personalInformation = this.personalInformation();
          this.spinnerService.hide().then();
          this.uploadJson(jsonData);
        });
    } else {
      jsonData.personalInformation = this.personalInformation();
      this.uploadJson(jsonData);
    }
  }

  /** Show dialog for location configuration */
  showDialogLocalizationConfig() {
    this.dialog
      .open(ProjectSelectLocationComponent)
      .afterClosed()
      .subscribe((value) => {
        if (value) this.locationConfiguration = value;
      });
  }

  onClick(item: TypeInputPersonalInformation) {
    if (item === TypeInputPersonalInformation.LOCALIZATION_CONFIGURATION) {
      this.showDialogLocalizationConfig();
    }
  }

  private initializeData(): void {
    this.personalInformation.set(
      getJsonData(this.projectItem.jsonProject).personalInformation ??
        this.defaultPersonalInformation
    );
    const applicantProject = getJsonData(this.projectItem.jsonProject);
    this.selectedFields =
      applicantProject.personalInformation?.showTypesData ?? [];
    this.locationConfiguration =
      applicantProject.personalInformation?.locationInformation;
  }

  private uploadJson(appProject: ApplicantProject) {
    this.projectFacade.UpdateJsonProject(
      {
        id_application: this.projectItem.project.id_application,
        json: JSON.stringify(appProject),
        language: this.projectItem.codeLanguage,
        status: this.projectItem.project.status,
      },
      this.projectItem.jsonProject.id_json
    );
  }

  private requiresLocationConfig(): boolean {
    return (
      this.selectedFields.includes(
        TypeInputPersonalInformation.LOCALIZATION_CONFIGURATION
      ) && this.locationConfiguration !== undefined
    );
  }

  clearLocationData(keys: string[]) {
    for (const key of keys) {
      if (this.locationConfiguration) {
        this.locationConfiguration[key as keyof LocationConfiguration] =
          undefined;
      }
    }
  }

  protected readonly getBreadcrumbInformationPersonal =
    getBreadcrumbInformationPersonal;
}
