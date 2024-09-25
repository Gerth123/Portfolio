import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivacyPolicyGermanComponent } from './privacy-policy-german.component';

describe('PrivacyPolicyGermanComponent', () => {
  let component: PrivacyPolicyGermanComponent;
  let fixture: ComponentFixture<PrivacyPolicyGermanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrivacyPolicyGermanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrivacyPolicyGermanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
