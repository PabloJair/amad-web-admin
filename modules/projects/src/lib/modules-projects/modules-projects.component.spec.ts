import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModulesProjectsComponent } from './modules-projects.component';

describe('ModulesProjectsComponent', () => {
  let component: ModulesProjectsComponent;
  let fixture: ComponentFixture<ModulesProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModulesProjectsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModulesProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
