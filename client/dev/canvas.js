// Canvas object used for drawing
class Canvas {
    constructor () {
        // Set up canvas
        this.context = $('#asteroids')[0].getContext('2d');

        // drawGrid (ctx, minor, major, strokeColor, fillColor)
        this.drawGrid(this.context, 10, 50, 'red', 'yellow');


        // Ship drawing functions
        // this.drawMultipleShips(this.context);
        // this.drawSingleShip(this.context);

        // Draw Asteroid
        this.initAsteroid(this.context);
    }

    // Function that draws grid based on optional parameters
    drawGrid (ctx, minor, major, stroke, fill) {
        // Set defaults if parameter not given
        minor = minor || 10;
        major = major || _minor * 5;
        stroke = stroke || '#00FF00';
        fill = fill || '#009900';
        ctx.save();

        ctx.strokeStyle = stroke;
        ctx.fillStyle = fill;

        // Set standard variables to canvas dimensions
        let _width = ctx.canvas.width,
            _height = ctx.canvas.height;

        for (let i = 0; i < _width; i += minor) {
            ctx.beginPath();
            ctx.moveTo(i, 0);
            ctx.lineTo(i, _height);
            ctx.lineWidth = (i % major == 0) ? .5 : .25;
            ctx.stroke();
            if (i % major == 0) {
                ctx.fillText(i, i, 10);
            }
        }

        for (let i = 0; i < _height; i += minor) {
            ctx.beginPath();
            ctx.moveTo(0, i);
            ctx.lineTo(_width, i);
            ctx.lineWidth = (i % major == 0) ? .5 : .25;
            ctx.stroke();
            if (i % major == 0) {
                ctx.fillText(i, 0, i + 10);
            }
        }

        ctx.restore();
    }

