import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PreviewMobileComponent } from './preview-mobile.component';

describe('PreviewMobileComponent', () => {
  let component: PreviewMobileComponent;
  let fixture: ComponentFixture<PreviewMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreviewMobileComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PreviewMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
