import {
    loop_audio,stop_audio,play_audio,create_audio,
    update_text,create_text,gameobjects_overlap,update_flip,debug_log, query_scale, create_rectangle, query_position, update_loop, 
    input_key_down, get_game_time, update_scale, create_sprite, 
    build_game, update_position, set_dimensions, update_to_top
} from 'arcade_2d';

const sound=create_audio("https://raw.githubusercontent.com/zhkandsrz/street-fighter/main/sound/china.mp3",0.3);
play_audio(sound);
loop_audio(sound);

const box=create_audio("https://raw.githubusercontent.com/zhkandsrz/street-fighter/main/sound/middle_boxing_hit.mp3",0.3);
const kick=create_audio("https://raw.githubusercontent.com/zhkandsrz/street-fighter/main/sound/hit_heavy_kick.mp3",0.5);
const fall=create_audio("https://raw.githubusercontent.com/zhkandsrz/street-fighter/main/sound/fall.mp3",0.5);

const background = create_sprite("https://raw.githubusercontent.com/zhkandsrz/street-fighter/refs/heads/main/g/front.gif");
set_dimensions([600, 450]);
update_position(background, [300, 222.5]);
const KO=create_sprite("https://raw.githubusercontent.com/zhkandsrz/street-fighter/refs/heads/main/g/bar.gif");
update_scale(KO,[0,0]);

//游戏加载页面
const loading_screen = create_sprite("https://raw.githubusercontent.com/zhkandsrz/street-fighter/refs/heads/main/g/loading.jpg");
update_position(loading_screen, [300, 222.5]);
update_scale(loading_screen, [1, 1]);
update_to_top(loading_screen);
let game_started = false;

const illustration_1 = create_text("click the full screen buttom \n press '1' to play with computer \n ");
update_position(illustration_1,[300,370]);
update_to_top(illustration_1);
const illustration_2 = create_text("or press '2' to play with your friend \n then click key 'b' to start the game");
update_position(illustration_2,[300,400]);
update_to_top(illustration_2);



const HP_role1= create_text("HP_role1:");
const win_role1= create_text("role1 win!");
update_scale(win_role1,[0,0]);
let HP1=100;
let HP1_see=create_text(HP1);
update_position(HP_role1,[100,100]);
update_position(HP1_see,[160,100]);
const HP_role2= create_text("HP_role2:");
const win_role2= create_text("role2 win!");
update_scale(win_role2,[0,0]);
let HP2=100;
let HP2_see=create_text(HP2);
update_position(HP_role2,[450,100]);
update_position(HP2_see,[510,100]);

const role1 = create_sprite("https://raw.githubusercontent.com/zhkandsrz/street-fighter/refs/heads/main/RYU1/RYU1_middle_boxing(1)(1).png");
update_position(role1, [200, 275]);
//update_to_top(role1);
let new_position = query_position(role1);


const box2 = create_sprite("https://raw.githubusercontent.com/zhkandsrz/street-fighter/refs/heads/main/RYU1/RYU1_middle_boxing(1)(2).png");
const box3 = create_sprite("https://raw.githubusercontent.com/zhkandsrz/street-fighter/refs/heads/main/RYU1/RYU1_middle_boxing(1)(3).png");
//update_position(box2, [200, 275]);
//update_position(box3, [200, 275]);
update_scale(role1, [1, 1]); 
update_scale(box2, [0, 0]); 
update_scale(box3, [0, 0]); 

const movement_dist = 10;

let animation_is_playing = false;
let animation_current_frame = 0;
let animation_last_frame_time = 0;

const animation_frames = [role1, box2, box3, role1];
const animation_frame_scales = [[1, 1], [1, 1], [1, 1], [1, 1]];
const animation_frame_durations = [80, 100, 200, 140];

function play_punch_animation() {
    animation_is_playing = true;
    animation_current_frame = 1; 
    animation_last_frame_time = get_game_time();
  
    
    for (let i = 0; i < array_length(animation_frames); i = i + 1) {
        update_scale(animation_frames[i], [0, 0]);
    }
    
  
    update_scale(animation_frames[animation_current_frame], animation_frame_scales[animation_current_frame]);
}

function update_animation() {
    if (!animation_is_playing) {
        return undefined;
    }
  
    const current_time = get_game_time();
    const frame_duration = animation_frame_durations[animation_current_frame];
        if (current_time - animation_last_frame_time > frame_duration) {
        
        update_scale(animation_frames[animation_current_frame], [0, 0]);
        
       
        animation_current_frame = animation_current_frame + 1;
        animation_last_frame_time = current_time;
    
       
        if (animation_current_frame >= array_length(animation_frames)) {
            animation_is_playing = false;
            animation_current_frame = 0;
            
            update_scale(animation_frames[0], animation_frame_scales[0]);
            return undefined;
        }
    
       
        update_scale(animation_frames[animation_current_frame], animation_frame_scales[animation_current_frame]);
    }
    return undefined;
}



const leg2=create_sprite("https://raw.githubusercontent.com/zhkandsrz/street-fighter/refs/heads/main/RYU1/RYU1_light_kick(1).png");
const leg3=create_sprite("https://raw.githubusercontent.com/zhkandsrz/street-fighter/refs/heads/main/RYU1/RYU1_light_kick(2).png");
update_scale(leg2, [0, 0]); 
update_scale(leg3, [0, 0]); 
let leg_is_playing = false;
let leg_current_frame = 0;
let leg_last_frame_time = 0;

const leg_frames = [role1, leg2, leg3, leg2, role1];
const leg_frame_scales = [[1, 1], [1, 1], [1, 1], [1,1], [1, 1]];
const leg_frame_durations = [80, 180, 300, 100, 80];

function play_punch_leg() {
    leg_is_playing = true;
    leg_current_frame = 1; 
    leg_last_frame_time = get_game_time();
  
    
    for (let i = 0; i < array_length(leg_frames); i = i + 1) {
        update_scale(leg_frames[i], [0, 0]);
    }
    
  
    update_scale(leg_frames[leg_current_frame], leg_frame_scales[leg_current_frame]);
}

function update_leg() {
    if (!leg_is_playing) {
        return undefined;
    }
  
    const current_time = get_game_time();
    const leg_duration = leg_frame_durations[leg_current_frame];
        if (current_time - leg_last_frame_time > leg_duration) {
        
        update_scale(leg_frames[leg_current_frame], [0, 0]);
        
       
        leg_current_frame = leg_current_frame + 1;
        leg_last_frame_time = current_time;
    
       
        if (leg_current_frame >= array_length(leg_frames)) {
            leg_is_playing = false;
            leg_current_frame = 0;
            
            update_scale(leg_frames[0], leg_frame_scales[0]);
            return undefined;
        }
    
       
        update_scale(leg_frames[leg_current_frame], leg_frame_scales[leg_current_frame]);
    }
    return undefined;
}


const walk=create_sprite("https://raw.githubusercontent.com/zhkandsrz/street-fighter/refs/heads/main/RYU1/RYU1_walk(1).png");
update_scale(walk, [0, 0]); 
let walk_is_playing = false;
let walk_current_frame = 0;
let walk_last_frame_time = 0;
const walk_frames = [role1, walk, role1];
const walk_frame_scales = [[1, 1], [1, 1], [1, 1]];
const walk_frame_durations = [10, 10 ,10];

function play_punch_walk() {
    walk_is_playing = true;
    walk_current_frame = 1; 
    walk_last_frame_time = get_game_time();

    for (let i = 0; i < array_length(walk_frames); i = i + 1) {
        update_scale(walk_frames[i], [0, 0]);
    }
    
    update_scale(walk_frames[walk_current_frame], walk_frame_scales[walk_current_frame]);
}

function update_walk() {
    if (!walk_is_playing) {
        return undefined;
    }
  
    const current_time = get_game_time();
    const walk_duration = walk_frame_durations[walk_current_frame];
        if (current_time - walk_last_frame_time > walk_duration) {
        
        update_scale(walk_frames[walk_current_frame], [0, 0]);
        
       
        walk_current_frame = walk_current_frame + 1;
        walk_last_frame_time = current_time;
    
       
        if (walk_current_frame >= array_length(walk_frames)) {
            walk_is_playing = false;
            walk_current_frame = 0;
            
            update_scale(walk_frames[0], walk_frame_scales[0]);
            return undefined;
        }
    
       
        update_scale(walk_frames[walk_current_frame], walk_frame_scales[walk_current_frame]);
    }
    return undefined;
}




const crouch2=create_sprite("https://raw.githubusercontent.com/zhkandsrz/street-fighter/refs/heads/main/RYU1/RYU1_crouch(1).png");
const crouch3=create_sprite("https://raw.githubusercontent.com/zhkandsrz/street-fighter/refs/heads/main/RYU1/RYU1_crouch(2).png");
const crouch4=create_sprite("https://raw.githubusercontent.com/zhkandsrz/street-fighter/refs/heads/main/RYU1/RYU1_crouch(3).png");
const crouch5=create_sprite("https://raw.githubusercontent.com/zhkandsrz/street-fighter/refs/heads/main/RYU1/RYU1_crouch(4).png");
update_scale(crouch2, [0, 0]); 
update_scale(crouch3, [0, 0]); 
update_scale(crouch4, [0, 0]); 
update_scale(crouch5, [0, 0]); 
let crouch_is_playing = false;
let crouch_current_frame = 0;
let crouch_last_frame_time = 0;
const crouch_frames = [role1, crouch2, crouch3, crouch4, crouch5];
const crouch_frame_scales = [[1, 1], [1, 1], [1, 1], [1,1], [1, 1]];
const crouch_frame_durations = [50, 80, 200, 80, 50];

function play_punch_crouch() {
    crouch_is_playing = true;
    crouch_current_frame = 1; 
    crouch_last_frame_time = get_game_time();
  
    
    for (let i = 0; i < array_length(crouch_frames); i = i + 1) {
        update_scale(crouch_frames[i], [0, 0]);
    }
    
  
    update_scale(crouch_frames[crouch_current_frame], crouch_frame_scales[crouch_current_frame]);
}

