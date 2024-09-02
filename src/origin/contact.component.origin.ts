// import { CommonModule } from '@angular/common';
// import { HttpClient } from '@angular/common/http';
// import { Component, inject } from '@angular/core';
// import { FormsModule, NgForm } from '@angular/forms';

// @Component({
//   selector: 'app-contact',
//   standalone: true,
//   imports: [FormsModule, CommonModule],
//   templateUrl: './contact.component.html',
//   styleUrl: './contact.component.scss'
// })
// export class ContactComponent {
//   http = inject(HttpClient);

//   contactData = {
//     name: '',
//     email: '',
//     message: ''
//   };

//   mailTest = true;
//   successMessage = '';
//   errorMessage = '';

//   post = {
//     endPoint: 'https://robin-gerth.de/sendMail.php',
//     body: (payload: any) => JSON.stringify(payload),
//     options: {
//       headers: {
//         'Content-Type': 'text/plain',
//         responseType: 'text',
//       },
//     },
//   };

//   onSubmit(ngForm: NgForm) {
//     if (ngForm.submitted && ngForm.form.valid && !this.mailTest) {
//       this.http.post(this.post.endPoint, this.post.body(this.contactData))
//         .subscribe({
//           next: (response) => {
//             this.successMessage = 'Deine Nachricht wurde erfolgreich gesendet!';
//             this.errorMessage = '';
//             ngForm.resetForm();
//           },
//           error: (error) => {
//             this.errorMessage = 'Beim Senden deiner Nachricht ist ein Fehler aufgetreten.';
//             this.successMessage = '';
//             console.error(error);
//           },
//           complete: () => console.info('send post complete'),
//         });
//     } else if (ngForm.submitted && ngForm.form.valid && this.mailTest) {
//       this.successMessage = 'Testmodus: Die Nachricht wurde nicht gesendet.';
//       this.errorMessage = '';
//       ngForm.resetForm();
//     }
//   }
// }
