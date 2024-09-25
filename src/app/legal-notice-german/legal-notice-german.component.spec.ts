import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegalNoticeGermanComponent } from './legal-notice-german.component';

describe('LegalNoticeGermanComponent', () => {
  let component: LegalNoticeGermanComponent;
  let fixture: ComponentFixture<LegalNoticeGermanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LegalNoticeGermanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LegalNoticeGermanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
