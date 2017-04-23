const CHILDREN_SPACE = NODE_SIZE * 2.75;
const GAP_SIZE = NODE_SIZE * 2;
const OUTSIDER_GAP = NODE_SIZE * 1.25;

class Connector {
    /**
     * Constructor for the Connector class.
     */
    constructor(mother, father) {
        this.mother = mother;
        this.father = father;
        this.children = [];
    }

    /**
     * Setter for the mother in the connection.
     */
    setMother(mother) {
        this.mother = mother;
    }

    /**
     * Setter for the father in the connection.
     */
    setFather(father) {
        this.father = father;
    }

    /**
     * Getter for the mother in the connection.
     */
    getMother() {
        return mother;
    }

    /**
     * Getter for the mother in the connection.
     */
    getFather() {
        return father;
    }

    /**
     * Adds a vertex as a child of the mother and father for this connection.
     */
    addChild(child) {
        this.children.push(child);
        this.centerChildren();
    }

    /**
     * Moves the children so they are centered horizontally below the mother
     * and father.
     */
    centerChildren() {
        // No single parent.
        if (!this.mother || !this.father) {
            return;
        }

        // Get the x-coordinate of the midpoint.
        const midX = (this.mother.x + this.father.x) / 2;
        const childrenWidth = ((this.children.length - 1) * CHILDREN_SPACE) + NODE_SIZE;

        for (var i = 0; i < this.children.length; i++) {
            var offset = NODE_SIZE / 2;

            if (this.children.length > 1) {
                offset = childrenWidth * (i / (this.children.length - 1));
            }

            // TODO: Simplify this?
            this.children[i].x = (midX) - (childrenWidth/2) + offset;
            this.children[i].y = this.mother.y + CHILDREN_SPACE;
        }
    }

    /**
     * Draws the connector on the screen.
     */
    draw(isRoot) {
        // Get the canvas that we will draw on.
        var canvas = $('#pedigree')[0];

        if (!canvas.getContext) {
            return;
        }

        // Get the 2D context to draw 2D stuff on the canvas.
        var ctx = canvas.getContext('2d');

        if (!ctx) {
            return;
        }

        if (isRoot) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }

        ctx.fillStyle = '#3D3D3D';

        this.mother.draw();
        this.father.draw();

        ctx.beginPath();
            ctx.moveTo(this.mother.x, this.mother.y + NODE_SIZE/2);
            ctx.lineTo(this.father.x + NODE_SIZE, this.father.y + NODE_SIZE/2);
        ctx.stroke();

        // Stop drawing if there are no children.
        if (this.children.length == 0) {
            return;
        }
        
        const midX = (NODE_SIZE + this.mother.x + this.father.x) / 2;

        for (var i = 0; i < this.children.length; i++) {
            // Draw children connectors as well.
            if (this.children[i].connector) {
                this.children[i].connector.draw();
            } else {
                this.children[i].draw();
            }

            const childX = this.children[i].x;
            const childY = this.children[i].y;

            // Draw line to horizontal segment.
            ctx.beginPath();
                ctx.moveTo(childX + NODE_SIZE/2, childY);
                ctx.lineTo(childX + NODE_SIZE/2, this.mother.y + GAP_SIZE);
            ctx.stroke();
        }

        // Draw line down to children segment.
        ctx.beginPath();
            ctx.moveTo(midX, this.mother.y + NODE_SIZE/2);
            ctx.lineTo(midX, this.mother.y + GAP_SIZE);
        ctx.stroke();

        // Draw horizontal segment above children.
        if (this.children.length > 1) {
            const childrenWidth = ((this.children.length - 1) * CHILDREN_SPACE) + NODE_SIZE;

            ctx.beginPath();
                ctx.moveTo(midX - childrenWidth/2, this.mother.y + GAP_SIZE);
                ctx.lineTo(midX + childrenWidth/2, this.mother.y + GAP_SIZE);
            ctx.stroke();
        }
    }
}