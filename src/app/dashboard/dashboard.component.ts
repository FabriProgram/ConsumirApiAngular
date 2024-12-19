import { Component, OnInit, Query, inject } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  private breakpointObserver = inject(BreakpointObserver);

  //BREAKPOINT PARA REACOMODAR LAS TARJETAS SEGUN EL TAMAÑO DE LA PANTALLA
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Card 1', info: this.data.date, cols: 1, rows: 1 },
          { title: 'Card 2', info: this.data.title, cols: 1, rows: 1 },
          { title: 'Card 3', info: this.data.multimedia, cols: 1, rows: 1 },
          { title: 'Card 4', info: this.data.explanation, cols: 1, rows: 1 }
        ];
      }

      return [
        { title: 'Card 1', info: this.data.date, cols: 2, rows: 1 },
        { title: 'Card 2', info: this.data.title, cols: 1, rows: 1 },
        { title: 'Card 3', info: this.data.multimedia, cols: 1, rows: 2 },
        { title: 'Card 4', info: this.data.explanation, cols: 1, rows: 1 }
      ];
    })
  );
  data: any = {};

  constructor(private apiService: ApiService) {}
  ngOnInit(): void {
    this.llamarApi(); 
  }

  llamarApi() {
    this.apiService.getData().subscribe(data => {
      //ELECCION DE MULTIMEDIA (IMAGEN O VIDEO)
      let multimedia = document.getElementsByClassName("dashboard-card-content")[2];
      if (this.data.media_type === 'video') {
        multimedia.innerHTML = `
        <iframe class="embed-responsive-item" src="${data.url}"</iframe>`
      } else {
        multimedia.innerHTML = `
        <img title="imagen" class="embed-responsive-item" src="${data.url}">`
      }
      this.data = data;
    });
  }
}
