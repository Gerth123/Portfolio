import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
declare var AOS: any;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, AppComponent, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit {
  @ViewChild(HeaderComponent) headerComponent!: HeaderComponent;

  /**
   * Toggles overflow on <body> and <html> elements depending on the visibility of the responsive menu.
   * This is done to prevent the user from scrolling while the responsive menu is open.
   * The function runs every second via setInterval.
   */
  ngAfterViewInit() {
    setInterval(() => {
      if (this.headerComponent.responsiveMenuOpen) {
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
      }
    }, 400);

    AOS.init();
  }
}
