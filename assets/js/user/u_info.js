$(function(){
  layui.form.verify({
    nickname: function(value, item){ //value：表单的值、item：表单的DOM对象
      if(value.length > 6){
        return '用户名只能1-6个字符！';
      }
    }
  })
  initUserInfo()
  function initUserInfo(){
    $.ajax({
      method: 'get',
      url: '/my/userinfo',
      success: function(res){
        if (res.status !== 0) {
          return layer.msg('获取用户信息失败！')
        }
        layui.form.val('formUserInfo',res.data)
      }
    })
  } 
  $('#btnReset').on('click',function(e){
    e.preventDefault()
    initUserInfo()
  })
  $('.layui-form').on('submit',function(e){
    e.preventDefault()
    $.ajax({
      method: 'post',
      url: '/my/userinfo',
      data: $(this).serialize(),
      success: function(res){
        if(res.status !== 0) {
          return layer.msg('更新失败')
        }
        layer.msg('更新用户信息成功！')
        window.parent.getUserInfo();
      }
    })
  })
})