function update_crouch() {
    if (!crouch_is_playing) {
        return undefined;
    }
  
    const current_time = get_game_time();
    const crouch_duration = crouch_frame_durations[crouch_current_frame];
        if (current_time - crouch_last_frame_time > crouch_duration) {
        
        update_scale(crouch_frames[crouch_current_frame], [0, 0]);
        
       
        crouch_current_frame = crouch_current_frame + 1;
        crouch_last_frame_time = current_time;
    
       
        if (crouch_current_frame >= array_length(crouch_frames)) {
            crouch_is_playing = false;
            crouch_current_frame = 0;
            
            update_scale(crouch_frames[0], crouch_frame_scales[0]);
            return undefined;
        }
    
       
        update_scale(crouch_frames[crouch_current_frame], crouch_frame_scales[crouch_current_frame]);
    }
    return undefined;
}




const jump=create_sprite("https://raw.githubusercontent.com/zhkandsrz/street-fighter/refs/heads/main/RYU1/RYU1_jump(1).png");
update_scale(jump, [0, 0]); 
let jump_is_playing = false;
let jump_current_frame = 0;
let jump_last_frame_time = 0;
const jump_frames = [role1, jump , jump];
const jump_frame_scales = [[1, 1], [1, 1],[1, 1]];
const jump_frame_durations = [100 ,200, 100];

function play_punch_jump() {
    jump_is_playing = true;
    jump_current_frame = 1; 
    jump_last_frame_time = get_game_time();
  
    
    for (let i = 0; i < array_length(jump_frames); i = i + 1) {
        update_scale(jump_frames[i], [0, 0]);
    }
    update_scale(jump_frames[jump_current_frame], jump_frame_scales[jump_current_frame]);
}

function update_jump() {
    if (!jump_is_playing) {
        return undefined;
    }
    
    const current_time = get_game_time();
    const jump_duration = jump_frame_durations[jump_current_frame];
        if (current_time - jump_last_frame_time > jump_duration) {
        
        update_scale(jump_frames[jump_current_frame], [0, 0]);
        
       
        jump_current_frame = jump_current_frame + 1;
        jump_last_frame_time = current_time;
    
       
        if (jump_current_frame >= array_length(jump_frames)) {
            jump_is_playing = false;
            jump_current_frame = 0;
            
            update_scale(jump_frames[0], jump_frame_scales[0]);
            
            return undefined;
        }
        
        update_scale(jump_frames[jump_current_frame], jump_frame_scales[jump_current_frame]);
    }
    
    return undefined;
}


const beattack2 = create_sprite("https://raw.githubusercontent.com/zhkandsrz/street-fighter/refs/heads/main/RYU1/RYU1_beAttacked(1).png");
const beattack3 = create_sprite("https://raw.githubusercontent.com/zhkandsrz/street-fighter/refs/heads/main/RYU1/RYU1_beAttacked(2).png");
const beattack4 = create_sprite("https://raw.githubusercontent.com/zhkandsrz/street-fighter/refs/heads/main/RYU1/RYU1_beAttacked(3).png");

update_scale(beattack2, [0, 0]); 
update_scale(beattack3, [0, 0]); 
update_scale(beattack4, [0, 0]);

let beattack_is_playing = false;
let beattack_current_frame = 0;
let beattack_last_frame_time = 0;

const beattack_frames = [role1, beattack2, beattack3, beattack4,role1];
const beattack_frame_scales = [[1, 1], [1, 1], [1, 1], [1,1],[1, 1]];
const beattack_frame_durations = [15,60, 200, 60, 30];

function play_punch_beattack() {
    beattack_is_playing = true;
    beattack_current_frame = 1; 
    beattack_last_frame_time = get_game_time();
  
    
    for (let i = 0; i < array_length(beattack_frames); i = i + 1) {
        update_scale(beattack_frames[i], [0, 0]);
    }
    
  
    update_scale(beattack_frames[beattack_current_frame], beattack_frame_scales[beattack_current_frame]);
}

function update_beattack() {
    if (!beattack_is_playing) {
        return undefined;
    }
  
    const current_time = get_game_time();
    const frame_duration = beattack_frame_durations[beattack_current_frame];
        if (current_time - beattack_last_frame_time > frame_duration) {
        
        update_scale(beattack_frames[beattack_current_frame], [0, 0]);
        
       
        beattack_current_frame = beattack_current_frame + 1;
        beattack_last_frame_time = current_time;
    
       
        if (beattack_current_frame >= array_length(beattack_frames)) {
            beattack_is_playing = false;
            beattack_current_frame = 0;
            
            update_scale(beattack_frames[0], beattack_frame_scales[0]);
            return undefined;
        }
    
       
        update_scale(beattack_frames[beattack_current_frame], beattack_frame_scales[beattack_current_frame]);
    }
    return undefined;
}



const fall2 = create_sprite("https://raw.githubusercontent.com/zhkandsrz/street-fighter/refs/heads/main/RYU1/RYU1_beAttacked_fall(1).png");
const fall3 = create_sprite("https://raw.githubusercontent.com/zhkandsrz/street-fighter/refs/heads/main/RYU1/RYU1_beAttacked_fall(2).png");
const fall4 = create_sprite("https://raw.githubusercontent.com/zhkandsrz/street-fighter/refs/heads/main/RYU1/RYU1_beAttacked_fall(3).png");
const fall5 = create_sprite("https://raw.githubusercontent.com/zhkandsrz/street-fighter/refs/heads/main/RYU1/RYU1_beAttacked_fall(4).png");

update_scale(fall2, [0, 0]); 
update_scale(fall3, [0, 0]); 
update_scale(fall4, [0, 0]);
update_scale(fall5, [0, 0]);
let fall2_is_playing = false;
let fall2_current_frame = 0;
let fall2_last_frame_time = 0;

const fall2_frames = [role1, fall2, fall3, fall4, fall5];
const fall2_frame_scales = [[1, 1], [1, 1], [1, 1], [1,1], [1, 1]];
const fall2_frame_durations = [15, 120, 120, 120, 20000];

function play_punch_fall2() {
    fall2_is_playing = true;
    fall2_current_frame = 1; 
    fall2_last_frame_time = get_game_time();
  
    
    for (let i = 0; i < array_length(fall2_frames); i = i + 1) {
        update_scale(fall2_frames[i], [0, 0]);
    }
    
  
    update_scale(fall2_frames[fall2_current_frame], fall2_frame_scales[fall2_current_frame]);
}

function update_fall2() {
    if (!fall2_is_playing) {
        return undefined;
    }
  
    const current_time = get_game_time();
    const frame_duration = fall2_frame_durations[fall2_current_frame];
    if (current_time - fall2_last_frame_time > frame_duration) {
        
        update_scale(fall2_frames[fall2_current_frame], [0, 0]);
        
       
        fall2_current_frame = fall2_current_frame + 1;
        fall2_last_frame_time = current_time;
    
       
        if (fall2_current_frame >= array_length(fall2_frames)) {
            fall2_is_playing = false;
            fall2_current_frame = 0;
            
            update_scale(fall2_frames[0], fall2_frame_scales[0]);
            return undefined;
        }
    
       
        update_scale(fall2_frames[fall2_current_frame], fall2_frame_scales[fall2_current_frame]);
    }
    return undefined;
}


const crouch_boxing2=create_sprite("https://raw.githubusercontent.com/zhkandsrz/street-fighter/refs/heads/main/RYU1/RYU1_crouch_light_boxing(1).png");
const crouch_boxing3=create_sprite("https://raw.githubusercontent.com/zhkandsrz/street-fighter/refs/heads/main/RYU1/RYU1_crouch_light_boxing(2).png");
update_scale(crouch_boxing2, [0, 0]); 
update_scale(crouch_boxing3, [0, 0]); 
let crouch_boxing_is_playing = false;
let crouch_boxing_current_frame = 0;
let crouch_boxing_last_frame_time = 0;
const crouch_boxing_frames = [role1, crouch_boxing2, crouch_boxing3, crouch_boxing2, role1];
const crouch_boxing_frame_scales = [[1, 1], [1, 1], [1, 1], [1,1], [1, 1]];
const crouch_boxing_frame_durations = [50, 80, 200, 80, 50];

function play_punch_crouch_boxing() {
    crouch_boxing_is_playing = true;
    crouch_boxing_current_frame = 1; 
    crouch_boxing_last_frame_time = get_game_time();
  
    
    for (let i = 0; i < array_length(crouch_boxing_frames); i = i + 1) {
        update_scale(crouch_boxing_frames[i], [0, 0]);
    }
    
  
    update_scale(crouch_boxing_frames[crouch_boxing_current_frame], crouch_boxing_frame_scales[crouch_boxing_current_frame]);
}

function update_crouch_boxing() {
    if (!crouch_boxing_is_playing) {
        return undefined;
    }
  
    const current_time = get_game_time();
    const crouch_boxing_duration = crouch_boxing_frame_durations[crouch_boxing_current_frame];
        if (current_time - crouch_boxing_last_frame_time > crouch_boxing_duration) {
        
        update_scale(crouch_boxing_frames[crouch_boxing_current_frame], [0, 0]);
        
       
        crouch_boxing_current_frame = crouch_boxing_current_frame + 1;
        crouch_boxing_last_frame_time = current_time;
    
       
        if (crouch_boxing_current_frame >= array_length(crouch_boxing_frames)) {
            crouch_boxing_is_playing = false;
            crouch_boxing_current_frame = 0;
            
            update_scale(crouch_boxing_frames[0], crouch_boxing_frame_scales[0]);
            return undefined;
        }
    
       
        update_scale(crouch_boxing_frames[crouch_boxing_current_frame], crouch_boxing_frame_scales[crouch_boxing_current_frame]);
    }
    return undefined;
}

