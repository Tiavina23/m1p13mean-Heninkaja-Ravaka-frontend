import { ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarteService } from '../../../services/carte';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-carte',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './carte.html',
  styleUrls: ['./carte.css']
})
export class CarteComponent implements OnInit {
  produits: any[] = [];
  // On met loading à false pour que le HTML soit rendu immédiatement par le serveur
  loading = false; 

  constructor(
    private carteService: CarteService,
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    this.loadCarte();
  }

  loadCarte() {
    this.carteService.getCarte().subscribe({
      next: (data) => {
        this.produits = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error("Erreur API", err)
    });
  }
}
