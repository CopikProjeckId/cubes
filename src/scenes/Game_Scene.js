import Phaser from "phaser";
import { CUBE_COLOR, CUBE_VAL, START_POS, CUBE_CONTROLL, POINT, y_index, CUBE_SIZE} from "../component/cube_velue";
var cube = [];
var box_texture;
var mini_texture;
var view_port = [];
var view_mini_cube = [];
var now_index = -1;
var space;
var start = false;
var combe = false;
var ing_game = false;
var combine_count = [0,0,0,0];

export class MyGame extends Phaser.Scene
{
    constructor () {
        super();
        
    }
    
    preload () {
        box_texture = this.add.graphics();
        box_texture.fillStyle(0xFA5858, 1.0);
        box_texture.fillRect(0, 0, CUBE_SIZE.cube_size, CUBE_SIZE.cube_size);
        box_texture.generateTexture("box", CUBE_SIZE.cube_size, CUBE_SIZE.cube_size);
        box_texture.destroy();

        mini_texture = this.add.graphics();
        mini_texture.fillStyle(0xFA5858, 1.0);
        mini_texture.fillRect(0, 0, CUBE_SIZE.mini_cube_size, CUBE_SIZE.mini_cube_size);
        mini_texture.generateTexture("mini_box", CUBE_SIZE.mini_cube_size, CUBE_SIZE.mini_cube_size);
        mini_texture.destroy();

        let main_view = this.add.graphics();
        main_view.lineStyle(2, 0xFF00FF, 1.0);
        main_view.strokeRect(0, 0, 400, 400);

        let view_texture = this.add.graphics();
        view_texture.lineStyle(2, 0xFF00FF, 1.0);
        view_texture.strokeRect(0, 0, 100, 100);
        view_texture.generateTexture("view_port", 100,100);
        view_texture.destroy();
        this.setin
    }
    
    create () {

        /*
        * Mini_VIEWPORT 
        */
        
        for(let i = 0; i < 5; i++) {
            view_port[i] = this.add.sprite(450, 50 + (100 * i), "view_port");
        }
        /*
        * MainCUBE 
        */
        
        for(let i = 0; i < 9; i++){
            if(i < 3) {
                cube[i] = this.add.sprite(START_POS.x + ((CUBE_SIZE.cube_size + START_POS.margin)* i), START_POS.y, "box").setInteractive();
            } else if (i < 6) {
                cube[i] = this.add.sprite(START_POS.x + ((CUBE_SIZE.cube_size + START_POS.margin)* (i - 3)), START_POS.y + (CUBE_SIZE.cube_size + START_POS.margin), "box").setInteractive();
            } else {
                cube[i] = this.add.sprite(START_POS.x + ((CUBE_SIZE.cube_size + START_POS.margin)* (i - 6)), START_POS.y + ((CUBE_SIZE.cube_size + START_POS.margin) * 2), "box").setInteractive();
            }
        }
        /*
        * mini_View_Cube 
        */
        let mini_sy = START_POS.mini_y;
        for(let i = 0; i < 5; i++) {
            view_mini_cube[i] = [];
            for(let j = 0; j < 9; j++) {
                if(j < 3) {
                    view_mini_cube[i][j] = this.add.sprite(START_POS.mini_x + ((CUBE_SIZE.mini_cube_size + START_POS.margin/2)* j), mini_sy, "mini_box");
                } else if (j < 6) {
                    view_mini_cube[i][j] = this.add.sprite(START_POS.mini_x + ((CUBE_SIZE.mini_cube_size + START_POS.margin/2)* (j - 3)), mini_sy + (CUBE_SIZE.mini_cube_size + START_POS.margin/2), "mini_box");
                } else {
                    view_mini_cube[i][j] = this.add.sprite(START_POS.mini_x + ((CUBE_SIZE.mini_cube_size + START_POS.margin/2)* (j - 6)), mini_sy + ((CUBE_SIZE.mini_cube_size + START_POS.margin/2) * 2), "mini_box");
                }
            }
            mini_sy += (CUBE_SIZE.mini_cube_size + START_POS.margin/2) * 3 + 37;
        }

        this.cube_setTint();
        this.change_CUBE();
        this.move_check();

        space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }
    update() {
        if(space.isDown && !start && !ing_game) {
            combine_count[3] = Math.floor((Math.random() * 200) + 50);
            this.game_start();
        }
    }
    