const jump_kick2=create_sprite("https://raw.githubusercontent.com/zhkandsrz/street-fighter/refs/heads/main/RYU1/RYU1_jumpMoved_middle_kick(1).png");
const jump_kick3=create_sprite("https://raw.githubusercontent.com/zhkandsrz/street-fighter/refs/heads/main/RYU1/RYU1_jumpMoved_middle_kick(2).png");
const jump_kick4=create_sprite("https://raw.githubusercontent.com/zhkandsrz/street-fighter/refs/heads/main/RYU1/RYU1_jumpMoved_middle_kick(3).png");
const jump_kick5=create_sprite("https://raw.githubusercontent.com/zhkandsrz/street-fighter/refs/heads/main/RYU1/RYU1_jumpMoved_middle_kick(4).png");
update_scale(jump_kick2, [0, 0]); 
update_scale(jump_kick3, [0, 0]); 
update_scale(jump_kick4, [0, 0]); 
update_scale(jump_kick5, [0, 0]); 
let jump_kick_is_playing = false;
let jump_kick_current_frame = 0;
let jump_kick_last_frame_time = 0;
const jump_kick_frames = [role1, jump_kick2, jump_kick3, jump_kick4, jump_kick5];
const jump_kick_frame_scales = [[1, 1], [1, 1], [1, 1], [1,1], [1, 1]];
const jump_kick_frame_durations = [80, 80, 100,240, 80];

function play_punch_jump_kick() {
    jump_kick_is_playing = true;
    jump_kick_current_frame = 1; 
    jump_kick_last_frame_time = get_game_time();
  
    
    for (let i = 0; i < array_length(jump_kick_frames); i = i + 1) {
        update_scale(jump_kick_frames[i], [0, 0]);
    }
    
  
    update_scale(jump_kick_frames[jump_kick_current_frame], jump_kick_frame_scales[jump_kick_current_frame]);
}

function update_jump_kick() {
    if (!jump_kick_is_playing) {
        return undefined;
    }
  
    const current_time = get_game_time();
    const jump_kick_duration = jump_kick_frame_durations[jump_kick_current_frame];
        if (current_time - jump_kick_last_frame_time > jump_kick_duration) {
        
        update_scale(jump_kick_frames[jump_kick_current_frame], [0, 0]);
        
       
        jump_kick_current_frame = jump_kick_current_frame + 1;
        jump_kick_last_frame_time = current_time;
    
       
        if (jump_kick_current_frame >= array_length(jump_kick_frames)) {
            jump_kick_is_playing = false;
            jump_kick_current_frame = 0;
            
            update_scale(jump_kick_frames[0], jump_kick_frame_scales[0]);
            return undefined;
        }
    
       
        update_scale(jump_kick_frames[jump_kick_current_frame], jump_kick_frame_scales[jump_kick_current_frame]);
    }
    return undefined;
}





//const role2 = create_sprite("https://raw.githubusercontent.com/zhkandsrz/street-fighter/refs/heads/main/RYU1/RYU1_middle_boxing(1)(1).png");
const role2 = create_sprite("https://raw.githubusercontent.com/zhkandsrz/street-fighter/refs/heads/main/RYU2/RYU2_role(2).png");
update_flip(role2,[true,false]);
update_position(role2, [400, 275]);
//update_to_top(role2);
let new_position_2 = query_position(role2);


const box_2 = create_sprite("https://raw.githubusercontent.com/zhkandsrz/street-fighter/refs/heads/main/RYU2/RYU2_middle_boxing(1).png");
const box_3 = create_sprite("https://raw.githubusercontent.com/zhkandsrz/street-fighter/refs/heads/main/RYU2/RYU2_middle_boxing(2).png");
const box_4 = create_sprite("https://raw.githubusercontent.com/zhkandsrz/street-fighter/refs/heads/main/RYU2/RYU2_middle_boxing(3).png");
update_flip(box_2,[true,false]);
update_flip(box_3,[true,false]);
update_flip(box_4,[true,false]);
update_scale(role2, [1, 1]); 
update_scale(box_2, [0, 0]); 
update_scale(box_3, [0, 0]); 
update_scale(box_4, [0,0]);
const movement_dist_2 = 10;

let box_2_is_playing = false;
let box_2_current_frame = 0;
let box_2_last_frame_time = 0;

const box_2_frames = [role2, box_2, box_3, box_4,role2];
const box_2_frame_scales = [[1, 1], [1, 1], [1, 1], [1,1],[1, 1]];
const box_2_frame_durations = [60, 80, 200, 80, 60];

function play_punch_box_2() {
    box_2_is_playing = true;
    box_2_current_frame = 1; 
    box_2_last_frame_time = get_game_time();
  
    
    for (let i = 0; i < array_length(box_2_frames); i = i + 1) {
        update_scale(box_2_frames[i], [0, 0]);
    }
    
  
    update_scale(box_2_frames[box_2_current_frame], box_2_frame_scales[box_2_current_frame]);
}

function update_box_2() {
    if (!box_2_is_playing) {
        return undefined;
    }
  
    const current_time = get_game_time();
    const frame_duration = box_2_frame_durations[box_2_current_frame];
        if (current_time - box_2_last_frame_time > frame_duration) {
        
        update_scale(box_2_frames[box_2_current_frame], [0, 0]);
        
       
        box_2_current_frame = box_2_current_frame + 1;
        box_2_last_frame_time = current_time;
    
       
        if (box_2_current_frame >= array_length(box_2_frames)) {
            box_2_is_playing = false;
            box_2_current_frame = 0;
            
            update_scale(box_2_frames[0], box_2_frame_scales[0]);
            return undefined;
        }
    
       
        update_scale(box_2_frames[box_2_current_frame], box_2_frame_scales[box_2_current_frame]);
    }
    return undefined;
}



const leg_2=create_sprite("https://raw.githubusercontent.com/zhkandsrz/street-fighter/refs/heads/main/RYU2/RYU2_kick(1).png");
const leg_3=create_sprite("https://raw.githubusercontent.com/zhkandsrz/street-fighter/refs/heads/main/RYU2/RYU2__kick(2).png");
const leg_4=create_sprite("https://raw.githubusercontent.com/zhkandsrz/street-fighter/refs/heads/main/RYU2/RYU2_kick(3).png");
update_flip(leg_2,[true,false]);
update_flip(leg_3,[true,false]);
update_flip(leg_4,[true,false]);
update_scale(leg_2, [0, 0]); 
update_scale(leg_3, [0, 0]); 
update_scale(leg_4, [0, 0]);
let leg_2_is_playing = false;
let leg_2_current_frame = 0;
let leg_2_last_frame_time = 0;

const leg_2_frames = [role2, leg_2, leg_3, leg_4, leg_2, role2];
const leg_2_frame_scales = [[1, 1], [1, 1], [1,1], [1,1], [1,1],[1, 1]];
const leg_2_frame_durations = [60, 100, 100, 180, 80, 60];

function play_punch_leg_2() {
    leg_2_is_playing = true;
    leg_2_current_frame = 1; 
    leg_2_last_frame_time = get_game_time();
  
    
    for (let i = 0; i < array_length(leg_2_frames); i = i + 1) {
        update_scale(leg_2_frames[i], [0, 0]);
    }
    
  
    update_scale(leg_2_frames[leg_2_current_frame], leg_2_frame_scales[leg_2_current_frame]);
}

function update_leg_2() {
    if (!leg_2_is_playing) {
        return undefined;
    }
  
    const current_time = get_game_time();
    const leg_2_duration = leg_2_frame_durations[leg_2_current_frame];
        if (current_time - leg_2_last_frame_time > leg_2_duration) {
        
        update_scale(leg_2_frames[leg_2_current_frame], [0, 0]);
        
       
        leg_2_current_frame = leg_2_current_frame + 1;
        leg_2_last_frame_time = current_time;
    
       
        if (leg_2_current_frame >= array_length(leg_2_frames)) {
            leg_2_is_playing = false;
            leg_2_current_frame = 0;
            
            update_scale(leg_2_frames[0], leg_2_frame_scales[0]);
            return undefined;
        }
    
       
        update_scale(leg_2_frames[leg_2_current_frame], leg_2_frame_scales[leg_2_current_frame]);
    }
    return undefined;
}


const walk_2=create_sprite("https://raw.githubusercontent.com/zhkandsrz/street-fighter/refs/heads/main/RYU2/RYU2_wait(1).png");
update_flip(walk_2,[true,false]);
update_scale(walk_2, [0, 0]); 
let walk_2_is_playing = false;
let walk_2_current_frame = 0;
let walk_2_last_frame_time = 0;
const walk_2_frames = [role2, walk_2, role2];
const walk_2_frame_scales = [[1, 1], [1, 1], [1, 1]];
const walk_2_frame_durations = [10, 10 ,10];

function play_punch_walk_2() {
    walk_2_is_playing = true;
    walk_2_current_frame = 1; 
    walk_2_last_frame_time = get_game_time();

    for (let i = 0; i < array_length(walk_2_frames); i = i + 1) {
        update_scale(walk_2_frames[i], [0, 0]);
    }
    
    update_scale(walk_2_frames[walk_2_current_frame], walk_2_frame_scales[walk_2_current_frame]);
}

function update_walk_2() {
    if (!walk_2_is_playing) {
        return undefined;
    }
  
    const current_time = get_game_time();
    const walk_2_duration = walk_2_frame_durations[walk_2_current_frame];
        if (current_time - walk_2_last_frame_time > walk_2_duration) {
        
        update_scale(walk_2_frames[walk_2_current_frame], [0, 0]);
        
       
        walk_2_current_frame = walk_2_current_frame + 1;
        walk_2_last_frame_time = current_time;
    
       
        if (walk_2_current_frame >= array_length(walk_2_frames)) {
            walk_2_is_playing = false;
            walk_2_current_frame = 0;
            
            update_scale(walk_2_frames[0], walk_2_frame_scales[0]);
            return undefined;
        }
    
       
        update_scale(walk_2_frames[walk_2_current_frame], walk_2_frame_scales[walk_2_current_frame]);
    }
    return undefined;
}




