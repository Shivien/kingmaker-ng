export enum EventEnum {
  Disconnected = 'disconnected',
  // Room
  RoomEmpty = 'room/empty',
  RoomJoin = 'room/join',
  RoomLeave = 'room/leave',
  RoomSetState = 'room/state/set',
  RoomUpdate = 'room/update',
  // Group
  GroupAdd = 'group/add',
  GroupMoveToNext = 'group/move-to-next',
  GroupMoveToPrevious = 'group/move-to-previous',
  GroupRemove = 'group/remove',
  GroupSetCurrent = 'group/current/set',
  GroupUpdate = 'group/update',
};
