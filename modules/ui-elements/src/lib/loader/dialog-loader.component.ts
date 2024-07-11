import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '@amad-web-admin/modules/ui-elements';

@Component({
  selector: 'lib-dialog-loader',
  standalone: true,
  imports: [CommonModule, LoaderComponent],
  templateUrl: './dialog-loader.component.html',
  styleUrl: './dialog-loader.component.scss',
})
export class DialogLoaderComponent {}
