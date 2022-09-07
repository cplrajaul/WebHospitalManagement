import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Constants } from 'src/app/Helper/constants';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router,private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  onLogout() {
    localStorage.removeItem(Constants.USER_KEY);
    this.router.navigate(["/sign-in"]);
    this.toastr.success("Logout");
  }
}
