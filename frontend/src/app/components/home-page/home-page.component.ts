import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'cars-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  constructor() {
  }

  backendProtocol(): string {
    return localStorage.getItem('BACKEND_PROTOCOL') ?? 'rest';
  }

  ngOnInit(): void {
  }

  setBackendProtocol(protocol: any): void {
    localStorage.setItem('BACKEND_PROTOCOL', protocol);
  }
}
