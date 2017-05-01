$(document).on('click', '.panel-heading span.icon_minim', function (e) {
    var $this = $(this);
    if (!$this.hasClass('panel-collapsed')) {
        $this.parents('.panel').find('.panel-body').slideUp();
        $this.addClass('panel-collapsed');
        $this.removeClass('glyphicon-minus').addClass('glyphicon-plus');
    } else {
        $this.parents('.panel').find('.panel-body').slideDown();
        $this.removeClass('panel-collapsed');
        $this.removeClass('glyphicon-plus').addClass('glyphicon-minus');
    }
});
$(document).on('focus', '.panel-footer input.chat_input', function (e) {
    var $this = $(this);
    if ($('#minim_chat_window').hasClass('panel-collapsed')) {
        $this.parents('.panel').find('.panel-body').slideDown();
        $('#minim_chat_window').removeClass('panel-collapsed');
        $('#minim_chat_window').removeClass('glyphicon-plus').addClass('glyphicon-minus');
    }
});
$(document).on('click', '#new_chat', function (e) {
    var size = $( '.chat-window:last-child' ).css('margin-left');
     size_total = parseInt(size) + 400;
    alert(size_total);
    var clone = $( '#chat_window_1' ).clone().appendTo( '.container' );
    clone.css('margin-left', size_total);
});
$(document).on('click', '.icon_close', function (e) {
    //$(this).parent().parent().parent().parent().remove();
    $( '#chat_window_1' ).remove();
});

$(document).on('click', '.btn-primary', function (e) {
	process();
});

$(document).on('keypress', '#btn-input', function (e) {
	if(e.which == 13) {
		process();
	}
});

var process = function() {
	if($( '#btn-input' ).val().length > 0) {
		$( '.inputText' ).attr('disabled', 'disabled');
		var clone = $( '.receivediv' ).clone().appendTo( '.msg_container_base' ).attr('class', 'row msg_container base_receive');
		var inputText = $( '#btn-input' ).val();
		clone.find( '.inputText' ).text(inputText);
	  $('.msg_container_base').scrollTop($('.msg_container_base')[0].scrollHeight);
		$( '#btn-input' ).val('');
		$( '.loadingdiv' ).attr('class', 'msg_container np loadingdiv');
		setTimeout(function(){
			load(inputText);
		}, 2000);
	}
}

var load = function(inputText) {

	var urlVar = 'https://myprofilers.herokuapp.com/myprofilers';
	
	var inputData = { "text" : inputText};
	$.ajax({
		url: urlVar, 
		data: inputData,
		method:'POST',
		dataType: 'json',
		success : function(response) {
			if(response != null) {
				createResponse(response);
			} else {
				createResponse('Service temporarily unavailable.');
			}
		},
		error : function() {
			createResponse('Service temporarily unavailable.');
		}
	});
}

var createResponse = function(outputText) {
  var currentHeight = $('.msg_container_base')[0].scrollHeight;
	var clone = $( '.sentdiv' ).clone().appendTo( '.msg_container_base' ).attr('class', 'row msg_container base_sent');
	clone.find( '.outputText' ).html(outputText);
	$( '.loadingdiv' ).attr('class', 'msg_container np loadingdiv hidden');
	$( '.inputText' ).prop('readonly', true);
	$('.msg_container_base').scrollTop(currentHeight + 2);
}