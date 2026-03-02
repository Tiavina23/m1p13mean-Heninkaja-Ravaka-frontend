import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopValidation } from './shop-validation';

describe('ShopValidation', () => {
  let component: ShopValidation;
  let fixture: ComponentFixture<ShopValidation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopValidation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopValidation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
