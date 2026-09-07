import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SpellEdit } from './spell-edit';

describe('SpellEdit', () => {
  let component: SpellEdit;
  let fixture: ComponentFixture<SpellEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpellEdit],
    }).compileComponents();

    fixture = TestBed.createComponent(SpellEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
