import { Component, Inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListItemIcon, MatListModule } from '@angular/material/list';
import { MatLine } from '@angular/material/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { ProjectsFacade } from '../+state/projects.facade';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatButton, MatIconButton } from '@angular/material/button';
import { ProjectNavigationService } from '../commons/project-navigation.service';
import { DialogResult, DialogService, ResultType } from '@amad-web-admin/modules/ui-elements';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { CompanyItem, ProjectItem, ProjectStatus } from '@amad-web-admin/shared';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatProgressSpinner,
    MatLine,
    MatButton,
    MatIcon,
    MatListItemIcon,
    MatTooltip,
    MatIconButton,
  ],
  templateUrl: './project-view.component.html',
  styleUrl: './project-view.component.scss',
  providers: [ProjectsFacade, ProjectNavigationService],
})
export class ProjectViewComponent {
  $loading = signal(true);
  projects = signal<ProjectItem[]>([]);

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: CompanyItem,
    private projectFacade: ProjectsFacade,
    private navigationService: ProjectNavigationService,
    private dialogService: DialogService,
    private _bottomSheetRef: MatBottomSheetRef<ProjectViewComponent>
  ) {
    this.projectFacade.listProjects$.subscribe((value) => this.projects.set(value));
    this.projectFacade.loaded$.subscribe((value) => this.$loading.set(value));
    this.projectFacade.getListProjects(data.id_cia.toString());
  }

  viewProject(projectItem: ProjectItem) {
    this._bottomSheetRef.dismiss();
    this.navigationService.navigateToEdit(projectItem, this.data);
  }

  goToNewProject() {
    this._bottomSheetRef.dismiss();
    this.navigationService.navigateToAdd(this.data);
  }

  protected readonly ProjectStatus = ProjectStatus;

  changeStatus(item: ProjectItem) {
    this.dialogService
      .showWarning(
        'Atención',
        `¿Deseas ${item.status == ProjectStatus.ACTIVE ? 'desactivar' : 'activar'} el projecto de ${item.application_name}`
      )
      .subscribe((dialogResult: DialogResult) => {
        if (dialogResult.resultType == ResultType.BUTTON_ONE) {
          this.$loading.set(true);
          this.projectFacade.changeStatus(
            item.id_application,
            item.status == ProjectStatus.ACTIVE ? ProjectStatus.DISABLE : ProjectStatus.ACTIVE
          );
        } else {
          this._bottomSheetRef.dismiss();
        }
      });
  }
}