const crouch_2=create_sprite("https://raw.githubusercontent.com/zhkandsrz/street-fighter/refs/heads/main/RYU2/RYU2_crouch(1).png");
const crouch_3=create_sprite("https://raw.githubusercontent.com/zhkandsrz/street-fighter/refs/heads/main/RYU2/RYU2_crouch(2).png");
const crouch_4=create_sprite("https://raw.githubusercontent.com/zhkandsrz/street-fighter/refs/heads/main/RYU2/RYU2_crouch(3).png");
const crouch_5=create_sprite("https://raw.githubusercontent.com/zhkandsrz/street-fighter/refs/heads/main/RYU2/RYU2_crouch(4).png");
update_flip(crouch_2,[true,false]);
update_flip(crouch_3,[true,false]);
update_flip(crouch_4,[true,false]);
update_flip(crouch_5,[true,false]);
update_scale(crouch_2, [0, 0]); 
update_scale(crouch_3, [0, 0]); 
update_scale(crouch_4, [0, 0]); 
update_scale(crouch_5, [0, 0]); 
let crouch_2_is_playing = false;
let crouch_2_current_frame = 0;
let crouch_2_last_frame_time = 0;
const crouch_2_frames = [role2, crouch_2, crouch_3, crouch_4, crouch_5];
const crouch_2_frame_scales = [[1, 1], [1, 1], [1, 1], [1,1], [1, 1]];
const crouch_2_frame_durations = [50, 80, 200, 80, 50];

function play_punch_crouch_2() {
    crouch_2_is_playing = true;
    crouch_2_current_frame = 1; 
    crouch_2_last_frame_time = get_game_time();
  
    
    for (let i = 0; i < array_length(crouch_2_frames); i = i + 1) {
        update_scale(crouch_2_frames[i], [0, 0]);
    }
    
  
    update_scale(crouch_2_frames[crouch_2_current_frame], crouch_2_frame_scales[crouch_2_current_frame]);
}

function update_crouch_2() {
    if (!crouch_2_is_playing) {
        return undefined;
    }
  
    const current_time = get_game_time();
    const crouch_2_duration = crouch_2_frame_durations[crouch_2_current_frame];
        if (current_time - crouch_2_last_frame_time > crouch_2_duration) {
        
        update_scale(crouch_2_frames[crouch_2_current_frame], [0, 0]);
        
       
        crouch_2_current_frame = crouch_2_current_frame + 1;
        crouch_2_last_frame_time = current_time;
    
       
        if (crouch_2_current_frame >= array_length(crouch_2_frames)) {
            crouch_2_is_playing = false;
            crouch_2_current_frame = 0;
            
            update_scale(crouch_2_frames[0], crouch_2_frame_scales[0]);
            return undefined;
        }
    
       
        update_scale(crouch_2_frames[crouch_2_current_frame], crouch_2_frame_scales[crouch_2_current_frame]);
    }
    return undefined;
}




const jump_2=create_sprite("https://raw.githubusercontent.com/zhkandsrz/street-fighter/refs/heads/main/RYU2/RYU2_jump(1).png");
update_flip(jump_2,[true,false]);
update_scale(jump_2, [0, 0]); 
let jump_2_is_playing = false;
let jump_2_current_frame = 0;
let jump_2_last_frame_time = 0;
const jump_2_frames = [role2, jump_2 , jump_2];
const jump_2_frame_scales = [[1, 1], [1, 1],[1, 1]];
const jump_2_frame_durations = [100 ,240, 100];

function play_punch_jump_2() {
    jump_2_is_playing = true;
    jump_2_current_frame = 1; 
    jump_2_last_frame_time = get_game_time();
  
    
    for (let i = 0; i < array_length(jump_2_frames); i = i + 1) {
        update_scale(jump_2_frames[i], [0, 0]);
    }
    update_scale(jump_2_frames[jump_2_current_frame], jump_2_frame_scales[jump_2_current_frame]);
}

function update_jump_2() {
    if (!jump_2_is_playing) {
        return undefined;
    }
    
    const current_time = get_game_time();
    const jump_2_duration = jump_2_frame_durations[jump_2_current_frame];
        if (current_time - jump_2_last_frame_time > jump_2_duration) {
        
        update_scale(jump_2_frames[jump_2_current_frame], [0, 0]);
        
       
        jump_2_current_frame = jump_2_current_frame + 1;
        jump_2_last_frame_time = current_time;
    
       
        if (jump_2_current_frame >= array_length(jump_2_frames)) {
            jump_2_is_playing = false;
            jump_2_current_frame = 0;
            
            update_scale(jump_2_frames[0], jump_2_frame_scales[0]);
            
            return undefined;
        }
        
        update_scale(jump_2_frames[jump_2_current_frame], jump_2_frame_scales[jump_2_current_frame]);
    }
    
    return undefined;
}


const beattack_2 = create_sprite("https://raw.githubusercontent.com/zhkandsrz/street-fighter/refs/heads/main/RYU2/RYU2_beAttacked(1).png");
const beattack_3 = create_sprite("https://raw.githubusercontent.com/zhkandsrz/street-fighter/refs/heads/main/RYU2/RYU2_beAttacked(2).png");
const beattack_4 = create_sprite("https://raw.githubusercontent.com/zhkandsrz/street-fighter/refs/heads/main/RYU2/RYU2_beAttacked(3).png");
update_flip(beattack_2,[true,false]);
update_flip(beattack_3,[true,false]);
update_flip(beattack_4,[true,false]);
update_scale(beattack_2, [0, 0]); 
update_scale(beattack_3, [0, 0]); 
update_scale(beattack_4, [0, 0]);

let beattack_2_is_playing = false;
let beattack_2_current_frame = 0;
let beattack_2_last_frame_time = 0;

const beattack_2_frames = [role2, beattack_2, beattack_3, beattack_4,role2];
const beattack_2_frame_scales = [[1, 1], [1, 1], [1, 1], [1,1],[1, 1]];
const beattack_2_frame_durations = [15,60, 200, 60, 30];

function play_punch_beattack_2() {
    beattack_2_is_playing = true;
    beattack_2_current_frame = 1; 
    beattack_2_last_frame_time = get_game_time();
  
    
    for (let i = 0; i < array_length(beattack_2_frames); i = i + 1) {
        update_scale(beattack_2_frames[i], [0, 0]);
    }
    
  
    update_scale(beattack_2_frames[beattack_2_current_frame], beattack_2_frame_scales[beattack_2_current_frame]);
}

function update_beattack_2() {
    if (!beattack_2_is_playing) {
        return undefined;
    }
  
    const current_time = get_game_time();
    const frame_duration = beattack_2_frame_durations[beattack_2_current_frame];
    if (current_time - beattack_2_last_frame_time > frame_duration) {
        
        update_scale(beattack_2_frames[beattack_2_current_frame], [0, 0]);
        
       
        beattack_2_current_frame = beattack_2_current_frame + 1;
        beattack_2_last_frame_time = current_time;
    
       
        if (beattack_2_current_frame >= array_length(beattack_2_frames)) {
            beattack_2_is_playing = false;
            beattack_2_current_frame = 0;
            
            update_scale(beattack_2_frames[0], beattack_2_frame_scales[0]);
            return undefined;
        }
    
       
        update_scale(beattack_2_frames[beattack_2_current_frame], beattack_2_frame_scales[beattack_2_current_frame]);
    }
    return undefined;
}




const fall_2 = create_sprite("https://raw.githubusercontent.com/zhkandsrz/street-fighter/refs/heads/main/RYU2/RYU2_beAttacked_fall(1).png");
const fall_3 = create_sprite("https://raw.githubusercontent.com/zhkandsrz/street-fighter/refs/heads/main/RYU2/RYU2_beAttacked_fall(2).png");
const fall_4 = create_sprite("https://raw.githubusercontent.com/zhkandsrz/street-fighter/refs/heads/main/RYU2/RYU2_beAttacked_fall(3).png");
const fall_5 = create_sprite("https://raw.githubusercontent.com/zhkandsrz/street-fighter/refs/heads/main/RYU2/RYU2_beAttacked_fall(4).png");
update_flip(fall_2,[true,false]);
update_flip(fall_3,[true,false]);
update_flip(fall_4,[true,false]);
update_flip(fall_5,[true,false]);
update_scale(fall_2, [0, 0]); 
update_scale(fall_3, [0, 0]); 
update_scale(fall_4, [0, 0]);
update_scale(fall_5, [0, 0]);

let fall_2_is_playing = false;
let fall_2_current_frame = 0;
let fall_2_last_frame_time = 0;

const fall_2_frames = [role2, fall_2, fall_3, fall_4,fall_5];
const fall_2_frame_scales = [[1, 1], [1, 1], [1, 1], [1,1],[1, 1]];
const fall_2_frame_durations = [15,120, 120, 120, 20000];

function play_punch_fall_2() {
    fall_2_is_playing = true;
    fall_2_current_frame = 1; 
    fall_2_last_frame_time = get_game_time();
  
    
    for (let i = 0; i < array_length(fall_2_frames); i = i + 1) {
        update_scale(fall_2_frames[i], [0, 0]);
    }
    
  
    update_scale(fall_2_frames[fall_2_current_frame], fall_2_frame_scales[fall_2_current_frame]);
}

function update_fall_2() {
    if (!fall_2_is_playing) {
        return undefined;
    }
  
    const current_time = get_game_time();
    const frame_duration = fall_2_frame_durations[fall_2_current_frame];
    if (current_time - fall_2_last_frame_time > frame_duration) {
        
        update_scale(fall_2_frames[fall_2_current_frame], [0, 0]);
        
       
        fall_2_current_frame = fall_2_current_frame + 1;
        fall_2_last_frame_time = current_time;
    
       
        if (fall_2_current_frame >= array_length(fall_2_frames)) {
            fall_2_is_playing = false;
            fall_2_current_frame = 0;
            
            update_scale(fall_2_frames[0], fall_2_frame_scales[0]);
            return undefined;
        }
    
       
        update_scale(fall_2_frames[fall_2_current_frame], fall_2_frame_scales[fall_2_current_frame]);
    }
    return undefined;
}

