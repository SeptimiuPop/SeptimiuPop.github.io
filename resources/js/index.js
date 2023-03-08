const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let gradient = ctx.createLinearGradient(0,0,canvas.width, canvas.height);
defineGradient();

class Symbol {
    constructor(x,y,fontSize,canvasHeight){
        this.characters = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        // this.characters = '01';
        this.x = x;
        this.y = y;
        this.text = '';
        this.fontSize = fontSize;
        this.canvasHeight =  canvasHeight;
    }
    
    draw(context){
        let index = Math.floor(Math.random() * this.characters.length);
        this.text = this.characters.charAt(index);
        context.fillText(this.text, this.x * this.fontSize, this.y * this.fontSize);
        if (this.y * this.fontSize > this.canvasHeight && Math.random() > 0.98){
            this.y = 0;
        }else {
            this.y ++;
        }
    }
}

class Effect {
    constructor(canvasWidth, canvasHeight){
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.fontSize = 25;
        this.columns = this.canvasWidth/this.fontSize;
        this.symbols = [];
        this.#initalize();
    }

    #initalize(){
        for (let i = 0; i < this.columns; i++){
            this.symbols[i] = new Symbol(i, this.canvasHeight, this.fontSize, this.canvasHeight);
        }
    }

    resize(width, height){
        this.canvasWidth = width;
        this.canvasHeight = height;
        this.columns = this.canvasWidth/this.fontSize;
        this.symbols = [];
        this.#initalize(); 
    }
}

const effect = new Effect(canvas.width, canvas.height);
let lastTime = 0;
const fps = 15;
const nextFrame = 1000/fps;
let timer = 0;

function animate(timeStamp){
    let deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;

    if(timer > nextFrame){
        ctx.fillStyle = 'rgba(0,0,0,0.05)';
        ctx.textAlign = 'center';
        ctx.fillRect(0,0,canvas.width,canvas.height);
        ctx.fillStyle = gradient;
        ctx.font = effect.fontSize + 'px monospace';
        effect.symbols.forEach(symbol => symbol.draw(ctx));
        timer = 0;
    } else {
        timer += deltaTime;
    }

    requestAnimationFrame(animate);
}

function defineGradient(){
    gradient = ctx.createLinearGradient(canvas.width/2,canvas.height,canvas.width/2, 0);
    gradient.addColorStop(1,'black');
    gradient.addColorStop(0,'grey');
}

animate(0);

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    effect.resize(canvas.width, canvas.height);
    defineGradient();
})