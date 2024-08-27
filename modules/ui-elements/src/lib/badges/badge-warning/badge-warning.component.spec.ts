import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BadgeWarningComponent } from './badge-warning.component';

describe('BadgeWarningComponent', () => {
  let component: BadgeWarningComponent;
  let fixture: ComponentFixture<BadgeWarningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BadgeWarningComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BadgeWarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
