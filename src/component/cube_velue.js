export const START_POS = {
    x: 135,
    y: 135,
    mini_x: 430,
    mini_y: 30,
    margin: 10
};

export const CUBE_SIZE = {
    cube_size : 50,
    mini_cube_size : 16
}

export var CUBE_CONTROLL = {
    down: false,
    move: {
        up : false,
        down: false,
        left: false,
        right: false
    },
    move_pos: 30
};
export var POINT = {
    down_point: {
        x: 0, 
        y: 0
    },
    move_point: {
        x: 0, 
        y: 0
    }
}
export const CUBE_COLOR = [
    0xFF0000, //! 빨
    0x00FF00, //! 초
    0xFFFF00, //! 노
    0xffffff, //! 흰
    0xFF8000, //! 주
    0x2ECCFA  //! 파
];

export const y_index = [2,4,0,5];

/**
 * * [0] : Main__View
 * * [1] : mini_View_1
 * * [2] : mini_View_2
 * * [3] : mini_View_3
 * * [4] : mini_View_4
 * * [5] : mini_View_5
 */
export var CUBE_VAL = [
    [0,0,0
    ,0,0,0
    ,0,0,0],

    [1,1,1
    ,1,1,1
    ,1,1,1],

    [2,2,2
    ,2,2,2
    ,2,2,2],

    [3,3,3
    ,3,3,3
    ,3,3,3],
    
    [4,4,4
    ,4,4,4
    ,4,4,4],

    [5,5,5
    ,5,5,5
    ,5,5,5]
];
