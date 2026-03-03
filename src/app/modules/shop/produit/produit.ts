import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProduitService } from '../../../services/produit';
import { CategorieService } from '../../../services/categorie';

@Component({
  selector: 'app-produit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './produit.html',
  styleUrls: ['./produit.css']
})
export class ProduitComponent implements OnInit {

  produits: any[] = [];
  categories: any[] = [];

  produit: any = {
    name: '',
    description: '',
    prix: 0,
    stock: 0,
    categorie: '',
    image: null
  };

  isEdit = false;

  constructor(
    private produitService: ProduitService,
    private categorieService: CategorieService
  ) {}

  ngOnInit() {
    this.loadProduits();
    this.loadCategories();
  }

  loadProduits() {
    this.produitService.getProduits()
      .subscribe(produits => {
        console.log('Produits reçus du backend:', produits); 
        this.produits = produits; // mettre à jour la liste
      });
  }

  loadCategories() {
    this.categorieService.getCategories()
      .subscribe(data => this.categories = data);
  }

  onFileSelected(event: any) {
    this.produit.image = event.target.files[0];
  }

  save() {
    if (this.isEdit) {
      this.produitService.updateProduit(this.produit._id, this.produit)
        .subscribe(() => { this.resetForm(); this.loadProduits(); });
    } else {
      this.produitService.addProduit(this.produit)
        .subscribe(() => { this.resetForm(); this.loadProduits(); });
    }
  }

  edit(p: any) {
    this.produit = { ...p };
    this.isEdit = true;
  }

  delete(id: string) {
    if (confirm('Supprimer ce produit ?')) {
      this.produitService.deleteProduit(id)
        .subscribe(() => this.loadProduits());
    }
  }

  resetForm() {
    this.produit = {
      name: '',
      description: '',
      prix: 0,
      stock: 0,
      categorie: '',
      image: null
    };
    this.isEdit = false;
  }
}