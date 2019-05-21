import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcessorySearchComponent } from './acessory-search.component';

describe('AcessorySearchComponent', () => {
  let component: AcessorySearchComponent;
  let fixture: ComponentFixture<AcessorySearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcessorySearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcessorySearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
