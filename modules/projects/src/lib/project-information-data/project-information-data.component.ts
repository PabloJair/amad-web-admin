import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButton, MatIconButton } from '@angular/material/button';
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
  ButtonLoaderComponent,
} from '@amad-web-admin/modules/ui-elements';
import { createFileUploadImageControlDefault } from '@amad-web-admin/modules/core';
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
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { ProjectsFacade } from '@amad-web-admin/modules/projects';

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
    MatIconButton,
    MatSlideToggle,
  ],
  templateUrl: './project-information-data.component.html',
  styleUrl: './project-information-data.component.scss',
})
export class ProjectInformationDataComponent {
  // Protected variables
  protected readonly TypeInputPersonalInformation =
    TypeInputPersonalInformation;

  // Public variables
  public readonly fileUploadControl = createFileUploadImageControlDefault();

  private readonly defaultPersonalInformation: PersonalInformation = {
    title: '',
    locationInformation: null,
    urlImage: '',
    showTypesData: [],
    active: false,
  };
  personalInformation = signal<PersonalInformation>(
    this.defaultPersonalInformation
  );
  public selectedFields: TypeInputPersonalInformation[] = [];
  public fields: TypeInputPersonalInformation[] = [];

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
    if (!this.requiresLocationConfig()) {
      this.personalInformation().showTypesData = this.selectedFields;
      this.saveImage();
    } else {
      this.showDialogLocalizationConfig();
    }
  }

  saveImage() {
    const jsonData = getJsonData(this.projectItem.jsonProject);

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
      if (
        !this.personalInformation().showTypesData.includes(
          TypeInputPersonalInformation.LOCALIZATION_CONFIGURATION
        )
      ) {
        this.personalInformation().locationInformation = null;
      }

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
        if (value) this.personalInformation().locationInformation = value;
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
    this.personalInformation().locationInformation =
      applicantProject.personalInformation?.locationInformation ?? null;

    if (
      !this.personalInformation().showTypesData.includes(
        TypeInputPersonalInformation.PHONE
      )
    ) {
      this.fields.push(TypeInputPersonalInformation.PHONE);
    }
    if (
      !this.personalInformation().showTypesData.includes(
        TypeInputPersonalInformation.NAME
      )
    ) {
      this.fields.push(TypeInputPersonalInformation.NAME);
    }
    if (
      !this.personalInformation().showTypesData.includes(
        TypeInputPersonalInformation.LOCALIZATION_CONFIGURATION
      )
    ) {
      this.fields.push(TypeInputPersonalInformation.LOCALIZATION_CONFIGURATION);
    }
    if (
      !this.personalInformation().showTypesData.includes(
        TypeInputPersonalInformation.EMAIL
      )
    ) {
      this.fields.push(TypeInputPersonalInformation.EMAIL);
    }
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
      ) && this.personalInformation().locationInformation === null
    );
  }

  clearLocationData(keys: (keyof LocationConfiguration)[]) {
    const personalInfo = this.personalInformation();
    if (personalInfo?.locationInformation) {
      for (const key of keys) {
        if (key in personalInfo.locationInformation) {
          personalInfo.locationInformation[key] = undefined;
        }
      }
    }
  }

  protected readonly getBreadcrumbInformationPersonal =
    getBreadcrumbInformationPersonal;

  deleteItem(item: TypeInputPersonalInformation) {
    this.selectedFields = this.selectedFields.filter((value) => value !== item);
    this.fields.push(item);
  }
}
