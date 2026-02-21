
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';   // 👈 très important
import { CategorieService } from '../../services/categorie';

@Component({
  selector: 'app-categorie-list',
  standalone: true,
  imports: [CommonModule, FormsModule],       // 👈 FormsModule doit être là
  templateUrl: './categorie-list.html',
  styleUrls: ['./categorie-list.css'] 
})
export class CategorieList implements OnInit {

  categories: any[] = [];
  newArticle = { title: '', content: '' };

  constructor(private categorieService: CategorieService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categorieService.getCategories().subscribe((data: any[]) =>
      this.categories = data
    );
  }

  addCategorie(): void {
    this.categorieService.addCategorie(this.newArticle).subscribe(() => {
      this.newArticle = { title: '', content: '' }; 
      this.loadCategories();
    });
  }

  deleteCategorie(id: string): void {
    this.categorieService.deleteCategorie(id).subscribe(() =>
      this.loadCategories()
    );
  }
}