    // Chapter 5
    initAsteroid (ctx) {
    	let segments = 15, noise = 0;
    	let shape = [];

    	// Populate shape array for asteroid shapes
    	for (let i = 0; i < segments; i++) {
    		shape.push(2 * (Math.random() - .5));
    	}
    	// console.log(shape);
    	
    	// Call drawAsteroid()
    	for (let y = .1; y < 1; y += .2) {
    		for (let x = .1; x < 1; x += .2) {
    			ctx.save();
    			ctx.translate(ctx.canvas.width * x, ctx.canvas.height * y);
              	this.drawAsteroid(ctx, ctx.canvas.width / 16, shape, {
              		noise: noise,
              		guide:true
              	});
              	ctx.restore();
              	// Add more noise every asteroid
              	noise += .025;
    		}
    	}
    }
    drawAsteroid (ctx, radius, shape, options) {
        options = options || {};
        ctx.strokeStyle = options.stroke || 'white';
        ctx.fillStyle = options.fill || 'black';
        ctx.save();

        ctx.beginPath();
        // Drawing occurs here
        for (let i = 0; i < shape.length; i++) {
        	ctx.rotate(2 * Math.PI / shape.length);
        	ctx.lineTo(radius + radius * options.noise * shape[i], 0);
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        if (options.guide) {
        	ctx.lineWidth = .5;
        	ctx.beginPath();
        	ctx.arc(0, 0, radius, 0, 2 * Math.PI);
        	ctx.stroke();
        	ctx.lineWidth = .2;
        	ctx.arc(0, 0, radius + radius * options.noise, 0, 2 * Math.PI);
        	ctx.stroke();
        	ctx.beginPath();
        	ctx.arc(0, 0, radius - radius * options.noise, 0, 2 * Math.PI);
        	ctx.stroke();
        }
        ctx.restore();
    }

    // Chapter 4
    drawSingleShip (ctx) {
        this.context.translate(200, 200);
        this.drawShip(this.context, 150, {
            curve1: Math.random(),
            curve2: Math.random(),
            guide: true
        });
    }
    drawMultipleShips (ctx) {
        let c1 = 0,
            c2 = 0;
        for (c1 = .1; c1 < 1; c1 += .2) {
            for (c2 = .1; c2 < 1; c2 += .2) {
                ctx.save();
                ctx.translate(ctx.canvas.width * c1, ctx.canvas.height * c2);
                ctx.rotate(-Math.PI / 2);
                this.drawShip(ctx, ctx.canvas.width / 12, {
                    curve1: c1,
                    curve2: c2,
                    guide: true
                });
                ctx.restore();
            }
        }
    }
    translate (ctx) {
        let x, y, angle = 0;
        let w = ctx.canvas.width,
            h = ctx.canvas.height;
        for (y = h / 20; y < h; y += h / 10) {
            for (x = w / 20; x < w; x += w / 10) {
                ctx.save();
                ctx.translate(x, y);
                ctx.rotate(angle);
                this.drawShip(ctx, w / 30, {
                    guide: true,
                    lineWidth: 1
                });
                ctx.restore();
                angle = (angle += .0075 * Math.PI);
            }
        }
    }
    rotation (ctx) {
        let x = ctx.canvas.width * .9;
        let y = 0;
        let radius = ctx.canvas.width * .1;

        for (let i = 0; i <= .5 * Math.PI; i += .05 * Math.PI) {
            ctx.save();
            ctx.rotate(i);
            this.drawShip(ctx, x, y, radius, {
                guide: true
            });
            ctx.moveTo(0, 0);
            ctx.lineTo(x, 0);
            ctx.stroke();
            ctx.restore();
        }
    }

    drawShip (ctx, radius, options) {
        options = options || {};
        let angle = (options.angle || .5 * Math.PI) / 2;
        let curve1 = options.curve1 || .25;
        let curve2 = options.curve2 || .75;
        ctx.save();

        if (options.guide) {
            ctx.strokeStyle = 'white';
            ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
            ctx.lineWidth = .5;
            ctx.beginPath();
            ctx.arc(0, 0, radius, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.fill();
        }

        ctx.lineWidth = options.lineWidth || 2;
        ctx.strokeStyle = options.stroke || 'white';
        ctx.fillStyle = options.fill || 'black';


        ctx.beginPath();
        ctx.moveTo(radius, 0);
        ctx.quadraticCurveTo(
            Math.cos(angle) * radius * curve2,
            Math.sin(angle) * radius * curve2,
            Math.cos(Math.PI - angle) * radius,
            Math.sin(Math.PI - angle) * radius
        );

        ctx.quadraticCurveTo(-radius * curve1, 0,
            Math.cos(Math.PI + angle) * radius,
            Math.sin(Math.PI + angle) * radius
        );

        ctx.quadraticCurveTo(
            Math.cos(-angle) * radius * curve2,
            Math.sin(-angle) * radius * curve2,
            radius, 0
        );
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        if (options.guide) {
            ctx.strokeStyle = 'white';
            ctx.fillStyle = 'white';
            ctx.lineWidth = .5;
            ctx.beginPath();
            ctx.moveTo(
                Math.cos(-angle) * radius,
                Math.sin(-angle) * radius);
            ctx.lineTo(0, 0);
            ctx.lineTo(
                Math.cos(angle) * radius,
                Math.sin(angle) * radius);
            ctx.moveTo(-radius, 0);
            ctx.lineTo(0, 0);
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(
                Math.cos(angle) * radius * curve2,
                Math.sin(angle) * radius * curve2,
                radius / 40, 0, 2 * Math.PI);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(
                Math.cos(-angle) * radius * curve2,
                Math.sin(-angle) * radius * curve2,
                radius / 40, 0, 2 * Math.PI);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(radius * curve1 - radius, 0, radius / 50, 0, 2 * Math.PI);
            ctx.fill();
        }
        ctx.restore();
    }

    // Chapter 3
    drawPacMan (ctx, x, y, radius) {
        ctx.save();
        console.log(radius);
        ctx.beginPath();
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 5;
        ctx.arc(x, y, 150, radius * Math.PI, 1.8 * Math.PI);
        ctx.lineTo(x, y);
        ctx.fillStyle = 'yellow';
        ctx.fill();
        ctx.closePath();
        ctx.stroke();
        ctx.restore();
    }

    // Chapter 2
    drawShape (ctx) {
        ctx.beginPath();
        ctx.strokeStyle = '#FFFFFF';
        ctx.fillStyle = '#00FF00';
        ctx.lineWidth = 2;
        ctx.moveTo(50, 50);
        ctx.bezierCurveTo(0, 0, 80, 250, 150, 250);
        ctx.bezierCurveTo(250, 250, 250, 250, 250, 170);
        ctx.bezierCurveTo(250, 50, 400, 350, 320, 280);
        ctx.closePath();
        ctx.stroke();
        ctx.fillText("(50, 50)", 30, 40);
        ctx.fillText("(150, 250)", 130, 260);
        ctx.fillText("(250, 170)", 255, 175);
        // ctx.fill();

        ctx.beginPath();
        ctx.moveTo(50, 250);
        ctx.quadraticCurveTo(25, 300, 50, 350);
        ctx.quadraticCurveTo(100, 375, 150, 350);
        ctx.closePath();
        ctx.moveTo(230, 360);
        ctx.quadraticCurveTo(255, 340, 270, 360);
        ctx.quadraticCurveTo(255, 340, 270, 310);
        ctx.closePath();
        ctx.moveTo(250, 50);
        ctx.quadraticCurveTo(310, 60, 370, 50);
        ctx.quadraticCurveTo(400, 75, 370, 100);
        ctx.closePath();
        ctx.strokeStyle = '#FFFF00';
        ctx.fillStyle = '#000000';
        ctx.fill();
        ctx.stroke();
    }

    // Pointless function
    stopClickingMe() {
    	alert("Play the game you nerd!");
    }
}