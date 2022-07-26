const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d') // 'ctx' -> shortcut for 'context'
const CANVAS_WIDTH = canvas.width = 800; //super global - if width and height are not set here, it will default to 300*150 px
const CANVAS_HEIGHT = canvas.height = 700; //super global
let gameSpeed = 5; // let so it can be reassigned

// creating image elements
const backgroundLayer1 = new Image();
backgroundLayer1.src = 'images/layer-1.png';
const backgroundLayer2 = new Image();
backgroundLayer2.src = 'images/layer-2.png';
const backgroundLayer3 = new Image();
backgroundLayer3.src = 'images/layer-3.png';
const backgroundLayer4 = new Image();
backgroundLayer4.src = 'images/layer-4.png';
const backgroundLayer5 = new Image();
backgroundLayer5.src = 'images/layer-5.png';

// make sure all images and html elements are loaded on page before game starts
window.addEventListener('load', function () {
    // slider
    const slider = document.getElementById('slider');
    slider.value = gameSpeed; // linking slider value to the game speed
    const showGameSpeed = document.getElementById('showGameSpeed');
    slider.addEventListener('change', function (e) { // listen for change event and callback function
        console.log(e.target.value)
        gameSpeed = e.target.value;
        showGameSpeed.innerHTML = gameSpeed; // taking span from index and showing current game speed on page (live updated)
    });

// creating js class - used to create many similar objects, this is the blueprint ->shared properties and values, but some properties will have different values
    class Layer {
        // constructor only runs once per object
        constructor(image, speedModifier) { // constructor expects 2 arguments, image assigned to the layer and speedModifier so each layer can move at different speed
            this.x = 0; // each object has horizontal x-coordinate that starts at position 0
            this.y = 0;
            this.width = 2400; // all layers will have same width of 2400 pixels
            this.height = 700; // all layers will have same height of 700 pixels
            this.x2 = this.width; // x2 is where the second image starts, second image needs to start where first image ends(at the horizontal position of 2400 pixels)
            this.image = image; // declaration to tell the constructor create a property called image on the object that is created right now and set it as the image passed as the argument on line 26
            this.speedModifier = speedModifier; // passed as argument on line 26
            this.speed = gameSpeed * this.speedModifier; // how fast the image layer is moving calculated by global variable gameSpeed - '* this.speedModifier' allows to pass different speed modifier values for each layer
        }

        // custom method update - move layers horizontally by changing this.x and this.x2 properties from lines 27 and 31 and reset when layers move offscreen
        update() {
            this.speed = gameSpeed * this.speedModifier; // recalculate this.speed to make it dynamic
            if (this.x <= -this.width) {
                this.x = this.width + this.x2 - this.speed; // offsetting to make sure there is no gap in between images, needs to be offset by x2
            }
            if (this.x2 <= -this.width) {
                this.x2 = this.width + this.x - this.speed; // offsetting to make sure there is no gap in between images, needs to be offset by x
            }
            // if the x's are not resetting, the x property needs to decrease by the amount of this.speed from line 34
            this.x = Math.floor(this.x - this.speed); // to make backgroundLayer move to the left and wrapping in Math.floor to make sure there are no decimal points
            this.x2 = Math.floor(this.x2 - this.speed);
        }

        // custom method draw - take information on this layer object and to draw it on canvas everytime update method runs to change horizontal x position, draw will run again to redraw the image after the new position
        draw() {
            // built in canvas method
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height); // first image that's drawn
            ctx.drawImage(this.image, this.x2, this.y, this.width, this.height); // second image that's drawn
        }
    }

// constant variables for layering
// 'new' keyword will look for a class with that name in the code and will trigger its constructor - expects 2 arguments from the constructor -> 'image' and 'speedModifier'
    const layer1 = new Layer(backgroundLayer1, 0.1);
    const layer2 = new Layer(backgroundLayer2, 0.25);
    const layer3 = new Layer(backgroundLayer3, 0.5);
    const layer4 = new Layer(backgroundLayer4, 0.75);
    const layer5 = new Layer(backgroundLayer5, 1);

// to avoid code repetition
    const gameObjects = [layer1, layer2, layer3, layer4, layer5]; // all layers inside a single array

// creating animation loop
    function animate() {
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT); // built-in function (expects 4 arguments) for what parts of canvas to delete -> otherwise the animation gets 'smudged'
        gameObjects.forEach(object => { // run through all elements in the array and apply the callback function given to each of the elements, referred to as objects
            object.update(); // for each call the update method
            object.draw(); // for each call the draw method
        })
        requestAnimationFrame(animate); // build in function and passing the parent function
    }

    animate();
});