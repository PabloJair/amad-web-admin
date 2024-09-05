import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImagePropertiesComponent } from './image-properties.component';

describe('ImagePropertiesComponent', () => {
  let component: ImagePropertiesComponent;
  let fixture: ComponentFixture<ImagePropertiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImagePropertiesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ImagePropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
