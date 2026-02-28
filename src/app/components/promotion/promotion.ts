// src/app/components/promotion/promotion.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import flatpickr from 'flatpickr';
import { ProduitService } from '../../services/produit';
import { FeteService } from '../../services/fete';
import { PromotionService } from '../../services/promotion';
import 'flatpickr/dist/flatpickr.css';

@Component({
  selector: 'app-promotion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './promotion.html',
  styleUrls: ['./promotion.css']
})
export class PromotionComponent implements OnInit {

  produits: any[] = [];
  fetes: { nom: string; date: Date }[] = [];
  promo: {
    nom: string;
    tauxReduction: number;
    dateDebut: Date | null;
    dateFin: Date | null;
    produits: string[];
  } = {
    nom: '',
    tauxReduction: 0,
    dateDebut: null,
    dateFin: null,
    produits: []
  };
  dateOptions: any = {
    mode: 'range',
    minDate: new Date(),
    onReady: (selectedDates: any, dateStr: string, instance: any) => {
      this.colorFetes(instance);
    },
    onChange: (selectedDates: Date[]) => {
      if (selectedDates.length === 1) {
        this.promo.dateDebut = selectedDates[0];
        this.promo.dateFin = selectedDates[0];
      } else if (selectedDates.length === 2) {
        this.promo.dateDebut = selectedDates[0];
        this.promo.dateFin = selectedDates[1];
      }
    }
  };

  constructor(
    private produitService: ProduitService,
    private feteService: FeteService,
    private promotionService: PromotionService
  ) {}

  ngOnInit() {
    this.loadProduits();
    this.loadFetes();
    setTimeout(() => this.initFlatpickr(), 100); // attend le DOM
  }

  loadProduits() {
    this.produitService.getProduits().subscribe(data => {
      this.produits = data.map(p => ({ ...p, selected: false }));
    });
  }

  loadFetes() {
    this.feteService.getFetes().subscribe((data) => {
      this.fetes = data.map(f => ({
        nom: f.nom,
        date: new Date(f.date) // convertit la string en Date
      }));
    });
  }

  initFlatpickr() {
    flatpickr('#promoCalendar', this.dateOptions);
  }

  colorFetes(instance: any) {
    const days = instance.calendarContainer.querySelectorAll('.flatpickr-day');
    days.forEach((dayElem: any) => {
      this.fetes.forEach(fete => {
        const f = new Date(fete.date);
        if(dayElem.dateObj.toDateString() === f.toDateString()){
          dayElem.style.backgroundColor = '#ffcccc';
          dayElem.title = fete.nom;
        }
      });
    });
  }

  save() {
    // produits sélectionnés
    this.promo.produits = this.produits
      .filter(p => p.selected)
      .map(p => p._id);

    if(!this.promo.nom || !this.promo.tauxReduction || !this.promo.dateDebut || this.promo.produits.length === 0){
      alert('Remplissez tous les champs et sélectionnez au moins un produit.');
      return;
    }

    this.promotionService.addPromotion(this.promo).subscribe(() => {
      alert('Promotion ajoutée !');
      this.resetForm();
    });
  }

  resetForm() {
    this.promo = {
      nom: '',
      tauxReduction: 0,
      dateDebut: null,
      dateFin: null,
      produits: []
    };
    this.produits.forEach(p => p.selected = false);
  }
}