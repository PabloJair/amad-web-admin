import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModulesAuthenticationComponent } from './modules-authentication.component';

describe('ModulesAuthenticationComponent', () => {
  let component: ModulesAuthenticationComponent;
  let fixture: ComponentFixture<ModulesAuthenticationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModulesAuthenticationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModulesAuthenticationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
