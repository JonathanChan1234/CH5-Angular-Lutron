import { DIMMER, Load, MOTOR, MotorActionType, Scene, SWITCH } from './type';

export const BEDROOM_1 = 'Bedroom 1';
export const BEDROOM_2 = 'Bedroom 2';
export const BEDROOM_3 = 'Bedroom 3';
export const BATHROOM = 'Bathroom';
export const LIVING_ROOM = 'Living Room';
export const DINING_ROOM = 'Dining Room';
export const MBR = 'MBR';
export const BALCONY = 'Balcony';

export const ROOM = [
    BEDROOM_1,
    BEDROOM_2,
    BEDROOM_3,
    BATHROOM,
    LIVING_ROOM,
    DINING_ROOM,
    MBR,
    BALCONY,
];

export const LOAD: Load[] = [
    { type: DIMMER, id: 1, name: 'Dimmer-1', brightness: 10, roomId: BEDROOM_1 },
    { type: SWITCH, id: 2, name: 'Switch-1', power: false, roomId: BEDROOM_1 },
    { type: MOTOR, id: 3, name: 'Motor-1', roomId: BEDROOM_1 },
    { type: DIMMER, id: 4, name: 'Dimmer-1', brightness: 10, roomId: BEDROOM_2 },
    { type: SWITCH, id: 5, name: 'Switch-1', power: false, roomId: BEDROOM_2 },
    { type: MOTOR, id: 6, name: 'Motor-1', roomId: BEDROOM_2 },
    { type: DIMMER, id: 7, name: 'Dimmer-1', brightness: 10, roomId: BEDROOM_3 },
    { type: SWITCH, id: 8, name: 'Switch-1', power: false, roomId: BEDROOM_3 },
    { type: MOTOR, id: 9, name: 'Motor-1', roomId: BEDROOM_3 },
    { type: DIMMER, id: 10, name: 'Dimmer-1', brightness: 10, roomId: BATHROOM },
    { type: SWITCH, id: 11, name: 'Switch-1', power: false, roomId: BATHROOM },
    { type: MOTOR, id: 12, name: 'Motor-1', roomId: BATHROOM },
    { type: DIMMER, id: 13, name: 'Dimmer-1', brightness: 10, roomId: LIVING_ROOM },
    { type: SWITCH, id: 14, name: 'Switch-1', power: false, roomId: LIVING_ROOM },
    { type: MOTOR, id: 15, name: 'Motor-1', roomId: LIVING_ROOM },
    { type: DIMMER, id: 16, name: 'Dimmer-1', brightness: 10, roomId: DINING_ROOM },
    { type: SWITCH, id: 17, name: 'Switch-1', power: false, roomId: DINING_ROOM },
    { type: MOTOR, id: 18, name: 'Motor-1', roomId: DINING_ROOM },
    { type: DIMMER, id: 19, name: 'Dimmer-1', brightness: 10, roomId: MBR },
    { type: SWITCH, id: 20, name: 'Switch-1', power: false, roomId: MBR },
    { type: MOTOR, id: 21, name: 'Motor-1', roomId: MBR },
    { type: DIMMER, id: 22, name: 'Dimmer-1', brightness: 10, roomId: BALCONY },
    { type: SWITCH, id: 23, name: 'Switch-1', power: false, roomId: BALCONY },
    { type: MOTOR, id: 24, name: 'Motor-1', roomId: BALCONY },
    { type: DIMMER, id: 25, name: 'Dimmer-2', brightness: 10, roomId: BALCONY },
    { type: SWITCH, id: 26, name: 'Switch-2', power: false, roomId: BALCONY },
    { type: MOTOR, id: 27, name: 'Motor-2', roomId: BALCONY },
];

export const SCENE: Scene[] = [
    {
        name: 'Scene 1',
        actions: [
            {
                type: DIMMER,
                id: 22,
                name: 'Dimmer-1',
                brightness: 10,
                roomId: BALCONY,
                fade: 2,
                delay: 2,
            },
            {
                type: SWITCH,
                id: 23,
                name: 'Switch-1',
                power: true,
                roomId: BALCONY,
                delay: 2,
            },
            {
                type: MOTOR,
                id: 24,
                name: 'Motor-1',
                roomId: BALCONY,
                action: MotorActionType.LOWER,
            },
        ],
    },
    {
        name: 'Scene 2',
        actions: [
            {
                type: DIMMER,
                id: 22,
                name: 'Dimmer-1',
                brightness: 10,
                roomId: BALCONY,
                fade: 2,
                delay: 2,
            },
            {
                type: SWITCH,
                id: 23,
                name: 'Switch-1',
                power: true,
                roomId: BALCONY,
                delay: 2,
            },
            {
                type: MOTOR,
                id: 24,
                name: 'Motor-1',
                roomId: BALCONY,
                action: MotorActionType.LOWER,
            },
        ],
    },
    {
        name: 'Scene 3',
        actions: [
            {
                type: DIMMER,
                id: 22,
                name: 'Dimmer-1',
                brightness: 10,
                roomId: BALCONY,
                fade: 2,
                delay: 2,
            },
            {
                type: SWITCH,
                id: 23,
                name: 'Switch-1',
                power: true,
                roomId: BALCONY,
                delay: 2,
            },
            {
                type: MOTOR,
                id: 24,
                name: 'Motor-1',
                roomId: BALCONY,
                action: MotorActionType.LOWER,
            },
        ],
    },
];

let SCENE_NUMBER = 4;
export const getSceneName = () => `Scene ${SCENE_NUMBER++}`;
