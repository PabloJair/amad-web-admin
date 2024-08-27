import { Component, signal } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { BreadcrumbComponent, BreadcrumbItem, ButtonLoaderComponent } from '@amad-web-admin/modules/ui-elements';
import {
  FileUploadComponent, FileUploadControl,
  FileUploadDropZoneComponent,
  FileUploadListItemComponent,
  FileUploadValidators
} from '@iplab/ngx-file-upload';
import { MatButton } from '@angular/material/button';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader, MatCardModule,
  MatCardTitle,
  MatCardTitleGroup
} from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonsStrings, NavigationRoutes } from '@amad-web-admin/modules/core';
import { ProjectNavigationService } from '../commons/project-navigation.service';
import { CompanyItem, ProjectItem, ProjectStatus, UploadService } from '@amad-web-admin/modules/network';
import { ProjectsFacade } from '../+state/projects.facade';

@Component({
  standalone: true,
  imports: [CommonModule, BreadcrumbComponent, ButtonLoaderComponent, FileUploadComponent, FileUploadDropZoneComponent, FileUploadListItemComponent, MatButton, MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle, MatFormField, MatInput, MatLabel, MatSlideToggle, ReactiveFormsModule, NgOptimizedImage, MatCardModule],
  templateUrl: './project-edit.component.html',
  styleUrl: './project-edit.component.scss',
})
export class ProjectEditComponent {
  projectItem?:ProjectItem
  company?:CompanyItem
  protected loading$ = signal(false);
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
      name: 'Editar',
    },

  ];

  public readonly fileUploadControl = new FileUploadControl(
    { listVisible: true, accept: [CommonsStrings.MIME_TYPE_JPG], discardInvalid: true, multiple: false },
    [FileUploadValidators.accept([CommonsStrings.MIME_TYPE_PNG]), FileUploadValidators.filesLimit(1)]
  );

  editProjectForm = new FormGroup({
      application_name: new FormControl<string>(CommonsStrings.EMPTY_STRING, {nonNullable:true,validators:Validators.required }),
      application_description: new FormControl<string>(CommonsStrings.EMPTY_STRING, {nonNullable:true,validators:Validators.required }),
      status: new FormControl<boolean>(true, {nonNullable:true,validators:Validators.required }),
      url: new FormControl<string>(CommonsStrings.EMPTY_STRING ),
      version: new FormControl<string>(CommonsStrings.EMPTY_STRING, {nonNullable:true,validators:[Validators.required,Validators.pattern(CommonsStrings.REGEX_VERSION)] }),
      icon :new FormControl(null,{nonNullable:true,validators:[
          FileUploadValidators.filesLimit(1),
          FileUploadValidators.accept([CommonsStrings.MIME_TYPE_JPG,CommonsStrings.MIME_TYPE_PNG]),Validators.required]
      })
    }
  );
  constructor(public  navigation:ProjectNavigationService,
              private uploadImage:UploadService,
              private  projectFacade: ProjectsFacade) {
    this.projectItem = history.state.projectItem
    this.company = history.state.companyItem
    this.breadcrumbItems.push({
      color: 'text-yellow-600',
      name: this.projectItem?.application_name??"",
    })

    this.setupData()
    debugger;

  }

  private setupData(){
    this.editProjectForm.controls.application_name.setValue(this.projectItem?.application_name ??"")
    this.editProjectForm.controls.application_description.setValue(this.projectItem?.application_description ??"")
    this.editProjectForm.controls.version.setValue(this.projectItem?.version ??"")
    this.editProjectForm.controls.url.setValue(this.projectItem?.url_qr ??"")
    this.editProjectForm.controls.status.setValue(this.projectItem?.status == ProjectStatus.ACTIVE)

  }




  edit() {

  }
}
