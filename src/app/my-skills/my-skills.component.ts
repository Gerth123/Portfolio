import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-my-skills',
  standalone: true,
  imports: [NgFor, NgIf, NgClass],
  templateUrl: './my-skills.component.html',
  styleUrl: './my-skills.component.scss',
})
export class MySkillsComponent {
  skills: { src: string; alt: string; name: string }[] = [
    { src: '../../assets/icons/html.svg', alt: 'HTML', name: 'HTML' },
    { src: '../../assets/icons/css.svg', alt: 'CSS', name: 'CSS' },
    {
      src: '../../assets/icons/javascript.svg',
      alt: 'Javascript',
      name: 'Javascript',
    },
    {
      src: '../../assets/icons/typescript.svg',
      alt: 'Typescript',
      name: 'Typescript',
    },
    { src: '../../assets/icons/angular.svg', alt: 'Angular', name: 'Angular' },
    {
      src: '../../assets/icons/firebase.svg',
      alt: 'Firebase',
      name: 'Firebase',
    },
    { src: '../../assets/icons/git.svg', alt: 'Git', name: 'Git' },
    {
      src: '../../assets/icons/rest_api.svg',
      alt: 'Rest Api',
      name: 'Rest Api',
    },
    { src: '../../assets/icons/scrum.svg', alt: 'Scrum', name: 'Scrum' },
    {
      src: '../../assets/icons/material_design.svg',
      alt: 'Material Design',
      name: 'Material Design',
    },
  ];

  isHovered: boolean = false;

  constructor() {}

  showSpecialInterest() {
    this.isHovered = true;
  }

  hideSpecialInterest() {
    this.isHovered = false;  
  }
}
