import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModulesNetworkComponent } from './modules-network.component';

describe('ModulesNetworkComponent', () => {
  let component: ModulesNetworkComponent;
  let fixture: ComponentFixture<ModulesNetworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModulesNetworkComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModulesNetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
