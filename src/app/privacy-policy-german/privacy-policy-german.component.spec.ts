import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { PrivacyPolicyGermanComponent } from './privacy-policy-german.component';

describe('PrivacyPolicyGermanComponent', () => {
  let component: PrivacyPolicyGermanComponent;
  let fixture: ComponentFixture<PrivacyPolicyGermanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrivacyPolicyGermanComponent],
      providers: [provideRouter([])],
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
