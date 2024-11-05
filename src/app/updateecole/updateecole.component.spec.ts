import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateecoleComponent } from './updateecole.component';

describe('UpdateecoleComponent', () => {
  let component: UpdateecoleComponent;
  let fixture: ComponentFixture<UpdateecoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateecoleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateecoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
