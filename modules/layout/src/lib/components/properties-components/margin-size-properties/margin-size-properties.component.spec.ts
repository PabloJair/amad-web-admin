import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MarginSizePropertiesComponent } from './margin-size-properties.component';

describe('MarginSizePropertiesComponent', () => {
  let component: MarginSizePropertiesComponent;
  let fixture: ComponentFixture<MarginSizePropertiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarginSizePropertiesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MarginSizePropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