const crouch_box2=create_sprite("https://raw.githubusercontent.com/zhkandsrz/street-fighter/refs/heads/main/RYU2/RYU2_crouch_middle_boxing(1).png");
const crouch_box3=create_sprite("https://raw.githubusercontent.com/zhkandsrz/street-fighter/refs/heads/main/RYU2/RYU2_crouch_middle_boxing(2).png");
const crouch_box4=create_sprite("https://raw.githubusercontent.com/zhkandsrz/street-fighter/refs/heads/main/RYU2/RYU2_crouch_middle_boxing(3).png");
update_flip(crouch_box2,[true,false]);
update_flip(crouch_box3,[true,false]);
update_flip(crouch_box4,[true,false]);

update_scale(crouch_box2, [0, 0]); 
update_scale(crouch_box3, [0, 0]); 
update_scale(crouch_box4, [0, 0]); 

let crouch_box2_is_playing = false;
let crouch_box2_current_frame = 0;
let crouch_box2_last_frame_time = 0;
const crouch_box2_frames = [role2, crouch_box2, crouch_box3, crouch_box4, role2];
const crouch_box2_frame_scales = [[1, 1], [1, 1], [1, 1], [1,1], [1, 1]];
const crouch_box2_frame_durations = [50, 80, 200, 80, 50];

function play_punch_crouch_box2() {
    crouch_box2_is_playing = true;
    crouch_box2_current_frame = 1; 
    crouch_box2_last_frame_time = get_game_time();
  
    
    for (let i = 0; i < array_length(crouch_box2_frames); i = i + 1) {
        update_scale(crouch_box2_frames[i], [0, 0]);
    }
    
  
    update_scale(crouch_box2_frames[crouch_box2_current_frame], crouch_box2_frame_scales[crouch_box2_current_frame]);
}

function update_crouch_box2() {
    if (!crouch_box2_is_playing) {
        return undefined;
    }
  
    const current_time = get_game_time();
    const crouch_box2_duration = crouch_box2_frame_durations[crouch_box2_current_frame];
        if (current_time - crouch_box2_last_frame_time > crouch_box2_duration) {
        
        update_scale(crouch_box2_frames[crouch_box2_current_frame], [0, 0]);
        
       
        crouch_box2_current_frame = crouch_box2_current_frame + 1;
        crouch_box2_last_frame_time = current_time;
    
       
        if (crouch_box2_current_frame >= array_length(crouch_box2_frames)) {
            crouch_box2_is_playing = false;
            crouch_box2_current_frame = 0;
            
            update_scale(crouch_box2_frames[0], crouch_box2_frame_scales[0]);
            return undefined;
        }
    
       
        update_scale(crouch_box2_frames[crouch_box2_current_frame], crouch_box2_frame_scales[crouch_box2_current_frame]);
    }
    return undefined;
}

const jump_kick2_2=create_sprite("https://raw.githubusercontent.com/zhkandsrz/street-fighter/refs/heads/main/RYU2/RYU2_jumpMoved_middle_kick(1).png");
const jump_kick2_3=create_sprite("https://raw.githubusercontent.com/zhkandsrz/street-fighter/refs/heads/main/RYU2/RYU2_jumpMoved_middle_kick(2).png");
const jump_kick2_4=create_sprite("https://raw.githubusercontent.com/zhkandsrz/street-fighter/refs/heads/main/RYU2/RYU2_jumpMoved_middle_kick(3).png");
const jump_kick2_5=create_sprite("https://raw.githubusercontent.com/zhkandsrz/street-fighter/refs/heads/main/RYU2/RYU2_jumpMoved_middle_kick(4).png");
update_flip(jump_kick2_2,[true,false]);
update_flip(jump_kick2_3,[true,false]);
update_flip(jump_kick2_4,[true,false]);
update_flip(jump_kick2_5,[true,false]);
update_scale(jump_kick2_2, [0, 0]); 
update_scale(jump_kick2_3, [0, 0]); 
update_scale(jump_kick2_4, [0, 0]); 
update_scale(jump_kick2_5, [0, 0]); 
let jump_kick2_2_is_playing = false;
let jump_kick2_2_current_frame = 0;
let jump_kick2_2_last_frame_time = 0;
const jump_kick2_2_frames = [role2, jump_kick2_2, jump_kick2_3, jump_kick2_4, jump_kick2_5];
const jump_kick2_2_frame_scales = [[1, 1], [1, 1], [1, 1], [1,1], [1, 1]];
const jump_kick2_2_frame_durations = [80, 80, 100, 240, 80];

function play_punch_jump_kick2_2() {
    jump_kick2_2_is_playing = true;
    jump_kick2_2_current_frame = 1; 
    jump_kick2_2_last_frame_time = get_game_time();
  
    
    for (let i = 0; i < array_length(jump_kick2_2_frames); i = i + 1) {
        update_scale(jump_kick2_2_frames[i], [0, 0]);
    }
    
  
    update_scale(jump_kick2_2_frames[jump_kick2_2_current_frame], jump_kick2_2_frame_scales[jump_kick2_2_current_frame]);
}

function update_jump_kick2_2() {
    if (!jump_kick2_2_is_playing) {
        return undefined;
    }
  
    const current_time = get_game_time();
    const jump_kick2_2_duration = jump_kick2_2_frame_durations[jump_kick2_2_current_frame];
        if (current_time - jump_kick2_2_last_frame_time > jump_kick2_2_duration) {
        
        update_scale(jump_kick2_2_frames[jump_kick2_2_current_frame], [0, 0]);
        
       
        jump_kick2_2_current_frame = jump_kick2_2_current_frame + 1;
        jump_kick2_2_last_frame_time = current_time;
    
       
        if (jump_kick2_2_current_frame >= array_length(jump_kick2_2_frames)) {
            jump_kick2_2_is_playing = false;
            jump_kick2_2_current_frame = 0;
            
            update_scale(jump_kick2_2_frames[0], jump_kick2_2_frame_scales[0]);
            return undefined;
        }
    
       
        update_scale(jump_kick2_2_frames[jump_kick2_2_current_frame], jump_kick2_2_frame_scales[jump_kick2_2_current_frame]);
    }
    return undefined;
}

const wavebox_2=create_sprite("https://raw.githubusercontent.com/zhkandsrz/street-fighter/refs/heads/main/RYU1/RYU1_wave_boxing(1).png");
const wavebox_3=create_sprite("https://raw.githubusercontent.com/zhkandsrz/street-fighter/refs/heads/main/RYU1/RYU1_wave_boxing(2).png");
const wavebox_4=create_sprite("https://raw.githubusercontent.com/zhkandsrz/street-fighter/refs/heads/main/RYU1/RYU1_wave_boxing(3).png");
const wavebox_5=create_sprite("https://raw.githubusercontent.com/zhkandsrz/street-fighter/refs/heads/main/RYU1/RYU1_wave_boxing(4).png");
update_scale(wavebox_2, [0, 0]); 
update_scale(wavebox_3, [0, 0]); 
update_scale(wavebox_4, [0, 0]); 
update_scale(wavebox_5, [0, 0]); 
let wavebox_2_is_playing = false;
let wavebox_2_current_frame = 0;
let wavebox_2_last_frame_time = 0;
const wavebox_2_frames = [role1, wavebox_2, wavebox_3, wavebox_4, wavebox_5];
const wavebox_2_frame_scales = [[1, 1], [1, 1], [1, 1], [1,1], [1, 1]];
const wavebox_2_frame_durations = [80, 80, 100, 240, 80];

function play_punch_wavebox_2() {
    wavebox_2_is_playing = true;
    wavebox_2_current_frame = 1; 
    wavebox_2_last_frame_time = get_game_time();
  
    
    for (let i = 0; i < array_length(wavebox_2_frames); i = i + 1) {
        update_scale(wavebox_2_frames[i], [0, 0]);
    }
    
  
    update_scale(wavebox_2_frames[wavebox_2_current_frame], wavebox_2_frame_scales[wavebox_2_current_frame]);
}

function update_wavebox_2() {
    if (!wavebox_2_is_playing) {
        return undefined;
    }
  
    const current_time = get_game_time();
    const wavebox_2_duration = wavebox_2_frame_durations[wavebox_2_current_frame];
        if (current_time - wavebox_2_last_frame_time > wavebox_2_duration) {
        
        update_scale(wavebox_2_frames[wavebox_2_current_frame], [0, 0]);
        
       
        wavebox_2_current_frame = wavebox_2_current_frame + 1;
        wavebox_2_last_frame_time = current_time;
    
       
        if (wavebox_2_current_frame >= array_length(wavebox_2_frames)) {
            wavebox_2_is_playing = false;
            wavebox_2_current_frame = 0;
            
            update_scale(wavebox_2_frames[0], wavebox_2_frame_scales[0]);
            return undefined;
        }
    
       
        update_scale(wavebox_2_frames[wavebox_2_current_frame], wavebox_2_frame_scales[wavebox_2_current_frame]);
    }
    return undefined;
}


const wave1_sprite = create_sprite("https://raw.githubusercontent.com/zhkandsrz/street-fighter/refs/heads/main/magic/transverseWave(1).png");
const wave2_sprite = create_sprite("https://raw.githubusercontent.com/zhkandsrz/street-fighter/refs/heads/main/magic/simpleFire(3).png");
update_scale(wave1_sprite, [0, 0]);
update_scale(wave2_sprite, [0, 0]);
update_flip(wave2_sprite,[true,false]);
const wave_boxing=create_audio("https://raw.githubusercontent.com/zhkandsrz/street-fighter/main/sound/wave_boxing.mp3",0.3);
let wave1_active = false;
let wave2_active = false;
let wave1_position = [0, 0];
let wave2_position = [0, 0];
const wave_speed = 8;
const wave_cooldown = 2000;
let wave1_last_time = -wave_cooldown;
let wave2_last_time = -wave_cooldown;
let now1=get_game_time();
let now2=get_game_time();
function fire_wave1() {
    
    wave1_last_time = now1;

    wave1_position = query_position(role1);
    wave1_position = [wave1_position[0] + 50, wave1_position[1] - 20];
    update_position(wave1_sprite, wave1_position);
    update_scale(wave1_sprite, [0.5, 0.5]);
    wave1_active = true;
}

