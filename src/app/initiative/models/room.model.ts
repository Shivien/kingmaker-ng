import InitiativeGroupModel from "./initiative-group.model";

type StateType = 'setting' | 'running';

export default interface RoomModel {
  id: string;
  state: StateType;
  groups: InitiativeGroupModel[];
  currentIndex: number;
}
