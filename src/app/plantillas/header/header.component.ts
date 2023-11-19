import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  rol!: string;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.rol = localStorage.getItem('rol')!;
  }
  
  close() {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    this.router.navigate(['login'])
  }

}
