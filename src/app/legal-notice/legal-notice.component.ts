import { Component } from '@angular/core';
import { ShadowsComponent } from '../shadows/shadows.component';

@Component({
  selector: 'app-legal-notice',
  standalone: true,
  imports: [ShadowsComponent],
  templateUrl: './legal-notice.component.html',
  styleUrl: './legal-notice.component.scss'
})
export class LegalNoticeComponent {

}
