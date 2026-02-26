import { Component } from '@angular/core';
import { ProduitService } from '../../../services/produit';

@Component({
  selector: 'app-product-list',
  imports: [],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList {
    products: any[] = [];

constructor(private produitService: ProduitService) {}

ngOnInit() {
  this.loadProducts();
}

loadProducts() {
  this.produitService.getMyProducts().subscribe((data: any) => {
    this.products = data;
  });
}

delete(id: string) {
  this.produitService.deleteProduct(id).subscribe(() => {
    this.loadProducts();
  });
}
}
