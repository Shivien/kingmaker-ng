export interface SpellModel {
  _id?: string;
  level: number;
  name: string;
  prepared: number;
}

export interface CharacterModel {
  _id?: string;
  name: string;
  spells: SpellModel[];
}
