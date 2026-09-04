export interface SpellModel {
  _id?: string;
  level: number;
  name: string;
}

export interface CharacterModel {
  _id?: string;
  name: string;
  spells: {
    memorisedSpells: SpellModel[];
    knownSpells: SpellModel[];
  };
}
