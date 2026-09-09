import { Injectable, signal } from "@angular/core";
import { io, Socket } from 'socket.io-client';
import RoomModel from "../models/room.model";
import InitiativeGroupModel from "../models/initiative-group.model";

@Injectable({
  providedIn: 'root',
})
export class InitiativeService {
  private socket!: Socket;

  public readonly connected = signal<boolean>(false);
  public readonly room = signal<RoomModel | null>(null);

  public initSocket(serverUrl: string): void {
    console.log('initSocket');
    if (this.socket) {
      return;
    }

    this.socket = io(serverUrl);
    this.socket.on('connect', () => this.connected.set(true));
    this.socket.on('disconnect', () => this.connected.set(false));
    this.socket.on('updateRoom', (room: RoomModel) => this.updateRoom(room));
  }

  private updateRoom(room: RoomModel): void {
    console.log('updateRoom', room);
    this.room.set(room);
  }

  public joinRoom(roomId: string): void {
    this.socket.emit('joinRoom', roomId);
  }

  public addGroup(label: string, initiative: number) {
    this.socket.emit('addGroup', this.room()!.id, label, initiative);
  }

  public deleteGroup(id: string) {
    this.socket.emit('removeGroup', this.room()!.id, id);
  }

  public getGroup(id: string): InitiativeGroupModel | undefined {
    return this.room()?.groups.find(g => g.id === id);
  }

  public updateGroup(group: InitiativeGroupModel) {
    this.socket.emit('updateGroup', this.room()!.id, group);
  }

}
