import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCodeGoogleComponent } from './dialog-code-google.component';

describe('DialogCodeGoogleComponent', () => {
  let component: DialogCodeGoogleComponent;
  let fixture: ComponentFixture<DialogCodeGoogleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogCodeGoogleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogCodeGoogleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
