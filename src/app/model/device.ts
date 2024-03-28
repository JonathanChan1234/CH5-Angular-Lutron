export enum DeviceType {
    Dimmer = 1,
    Switch = 2,
    Motor = 3,
    Av = 4,
}

export type Device = {
    type: DeviceType;
    name: string;
    joinId: number;
};
