import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  http = inject(HttpClient);

  public translations: any = {
    en: {
      headline: 'Contact',
      secondHeadline: 'Professional exchange',
      firstText:
        'If my profile fits your technical environment, I am open to a short conversation about requirements, existing systems or possible areas of work in software development.',
      secondText: 'Relevant topics can include web applications, APIs, Shopware 6 systems or maintainable frontend and backend implementation.',
      thirdText: 'I look forward to hearing from you.',
      inputPlaceholderName: 'Your name',
      errorName: 'Correct name required.',
      inputPlaceholderEmail: 'Your email',
      errorEmail: 'Please enter a valid email.',
      inputPlaceholderMessage: 'Your message',
      errorMessage: 'Message must be at least 10 characters long.',
      privacyFirstText: "I've read the",
      privacySecondText: 'privacy policy',
      privacyThirdText: 'and agree to the processing of my data as outlined.',
      errorPrivacy: 'Please accept the privacy policy.',
      buttonText: 'Send message',
    },
    de: {
      headline: 'Kontakt',
      secondHeadline: 'Professioneller Austausch',
      firstText:
        'Wenn mein Profil zu Ihrem technischen Umfeld passt, freue ich mich über einen kurzen Austausch zu Anforderungen, bestehenden Systemen oder möglichen Einsatzbereichen in der Softwareentwicklung.',
      secondText:
        'Mögliche Themen sind Webanwendungen, Schnittstellen, Shopware-6-Systeme oder wartbare Frontend- und Backend-Umsetzung.',
      thirdText: 'Ich freue mich auf Ihre Nachricht.',
      inputPlaceholderName: 'Ihr Name',
      errorName: 'Richtiger Name erforderlich.',
      inputPlaceholderEmail: 'Ihre E-Mail-Adresse',
      errorEmail: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.',
      inputPlaceholderMessage: 'Ihre Nachricht',
      errorMessage: 'Die Nachricht muss mindestens 10 Zeichen lang sein.',
      privacyFirstText: 'Ich habe die',
      privacySecondText: 'Datenschutzbestimmungen',
      privacyThirdText: 'gelesen und erkläre mich mit der Verarbeitung meiner Daten wie beschrieben einverstanden.',
      errorPrivacy: 'Bitte akzeptieren Sie die Datenschutzbestimmungen.',
      buttonText: 'Nachricht senden',
    },
  };

  public currentLanguage: 'en' | 'de' = 'en';

  contactData = {
    name: '',
    email: '',
    message: '',
    privacyChecked: false,
  };

  successMessage = '';
  errorMessage = '';

  post = {
    endPoint: 'https://robin-gerth.de/sendMail.php',
    body: (payload: any) => JSON.stringify(payload),
    options: {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  };

  constructor(private languageService: LanguageService) {}

  getCurrentText(field: string): string {
    return this.translations[this.languageService.currentLanguage][field];
  }

  getCurrentLanguage(): 'en' | 'de' {
    return this.languageService.currentLanguage as 'en' | 'de';
  }

  onSubmit(ngForm: NgForm): void {
    if (!ngForm.submitted || !ngForm.form.valid) return;
    this.http
      .post(
        this.post.endPoint,
        this.post.body(this.contactData),
        this.post.options
      )
      .subscribe({
        next: () => {
          this.handleSuccess(ngForm);
        },
        error: (error) => {
          this.handleError(error);
        },
        complete: () => console.info('Sending process completed'),
      });
  }

  handleSuccess(ngForm: NgForm): void {
    this.successMessage =
      this.languageService.currentLanguage === 'de'
        ? 'Ihre Nachricht wurde erfolgreich gesendet.'
        : 'Your message has been sent successfully.';
    this.errorMessage = '';
    ngForm.resetForm();
    this.contactData.privacyChecked = false;
    setTimeout(() => (this.successMessage = ''), 5000);
  }

  handleError(error: any): void {
    this.errorMessage =
      this.languageService.currentLanguage === 'de'
        ? 'Beim Senden Ihrer Nachricht ist ein Fehler aufgetreten.'
        : 'An error occurred while sending your message.';
    this.successMessage = '';
    console.error(error);
    setTimeout(() => (this.errorMessage = ''), 5000);
  }

  changePlaceholder(id: string): void {
    const inputfield = document.getElementById(id) as HTMLInputElement;

    if (inputfield) {
      inputfield.placeholder = inputfield.value.length === 0 ? '' : this.getPlaceholder(id);
    }
  }

  resetPlaceholder(id: string): void {
    const inputfield = document.getElementById(id) as HTMLInputElement;

    if (inputfield) {
      inputfield.placeholder = this.getPlaceholder(id);
    }
  }

  getPlaceholder(id: string): string {
    const fields: Record<string, string> = {
      name: 'inputPlaceholderName',
      email: 'inputPlaceholderEmail',
      message: 'inputPlaceholderMessage',
    };

    return this.getCurrentText(fields[id] ?? 'inputPlaceholderMessage');
  }

  handleScroll(fragment: string): void {
    document.getElementById(fragment)?.scrollIntoView({ behavior: 'smooth' });
  }
}
