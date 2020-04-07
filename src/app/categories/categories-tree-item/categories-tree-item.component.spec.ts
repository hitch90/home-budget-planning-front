import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesTreeItemComponent } from './categories-tree-item.component';

describe('CategoriesTreeItemComponent', () => {
  let component: CategoriesTreeItemComponent;
  let fixture: ComponentFixture<CategoriesTreeItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriesTreeItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesTreeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
