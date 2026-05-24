import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
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
      secondHeadline: 'Let us talk about modern software',
      firstText: 'I enjoy building practical, maintainable solutions for digital products, e-commerce platforms and AI-supported development workflows. If my profile fits your technical environment, I look forward to a focused conversation.',
      secondText: 'Need a pragmatic developer with Shopware, Angular, Python and AI workflow experience?',
      thirdText: 'Let us connect.',
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
      secondHeadline: 'Sprechen wir über moderne Software',
      firstText: 'Ich entwickle gerne praxisnahe, wartbare Lösungen für digitale Produkte, E-Commerce-Plattformen und KI-gestützte Entwicklungsworkflows. Wenn mein Profil zu Ihrem technischen Umfeld passt, freue ich mich über ein fokussiertes Gespräch.',
      secondText: 'Gesucht wird ein pragmatischer Entwickler mit Shopware-, Angular-, Python- und KI-Workflow-Erfahrung?',
      thirdText: 'Dann lassen Sie uns sprechen.',
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

  constructor(private languageService: LanguageService, private router: Router) {}

  getCurrentText(field: string): string {
    return this.translations[this.languageService.currentLanguage][field];
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

  async handleScroll(fragment: string) {
    const element = document.getElementById(fragment);
    const scrollHeightPixels = this.getElementHeightById(fragment);
    const currentUrl = this.router.url;

    if (currentUrl.includes(`#${fragment}`) && scrollHeightPixels !== null) {
      window.scrollTo({ top: scrollHeightPixels, behavior: 'smooth' });
    } else if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  getElementHeightById(elementId: string): number | null {
    const element = document.getElementById(elementId);

    if (element) {
      const elementRect = element.getBoundingClientRect();
      return elementRect.top + window.pageYOffset;
    }

    return null;
  }
}
