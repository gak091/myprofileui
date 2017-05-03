window.onload = function () {
    var mediaExpand = document.getElementById("media-expand-arrow");
    var mediaBar = document.getElementById("media-bar");
    var mediaCross = document.getElementById("media-bar-cross");
    var messageFeed = document.getElementById("message-feed");

    console.log(mediaExpand + mediaBar);

    function mediaOpen() {
        mediaBar.className += " media-bar-open"
    };

    mediaExpand.addEventListener("click", mediaOpen, false);

    function mediaClose() {
        mediaBar.className = "media-bar"
    };

    mediaCross.addEventListener("click", mediaClose, false);

    function wScroll() {
        console.log(messageFeed.scrollTop);

        messageHeight = messageFeed.offsetHeight;

        var heightToScroll = (130);
        var header = document.getElementById('header');

        if (messageFeed.scrollTop > heightToScroll) {
            header.className = "header header-scrolled"
            messageFeed.className = "message-feed message-feed-scrolled"
        }
        else if (messageFeed.scrollTop < 1) {
            header.className = "header header-unscrolled"
            messageFeed.className = "message-feed"
        }
    };

    messageFeed.addEventListener("scroll", wScroll, false);

    wScroll();


    function logMessage(event) {

        //get time
        function addZero(i) {
            if (i < 10) {
                i = "0" + i
            }
            return i;
        }

        var d = new Date();
        var h = addZero(d.getHours());
        var m = addZero(d.getMinutes());

        //build message

        function appendMessage() {
            $('#message-feed').append(
                '<div class="message message-to"><div class="message-name"><h1>You</h1></div><div class="message-body"><p>' + messageVal + '</p></div><div class="message-timestamp"><p>Today ' + h + ' : ' + m + '</p></div>'
            );
        }

        //set event trigger

        var messageInput = document.getElementById("message-input");

        var messageVal = messageInput.value;

        //hipsum responses

        var responseTimed;

        function createResponse(response) {
            $('#message-feed').append(
                '<div class="message message-from"><div class="message-name"><h1>Arvind</h1></div><div class="message-body"><p>' + response + '</p></div><div class="message-timestamp"><p>Today ' + h + ' : ' + m + '</p></div>'
            );
            messageFeed.scrollTop = messageFeed.scrollHeight;
        };

        function loadProfile(inputText) {

            var urlVar = 'https://myprofilers.herokuapp.com/myprofilers';

            var inputData = { "text": inputText };
            $.ajax({
                url: urlVar,
                data: inputData,
                method: 'POST',
                dataType: 'json',
                success: function (response) {
                    if (response != null) {
                        createResponse(response);
                    } else {
                        createResponse('Service temporarily unavailable.');
                    }
                },
                error: function () {
                    createResponse('Service temporarily unavailable.');
                }
            });
        }


        //fire on enter


        if (event.keyCode == 13) {
            event.preventDefault();
            messageInput.value = "";
            appendMessage();
            loadProfile(messageVal);
            messageFeed.scrollTop = messageFeed.scrollHeight;
            //timedResponse();
        }

    };

    document.addEventListener("keypress", logMessage, false);


}

