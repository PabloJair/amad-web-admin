import { Component, Inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatLine } from '@angular/material/core';
import { MatListItem, MatListItemTitle, MatNavList } from '@angular/material/list';

import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatButton } from '@angular/material/button';
import {
  ApplicantProject,
  createDefaultApplicantProjectLayout,
  View,
} from '@amad-web-admin/shared';

@Component({
  standalone: true,
  imports: [CommonModule, MatLine, MatListItem, MatListItemTitle, MatNavList, MatButton],
  templateUrl: './select-layouts.component.html',
  styleUrl: './select-layouts.component.scss',
})
export class SelectLayoutsComponent {
  list = signal<ApplicantProject | undefined>(undefined);

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA)
    public data: ApplicantProject,
    private _bottomSheetRef: MatBottomSheetRef<SelectLayoutsComponent>
  ) {
    this.list.set(data);
  }

  load(item: View) {
    this._bottomSheetRef.dismiss({
      item,
      isNew: false,
    });
  }

  newLayout() {
    this._bottomSheetRef.dismiss({
      item: createDefaultApplicantProjectLayout(),
      isNew: true,
    });
  }
}
