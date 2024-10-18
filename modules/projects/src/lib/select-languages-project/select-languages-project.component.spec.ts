import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectLanguagesProjectComponent } from './select-languages-project.component';

describe('SelectLanguagesProjectComponent', () => {
  let component: SelectLanguagesProjectComponent;
  let fixture: ComponentFixture<SelectLanguagesProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectLanguagesProjectComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectLanguagesProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
