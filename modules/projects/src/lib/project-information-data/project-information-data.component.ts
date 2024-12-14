import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AudioComponent,
  BreadcrumbComponent,
  BreadcrumbItem,
  ButtonLoaderComponent,
} from '@amad-web-admin/modules/ui-elements';
import {
  FileUploadComponent,
  FileUploadDropZoneComponent,
  FileUploadListItemComponent,
} from '@iplab/ngx-file-upload';
import { MatButton } from '@angular/material/button';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardTitle,
} from '@angular/material/card';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { ReactiveFormsModule } from '@angular/forms';
import { NavigationRoutes } from '@amad-web-admin/modules/core';
import { ProjectNavigationService } from '../commons/project-navigation.service';
import { JsonProject, ProjectItem } from '@amad-web-admin/modules/network';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'lib-project-information-data',
  standalone: true,
  imports: [
    CommonModule,
    AudioComponent,
    BreadcrumbComponent,
    ButtonLoaderComponent,
    FileUploadComponent,
    FileUploadDropZoneComponent,
    FileUploadListItemComponent,
    MatButton,
    MatCard,
    MatCardActions,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatCheckbox,
    MatFormField,
    MatInput,
    MatLabel,
    MatSlideToggle,
    ReactiveFormsModule,
    CdkDropList,
    CdkDrag,
  ],
  templateUrl: './project-information-data.component.html',
  styleUrl: './project-information-data.component.scss',
})
export class ProjectInformationDataComponent {
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
      name: 'Información personal',
    },
  ];
  projectItem!: {
    jsonProject: JsonProject;
    codeLanguage: string;
    project: ProjectItem;
  };

  constructor(public navigation: ProjectNavigationService) {
    this.projectItem = this.navigation.getJsonConfiguration();
  }

  todo = ['Nombre', 'Telefono', 'Correo', 'Localidad'];

  done: string[] = [];

  drop(event: CdkDragDrop<string[]>) {
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

  edit() {
    console.log(this.projectItem);
  }
}
