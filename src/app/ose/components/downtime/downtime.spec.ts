import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Downtime } from './downtime';

describe('Downtime', () => {
  let component: Downtime;
  let fixture: ComponentFixture<Downtime>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Downtime],
    }).compileComponents();

    fixture = TestBed.createComponent(Downtime);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
