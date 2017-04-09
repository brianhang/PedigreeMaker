// Values for sex.
const MALE = 0;
const FEMALE = 1;
const OTHER = 2;

// Values for the state of the individual.
const UNAFFECTED = 0;
const AFFECTED = 1;
const CARRIER = 2;

// The size of an individual in the chart when drawn.
const SIZE = 50;

const CONNECTOR_WIDTH = 80;
const CONNECTOR_HEIGHT = 6

// The Node class is an individual in the pedigree.
class Node {
    /**
     * Constructor for the Node that sets the position of the Pedigree to
     * to (x, y) and has a sex of the given type.
     *
     * @param x The x-coordinate of the Node.
     * @param y The y-coordinate of the Node.
     * @param sex The sex of the individual.
     * @param state The state of the gene for the individual.
     */
    constructor(x, y, sex, state) {
        this.x = x;
        this.y = y;
        this.sex = sex;
        this.state = state;

        this.draw();
    }

    /**
     * Draws the individual on the screen.
     */
    draw() {
        // Get the canvas that we will draw on.
        var canvas = $('#pedigree')[0];

        if (!canvas.getContext) {
            return;
        }

        // Get the 2D context to draw 2D stuff on the canvas.
        var ctx = canvas.getContext('2d');
        if(this.sex == MALE) {
            ctx.fillStyle = 'white';
            ctx.fillRect(this.x, this.y, SIZE, SIZE);
            ctx.strokeStyle = 'white';
	    ctx.strokeRect(this.x, this.y, SIZE, SIZE);
            ctx.strokeStyle = 'black';
            ctx.fillStyle = 'black';
        } else {
            // Get the radius of the circle.
            const radius = SIZE / 2;
            ctx.beginPath();
            ctx.arc(this.x + radius, this.y + radius, SIZE / 2, 0, Math.PI * 2, false);
            ctx.fillStyle = 'white';
            ctx.fill();
            ctx.strokeStyle = 'white';
            ctx.stroke();
            ctx.strokeStyle = 'black';
            ctx.fillStyle = 'black';
        }

        // Determine which shape to draw with.
        switch (this.sex) {
            case MALE:
                // Draw a square for male.
		if (this.state == AFFECTED) {
	            ctx.strokeRect(this.x, this.y, SIZE, SIZE);
                    ctx.fillRect(this.x, this.y, SIZE, SIZE);
		} else if (this.state == UNAFFECTED) {
                    ctx.strokeStyle = 'black';
                    ctx.strokeRect(this.x, this.y, SIZE, SIZE);
		} else {
		    ctx.fillStyle = '#d3d3d3';
                    ctx.fillRect(this.x, this.y, SIZE, SIZE);
		    ctx.strokeStyle = 'black';
	            ctx.strokeRect(this.x, this.y, SIZE, SIZE);
                }

                break;
            case FEMALE:
                // Get the radius of the circle.
                const radius = SIZE / 2;
                // Draw a circle for female. Note the "top left" is at (x, y).
                ctx.beginPath();
                ctx.arc(this.x + radius, this.y + radius, SIZE / 2, 0, Math.PI * 2, false);
				
                if (this.state == AFFECTED) {
                    ctx.fill();
		} else if (this.state == CARRIER) {
                    ctx.fillStyle="#d3d3d3";
                    ctx.fill();
                    //ctx.strokeStyle="black";        
                }
				 
                ctx.strokeStyle="black";
                ctx.stroke();

                break;
            default:
                break;
        }
    }
}