function fire_wave2() {

    wave2_last_time = now2;

    wave2_position = query_position(role2);
    wave2_position = [wave2_position[0] - 50, wave2_position[1] - 20];
    update_position(wave2_sprite, wave2_position);
    update_scale(wave2_sprite, [0.5, 0.5]);
    wave2_active = true;
}

const wavebox2_2=create_sprite("https://raw.githubusercontent.com/zhkandsrz/street-fighter/refs/heads/main/RYU2/RYU2_wave_boxing(1).png");
const wavebox2_3=create_sprite("https://raw.githubusercontent.com/zhkandsrz/street-fighter/refs/heads/main/RYU2/RYU2_wave_boxing(2).png");
const wavebox2_4=create_sprite("https://raw.githubusercontent.com/zhkandsrz/street-fighter/refs/heads/main/RYU2/RYU2_wave_boxing(3).png");
const wavebox2_5=create_sprite("https://raw.githubusercontent.com/zhkandsrz/street-fighter/refs/heads/main/RYU2/RYU2_wave_boxing(4).png");
update_flip(wavebox2_2,[true,false]);
update_flip(wavebox2_3,[true,false]);
update_flip(wavebox2_4,[true,false]);
update_flip(wavebox2_5,[true,false]);
update_scale(wavebox2_2, [0, 0]); 
update_scale(wavebox2_3, [0, 0]); 
update_scale(wavebox2_4, [0, 0]); 
update_scale(wavebox2_5, [0, 0]); 
let wavebox2_2_is_playing = false;
let wavebox2_2_current_frame = 0;
let wavebox2_2_last_frame_time = 0;
const wavebox2_2_frames = [role2, wavebox2_2, wavebox2_3, wavebox2_4, wavebox2_5];
const wavebox2_2_frame_scales = [[1, 1], [1, 1], [1, 1], [1,1], [1, 1]];
const wavebox2_2_frame_durations = [80, 80, 100, 240, 80];

function play_punch_wavebox2_2() {
    wavebox2_2_is_playing = true;
    wavebox2_2_current_frame = 1; 
    wavebox2_2_last_frame_time = get_game_time();
  
    
    for (let i = 0; i < array_length(wavebox2_2_frames); i = i + 1) {
        update_scale(wavebox2_2_frames[i], [0, 0]);
    }
    
  
    update_scale(wavebox2_2_frames[wavebox2_2_current_frame], wavebox2_2_frame_scales[wavebox2_2_current_frame]);
}

function update_wavebox2_2() {
    if (!wavebox2_2_is_playing) {
        return undefined;
    }
  
    const current_time = get_game_time();
    const wavebox2_2_duration = wavebox2_2_frame_durations[wavebox2_2_current_frame];
        if (current_time - wavebox2_2_last_frame_time > wavebox2_2_duration) {
        
        update_scale(wavebox2_2_frames[wavebox2_2_current_frame], [0, 0]);
        
       
        wavebox2_2_current_frame = wavebox2_2_current_frame + 1;
        wavebox2_2_last_frame_time = current_time;
    
       
        if (wavebox2_2_current_frame >= array_length(wavebox2_2_frames)) {
            wavebox2_2_is_playing = false;
            wavebox2_2_current_frame = 0;
            
            update_scale(wavebox2_2_frames[0], wavebox2_2_frame_scales[0]);
            return undefined;
        }
    
       
        update_scale(wavebox2_2_frames[wavebox2_2_current_frame], wavebox2_2_frame_scales[wavebox2_2_current_frame]);
    }
    return undefined;
}



function add_vectors(to, from) {
    const new_x = to[0] + from[0];
    const new_y = to[1] + from[1];
    return [new_x, new_y];
}


let game_mode = "pvp"; // 默认双人对战
let ai_last_time = 0;
let ai_interval = 700; // 毫秒间隔

let ai_is_under_pressure = false; // AI被压制状态标志
function ai_control_role2() {
    // 如果游戏结束或AI自身正在行动，则直接返回
    now2 = get_game_time();
    const can_ai_act = !gameover && 
                       !wavebox2_2_is_playing && 
                       !jump_kick2_2_is_playing && 
                       !crouch_box2_is_playing && 
                       !beattack_2_is_playing && 
                       !box_2_is_playing && 
                       !leg_2_is_playing && 
                       !jump_2_is_playing && 
                       !crouch_2_is_playing && 
                       !walk_2_is_playing;

    // 当AI正在受击时，将“被压制”状态设为true
    //When the AI is being attacked, set the "suppressed" state to true
    if (beattack_2_is_playing) {
        ai_is_under_pressure = true;
    }

    if (!can_ai_act) {
        return undefined;
    }

    // AI思考与反应计时器
    // AI thinking and reaction timer
    if (now2 - ai_last_time < ai_interval) {
        return undefined;
    }
    ai_last_time = now2;
    ai_interval = 350 + math_random() * 350; // AI思考速度加快

  
    const p1_pos = query_position(role1);
    const p2_pos = query_position(role2);
    const distance = math_abs(p2_pos[0] - p1_pos[0]);

    const p1_is_jumping = jump_is_playing;
    const p1_is_jump_kicking= jump_kick_is_playing;
    const p1_is_punching = animation_is_playing;
    const p1_is_crouch_punching = crouch_boxing_is_playing;
    
    const can_ai_fire_wave = (now2 - wave2_last_time) >= wave_cooldown;

   

    // --- 1. 生存与防御 (最高优先级) ---
    
    // 如果AI刚被攻击过且玩家仍在近身，优先后撤拉开距离
    // If the AI has just been attacked and the player is still close, retreat first to increase the distance
    if (ai_is_under_pressure && distance < 120) {
        ai_is_under_pressure = false; // 重置状态
        if (math_random() < 0.75) { // 75%的高几率选择后撤
        // 75% high probability of choosing to retreat
            if (new_position_2[0]+0.5*movement_dist<=570) {
                new_position_2 = add_vectors(new_position_2, [1 * movement_dist, 0]);
                update_position(walk_2,new_position_2);
                play_punch_walk_2();
                new_position_2 = add_vectors(new_position_2, [1 * movement_dist, 0]);
            } else {
                new_position_2 = add_vectors(new_position_2, [0, 2 * movement_dist]);
                update_position(crouch_box2, new_position_2);
                update_position(crouch_box3, new_position_2);
                update_position(crouch_box4, new_position_2);
                play_punch_crouch_box2();
                new_position_2 = add_vectors(new_position_2, [0, -2 * movement_dist]);
            }
            return undefined;
        }
    }
    // 确保AI在非压制状态下重置标志
    if (!beattack_2_is_playing) {
        ai_is_under_pressure = false;
    }
    
    // 应对玩家的波动拳：随机跳过或蹲下
    // To deal with the player's Hadouken: randomly jump or crouch
    if (wave1_active && distance > 100) {
        if (math_random() < 0.65) { 
            new_position_2 = add_vectors(new_position_2, [0, -8 * movement_dist]);
            update_position(jump_kick2_2, new_position_2);
            update_position(jump_kick2_3, new_position_2);
            update_position(jump_kick2_4, new_position_2);
            update_position(jump_kick2_5, new_position_2);
            play_punch_jump_kick2_2();
            new_position_2 = add_vectors(new_position_2, [0, 8 * movement_dist]);
            
        } 
        else {
            new_position_2 = add_vectors(new_position_2, [0, 2 * movement_dist]);
            update_position(crouch_2, new_position_2);
            update_position(crouch_3, new_position_2);
            update_position(crouch_4, new_position_2);
            update_position(crouch_5, new_position_2);
            play_punch_crouch_2();
            new_position_2 = add_vectors(new_position_2, [0, -2 * movement_dist]);
            
        }
        return undefined;
    }

    // --- 2. 反应与反制 (高优先级，高成功率) ---

    // 对空：当玩家跳入时，有90%的极高几率用腿击落，让AI的对空更可靠
    // Anti-air: When the player jumps in, there is a 90% chance to shoot them down with their legs, making the AI's anti-air more reliable
    if (p1_is_jumping && distance < 120) {
        if (math_random() < 0.90) {
            play_punch_leg_2();
            return undefined;
        }
    }
    
    if (p1_is_jump_kicking && distance < 120) {
        if (math_random() < 0.90) {
            play_punch_box_2();
            return undefined;
        }
    }
    
    // 惩罚蹲拳：当玩家出蹲拳时，有75%几率用跳踢反击
    // Punish Crouching Punch: When the player performs a crouching punch, there is a 75% chance to counterattack with a jump kick
    if (p1_is_crouch_punching && distance < 120) {
        if (math_random() < 0.75) {
            new_position_2 = add_vectors(new_position_2, [0, -8 * movement_dist]);
            update_position(jump_kick2_2, new_position_2);
            update_position(jump_kick2_3, new_position_2);
            update_position(jump_kick2_4, new_position_2);
            update_position(jump_kick2_5, new_position_2);
            play_punch_jump_kick2_2();
            new_position_2 = add_vectors(new_position_2, [0, 8 * movement_dist]);
            return undefined;
        }
    }
    
    // 克制普通拳：当玩家出普通拳时，有65%几率用踢腿打断
    //Counter Normal Punch: When the player throws a normal punch, there is a 65% chance of interrupting with a kick.
    if (p1_is_punching && distance < 90) {
        if (math_random() < 0.65) {
            play_punch_leg_2();
            return undefined;
        }
    }

    // --- 3. 主动进攻战术 (若无反应动作，则执行此部分) ---
    //Active offensive tactics based on distance
    // 战术A：远距离 (distance >= 250)
    if (distance >= 250) {
        if (can_ai_fire_wave && math_random() < 0.6) {
            play_punch_wavebox2_2(); fire_wave2(); play_audio(wave_boxing);
        } else {
             new_position_2 = add_vectors(new_position_2, [-1 * movement_dist, 0]);
             update_position(walk_2,new_position_2);
             play_punch_walk_2();
             new_position_2 = add_vectors(new_position_2, [-1 * movement_dist, 0]);
             play_punch_walk_2();
        }
        return undefined;
    }
    
    // 战术B：中距离 (80 <= distance < 250)
    if (distance < 250 && distance >= 80) {
        const choice = math_random();
        if (can_ai_fire_wave && choice < 0.5) {
            play_punch_wavebox2_2(); fire_wave2(); play_audio(wave_boxing);
        } else if (choice < 0.75) { 
            play_punch_leg_2();
        } else { 
            new_position_2 = add_vectors(new_position_2, [0, -8 * movement_dist]);
            update_position(jump_kick2_2, new_position_2);
            update_position(jump_kick2_3, new_position_2);
            update_position(jump_kick2_4, new_position_2);
            update_position(jump_kick2_5, new_position_2);
            play_punch_jump_kick2_2();
            new_position_2 = add_vectors(new_position_2, [0, 8 * movement_dist]);
        }
        return undefined;
    }

    // 战术C：近距离 (distance < 80)
    if (distance < 80) {
        const choice = math_random();
        if (choice < 0.45) {
            new_position_2 = add_vectors(new_position_2, [0, 2 * movement_dist]);
            update_position(crouch_box2, new_position_2);
            update_position(crouch_box3, new_position_2);
            update_position(crouch_box4, new_position_2);
            play_punch_crouch_box2();
            new_position_2 = add_vectors(new_position_2, [0, -2 * movement_dist]);
        } else if (choice < 0.85) {
            play_punch_box_2();
        } else {
            if (new_position_2[0]+0.5*movement_dist<=570) {
                new_position_2 = add_vectors(new_position_2, [1 * movement_dist, 0]);
                update_position(walk_2,new_position_2);
                play_punch_walk_2();
                new_position_2 = add_vectors(new_position_2, [1 * movement_dist, 0]);
            } else {
                new_position_2 = add_vectors(new_position_2, [0, 2 * movement_dist]);
                update_position(crouch_box2, new_position_2);
                update_position(crouch_box3, new_position_2);
                update_position(crouch_box4, new_position_2);
                play_punch_crouch_box2();
                new_position_2 = add_vectors(new_position_2, [0, -2 * movement_dist]);
            }
        }
        return undefined;
    }
}

