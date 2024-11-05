import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechercheParEcoleComponent } from './recherche-par-ecole.component';

describe('RechercheParEcoleComponent', () => {
  let component: RechercheParEcoleComponent;
  let fixture: ComponentFixture<RechercheParEcoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RechercheParEcoleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RechercheParEcoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
