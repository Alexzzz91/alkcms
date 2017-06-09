      var input = $('#form #m');
      var form = $('#form');
      var ul = $('#messages');
      var socket = io.connect('', {
        reconnect: false
      });
      socket
          .on('connect', function() {
            ul.parent().removeClass('disconnect');
            ul.parent().addClass('connect');
            form.on('submit', sendMessage);
            input.prop('disabled', false);
          })
          .on('message', function(username, message) {
            printMessage(username + "> " + message);
          })
          .on('leave', function(username) {
            printStatus(username + " вышел из чата");
          })
          .on('join', function(username) {
            printStatus(username + " вошёл в чат");
          })
          .on('disconnect', function() {
            ul.parent().removeClass('connect');
            ul.parent().addClass('disconnect');
            form.off('submit', sendMessage);
            input.prop('disabled', true);
            this.emit('error');
          })
          .on('logout', function() {
            location.href = "/";
          })
          .on('error', function(reason) {
            if (reason == "handshake unauthorized") {
              printStatus("вы вышли из сайта");
            } else {
              setTimeout(function() {
                socket.socket.connect();
              }, 500);
            }
          });
      function sendMessage() {
        var text = input.val();
        var me = true;
          if (text) {
            socket.emit('message', text, function() {
              printMessage(text + " < я", me);
            });
          };
        input.val('');
        return false;
      }

      function printStatus(status) {
        $('<li>').append($('<i>').text(status)).appendTo(ul);
      }

      function printMessage(text, me) {
        if (me === true){
          $('<div class="my-message">').text(text).appendTo(ul);
        }else{
          $('<div>').text(text).appendTo(ul);
        }
      }