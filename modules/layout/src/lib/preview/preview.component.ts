import { AfterViewInit, Component, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  BadgeGreenComponent,
  BadgeRedComponent,
  BreadcrumbComponent,
  BreadcrumbItem,
  DialogService,
  MessageSnackbarComponent,
  ResultType,
} from '@amad-web-admin/modules/ui-elements';
import { FormsModule } from '@angular/forms';
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle,
} from '@angular/material/card';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
} from '@angular/material/table';
import { MatChipListbox, MatChipOption } from '@angular/material/chips';
import { MatFormField } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatPaginator } from '@angular/material/paginator';
import { MatTooltip } from '@angular/material/tooltip';
import { NavigationRoutes } from '@amad-web-admin/modules/core';
import { ToolboxComponent } from '../toolbox/toolbox.component';
import { PropertiesComponent } from '../properties/properties.component';
import { PreviewMobileComponent } from '../preview-mobile/preview-mobile.component';
import { CdkDropListGroup } from '@angular/cdk/drag-drop';
import { ComponentEntity, TypeComponent } from '../entities/component-entity';
import { defaultComponentEntity } from '../entities/compontents-utils';
import { NavigationLayoutService } from '../commons/navigation-layout.service';
import {
  ApplicantProject,
  ApplicantProjectLayout,
  createDefaultApplicantProjectLayout,
  JsonProject,
  ProjectItem,
} from '@amad-web-admin/modules/network';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { SelectLayoutsComponent } from '../select-layouts/select-layouts.component';
import {
  MatCheckbox,
  MatCheckboxChange,
  MatCheckboxModule,
} from '@angular/material/checkbox';
import { LayoutFacade } from '../+state/layout.facade';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoaderSnackbarComponent } from '@amad-web-admin/modules/ui-elements';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    BadgeGreenComponent,
    BadgeRedComponent,
    BreadcrumbComponent,
    FormsModule,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardSubtitle,
    MatCardTitle,
    MatCell,
    MatCellDef,
    MatChipListbox,
    MatChipOption,
    MatColumnDef,
    MatFormField,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatIcon,
    MatIconButton,
    MatInput,
    MatPaginator,
    MatRow,
    MatRowDef,
    MatTable,
    MatTooltip,
    ToolboxComponent,
    PropertiesComponent,
    PreviewMobileComponent,
    CdkDropListGroup,
    MatButtonModule,
    MatCheckbox,
    MatInputModule,
  ],
  providers: [NavigationLayoutService, MatCheckboxModule],
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.scss',
})
export class PreviewComponent implements AfterViewInit {
  @ViewChild(PreviewMobileComponent)
  previewMobileComponent?: PreviewMobileComponent;

  projectInformation!: {
    jsonProject: JsonProject;
    codeLanguage: string;
    project: ProjectItem;
  };
  applicantProject!: ApplicantProject;
  selectedApplicantProjectLayout = signal<ApplicantProjectLayout>(
    createDefaultApplicantProjectLayout()
  );
  showProperties = false;
  selectedComponent = signal<ComponentEntity>(defaultComponentEntity);
  sectionsProperties = signal<{ name: string; id: string }[]>([]);
  protected breadcrumbItems: BreadcrumbItem[] = [
    {
      color: 'text-blue-600',
      name: 'Dashboard',
      link: `/${NavigationRoutes.dashboard.DASHBOARD}`,
    },
    {
      color: 'text-blue-600',
      name: 'Editor',
    },
  ];

  constructor(
    private navigation: NavigationLayoutService,
    private _bottomSheet: MatBottomSheet,
    private serviceDialog: DialogService,
    public layoutFacade: LayoutFacade,
    protected snackBar: MatSnackBar
  ) {
    this.projectInformation = navigation.getJsonConfiguration();
    this.breadcrumbItems.push({
      color: 'text-blue-600',
      name: this.projectInformation.project.application_name,
    });
    this.applicantProject = JSON.parse(
      this.projectInformation.jsonProject.json
    ) as ApplicantProject;
  }

