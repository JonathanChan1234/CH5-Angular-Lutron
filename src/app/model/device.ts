import { Room } from './room';

export type DeviceType = 'dimmer' | 'switch' | 'motor';
export type Device = {
    id: number;
    name: string;
    type: DeviceType;
    room: Room;
};
