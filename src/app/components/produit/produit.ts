import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProduitService } from '../../services/produit';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-produit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './produit.html',
  styleUrls: ['./produit.css']
})
export class ProduitComponent {

  // Liste des produits
  produits: any[] = [];

  // Nouveau produit
  newProduit: any = {
    name: '',
    description: '',
    prix: 0,
    stock: 0,
    image: '',
    categorie: '',
    shop: ''
  };

  constructor(private produitService: ProduitService) {}

  ngOnInit() {
    this.loadProduits();
  }

  // Charger tous les produits
  loadProduits() {
    this.produitService.getProduits()
      .subscribe(data => this.produits = data);
  }

  // Ajouter un produit
  addProduit() {
    this.produitService.addProduit(this.newProduit)
      .subscribe(() => {
        this.loadProduits();
        // Réinitialiser le formulaire
        this.newProduit = {
          name: '',
          description: '',
          prix: 0,
          stock: 0,
          image: '',
          categorie: '',
          shop: ''
        };
      });
  }

  // Supprimer un produit
  deleteProduit(id: string) {
    this.produitService.deleteProduit(id)
      .subscribe(() => this.loadProduits());
  }
}
