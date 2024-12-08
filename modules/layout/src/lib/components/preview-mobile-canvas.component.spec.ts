import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PreviewMobileCanvasComponent } from './preview-mobile-canvas.component';

describe('PreviewMobileCanvasComponent', () => {
  let component: PreviewMobileCanvasComponent;
  let fixture: ComponentFixture<PreviewMobileCanvasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreviewMobileCanvasComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PreviewMobileCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
