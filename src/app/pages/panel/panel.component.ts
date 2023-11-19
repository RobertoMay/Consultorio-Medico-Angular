import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit{
  rol!: string;

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (!localStorage.getItem('token')) {
      this.router.navigate(['login'])
    }else {
      this.rol = localStorage.getItem('rol')!;
    }
  }

}
