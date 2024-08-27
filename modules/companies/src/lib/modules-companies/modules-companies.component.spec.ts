import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModulesCompaniesComponent } from './modules-companies.component';

describe('ModulesCompaniesComponent', () => {
  let component: ModulesCompaniesComponent;
  let fixture: ComponentFixture<ModulesCompaniesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModulesCompaniesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModulesCompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
