import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectSelectLocationComponent } from './project-select-location.component';

describe('ProjectSelectLocationComponent', () => {
  let component: ProjectSelectLocationComponent;
  let fixture: ComponentFixture<ProjectSelectLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectSelectLocationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectSelectLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
