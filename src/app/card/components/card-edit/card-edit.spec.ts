import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardEdit } from './card-edit';

describe('CardEdit', () => {
  let component: CardEdit;
  let fixture: ComponentFixture<CardEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardEdit],
    }).compileComponents();

    fixture = TestBed.createComponent(CardEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
