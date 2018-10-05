// Canvas object used for drawing
class Canvas {
    constructor() {
        // Set up canvas
        this.canvas = $('#asteroids')[0];

        this.drawSquare();
        this.drawFigure();
    }

    // Draw a square with text
    drawSquare() {
        // Set context of canvas
        let c = this.canvas.getContext('2d');

        // Shape drawing
        c.strokeStyle = 'lightgrey';
        c.fillStyle = 'dimgrey';
        c.lineWidth = 5;
        c.rect(75, 50, this.canvas.width - 150, this.canvas.height - 100);

        // Completes drawing
        c.stroke();
        c.fill();

        // Text rendering
        c.font = '34px Arial';
        c.strokeStyle = '#FF2222';
        c.fillStyle = '#FFAAAA';
        c.lineWidth = 0.75;
        c.textAlign = 'center';

        let msg = '2D Drawing';

        c.fillText(msg, this.canvas.width / 2, 100);
        c.strokeText(msg, this.canvas.width / 2, 100);
    }

    // Draw a stick figure
    drawFigure() {
        let c = this.canvas.getContext('2d');
        c.strokeStyle = '#FFFFFF';
        c.lineWidth = 2;

        // Begin path
        c.beginPath();
        c.arc(200, 140, 20, 0, Math.PI * 2);
        c.moveTo(200, 160);
        c.lineTo(200, 220);
        c.moveTo(180, 300);
        c.lineTo(185, 260);
        c.lineTo(200, 220);
        c.lineTo(215, 260);
        c.lineTo(220, 300);
        c.moveTo(240, 130);
        c.lineTo(225, 170);
        c.lineTo(200, 170);
        c.lineTo(175, 180);
        c.lineTo(170, 220);
        c.stroke();

        c.font = '24px Arial';
        c.strokeStyle = '#FF2222';
        c.fillStyle = '#FFAAAA';
        c.lineWidth = 0.75;
        c.textAlign = 'center';
        let msg = 'its quite easy';

        c.fillText(msg, this.canvas.width / 2, 330);
        c.strokeText(msg, this.canvas.width / 2, 330);
    }
}