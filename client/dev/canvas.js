// Canvas object used for drawing
class Canvas {
    constructor() {
        // Set up canvas
        this.canvas = $('#asteroids')[0];
        this.context = this.canvas.getContext('2d');

        // Grid settings
        this.minor = 10;
        this.major = 50;
        this.stroke = 'red'; //red is sweet!
        this.fill = 'yellow';

        this.drawGrid(
            this.context,
            this.minor,
            this.major,
            this.stroke,
            this.fill);

        // this.drawShape(this.context);
        // this._refreshInterval = setInterval(_ => {
        //     this.drawPacMan(this.context, 200, 200, Math.random());
        // }, 1000);

        this.drawPacMan(this.context, 200, 200, Math.random());
    }

    // Function that draws grid based on optional parameters
    drawGrid(ctx, minor, major, stroke, fill) {
        // Set defaults if parameter not given
        let _minor = minor || 10;
        let _major = major || _minor * 5;
        let _stroke = stroke || '#00FF00';
        let _fill = fill || '#009900';
        ctx.save();

        ctx.strokeStyle = _stroke;
        ctx.fillStyle = _fill;

        // set standard variables to canvas dimensions
        let _width = this.canvas.width,
            _height = this.canvas.height;

        for (let i = 0; i < _width; i += _minor) {
            ctx.beginPath();
            ctx.moveTo(i, 0);
            ctx.lineTo(i, _height);
            ctx.lineWidth = (i % _major == 0) ? .5 : .25;
            ctx.stroke();
            if (i % _major == 0) {
                ctx.fillText(i, i, 10);
            }
        }

        for (let i = 0; i < _height; i += _minor) {
            ctx.beginPath();
            ctx.moveTo(0, i);
            ctx.lineTo(_width, i);
            ctx.lineWidth = (i % _major == 0) ? .5 : .25;
            ctx.stroke();
            if (i % _major == 0) {
                ctx.fillText(i, 0, i + 10);
            }
        }

        ctx.restore();
    }

    // Exercise 3
    drawPacMan(ctx, x, y, radius) {
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

    // Exercise 2
    drawShape(ctx) {
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
}