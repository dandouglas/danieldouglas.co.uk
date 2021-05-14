import { Component, OnInit } from '@angular/core';
import { faStackOverflow, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  readonly faStackOverflow = faStackOverflow;
  readonly faLinkedin = faLinkedin;
  readonly faGithub = faGithub;
  readonly faEnvelope = faEnvelope;
  date: number;

  constructor() { }

  ngOnInit(): void {
    this.date = new Date().getFullYear();
  }

}
