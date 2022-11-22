import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GravamiComponent } from './gravami.component';

describe('GravamiComponent', () => {
  let component: GravamiComponent;
  let fixture: ComponentFixture<GravamiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GravamiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GravamiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
