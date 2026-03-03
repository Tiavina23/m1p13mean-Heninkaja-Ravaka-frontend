import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import flatpickr from 'flatpickr';
import { FeteService } from '../../services/fete';
import { ProduitService } from '../../services/produit';
import { PromotionService } from '../../services/promotion';

@Component({
  selector: 'app-promotion',
  imports: [CommonModule, FormsModule],
  templateUrl: './promotion.html',
  styleUrls: ['./promotion.css'],
  standalone: true
})
export class PromotionComponent implements OnInit {

  fetes: { nom: string; date: Date }[] = [];
  produits: any[] = [];

  promo = {
    nom: '',
    produits: [] as string[],
    tauxReduction: 0,
    dateDebut: null as Date | null,
    dateFin: null as Date | null
  };

  constructor(
    private feteService: FeteService,
    private produitService: ProduitService,
    private promotionService: PromotionService
  ) {}

  ngOnInit() {

    // charger fetes
    this.feteService.getFetes().subscribe(data => {
      this.fetes = data.map(f => ({
        nom: f.nom,
        date: new Date(f.date)
      }));
    });

    // charger produits
    this.produitService.getProduits().subscribe(data => {
      this.produits = data;
    });

    // initialiser calendrier
    setTimeout(() => {
      flatpickr("#calendar", {
        mode: "range",
        minDate: "today",
        dateFormat: "Y-m-d",

        onChange: (selectedDates:any) => {
          if (selectedDates.length === 1) {
            this.promo.dateDebut = selectedDates[0];
            this.promo.dateFin = selectedDates[0];
          }

          if (selectedDates.length === 2) {
            this.promo.dateDebut = selectedDates[0];
            this.promo.dateFin = selectedDates[1];
          }
        },

        onDayCreate: (dObj, dStr, fp, dayElem) => {
          const date = dayElem.dateObj;

          this.fetes.forEach(f => {
            if (date.toDateString() === f.date.toDateString()) {
              dayElem.style.backgroundColor = "#ffd6d6";
              dayElem.title = f.nom;
            }
          });
        }
      });
    }, 500);
  }

  toggleProduit(id: string) {
    if (this.promo.produits.includes(id)) {
      this.promo.produits = this.promo.produits.filter(p => p !== id);
    } else {
      this.promo.produits.push(id);
    }
  }

  selectAll() {
    this.promo.produits = this.produits.map(p => p._id);
  }

  resetForm() {

    // Reset objet promo
    this.promo = {
      nom: '',
      produits: [],
      tauxReduction: 0,
      dateDebut: null,
      dateFin: null
    };
  
    // Reset calendrier flatpickr
    const calendar = document.querySelector("#calendar") as any;
    if (calendar && calendar._flatpickr) {
      calendar._flatpickr.clear();
    }
  }

  savePromotion() {

    if (this.promo.produits.length === 0) {
      alert("Sélectionnez au moins un produit");
      return;
    }
  
    this.promotionService.createPromotion(this.promo)
      .subscribe({
        next: () => {
          alert("Promotion créée !");
          this.resetForm();
        },
        error: (err) => {
          console.error(err);
          alert("Erreur création promotion");
        }
      });
  }
}
