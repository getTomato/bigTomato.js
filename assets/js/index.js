$(function(){
  getUserInfo()
  $('#btnLogout').on('click',function(){
    layer.confirm('确认退出？', {icon: 3, title:'提示'},
     function(index){
      localStorage.removeItem('token')
      location.href = '/login.html'
      layer.close(index);
    });
  })
})
function getUserInfo(){
  $.ajax({
    method: 'get',
    url: '/my/userinfo',
    success: function(res){
      if(res.status !== 0) {
        return layui.layer.msg('获取用户信息失败！')
      }
      renderAvatar(res.data)
    }
  })
}
function renderAvatar(data) {
  let name = data.nickname || data.username
  $('#welcome').html(`欢迎  ${name}`)
  if(data.user_pic !== null) {
    $('.layui-nav-img').attr('src',data.user_pic).show()
    $('.text-avatar').hide()
  } else {
    let first = name[0].toUpperCase()
    $('.layui-nav-img').hide()
    $('.text-avatar').html(first).show()
  }
}