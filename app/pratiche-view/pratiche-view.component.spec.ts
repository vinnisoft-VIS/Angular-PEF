import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PraticheViewComponent } from './pratiche-view.component';

describe('PraticheViewComponent', () => {
  let component: PraticheViewComponent;
  let fixture: ComponentFixture<PraticheViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PraticheViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PraticheViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
