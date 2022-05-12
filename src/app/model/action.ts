import { Device } from './device';

export type SceneAction = {
    id: string;
} & (MotorAction | SwitchAction | DimmerAction);

export type MotorActionType = 'raise' | 'lower';

export type MotorAction = {
    device: Device & { type: 'motor' };
    action: MotorActionType;
};

export type SwitchAction = {
    device: Device & { type: 'switch' };
    power: boolean;
};

export type DimmerAction = {
    device: Device & { type: 'dimmer' };
    brightness: number;
    fade: number;
    delay: number;
};
