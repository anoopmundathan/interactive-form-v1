$(document).ready(function() {
	
	// Set focus on the first text field
	$('#name').focus();
	
	$('.basic').append("<input type='text' id='other-title' placeholder='Your title'>");
	$('#other-title').hide();

	$('#color').hide();
	$('#colors-js-puns > label').hide();

	// Job Role section of the form. 
	// Reveal a text field when the "Other" option is selected from the "Job Role" drop down menu
	$('#title').change(function() {
		
		var selected = $(this).val();
		
		if (selected === 'other') {
			$('#other-title').show();
		} else {
			$('#other-title').hide();
		}

	})

	// T-Shirt Info section of the form. 
	// For the T-Shirt color menu, only display the options that match the design selected in the "Design" menu.
	$('#design').change(function() {
		var selected = $(this).val();
			
		if(selected === 'js puns') {
			$('#color').children().remove();
			$('#color').append('<option value="cornflowerblue">Cornflower Blue (JS Puns shirt only)</option>');
			$('#color').append('<option value="darkslategrey">Dark Slate Grey (JS Puns shirt only)</option>');
			$('#color').append('<option value="gold">Gold (JS Puns shirt only)</option>');
			$('#colors-js-puns > label').show();
			$('#color').show();
		} else if(selected === 'heart js') {
			$('#color').children().remove();
			$('#color').append('<option value="tomato">Tomato (I &#9829; JS shirt only)</option>');
			$('#color').append('<option value="steelblue">Steel Blue (I &#9829; JS shirt only)</option>');
			$('#color').append('<option value="dimgrey">Dim Grey (I &#9829; JS shirt only)</option>');
			$('#colors-js-puns > label').show();
			$('#color').show();
		} else {
			$('#colors-js-puns > label').hide();
			$('#color').hide();
		}
	})

	// Register for Activities section of the form.	
	var mainConf = $('input[name = "all"]');
	var jsFrameWS = $('input[name = "js-frameworks"]');
	var jsLibWS = $('input[name = "js-libs"]');
	var expressWS = $('input[name = "express"]');
	var nodeWS = $('input[name = "node"]');
	var toolWS = $('input[name = "build-tools"]');
	var npmWS = $('input[name = "npm"]');
	var total = 0 ;

	$('.activities').append('<h4 id="total"></h4>');
	
	function confictWorkshop(checkBox, input) {

		if (checkBox.is(':checked')) {
			input.prop('disabled', true);
		} else {
			input.prop('disabled', false);
		}

		addPrice(checkBox, 100);
		input.parent().toggleClass('conflict-label');
	}

	function addPrice(checkBox, price) {
		if (checkBox.is(':checked')) {
			updateTotal(price);
		} else {
			updateTotal(price * -1);
		}
	}
	
	function updateTotal(price) {
		total = total + price;
		$('#total').html('Total: $' + total);
	}

	mainConf.change(function() {
		addPrice($(this), 200);
	});

	jsFrameWS.change(function() {
		confictWorkshop($(this), expressWS);
	});

	jsLibWS.change(function() {
		confictWorkshop($(this), nodeWS);
	});

	expressWS.change(function() {
		confictWorkshop($(this), jsFrameWS);
	});

	nodeWS.change(function() {
		confictWorkshop($(this), jsLibWS);
	});

	toolWS.change(function() {
		addPrice($(this), 100);
	});

	npmWS.change(function() {
		addPrice($(this), 100);
	});


	// Payment Info section of the form. Display payment sections based on chosen payment option
	$('#paypal').hide();
	$('#bitcoin').hide();
	$('#payment').val("credit card");

	$('#payment').change(function() {
		if($(this).val() === "paypal") {
			$('#credit-card, #bitcoin').hide();
			$('#paypal').show();
		} else if ($(this).val() === "bitcoin") {
			$('#credit-card, #paypal').hide();
			$('#bitcoin').show();
		} else {
			$('#credit-card').show();
			$('#bitcoin, #paypal').hide();
		}
	});

	$('.basic legend').append('<p id="error">Hello</p>');
	$('#error').hide();


	// Form Validation
	$('form').submit(function(e) {
		e.preventDefault();

		var error = "";

		// Name field can't be empty
		if($('#name').val() === "") {
			error = "Name must be entered"
			$('#name').focus();

		// Email field must be a validly formatted e-mail address 
		} else if ($('#mail').val() === "") {
			error = "Email must be entered"
			$('#mail').focus();

		// At least one activity must be checked from the list under "Register for Actitivities."
		} else if ($('.activities > label > input:checked').length === 0) {
			console.log('nothing is ticked');
			error = "Select at least one activity"
			$('.activities').focus();
			$('html body').animate({scrollTop : 0});

		// Payment option must be selected.
		} else if ($('#payment').val() === "select_method") {
			console.log('no payment option selected');
			error = "Payment method is required"

		// If "Credit card" is the selected payment option, 
		// make sure the user supplied a credit card number, a zip code, and a 3 number CVV value.
		} else if ($('#payment').val() === "credit card" && $('#cc-num').val() === "") {
			console.log('credit card number');
			error = "Enter credit card number"
			$('html body').animate({scrollTop : 0});
		// zip code
		} else if ($('#payment').val() === "credit card" && $('#zip').val() === "") {
			console.log('zip');
			error = "Enter zip code"
			$('html body').animate({scrollTop : 0});

		// CVV value.
		} else if ($('#payment').val() === "credit card" && $('#cvv').val() === "") {
			console.log('cvv');
			error = "Enter CVV number"
			$('html body').animate({scrollTop : 0});
		} 

		document.getElementById('error').innerHTML = 'Error: ' + error;
		$('#error').show();

	})

})