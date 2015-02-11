//shorthand for $( document ).ready()
            jQuery(function($){
                var socket = io.connect();
                var $nickForm = $('#setNick');
                var $nickError = $('#nickError');
                var $nickBox = "<?php echo $_SESSION['SESS_USERNAME'];?>"
                var $nickCheck = $nickBox;
                var $users = $('#users');
                var $messageForm = $('#send-message');
                var $messageBox = $('#message');
                var $chat = $('#chat');


                socket.emit('new user', $nickBox, function(data){
                    if(data){
                        $('#contentWrap').show(); //we show the chat div
                    } else {
                        $nickError.html('ERRO - PAROU NO FICHEIRO chatApp.js!');
                    }
                });
                //$nickBox.val('');



                //adding list of users
                socket.on('usernames', function(data){
                   var html = '';
                    //going trough the array
                    for(i=0; i < data.length; i++){
                        html += data[i] + "<br/>"
                    }
                    $users.html(html);
                });

                //functionality that send the message to the server
                $messageForm.submit(function(e){
                    e.preventDefault();
                    socket.emit('send message', $messageBox.val());
                    $messageBox.val(''); //to clean the message box
                });

                socket.on('new message', function(data){
                   //time to display the message
                    if($nickBox === (data.nick)){

                        //AQUI FALTA A COMPARAÇÃO SE A MENSAGEM PERTENCE AO UTILIZADOR OU NÃO E AS ALTERAÇÕES DE STYLE NECESSÁRIAS A FAZER

                        $chat.append('<b>' + data.nick + ': </b>' + data.msg + "<br/>");
//                        $chat.append('<b style="float:right">'
//                                        + data.nick
//                                        + ': </b>'
//                                        + '<b style="float:right>'
//                                        + data.msg
//                                        + '</b>'
//                                        + "<br/>");

                    } else {
//                        $chat.append('<b style="float:left">'
//                                        + data.nick
//                                        + ': </b>'
//                                        + '<b style="float:left>'
//                                        + data.msg
//                                        + '</b>'
//                                        + "<br/>");
                        $chat.append(data.nick + ': ' + data.msg + "<br/>");
                    }

                });
            });
