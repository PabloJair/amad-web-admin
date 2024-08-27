import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BadgeGreenComponent } from './badge-green.component';

describe('BadgeGreenComponent', () => {
  let component: BadgeGreenComponent;
  let fixture: ComponentFixture<BadgeGreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BadgeGreenComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BadgeGreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
