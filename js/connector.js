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
        ctx.fillRect(this.x, this.y, 80, 6);
    }
}