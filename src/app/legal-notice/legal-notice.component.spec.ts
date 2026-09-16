import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { LegalNoticeComponent } from './legal-notice.component';

describe('LegalNoticeComponent', () => {
  let component: LegalNoticeComponent;
  let fixture: ComponentFixture<LegalNoticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LegalNoticeComponent],
      providers: [provideRouter([])],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LegalNoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
