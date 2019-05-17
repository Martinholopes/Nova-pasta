import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcessoriosDetailComponent } from './acessorios-detail.component';

describe('AcessoriosDetailComponent', () => {
  let component: AcessoriosDetailComponent;
  let fixture: ComponentFixture<AcessoriosDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcessoriosDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcessoriosDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
