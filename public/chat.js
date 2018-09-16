var socket = io.connect('http://localhost:4000');

var write_msg_here = document.getElementById('write_msg_here'),
user_name=document.getElementById('user_name'),
submit_your_chat=document.getElementById('submit_your_chat'),
msg_view_area=document.getElementById('msg_view_area'),
boardcaast_msg=document.getElementById('boardcaast_msg');

submit_your_chat.addEventListener('click',function(){
    socket.emit('chat',{msg:write_msg_here.value,user:user_name.value});
});

write_msg_here.addEventListener('keypress',function(){
    socket.emit('typing',{user:user_name.value});
});

socket.on('chat',function(data){
    msg_view_area.innerHTML += '<li class="left clearfix">'+
    '<span class="chat-img1 pull-left">'+
    '<img src="https://lh6.googleusercontent.com/-y-MY2satK-E/AAAAAAAAAAI/AAAAAAAAAJU/ER_hFddBheQ/photo.jpg" alt="User Avatar" class="img-circle">'+
    data.user+'</span>'+
    '<div class="chat-body1 clearfix">'+
       '<p>'+data.msg+'</p>'+
       '<div class="chat_time pull-right">'+new Date()+'</div>'+
    '</div>'+
    '</li>';

});

socket.on('typing',function(data){
    console.log(data.user);
    if(data){
        boardcaast_msg.innerHTML = '<p>'+data.user+' is typing msg</p>';
    }else{
        boardcaast_msg.innerHTML = '';
    }

});