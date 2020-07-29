let socket = io()

let btnStart = $('#btnStart')
$('#loginBox').show()
$('#chatBox').hide()



$('#btnStart').click(() => {
  if($('#inpUsername').val()==''){
    io.emit('login_failed')
  }
  socket.emit('login', {
    username: $('#inpUsername').val(),
    password: $('#inpPassword').val(),
  })
  
})

socket.on('logged_in', () => {
  $('#loginBox').hide()
  $('#name').append('@'+$('#inpUsername').val())
  $('#chatBox').show()
})

socket.on('login_failed', (req,res) => {
  window.alert('Username or Password wrong')
  res.redirect('/')
})

$('#btnSendMsg').click(() => {
  socket.emit('msg_send', {
    to: $('#inpToUser').val(),
    msg: $('#inpNewMsg').val()
  })
})

socket.on('msg_rcvd', (data) => {
  $('#ulMsgs').append($('<li  class="list-group-item">').text(
    `[${data.from}] : ${data.msg}`
  ))
})


function toggleInputButtons() {
  if($('#inpUsername').val() == ''){
    $('#btnStart').prop('disabled',true)
  }
  else{
    $('#btnStart').prop('disabled',false)
  }
  //btnStart.prop('disabled',$('#inpUsername').val()=='')
}