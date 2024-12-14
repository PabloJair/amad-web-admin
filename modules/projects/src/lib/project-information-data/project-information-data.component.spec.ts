import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectInformationDataComponent } from './project-information-data.component';

describe('InformationDataComponent', () => {
  let component: ProjectInformationDataComponent;
  let fixture: ComponentFixture<ProjectInformationDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectInformationDataComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectInformationDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
