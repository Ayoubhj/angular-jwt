import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private route : Router) { }

  ngOnInit(): void {
  }


  logout(){
      localStorage.clear();
      this.route.navigate(["login-register"])
      }
}
