import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectPreconfigurationComponent } from './project-preconfiguration.component';

describe('ProjectPreconfigurationComponent', () => {
  let component: ProjectPreconfigurationComponent;
  let fixture: ComponentFixture<ProjectPreconfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectPreconfigurationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectPreconfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
