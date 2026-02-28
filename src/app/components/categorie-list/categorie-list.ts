
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';   
import { CategorieService } from '../../services/categorie';

@Component({
  selector: 'app-categorie-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './categorie-list.html',
  styleUrls: ['./categorie-list.css'] 
})
export class CategorieList implements OnInit {

  categories: any[] = [];
  newCategorie = { title: '', content: '' };

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
    this.categorieService.addCategorie(this.newCategorie).subscribe(() => {
      this.newCategorie = { title: '', content: '' }; 
      this.loadCategories();
    });
  }

  deleteCategorie(id: string): void {
    this.categorieService.deleteCategorie(id).subscribe(() =>
      this.loadCategories()
    );
  }
}