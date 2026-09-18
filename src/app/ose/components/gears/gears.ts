import { Component, computed, effect, OnInit, signal, WritableSignal } from '@angular/core';

import adventuringGears from './json/adventuring-gears.json' with { type: 'json' };
import ammunitions from './json/ammunitions.json' with { type: 'json' };
import armors from './json/armors.json' with { type: 'json' };
import weapons from './json/weapons.json' with { type: 'json' };

interface GearModel {
  label: string;
  cost: number;
  amount: number;
}

interface ArmourModel extends GearModel {
  ac: string;
  weight: number;
}

interface WeaponModel extends GearModel {
  damage?: string;
  qualities?: string;
}

const gearTotal = (collection: GearModel[]) => collection.reduce((acc, cur) => acc + (cur.cost * cur.amount), 0);

@Component({
  imports: [],
  selector: 'app-gears',
  styleUrl: './gears.scss',
  templateUrl: './gears.html',
})
export class Gears implements OnInit {
  protected readonly total = computed(() => {
    const adventuringGears = gearTotal(this.adventuringGears());
    const ammunitions = gearTotal(this.ammunitions());
    const armors = gearTotal(this.armors());
    const weapons = gearTotal(this.weapons());

    return adventuringGears + ammunitions + armors + weapons;
  });
  protected readonly adventuringGears = signal<GearModel[]>([]);
  protected readonly ammunitions = signal<GearModel[]>([]);
  protected readonly armors = signal<ArmourModel[]>([]);
  protected readonly weapons = signal<WeaponModel[]>([]);
  protected readonly math = Math;

  ngOnInit(): void {
    this.initialize();
  }

  private initialize() {
    this.adventuringGears.set(adventuringGears.map(x => ({
      label: x.label,
      cost: x.cost,
      amount: 0,
    })));
    this.ammunitions.set(ammunitions.map(x => ({
      label: x.label,
      cost: x.cost,
      amount: 0,
    })));
    this.armors.set(armors.map(x => ({
      label: x.label,
      cost: x.cost,
      amount: 0,
      ac: x.ac,
      weight: x.weight,
    })));
    this.weapons.set(weapons.map(x => ({
      label: x.label,
      cost: x.cost,
      amount: 0,
      damage: x.damage,
      qualities: x.qualities,
    })));
  }

  protected updateAmount(collectionSignal: WritableSignal<any[]>, index: number, delta: number): void {
    collectionSignal.update(items =>
      items.map((item, i) => {
        if (i === index) {
          const newAmount = Math.max(0, item.amount + delta);
          return { ...item, amount: newAmount };
        }
        return item;
      })
    );
  }

}
