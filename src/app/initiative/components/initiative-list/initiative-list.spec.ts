import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InitiativeList } from './initiative-list';

describe('InitiativeList', () => {
  let component: InitiativeList;
  let fixture: ComponentFixture<InitiativeList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InitiativeList],
    }).compileComponents();

    fixture = TestBed.createComponent(InitiativeList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
