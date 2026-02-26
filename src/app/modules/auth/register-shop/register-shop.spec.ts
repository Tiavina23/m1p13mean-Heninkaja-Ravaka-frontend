import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterShop } from './register-shop';

describe('RegisterShop', () => {
  let component: RegisterShop;
  let fixture: ComponentFixture<RegisterShop>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterShop]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterShop);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
