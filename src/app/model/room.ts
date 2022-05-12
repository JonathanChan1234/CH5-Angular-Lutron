import { Device } from './device';

export type Room = {
    id: string;
    name: string;
    devices: Device[];
};
