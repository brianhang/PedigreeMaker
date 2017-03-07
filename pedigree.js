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

class Connector {
     constructor(x, y, orientation) {
          this.x = x;
          this.y = y;
          this.orientation = orientation;

          this.draw();
     }
    /**
     * Draws the connector on the screen.
     */
    draw() {
        // Get the canvas that we will draw on.
        var canvas = $('#pedigree')[0];

        if (!canvas.getContext) {
            return;
        }

        // Get the 2D context to draw 2D stuff on the canvas.
        var ctx = canvas.getContext('2d');
        ctx.fillStyle = '#3D3D3D';
        ctx.fillRect(this.x-20, this.y+22, 80, 6);
    }
}

function clearcanvas1()
{
    var alpha = 0;
    var delta = 0.1; 
    var canvas = $('#pedigree')[0];
    if (!canvas.getContext) {
        return;
    }

    // Get the 2D context to draw 2D stuff on the canvas.
    var ctx = canvas.getContext('2d');

    ctx.fillStyle = 'white';
    ctx.globalAlpha = 0.2;
}



/* Checks if we click within one of our nodes, and toggles the color.
 * @param nodes Array of nodes to check
 * @param x Our x coordinate of our click
 * @param y Our y coordinate of our click
 */
function checkClick(nodes, x, y) {
  for(var i = 0; i < nodes.length; i++) {
    if(inRange((nodes[i].x), (nodes[i].y), x, y)) {
           nodes[i].state = (nodes[i].state + 1) % 3;
           nodes[i].draw();
           return true;
    }
  }
  return false;
}

/* Checks if we click within a range x1 y1
 * @param x1 Left coordinate of our box
 * @param y1 Top coordinate of our box
 * @param x2 Our x coordinate of our click
 * @param y2 Our y coordinate of our click
 */
function inRange(x1, y1, x2, y2) {
    if (x2 >= x1 && x2 <= (x1 + SIZE)) {
        if (y2 >= y1 && y2 <= (y2 + SIZE)) {
            return true;
        }
    }
    return false;
}

// Create an individual when the page loads for testing.
$(document).ready(function() {
    var rect = $('#pedigree')[0].getBoundingClientRect();

    var c1 = new Connector(350, 50, true);

    var p1 = new Node(290, 50, MALE, 0);
    var p2 = new Node(410, 50, FEMALE, 0);
 

    var nodes = [p1, p2];

    $('#pedigree').click(function (event) { 
        if (checkClick(nodes, event.pageX-rect.left, event.pageY-rect.top)) {
            event.preventDefault();
            return false;
        }
    });
    console.log(p1, p2);
});