    game_start() {
        start = false;
        combe = true;
        combine_count[0] = Math.floor((Math.random() * 9) + 1) - 1;
        combine_count[1] = Math.floor((Math.random() * 4) + 1) - 1;
        combine_count[2] = Math.floor((Math.random() * 4) + 1);
        this.combine();
    }
    combine() {
        /*
            *nowIndex 지정 => 방향 지정 => 횟수 지정 후 반복 => reset() => nowIndex 해제 
        */
        now_index = combine_count[0];
        switch (combine_count[1]) {
            case 0: CUBE_CONTROLL.move.left = true; break;
            case 1: CUBE_CONTROLL.move.right = true; break;
            case 2: CUBE_CONTROLL.move.up = true; break;
            case 3: CUBE_CONTROLL.move.down = true; break;
        }
        for(let i = 0; i < combine_count[2]; i++) {
            this.now_controll();
        };

        if(combine_count[3] <= 0) {
            combe = false;
            ing_game = true;
            now_index = -1;
            this.reset();
            return;
        } else {
            setTimeout(() => {
                this.game_start();
                combine_count[3] -= 1;
            }, 100);
        }

    }
    change_CUBE () {
        cube.forEach((e,j) => {
            e.on('pointerdown', (e) => {
                CUBE_CONTROLL.down = true;
                POINT.down_point.x = e.position.x;
                POINT.down_point.y = e.position.y;
                now_index = j;
            });
            e.on('pointerup', (e) => {
                CUBE_CONTROLL.down = false;
            });
        });
    }
    move_check() {
        cube.forEach((el,j) => {
            el.on('pointermove', (e) => {
                if(!CUBE_CONTROLL.down || !ing_game) {return;}
                
                POINT.move_point.x = e.position.x;
                POINT.move_point.y = e.position.y;

                if(POINT.down_point.x - POINT.move_point.x > CUBE_CONTROLL.move_pos){
                    CUBE_CONTROLL.move.left = true;
                } else if(POINT.down_point.x - POINT.move_point.x < -CUBE_CONTROLL.move_pos) {
                    CUBE_CONTROLL.move.right = true;
                } else if(POINT.down_point.y - POINT.move_point.y > CUBE_CONTROLL.move_pos) {
                    CUBE_CONTROLL.move.up = true;
                } else if(POINT.down_point.y - POINT.move_point.y < -CUBE_CONTROLL.move_pos) {
                    CUBE_CONTROLL.move.down = true;
                }
                this.now_controll();
            });
        });
    }
    
    now_controll() {
        if(CUBE_CONTROLL.move.right) {
            this.reset();
            this.change_right();
        } else if(CUBE_CONTROLL.move.left) {
            this.reset();
            this.change_left();
        } else if(CUBE_CONTROLL.move.up) {
            this.reset();
            this.change_up();
        } else if(CUBE_CONTROLL.move.down) {
            this.reset();
            this.change_down();
        }
        this.cube_setTint();
    }
    change_right() {
        switch (now_index) {
            case 0: case 1: case 2: this.x_exchange(0,3,'right'); break;
            case 3: case 4: case 5: this.x_exchange(3,6,'right'); break;
            case 6: case 7: case 8: this.x_exchange(6,9,'right'); break;
        }
    }
    change_left() {
        switch (now_index) {
            case 0: case 1: case 2: this.x_exchange(0,3,'left'); break;
            case 3: case 4: case 5: this.x_exchange(3,6,'left'); break;
            case 6: case 7: case 8: this.x_exchange(6,9,'left'); break;
        }
    }
    change_down() {
        switch (now_index) {
            case 0: case 3: case 6: this.y_exchange(0,6,'down'); break;
            case 1: case 4: case 7: this.y_exchange(1,7,'down'); break;
            case 2: case 5: case 8: this.y_exchange(2,8,'down'); break;
        }
    }
    change_up() {
        switch (now_index) {
            case 0: case 3: case 6: this.y_exchange(0,6,'up'); break;
            case 1: case 4: case 7: this.y_exchange(1,7,'up'); break;
            case 2: case 5: case 8: this.y_exchange(2,8,'up'); break;
        }
    }
    x_exchange(start,end,key) {
        let arr = [];
        let kip;
        for(let i = 0; i < 4; i++) {
            arr[i] = [];
            for(let j = start; j <= end; j++) {
                arr[i].push(CUBE_VAL[i][j]);
            };
        }

        switch (key) {
            case 'right':
                kip = arr[arr.length-1];
                arr.pop();
                arr.unshift(kip);
            break;
            case 'left': 
                kip = arr[0];
                arr.shift();
                arr.push(kip);
            break;
        }
        
        arr.forEach((e, i) => {
            for(let j = start; j < end; j++) {
                CUBE_VAL[i][j] = e[j-start];
            };
        });
    }
    y_exchange(start,end,key) {
        let arr = [];
        let kip;
        for(let i = 0; i < 4; i++) {
            arr[i] = [];
            for(let j = start; j <= end; j+=3) {
                arr[i].push(CUBE_VAL[y_index[i]][j]);
            };
        }
        switch (key) {
            case 'down':
                kip = arr[arr.length-1];
                arr.pop();
                arr.unshift(kip);
            break;
            case 'up': 
                kip = arr[0];
                arr.shift();
                arr.push(kip);
            break;
        }
        arr.forEach((e, i) => {
            let count = 0;
            for(let j = start; j <= end; j+=3) {
                CUBE_VAL[y_index[i]][j] = e[count];
                count++;
            };
        });
    }

    reset() {
        CUBE_CONTROLL.down = false;
        CUBE_CONTROLL.move.left = false;
        CUBE_CONTROLL.move.right = false;
        CUBE_CONTROLL.move.up = false;
        CUBE_CONTROLL.move.down = false;
    }
    
    cube_setTint() {
        //! MAIN
        cube.forEach((e,j) => {
            e.setTintFill(CUBE_COLOR[CUBE_VAL[0][j]]);
        });
        view_mini_cube.forEach((e,i) => {
            e.forEach((el,j) => {
                el.setTintFill(CUBE_COLOR[CUBE_VAL[i+1][j]]);
            });
        });
    }
}