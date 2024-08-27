import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BadgeBasicComponent } from './badge-basic.component';

describe('BadgeBasicComponent', () => {
  let component: BadgeBasicComponent;
  let fixture: ComponentFixture<BadgeBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BadgeBasicComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BadgeBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
