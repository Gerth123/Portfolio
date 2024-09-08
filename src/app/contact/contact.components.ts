import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  http = inject(HttpClient);

  contactData = {
    name: '',
    email: '',
    message: '',
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

  onSubmit(ngForm: NgForm) {
    if (ngForm.submitted && ngForm.form.valid) {
      this.http
        .post(
          this.post.endPoint,
          this.post.body(this.contactData),
          this.post.options
        )
        .subscribe({
          next: (response) => {
            this.successMessage = 'Deine Nachricht wurde erfolgreich gesendet!';
            this.errorMessage = '';
            ngForm.resetForm();
          },
          error: (error) => {
            this.errorMessage =
              'Beim Senden deiner Nachricht ist ein Fehler aufgetreten.';
            this.successMessage = '';
            console.error(error);
          },
          complete: () => console.info('Sendevorgang abgeschlossen'),
        });
    }
  }

  changePlaceholder(id: string) {
    let inputfield = document.getElementById(id) as HTMLInputElement;
        if (inputfield) {
      if (inputfield.value.length === 0) {
        inputfield.placeholder = '';        
      } else {
        inputfield.placeholder = 'Your ' + id;
      }
    }
  }

  resetPlaceholder(id: string) {
    let inputfield = document.getElementById(id) as HTMLInputElement;
    if (inputfield) {
      inputfield.placeholder = 'Your ' + id;
    }
  }
}
