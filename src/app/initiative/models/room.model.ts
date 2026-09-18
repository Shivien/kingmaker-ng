import { InitiativeGroupModel } from "./initiative-group.model";

export type StateType = 'setting' | 'running';

export interface RoomModel {
  id: string;
  state: StateType;
  groups: InitiativeGroupModel[];
  currentGroupId?: string;
}
