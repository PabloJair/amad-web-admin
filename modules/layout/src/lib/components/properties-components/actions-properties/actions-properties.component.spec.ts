import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActionsPropertiesComponent } from './actions-properties.component';

describe('ActionsPropertiesComponent', () => {
  let component: ActionsPropertiesComponent;
  let fixture: ComponentFixture<ActionsPropertiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActionsPropertiesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ActionsPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
