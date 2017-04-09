// Create an individual when the page loads for testing.
$(document).ready(function() {
    var rect = $('#pedigree')[0].getBoundingClientRect();

    var c1 = new Connector(330, 72, true);

    var p1 = new Node(290, 50, MALE, 0);
    var p2 = new Node(410, 50, FEMALE, 0);
 
    var nodes = [p1, p2];

    var connectors = [c1];

    var width = 0;

    $('#pedigree').click(function (event) { 
        if (checkClick(nodes, connectors, event.pageX-rect.left, event.pageY-rect.top)) {
            event.preventDefault();
            return false;
        }
    });
    $('#help-button').click(function(event) {
    	if(width === 0){
    	width = $(window).width();
    	if(width < 800) {
    		width = 800;
    	}
    	$('#pedigree').animate({'marginLeft' : "-=" + width}, 2000);
    	$('#info').animate({'marginLeft' : "-=" + width}, 2000);
  	}
    });
    $('#banner-content').click(function(event){
    	if(width != 0){
    	$('#pedigree').animate({'marginLeft' : "+=" + width}, 2000);
    	$('#info').animate({'marginLeft' : "+=" + width}, 2000);
    	width = 0;
    }
    });
    console.log(p1, p2);
});