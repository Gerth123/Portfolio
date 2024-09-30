import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { LanguageService } from '../services/language.service';
import { Router, RouterLink } from '@angular/router';

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
      secondHeadline: 'Got a problem to solve?',
      firstText: 'Contact me through this form, I am interested in hearing from you, knowing your ideas and contributing to your projects with my work.',
      secondText: 'Need a Frontend developer?',
      thirdText: 'Contact me!',
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
      secondHeadline: 'Sie haben ein Problem zu lösen?',
      firstText: 'Kontaktieren Sie mich gerne über dieses Formular. Ich bin daran interessiert, von Ihnen und Ihren Ideen zu hören, um mit meiner Arbeit zu Ihren Projekten beizutragen.',
      secondText: 'Sie benötigen einen Frontend-Entwickler?',
      thirdText: 'Kontaktieren Sie mich!',
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
        'Content-Type': 'application/json', // JSON als Content-Type
      },
    },
  };

  constructor(private languageService: LanguageService, private router: Router) {}

  /**
   * Retrieves the translation for the given field based on the current language.
   *
   * @param {string} field - The key of the translation to retrieve.
   * @returns {string} The translation for the given field.
   */
  getCurrentText(field: string): string {
    return this.translations[this.languageService.currentLanguage][field];
  }

  /**
   * Sends form data to the server and processes the response.
   *
   * @param {NgForm} ngForm - Contains the form data.
   * @returns {void}
   */
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

  /**
   * Handles a successful form submission.
   * @param {NgForm} ngForm - The submitted form.
   * @returns {void}
   */
  handleSuccess(ngForm: NgForm): void {
    this.successMessage = 'Your message has been sent successfully!';
    this.errorMessage = '';
    ngForm.resetForm();
    this.contactData.privacyChecked = false;
    setTimeout(() => (this.successMessage = ''), 5000);
  }

  /**
   * Handles an error during form submission.
   * @param {any} error - The occurred error.
   * @returns {void}
   */
  handleError(error: any): void {
    this.errorMessage = 'An error occurred while sending your message.';
    this.successMessage = '';
    console.error(error);
    setTimeout(() => (this.errorMessage = ''), 5000);
  }

  /**
   * Changes the placeholder of an input field based on its value.
   *
   * @param {string} id - The ID of the input field.
   * @returns {void}
   */
  changePlaceholder(id: string): void {
    const inputfield = document.getElementById(id) as HTMLInputElement;

    if (inputfield) {
      inputfield.placeholder =
        inputfield.value.length === 0 ? '' : 'Your ' + id;
    }
  }

  /**
   * Resets the placeholder of an input field to the default value.
   *
   * @param {string} id - The ID of the input field.
   * @returns {void}
   */
  resetPlaceholder(id: string): void {
    const inputfield = document.getElementById(id) as HTMLInputElement;

    if (inputfield) {
      inputfield.placeholder = 'Your ' + id;
    }
  }

  async handleScroll(fragment: string) {
    const element = document.getElementById(fragment);
    const scrollHeightPixels = this.getElementHeightById(fragment);  // Das wird in Pixeln zurückgegeben
    const currentUrl = this.router.url;
  
    // Prüfen, ob das Fragment bereits in der URL vorhanden ist
    if (currentUrl.includes(`#${fragment}`) && scrollHeightPixels !== null) {
      // Scrollen zu der berechneten Höhe
      window.scrollTo({ top: scrollHeightPixels, behavior: 'smooth' });
    } else if (element) {
      // Wenn das Fragment nicht in der URL ist, scrolle zu dem Element
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
  
  // Höhe eines Elements ermitteln
  getElementHeightById(elementId: string): number | null {
    const element = document.getElementById(elementId);
    
    if (element) {
      const elementRect = element.getBoundingClientRect();
      return elementRect.top + window.pageYOffset; // Höhe des Elements relativ zum Dokument
    }
    
    return null; // Wenn das Element nicht gefunden wird
  }
  
}
