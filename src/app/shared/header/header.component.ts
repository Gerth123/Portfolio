import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  openMenu() {
    
    let responsiveMenu = document.getElementById('responsiveMenu');
    if (responsiveMenu) {
      responsiveMenu.classList.toggle('d-none');  
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'auto';
    }
  }

  closeMenu() { 
    let responsiveMenu = document.getElementById('responsiveMenu');
    if (responsiveMenu) {
      responsiveMenu.classList.add('d-none');
    }
  }
}
