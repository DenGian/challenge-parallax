const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d')
const CANVAS_WIDTH = canvas.width = 800; //super global
const CANVAS_HEIGHT = canvas.height = 700; //super global
let gameSpeed =3;

const backgroundLayer1 = new Image();
backgroundLayer1.src = 'images/layer-1.png';
const backgroundLayer2 = new Image();
backgroundLayer1.src = 'images/layer-2.png';
const backgroundLayer3 = new Image();
backgroundLayer1.src = 'images/layer-3.png';
const backgroundLayer4 = new Image();
backgroundLayer1.src = 'images/layer-4.png';
const backgroundLayer5 = new Image();
backgroundLayer1.src = 'images/layer-5.png';

let x = 0;
let x2 = 2400;

function animate(){
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    ctx.drawImage(backgroundLayer1, x, 0)
    x-= gameSpeed;
    requestAnimationFrame(animate)
};
animate()