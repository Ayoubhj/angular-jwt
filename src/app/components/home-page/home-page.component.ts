import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  menuHandler: boolean = true;
  mdOptions: boolean = true;
  search: boolean = true;
  menuHandlerBtn() {
    this.menuHandler = !this.menuHandler;
  }
  mdOptionsToggle() {
    this.mdOptions = !this.mdOptions;
  }
  searchToggle() {
    this.search = !this.search;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
