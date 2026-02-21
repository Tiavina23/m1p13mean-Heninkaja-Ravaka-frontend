import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProduitService } from './produit';

describe('ProduitService', () => {
  let service: ProduitService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProduitService]
    });

    service = TestBed.inject(ProduitService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch produits', () => {
    const dummyProduits = [
      { name: 'Produit 1', prix: 100 },
      { name: 'Produit 2', prix: 200 }
    ];

    
  });
});
