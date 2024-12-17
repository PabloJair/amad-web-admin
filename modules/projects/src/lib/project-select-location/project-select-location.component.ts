import { AfterViewInit, Component, inject, signal } from '@angular/core';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { MatFormField } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { SepomexFacade } from '../+state/sepomex/sepomex.facade';
import { AsyncPipe } from '@angular/common';
import {
  LocationConfiguration,
  MunicipalityResponse,
  NeighborhoodsResponse,
  StatesResponse,
} from '@amad-web-admin/modules/network';
import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInput } from '@angular/material/input';
import { Subscription } from 'rxjs';
import { AutoUnsubscribe } from '@amad-web-admin/modules/core';

@Component({
  selector: 'lib-project-select-location',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButton,
    MatFormField,
    MatSelectModule,
    AsyncPipe,
    FormsModule,
    MatAutocompleteModule,
    MatInput,
  ],
  providers: [SepomexFacade],
  templateUrl: './project-select-location.component.html',
  styleUrl: './project-select-location.component.scss',
})
@AutoUnsubscribe
export class ProjectSelectLocationComponent implements AfterViewInit {
  readonly facade = inject(SepomexFacade);
  readonly dialogRef = inject(MatDialogRef<ProjectSelectLocationComponent>);

  protected states: StatesResponse[] = [];
  protected municipalities: MunicipalityResponse[] = [];
  protected neighborhoods: NeighborhoodsResponse[] = [];

  private searchCP$?: Subscription;
  private listStates$?: Subscription;
  private listMunicipality$?: Subscription;
  private listNeighborhoods$?: Subscription;
  viewInformationData = signal<LocationConfiguration>({});

  ngAfterViewInit(): void {
    this.facade.getListStates();
    this.searchCP$ = this.facade.searchCP$.subscribe((value) => {
      if (value) {
        this.neighborhoods = value.lista_colonias;
        this.municipalities = value.municipio;
        this.states = value.estado;
        this.viewInformationData().state = this.states[0];
        this.viewInformationData().municipality = this.municipalities[0];
      }
    });
    this.listStates$ = this.facade.listStates$.subscribe({
      next: (value) => (this.states = value),
      error: (err) => console.error('Error fetching states:', err),
    });
    this.listMunicipality$ = this.facade.listMunicipality$.subscribe({
      next: (value) => (this.municipalities = value),
      error: (err) => console.error('Error fetching municipalities:', err),
    });
    this.listNeighborhoods$ = this.facade.listNeighborhoods$.subscribe({
      next: (value) => (this.neighborhoods = value),
      error: (err) => console.error('Error fetching neighborhoods:', err),
    });
  }

  onSelectedState() {
    this.facade.getListMunicipality(
      this.viewInformationData().state?.id_estado ?? 0
    );
  }

  onSelectedMunicipality() {
    this.facade.getListNeighborhoods(
      this.viewInformationData().municipality?.id_municipio ?? 0
    );
  }

  save() {
    this.dialogRef.close(this.viewInformationData());
  }

  onChangeText($event: KeyboardEvent) {
    const filterValue = ($event.target as HTMLInputElement).value;
    if (filterValue.length >= 5) {
      this.facade.searchCP(filterValue);
    }
  }

  displayColonia(item: any): string {
    return item ? item.colonia : '';
  }
}
