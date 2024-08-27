import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BadgeRedComponent } from './badge-red.component';

describe('BadgeRedComponent', () => {
  let component: BadgeRedComponent;
  let fixture: ComponentFixture<BadgeRedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BadgeRedComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BadgeRedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
