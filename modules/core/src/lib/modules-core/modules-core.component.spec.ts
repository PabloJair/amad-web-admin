import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModulesCoreComponent } from './modules-core.component';

describe('ModulesCoreComponent', () => {
  let component: ModulesCoreComponent;
  let fixture: ComponentFixture<ModulesCoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModulesCoreComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModulesCoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
