//set default degree (360*5)
var degree = 1800;
//number of clicks = 0
var clicks = 0;

$(document).ready(function(){

	var shown_modal = false;
	var result = '...';

	/*WHEEL SPIN FUNCTION*/
	$('#spin').click(function(){

		//add 1 every click
		clicks ++;

		/*multiply the degree by number of clicks
	  generate random number between 1 - 360,
    then add to the new degree*/
		var newDegree = degree*clicks;
		var extraDegree = Math.floor(Math.random() * (360 - 1 + 1)) + 1;
		totalDegree = newDegree+extraDegree;

		x = ((360 - (totalDegree % 360)));


		shown_modal = false;
		$('#donateButton').text('Donate to ...');
		var y = 6;

		if(x >= 330 && x <= 30) {
				y = 6;
		} else if(x >= 30 && x <= 90) {
				y = 1;
		} else if(x >= 90 && x <= 150) {
				y = 2;
		} else if(x >= 150 && x <= 210) {
				y = 3;
		} else if(x >= 210 && x <= 270) {
				y = 4;
		} else if(x >= 270 && x <= 330) {
				y = 5;
		}


		// console.log(x % 60);
		/*let's make the spin btn to tilt every
		time the edge of the section hits
		the indicator*/
		$('#wheel .sec').each(function(){
			var t = $(this);
			var noY = 0;

			var c = 0;
			var n = 700;
			var interval = setInterval(function () {
				c++;
				if (c === n) {
					if(shown_modal === false) {
						shown_modal = true;

						result = $( "#inner-wheel .sec:nth-child(" + y + ")").text();

						console.log(y);
						console.log(result);


				    $('input#charity').val(result);
						$('#donateButton').text('Donate to ' + result);
						// setTimeout(function() {
							// $(".sign-up").addClass("is-active");
						// }, 1000);
					}
					clearInterval(interval);
				}

				var aoY = t.offset().top;
				// $("#txt").html(aoY);
				// console.log(aoY);

				/*23.7 is the minumum offset number that
				each section can get, in a 30 angle degree.
				So, if the offset reaches 23.7, then we know
				that it has a 30 degree angle and therefore,
				exactly aligned with the spin btn*/
				if(aoY < 23.89){
					console.log('<<<<<<<<');
					$('#spin').addClass('spin');
					setTimeout(function () {
						$('#spin').removeClass('spin');
					}, 100);
				}
			}, 10);

			$('#inner-wheel').css({
				'transform' : 'rotate(' + totalDegree + 'deg)'
			});

			noY = t.offset().top;

					console.log('sdfsd');
		});

	});



});//DOCUMENT READY