  ngAfterViewInit(): void {
    this.selectedApplicantProjectLayout.set(
      this.applicantProject.views.length > 0
        ? this.applicantProject.views[0]
        : createDefaultApplicantProjectLayout()
    );
    this.previewMobileComponent?.reloadComponent(
      this.selectedApplicantProjectLayout().component
    );
  }

  onAddComponent($event: TypeComponent) {
    this.previewMobileComponent?.addNewComponent($event);
  }

  onSelectedComponent($event: ComponentEntity) {
    this.showProperties = true;
    this.selectedComponent.set($event);
    this.sectionsProperties.set(this.getListSections());
    console.log(this.sectionsProperties());
  }

  onDelete($event: string) {
    this.previewMobileComponent?.deleteComponent($event);
    this.showProperties = false;
    this.selectedComponent.set(defaultComponentEntity);
  }

  showOtherViews() {
    this._bottomSheet
      .open(SelectLayoutsComponent, {
        data: this.applicantProject,
      })
      .afterDismissed()
      .subscribe((value: any) => {
        if (value !== undefined) {
          this.showMessageSave(value);
        }
      });
  }

  showMessageSave(applicantProjectLayout: {
    item: ApplicantProjectLayout;
    isNew: boolean;
  }) {
    this.serviceDialog
      .showWarning('Atención', '¿Deseas guardar tus cambios?')
      .subscribe((value) => {
        console.log(applicantProjectLayout);
        if (
          applicantProjectLayout.isNew ||
          value.resultType == ResultType.BUTTON_ONE
        ) {
          this.selectedApplicantProjectLayout.set(applicantProjectLayout.item);
          this.changeComponents();

          return;
        } else if (value.resultType == ResultType.BUTTON_TWO) {
          this.saveJson();
          this.selectedApplicantProjectLayout.set(applicantProjectLayout.item);
          this.changeComponents();
        }
      });
  }

  changeComponents() {
    this.previewMobileComponent?.reloadComponent(
      this.selectedApplicantProjectLayout().component
    );
  }

  saveJson() {
    const changeItem = this.applicantProject.views.indexOf(
      this.selectedApplicantProjectLayout()
    );
    if (changeItem == -1) {
      this.applicantProject.views.push(this.selectedApplicantProjectLayout());
    } else {
      this.applicantProject.views[changeItem] =
        this.selectedApplicantProjectLayout();
    }
  }

  save() {
    this.selectedApplicantProjectLayout().component =
      this.previewMobileComponent?.componentEntitiesAdd ?? [];
    this.saveJson();

    const snackBar = this.snackBar.openFromComponent(LoaderSnackbarComponent);
    this.layoutFacade.UpdateJsonProject(
      {
        id_application: this.projectInformation.jsonProject.id_application,
        status: this.applicantProject.status,
        json: JSON.stringify(this.applicantProject),
        language: this.projectInformation.codeLanguage,
      },
      this.projectInformation.jsonProject.id_json
    );
    const success$ = this.layoutFacade.anySuccess.subscribe((value) => {
      console.log(value);
      if (value) {
        success$.unsubscribe();
        snackBar.dismiss();
        this.snackBar.openFromComponent(MessageSnackbarComponent, {
          data: {
            title: '!Correcto¡',
            message: value,
          },
        });
        this.projectInformation.jsonProject.json = JSON.stringify(
          this.applicantProject
        );
        this.navigation.saveLocalJson(
          this.projectInformation.jsonProject,
          this.projectInformation.codeLanguage,
          this.projectInformation.project
        );
      }
    });
  }

  changeMainView($event: MatCheckboxChange) {
    this.selectedApplicantProjectLayout().mainView = $event.checked;
  }

  getListSections() {
    return this.applicantProject.views.map((value) => {
      return {
        id: value.id,
        name: value.nameView,
      };
    });
  }

  changeNameView($event: Event) {
    this.selectedApplicantProjectLayout().nameView = (
      $event.target as HTMLInputElement
    ).value;
  }
}
