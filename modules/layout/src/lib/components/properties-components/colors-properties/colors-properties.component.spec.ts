import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ColorsPropertiesComponent } from './colors-properties.component';

describe('ColorsPropertiesComponent', () => {
  let component: ColorsPropertiesComponent;
  let fixture: ComponentFixture<ColorsPropertiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColorsPropertiesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ColorsPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
