import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VideoPropertiesComponent } from './video-properties.component';

describe('VideoPropertiesComponent', () => {
  let component: VideoPropertiesComponent;
  let fixture: ComponentFixture<VideoPropertiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoPropertiesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VideoPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
