import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MemorisingSpells } from './memorising-spells';

describe('MemorisingSpells', () => {
  let component: MemorisingSpells;
  let fixture: ComponentFixture<MemorisingSpells>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemorisingSpells],
    }).compileComponents();

    fixture = TestBed.createComponent(MemorisingSpells);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
