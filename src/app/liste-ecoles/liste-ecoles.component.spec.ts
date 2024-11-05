import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeEcolesComponent } from './liste-ecoles.component';

describe('ListeEcolesComponent', () => {
  let component: ListeEcolesComponent;
  let fixture: ComponentFixture<ListeEcolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListeEcolesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListeEcolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
