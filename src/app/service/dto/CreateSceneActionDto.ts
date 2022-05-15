export type CreateDimmerActionDto = {
    deviceId: number;
    brightness: number;
    delay: number;
    fade: number;
};

export type CreateSwitchActionDto = {
    deviceId: number;
    power: boolean;
};

export type CreateMotorActionDto = {
    deviceId: number;
    action: 'raise' | 'lower';
};
