import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdministrationDialogBottomSheetComponent } from './administration-dialog-bottom-sheet.component';

describe('AdministrationDialogBottomSheetComponent', () => {
  let component: AdministrationDialogBottomSheetComponent;
  let fixture: ComponentFixture<AdministrationDialogBottomSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdministrationDialogBottomSheetComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdministrationDialogBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
