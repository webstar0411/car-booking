import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'cars-header-navbar',
  templateUrl: './header-navbar.component.html',
  styles: ['.active-link {border-bottom: red 1px solid}']
})
export class HeaderNavbarComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
