import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LayoutDragComponent } from './layout-drag.component';

describe('LayoutDragComponent', () => {
  let component: LayoutDragComponent;
  let fixture: ComponentFixture<LayoutDragComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutDragComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LayoutDragComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
