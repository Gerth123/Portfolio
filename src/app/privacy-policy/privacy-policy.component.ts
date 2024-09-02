import { Component } from '@angular/core';
import { ShadowsComponent } from '../shadows/shadows.component';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [ShadowsComponent],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.scss'
})
export class PrivacyPolicyComponent {

}
