import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectLayoutsComponent } from './select-layouts.component';

describe('SelectLayoutsComponent', () => {
  let component: SelectLayoutsComponent;
  let fixture: ComponentFixture<SelectLayoutsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectLayoutsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectLayoutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
