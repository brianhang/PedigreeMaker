/* Function that will clear the canvas using a fade effect */
function clearcanvas1() {
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
function checkClick(nodes, connectors, x, y) {
  for(var i = 0; i < nodes.length; i++) {
    if(inRangeNode((nodes[i].x), (nodes[i].y), x, y)) {
      nodes[i].state = (nodes[i].state + 1) % 3;
      nodes[i].draw();

      return true;
    }
  }

  for(var i = 0; i < connectors.length; i++){
     if(inRangeConnector((connectors[i].x), (connectors[i].y), x, y)) {
      

var person = prompt("Please enter the # of children", "");
var num= parseInt(person);
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
function inRangeNode(x1, y1, x2, y2) {
    if (x2 >= x1 && x2 <= (x1 + NODE_SIZE)) {
        if (y2 >= y1 && y2 <= (y1 + NODE_SIZE)) {
            return true;
        }
    }
    return false;
}

function inRangeConnector(x1, y1, x2, y2){
    if (x2 >= x1 && x2 <= (x1 + CONNECTOR_WIDTH)) {
        if (y2 >= y1 && y2 <= (y1 + CONNECTOR_HEIGHT)) {
            return true;
        }
    }
    return false;
}