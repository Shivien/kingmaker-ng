import { RoomModel } from "./room.model";

export interface RoomResponseModel {
  success: boolean;
  room: RoomModel | null;
}
