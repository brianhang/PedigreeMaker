// Create an individual when the page loads for testing.
$(document).ready(function() {
    var rect = $('#pedigree')[0].getBoundingClientRect();

	

var person = prompt("Please enter the # of children", "");
var num= parseInt(person);

    var p1 = new Node(290, 50, MALE, 0);
    var p2 = new Node(410, 50, FEMALE, 0);

    var c1 = new Connector(p2, p1);

    // Number of children to test.
    const testCount = 2// Math.ceil(Math.random() * 4) + 1;
    var lastChild;

    for (var i = 0; i < num; i++) {
        var n = new Node(0, 0, i % 2, 0);
        c1.addChild(n);
        //n.addOutsider(Math.random() > 0.8);

        lastChild = n;
    }

    var nodes = [p1, p2];
    var connectors = [c1];
    var width = 0;

    c1.draw(true);

    $('#pedigree').click(function (event) { 
        if (checkClick(nodes, connectors, event.pageX-rect.left, event.pageY-rect.top)) {
            event.preventDefault();

            return false;
        }
    });

    $('#help-button').click(function(event) {
    	$('#pedigree').fadeOut(500, function() { $('#info').fadeIn(500)});
    });

    $('#banner-content').click(function(event){
    	$('#info').fadeOut(500, function() { $('#pedigree').fadeIn(500)});
	});
	
    $('#numchildren-button').click(function(event){
		
	});

    console.log(p1, p2);
});
