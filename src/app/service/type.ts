// Load
export const DIMMER = 'dimmer';
export const SWITCH = 'switch';
export const MOTOR = 'motor';
export type LoadType = typeof DIMMER | typeof SWITCH | typeof MOTOR;

type BaseLoad = {
    id: number;
    name: string;
    type: LoadType;
    roomId: string;
};

export type MotorLoad = BaseLoad;

export type DimmerLoad = BaseLoad & {
    brightness: number;
};

export type SwitchLoad = BaseLoad & {
    power: boolean;
};

export type Load = MotorLoad | DimmerLoad | SwitchLoad;

// Scene
export enum MotorActionType {
    RAISE,
    STOP,
    LOWER,
}

export type MotorAction = MotorLoad & { action: MotorActionType };
export type DimmerAction = DimmerLoad & { delay: number; fade: number };
export type SwitchAction = SwitchLoad & { delay: number };
export type SceneAction = MotorAction | DimmerAction | SwitchAction;
export type Scene = {
    name: string;
    actions: SceneAction[];
};
