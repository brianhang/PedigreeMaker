// Values for sex.
const MALE = 0;
const FEMALE = 1;
const OTHER = 2;

// Values for the state of the individual.
const UNAFFECTED = 0;
const AFFECTED = 1;
const CARRIER = 2;

// The size of an individual in the chart when drawn.
const NODE_SIZE = 50;

const CONNECTOR_WIDTH = 80;
const CONNECTOR_HEIGHT = 6

const STATE_COLORS = []
STATE_COLORS[UNAFFECTED] = 'white';
STATE_COLORS[AFFECTED] = 'black';
STATE_COLORS[CARRIER] =  '#d3d3d3';

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
    }

    /**
     * Adds an outsider and forms a connections between this node
     * and the outsider node.
     *
     * @param state The state of the gene for the individual.
     */
    addOutsider(state) {
        // Use the opposite sex for the outsider.
        var newSex;

        if (this.sex == MALE) {
            newSex = FEMALE;
        } else {
            newSex = MALE;
        }

        // Create the outsider.
        var outsider = new Node(this.x + OUTSIDER_GAP, this.y, newSex, state);

        // Create a connection and add the outsider to it.
        var mother;
        var father;

        if (this.sex == MALE) {
            father = this;
            mother = outsider;
        } else {
            father = outsider;
            mother = this;
        }

        var connector = new Connector(mother, father);
        connector.draw();

        // Store the connector in this node.
        this.connector = connector;

        return outsider
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

        // Have the fill color be dependent on the state of this individual.
        ctx.strokeStyle = 'black';
        ctx.fillStyle = STATE_COLORS[this.state];

        ctx.clearRect(this.x - 1, this.y - 1, NODE_SIZE + 2, NODE_SIZE + 2);

        // Draw a square if male, otherwise draw a circle.
        if (this.sex == MALE) {
            ctx.fillRect(this.x, this.y, NODE_SIZE, NODE_SIZE);
            ctx.strokeRect(this.x, this.y, NODE_SIZE, NODE_SIZE);
        } else {
            // Get the radius of the circle.
            const radius = NODE_SIZE / 2;

            ctx.beginPath();
                ctx.arc(this.x + radius, this.y + radius, NODE_SIZE / 2, 0, Math.PI * 2, false);
                ctx.fill();
            ctx.stroke();
        }
    }
}