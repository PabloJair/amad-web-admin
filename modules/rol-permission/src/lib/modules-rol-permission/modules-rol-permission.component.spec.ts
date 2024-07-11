import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModulesRolPermissionComponent } from './modules-rol-permission.component';

describe('ModulesRolPermissionComponent', () => {
  let component: ModulesRolPermissionComponent;
  let fixture: ComponentFixture<ModulesRolPermissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModulesRolPermissionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModulesRolPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
