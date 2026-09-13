import { Injectable, signal } from "@angular/core";
import { io, Socket } from 'socket.io-client';
import { InitiativeGroupModel } from "../models/initiative-group.model";
import { RoomModel, StateType } from "../models/room.model";
import { from, Observable } from "rxjs";
import { RoomResponseModel } from "../models/room-response.model";
import { EventEnum } from "../enums/event.enum";
import { Room } from "../components/room/room";

@Injectable({
  providedIn: 'root',
})
export class InitiativeService {
  private socket!: Socket;

  public readonly connected = signal<boolean>(false);
  public readonly room = signal<RoomModel | null>(null);
  public readonly roomLoading = signal<boolean>(true);

  private emitWithAck<T>(event: string, ...args: any): Observable<T> {
    return from(this.socket.emitWithAck(event, ...args));
  }

  public initSocket(serverUrl: string): void {
    if (this.socket) {
      return;
    }

    this.socket = io(serverUrl);
    this.socket.on('connect', () => this.connected.set(true));
    this.socket.on(EventEnum.Disconnected, () => this.connected.set(false));
    this.socket.on(EventEnum.RoomUpdate, (room: RoomModel) => this.onRoomUpdate(room));
  }

  public getGroup(id: string): InitiativeGroupModel | undefined {
    return this.room()?.groups.find(g => g.id === id);
  }

  public setLocalRoom(room: RoomModel) {
    console.log('setLocalRoom', room);
    this.room.set(room);
  }

  // Methods called from api.

  private onRoomUpdate(room: RoomModel): void {
    console.log('onRoomUpdate', room);
    this.room.set(room);
  }

  // Methods to call api.

  public callRoomEmpty(roomId: string) {
    return this.emitWithAck<RoomResponseModel>(EventEnum.RoomEmpty, roomId);
  }

  public callRoomJoin(roomId: string) {
    console.log(`callRoomJoin(roomId: ${roomId}) socket: ${this.socket.id}`);
    return this.emitWithAck<RoomResponseModel>(EventEnum.RoomJoin, roomId);
  }

  public callGroupMoveToPrevious(roomId: string) {
    return this.emitWithAck<RoomResponseModel>(EventEnum.GroupMoveToPrevious, roomId);
  }

  public callGroupMoveToNext(roomId: string) {
    return this.emitWithAck<RoomResponseModel>(EventEnum.GroupMoveToNext, roomId);
  }

  public callGroupSetCurrent(roomId: string, groupId: string): void {
    this.socket.emit(EventEnum.GroupSetCurrent, roomId, groupId);
  }

  public callRoomSetState(roomId: string, roomState: StateType) {
    return this.emitWithAck<RoomResponseModel>(EventEnum.RoomSetState, roomId, roomState);
  }

  public callGroupAdd(label: string, initiative: number) {
    this.socket.emit(EventEnum.GroupAdd, this.room()!.id, { label, initiative });
  }

  public callGroupRemove(id: string) {
    this.socket.emit(EventEnum.GroupRemove, this.room()!.id, id);
  }

  public callGroupUpdate(group: InitiativeGroupModel) {
    this.socket.emit(EventEnum.GroupUpdate, this.room()!.id, group);
  }

}