function player_control_role2() {
    new_position_2 = query_position(role2);
    
 
    const can_role2_act = !gameover && !wavebox2_2_is_playing && !jump_kick2_2_is_playing && !crouch_box2_is_playing && !beattack_2_is_playing && !box_2_is_playing && !leg_2_is_playing && !jump_2_is_playing && !crouch_2_is_playing && !walk_2_is_playing;

    if (can_role2_act) {
        if (input_key_down("ArrowUp") && input_key_down("u")) { 
            new_position_2 = add_vectors(new_position_2, [0, -8 * movement_dist]);
            update_position(jump_kick2_2, new_position_2);
            update_position(jump_kick2_3, new_position_2);
            update_position(jump_kick2_4, new_position_2);
            update_position(jump_kick2_5, new_position_2);
            play_punch_jump_kick2_2();
            new_position_2 = add_vectors(new_position_2, [0, 8 * movement_dist]);
        } else
        if (input_key_down("ArrowDown") && input_key_down("j")) {
                new_position_2 = add_vectors(new_position_2, [0, 2 * movement_dist]);
                update_position(crouch_box2, new_position_2);
                update_position(crouch_box3, new_position_2);
                update_position(crouch_box4, new_position_2);
                play_punch_crouch_box2();
                new_position_2 = add_vectors(new_position_2, [0, -2 * movement_dist]);
        } else
        if (input_key_down("ArrowUp")) { 
            new_position_2 = add_vectors(new_position_2, [0, -8 * movement_dist]);
            update_position(jump_2, new_position_2);
            play_punch_jump_2();
            new_position_2 = add_vectors(new_position_2, [0, 8 * movement_dist]);
        } else if (input_key_down("ArrowLeft") && query_position(role1)[0] < new_position_2[0] - 50) { 
            if (new_position_2[0]-0.5 * movement_dist>=30) {
                new_position_2 = add_vectors(new_position_2, [-1 * movement_dist, 0]);
                update_position(walk_2,new_position_2);
                play_punch_walk_2();
                new_position_2 = add_vectors(new_position_2, [-1 * movement_dist, 0]);
            } else {
                new_position_2=new_position_2;
                update_position(walk_2,new_position_2);
                play_punch_walk_2();
            }
        } else if (input_key_down("ArrowDown")) { 
            new_position_2 = add_vectors(new_position_2, [0, 2 * movement_dist]);
            update_position(crouch_2, new_position_2);
            update_position(crouch_3, new_position_2);
            update_position(crouch_4, new_position_2);
            update_position(crouch_5, new_position_2);
            play_punch_crouch_2();
            new_position_2 = add_vectors(new_position_2, [0, -2 * movement_dist]);
        } else if (input_key_down("ArrowRight")) { 
            if (new_position_2[0]+0.5*movement_dist<=570) {
                new_position_2 = add_vectors(new_position_2, [1 * movement_dist, 0]);
                update_position(walk_2,new_position_2);
                play_punch_walk_2();
                new_position_2 = add_vectors(new_position_2, [1 * movement_dist, 0]);
            } else {
                new_position_2=new_position_2;
                update_position(walk_2,new_position_2);
                play_punch_walk_2();
            }
        } else if (input_key_down("j")) { 
            play_punch_box_2();
        } else if (input_key_down("u")) { 
            play_punch_leg_2();
        } else if (input_key_down("i")) {
            now2 = get_game_time();
            if (now2 - wave2_last_time >= wave_cooldown) {
                play_audio(wave_boxing);
                play_punch_wavebox2_2();
                fire_wave2();
            }
        }
    }
}

