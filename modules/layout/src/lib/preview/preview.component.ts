import { Component, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  BadgeGreenComponent,
  BadgeRedComponent,
  BreadcrumbComponent,
  BreadcrumbItem
} from '@amad-web-admin/modules/ui-elements';
import { FormsModule } from '@angular/forms';
import { MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable
} from '@angular/material/table';
import { MatChipListbox, MatChipOption } from '@angular/material/chips';
import { MatFormField } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { MatPaginator } from '@angular/material/paginator';
import { MatTooltip } from '@angular/material/tooltip';
import { NavigationRoutes } from '@amad-web-admin/modules/core';
import { ToolboxComponent } from '../toolbox/toolbox.component';
import { PropertiesComponent } from '../properties/properties.component';
import { PreviewMobileComponent } from '../preview-mobile/preview-mobile.component';
import { CdkDropListGroup } from '@angular/cdk/drag-drop';
import { ComponentEntity, defaultComponentEntity, TypeComponent } from '../entities/component-entity';

@Component({
  standalone: true,
  imports: [CommonModule,
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
    MatRow, MatRowDef,
    MatTable,
    MatTooltip,
    ToolboxComponent,
    PropertiesComponent,
    PreviewMobileComponent,
    CdkDropListGroup],
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.scss'
})
export class PreviewComponent {

  @ViewChild(PreviewMobileComponent) previewMobileComponent?: PreviewMobileComponent;

  showProperties = false;
  selectedComponent = signal<ComponentEntity>(defaultComponentEntity);
  protected breadcrumbItems: BreadcrumbItem[] = [
    {
      color: 'text-blue-600',
      name: 'Dashboard',
      link: `/${NavigationRoutes.dashboard.DASHBOARD}`
    },
    {
      color: 'text-blue-600',
      name: 'Editor'
    }

  ];


  onAddComponent($event: TypeComponent) {

    console.log($event);
    this.previewMobileComponent?.addNewComponent($event);
  }

  onSelectedComponent($event: ComponentEntity) {

    if (this.showProperties) {
      this.showProperties = false;
    } else {
      this.showProperties = true;
      this.selectedComponent.set($event);
    }

  }
}
