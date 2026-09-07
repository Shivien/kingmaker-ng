import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SpellList } from './spell-list';

describe('SpellList', () => {
  let component: SpellList;
  let fixture: ComponentFixture<SpellList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpellList],
    }).compileComponents();

    fixture = TestBed.createComponent(SpellList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