let gameover=false;
update_loop(game_state => {
    
if (!game_started) {
    if (input_key_down("1")) {
        game_mode = "ai";
    }
    if (input_key_down("2")) {
        game_mode = "pvp";
    }

         update_scale(illustration_1, [1, 1]);  
         update_scale(illustration_2, [1, 1]);  
         if (input_key_down("b")) {
             game_started = true; 
             update_scale(loading_screen, [0, 0]);
             update_scale(illustration_1, [0, 0]);
             update_scale(illustration_2, [0, 0]);
             update_to_top(role1);
             update_to_top(role2);
          } else {
              return undefined; 
          }
    }

    if (game_mode==="ai") {ai_control_role2();}
    if (game_mode==="pvp") {player_control_role2();}
    
    new_position = query_position(role1);
    

    const can_role1_act = !gameover && !wavebox_2_is_playing && !jump_kick_is_playing && !crouch_boxing_is_playing && !beattack_is_playing && !animation_is_playing && !leg_is_playing && !jump_is_playing && !crouch_is_playing && !walk_is_playing;

    if (can_role1_act) {
        if (input_key_down("w") && input_key_down("2")) { 
            new_position = add_vectors(new_position, [0, -6.5 * movement_dist]);
            update_position(jump_kick2, new_position);
            update_position(jump_kick3, new_position);
            update_position(jump_kick4, new_position);
            update_position(jump_kick5, new_position);
            play_punch_jump_kick();
            new_position = add_vectors(new_position, [0, 6.5 * movement_dist]);
        } else
        if (input_key_down("1") && input_key_down("s")) {
                new_position = add_vectors(new_position, [0, 2 * movement_dist]);
                update_position(crouch_boxing2, new_position);
                update_position(crouch_boxing3, new_position);
                play_punch_crouch_boxing();
                new_position = add_vectors(new_position, [0, -2 * movement_dist]);
        } else
        if (input_key_down("w")) { 
            new_position = add_vectors(new_position, [0, -8 * movement_dist]);
            update_position(jump, new_position);
            play_punch_jump();
            new_position = add_vectors(new_position, [0, 8 * movement_dist]);
        } else if (input_key_down("a")) { 
            if (new_position[0]-0.5 * movement_dist>=30) {
            new_position = add_vectors(new_position, [-1 * movement_dist, 0]);
            update_position(walk,new_position);
            play_punch_walk();
            new_position = add_vectors(new_position, [-1 * movement_dist, 0]);
        } else {
            new_position=new_position;
            update_position(walk,new_position);
            play_punch_walk();
        }
        update_walk();
        } else if (input_key_down("s")) { 
            new_position = add_vectors(new_position, [0, 2 * movement_dist]);
            update_position(crouch2, new_position);
            update_position(crouch3, new_position);
            update_position(crouch4, new_position);
            update_position(crouch5, new_position);
            play_punch_crouch();
            new_position = add_vectors(new_position, [0, -2 * movement_dist]);
            
        } else if (input_key_down("d") && new_position[0] < query_position(role2)[0] - 50) { // 向右移动
             if (new_position[0]+0.5*movement_dist<=570) {
                 new_position = add_vectors(new_position, [1 * movement_dist, 0]);
                 update_position(walk,new_position);
                 play_punch_walk();
                 new_position = add_vectors(new_position, [1 * movement_dist, 0]);
            } else {
                 new_position=new_position;
                 update_position(walk,new_position);
                 play_punch_walk();
            }
        } /*
        else 
            if (input_key_down("1") && input_key_down("s")) {
                new_position = add_vectors(new_position, [0, 2 * movement_dist]);
                update_position(crouch_boxing2, new_position);
                update_position(crouch_boxing3, new_position);
                play_punch_crouch_boxing();
                new_position = add_vectors(new_position, [0, -2 * movement_dist]);
        }
        */
        else if (input_key_down("1")) { 
            play_punch_animation();
        } else if (input_key_down("2")) { 
            play_punch_leg();
        } else if (input_key_down("3")) {
            now1 = get_game_time();
            if (now1 - wave1_last_time >= wave_cooldown) {
                play_audio(wave_boxing);
                play_punch_wavebox_2();
                fire_wave1();
            }
        }
    }
    update_wavebox_2();
    update_jump_kick();
    update_crouch_boxing();
    update_animation();
    update_leg();
    update_walk();
    update_crouch();
    update_jump();
    update_beattack(); 
    update_fall2();
  
    update_position(role1, new_position);
    update_position(box2, new_position);
    update_position(box3, new_position);
    update_position(leg2, new_position);
    update_position(leg3, new_position);
    update_position(beattack2, new_position);
    update_position(beattack3, new_position);
    update_position(beattack4, new_position);
    update_position(fall2, new_position);
    update_position(fall3, new_position);
    update_position(fall4, new_position);
    update_position(fall5,new_position);
    update_position(wavebox_2, new_position);
    update_position(wavebox_3, new_position);
    update_position(wavebox_4, new_position);
    update_position(wavebox_5,new_position);
    
    
    
    
    
    
    
    update_wavebox2_2();
    update_jump_kick2_2();
    update_crouch_box2();
    update_box_2();
    update_leg_2();
    update_walk_2();
    update_crouch_2();
    update_jump_2();
    update_beattack_2(); 
    update_fall_2();
    
    update_position(role2, new_position_2);
    update_position(box_2, new_position_2);
    update_position(box_3, new_position_2);
    update_position(box_4, new_position_2);
    update_position(leg_2, new_position_2);
    update_position(leg_3, new_position_2);
    update_position(leg_4, new_position_2);
    update_position(beattack_2, new_position_2);
    update_position(beattack_3, new_position_2);
    update_position(beattack_4, new_position_2);
    update_position(fall_2, new_position_2);
    update_position(fall_3, new_position_2);
    update_position(fall_4, new_position_2);
    update_position(fall_5, new_position_2);
    update_position(wavebox2_2, new_position_2);
    update_position(wavebox2_3, new_position_2);
    update_position(wavebox2_4, new_position_2);
    update_position(wavebox2_5, new_position_2);
  
 
    // 地面拳(对空) vs 跳踢
        const p1_hits_with_punch_aa = animation_is_playing && animation_current_frame === 2 && gameobjects_overlap(box3, jump_kick2_4);
        const p2_hits_with_punch_aa = box_2_is_playing && box_2_current_frame === 2 && gameobjects_overlap(box_3, jump_kick4);
        
        // 跳踢 vs 普通踢
        const p1_hits_with_jump_kick = jump_kick_is_playing && jump_kick_current_frame === 3 && (gameobjects_overlap(jump_kick4, role2) || gameobjects_overlap(leg_4,jump_kick4)) && !crouch_2_is_playing && !crouch_box2_is_playing && !box_2_is_playing;
        const p2_hits_with_jump_kick = jump_kick2_2_is_playing && jump_kick2_2_current_frame === 3 && (gameobjects_overlap(jump_kick2_4, role1) || gameobjects_overlap(leg3,jump_kick2_4)) && !crouch_is_playing && !crouch_boxing_is_playing && !animation_is_playing;
        
        // 普通踢 vs 普通拳
        const p1_hits_with_kick = leg_is_playing && leg_current_frame === 2 && (gameobjects_overlap(leg3, role2) || gameobjects_overlap(leg3, leg_4)) && !crouch_2_is_playing;
        const p2_hits_with_kick = leg_2_is_playing && leg_2_current_frame === 3 && (gameobjects_overlap(leg_4, role1) || gameobjects_overlap(leg_4, leg3)) && !crouch_is_playing;
        
        // 蹲拳/普通拳 vs 蹲下/其他拳
        const p1_hits_with_punch = animation_is_playing && animation_current_frame === 2 && (gameobjects_overlap(box3, role2) || gameobjects_overlap(box3,box_3)) && !jump_2_is_playing;
        const p1_hits_with_crouch_punch = crouch_boxing_is_playing && crouch_boxing_current_frame === 2 && (gameobjects_overlap(crouch_boxing3, role2) || gameobjects_overlap(crouch_boxing3,crouch_box3) || gameobjects_overlap(crouch_boxing3,crouch_3) || gameobjects_overlap(crouch_boxing3,leg_4) ||gameobjects_overlap(crouch_boxing3,box_3)) && !jump_2_is_playing;
        const p2_hits_with_punch = box_2_is_playing && box_2_current_frame === 2 && (gameobjects_overlap(box_3, role1) || gameobjects_overlap(box3,box_3)) && !jump_is_playing;
        const p2_hits_with_crouch_punch = crouch_box2_is_playing && crouch_box2_current_frame === 2 && (gameobjects_overlap(crouch_box3, role1) || gameobjects_overlap(crouch_boxing3,crouch_box3) || gameobjects_overlap(crouch_box3,crouch3) || gameobjects_overlap(crouch_box3,leg3) || gameobjects_overlap(crouch_box3,box3)) && !jump_is_playing;
        
        // 阶段二: 结算 (Resolution) 
        let p1_gets_hit = false;
        let p2_gets_hit = false;

  
        if (p1_hits_with_punch_aa) { p2_gets_hit = true; } // 规则1: P1对空成功
        else if (p2_hits_with_punch_aa) { p1_gets_hit = true; } // 规则1: P2对空成功
        
        else if (p1_hits_with_jump_kick) { p2_gets_hit = true; } // 规则2: P1跳踢命中
        else if (p2_hits_with_jump_kick) { p1_gets_hit = true; } // 规则2: P2跳踢命中
        
        else if (p1_hits_with_kick && (p2_hits_with_punch || p2_hits_with_crouch_punch)) { p2_gets_hit = true; } // 规则3: P1踢>P2拳
        else if (p2_hits_with_kick && (p1_hits_with_punch || p1_hits_with_crouch_punch)) { p1_gets_hit = true; } // 规则3: P2踢>P1拳
        
        // 规则6: "相杀" (Trade)
        else if ((p1_hits_with_punch && p2_hits_with_punch) || (p1_hits_with_kick && p2_hits_with_kick) || (p1_hits_with_crouch_punch && p2_hits_with_crouch_punch) || (p1_hits_with_punch && p2_hits_with_crouch_punch) || (p1_hits_with_crouch_punch && p2_hits_with_punch)) {
            p1_gets_hit = true;
            p2_gets_hit = true;
        }
        // 单方面攻击
        else {
            if (p1_hits_with_kick || p1_hits_with_punch || p1_hits_with_crouch_punch) { p2_gets_hit = true; }
            if (p2_hits_with_kick || p2_hits_with_punch || p2_hits_with_crouch_punch) { p1_gets_hit = true; }
        }
        if (wave1_active) {
            wave1_position = add_vectors(wave1_position, [wave_speed, 0]);
            update_position(wave1_sprite, wave1_position);

            if (wave1_position[0] > 600 || gameobjects_overlap(wave1_sprite, role2) || gameobjects_overlap(wave1_sprite,box_3) || gameobjects_overlap(wave1_sprite,leg_4)) {
                wave1_active = false;
                update_scale(wave1_sprite, [0, 0]);

            if ((gameobjects_overlap(wave1_sprite, role2) || gameobjects_overlap(wave1_sprite,box_3) || gameobjects_overlap(wave1_sprite,leg_4)) && !beattack_2_is_playing) {
                play_punch_beattack_2();
                new_position_2 = add_vectors(new_position_2, [1.5 * movement_dist, 0]);
                HP2 =HP2- 5;
                update_text(HP2_see, HP2);
                play_audio(box);
               }
            }
        }

        if (wave2_active) {
            wave2_position = add_vectors(wave2_position, [-wave_speed, 0]);
            update_position(wave2_sprite, wave2_position);

            if (wave2_position[0] < 0 || gameobjects_overlap(wave2_sprite, role1) || gameobjects_overlap(wave2_sprite,box3) || gameobjects_overlap(wave2_sprite,leg3)) {
                wave2_active = false;
                update_scale(wave2_sprite, [0, 0]);

                if ((gameobjects_overlap(wave2_sprite, role1) || gameobjects_overlap(wave2_sprite,box3) || gameobjects_overlap(wave2_sprite,leg3)) && !beattack_is_playing) {
                    play_punch_beattack();
                    new_position = add_vectors(new_position, [-1.5 * movement_dist, 0]);
                    HP1 = HP1-5;
                    update_text(HP1_see, HP1);
                    play_audio(box);
                }
            }
        }

        if (wave1_active && wave2_active && gameobjects_overlap(wave1_sprite, wave2_sprite)) {
            wave1_active = false;
            wave2_active = false;
            update_scale(wave1_sprite, [0, 0]);
            update_scale(wave2_sprite, [0, 0]);
        }


   
        if (p1_gets_hit && !beattack_is_playing) {
            play_punch_beattack();
            if (new_position[0]-1.5*movement_dist>=50) {
                new_position = add_vectors(new_position, [-1.5 * movement_dist, 0]);
            }
            
            update_position(role1,new_position);
            HP1 =HP1- 7; 
            update_text(HP1_see, HP1);
            if (p1_hits_with_crouch_punch || p1_hits_with_punch || p1_hits_with_punch_aa) {
                play_audio(box);
            } else {
                play_audio(kick);
            }
            
        }
        if (p2_gets_hit && !beattack_2_is_playing) {
            play_punch_beattack_2();
            if (new_position_2[0]+1.5 * movement_dist<=550) {
                new_position_2 = add_vectors(new_position_2, [1.5 * movement_dist, 0]);
            }
            update_position(role2,new_position_2);
            HP2 =HP2- 7; 
            update_text(HP2_see, HP2);
            if (p2_hits_with_crouch_punch || p2_hits_with_punch || p2_hits_with_punch_aa) {
                play_audio(box);
            } else {
                play_audio(kick);
            }
        }
  
    if ((HP1<=0 || HP2<=0)) {
        gameover=true;
        update_scale(KO,[1,1]);
        update_position(KO,[280,150]);
        update_to_top(KO);
        if (HP1<=0) {
            update_scale(win_role2,[1,1]);
            update_position(win_role2,[280,200]);
            play_punch_fall2();
        }
        if (HP2<=0) {
            update_scale(win_role1,[1,1]);
            update_position(win_role1,[280,200]);
            play_punch_fall_2();
        } 
        play_audio(fall);
        stop_audio(sound);

    }
    update_fall2();
    update_fall_2();
    
});


build_game();
