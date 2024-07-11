import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModulesUiElementsComponent } from './modules-ui-elements.component';

describe('ModulesUiElementsComponent', () => {
  let component: ModulesUiElementsComponent;
  let fixture: ComponentFixture<ModulesUiElementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModulesUiElementsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModulesUiElementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
