import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdeguataVerificaComponent } from './adeguata-verifica.component';

describe('AdeguataVerificaComponent', () => {
  let component: AdeguataVerificaComponent;
  let fixture: ComponentFixture<AdeguataVerificaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdeguataVerificaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdeguataVerificaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
