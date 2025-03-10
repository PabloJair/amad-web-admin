import { AfterViewInit, Component, Inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatLine } from '@angular/material/core';
import { MatListItem, MatListItemTitle, MatNavList } from '@angular/material/list';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import {
  JsonProject,
  LanguagesProject,
  ProjectInformation,
  ProjectItem,
} from '@amad-web-admin/modules/network';
import { ProjectsFacade } from '../+state/projects.facade';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { ProjectNavigationService } from '../commons/project-navigation.service';
import { TypeView } from './TypeView';

@Component({
  selector: 'lib-select-languages-project',
  standalone: true,
  imports: [CommonModule, MatLine, MatListItem, MatListItemTitle, MatNavList, MatProgressSpinner],
  providers: [ProjectsFacade, ProjectNavigationService],
  templateUrl: './select-languages-project.component.html',
  styleUrl: './select-languages-project.component.scss',
})
export class SelectLanguagesProjectComponent implements AfterViewInit {
  $loading = signal(true);
  listLanguages$ = signal<LanguagesProject[]>([]);

  constructor(
    private projectFacade: ProjectsFacade,
    private _bottomSheetRef: MatBottomSheetRef<SelectLanguagesProjectComponent>,
    public navigation: ProjectNavigationService,
    @Inject(MAT_BOTTOM_SHEET_DATA)
    public data: {
      type: TypeView;
      projectItem: ProjectItem;
      projectInformation: ProjectInformation;
    }
  ) {}

  ngAfterViewInit(): void {
    this.getLanguages();
  }

  private getLanguages() {
    this.$loading.set(true);
    this.projectFacade.successLanguages.subscribe((value) => {
      if (value) {
        this.$loading.set(false);
        this.listLanguages$.set(value);
      }
    });
  }

  private navigateTo(item: LanguagesProject, jsonProject: JsonProject) {
    switch (this.data.type) {
      case TypeView.LAYOUT:
        this.navigation.navigateToLayout(jsonProject, this.data.projectItem, item.code);
        break;
      case TypeView.CONFIGURATION:
        this.navigation.navigateToConfiguration(jsonProject, this.data.projectItem, item.code);
        break;
      case TypeView.INFORMATION_PERSONAL:
        this.navigation.navigateToInformationData(jsonProject, this.data.projectItem, item.code);
        break;
    }
  }

  goTo(item: LanguagesProject) {
    const filter = this.data.projectInformation.jsons.find((value) => value.language == item.code);
    if (filter) {
      this.navigateTo(item, filter);
    } else {
      const anySuccess = this.projectFacade.anySuccess.subscribe((value) => {
        if (value) {
          this.navigateTo(item, {
            language: item.code,
            status: 1,
            json: '',
            id_application: this.data.projectItem.id_application,
            id_json: value,
            is_default: true,
          });
          anySuccess.unsubscribe();
        }
      });
      this.projectFacade.createJsonProject({
        language: item.code,
        status: 1,
        json: '',
        id_application: this.data.projectItem.id_application,
      });
    }

    this._bottomSheetRef.dismiss();
  }
}
