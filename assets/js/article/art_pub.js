$(function(){
  let form = layui.form
  initCate()
  function initCate(){
    $.ajax({
      method: 'get',
      url: '/my/article/cates',
      success: function(res) {
        if(res.status !== 0) {
          return layer.msg('获取文章列表失败！')
        }
        let htmlStr = template('tpl-cate',res)
        $('select').html(htmlStr)
        form.render()
      }
    })
  }
  initEditor()

    // 1. 初始化图片裁剪器
    var $image = $('#image')
  
    // 2. 裁剪选项
    var options = {
      aspectRatio: 400 / 280,
      preview: '.img-preview'
    }
    
    // 3. 初始化裁剪区域
    $image.cropper(options)

    $('#btnPic').on('click',function(){
      $('#file').click()
    })
    $('#file').on('change',function(e) {
      var file = e.target.files[0]
      var newImgURL = URL.createObjectURL(file)
      $image
     .cropper('destroy')      // 销毁旧的裁剪区域
     .attr('src', newImgURL)  // 重新设置图片路径
     .cropper(options)        // 重新初始化裁剪区域

    //  $image
    //  .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
    //    width: 400,
    //    height: 280
    //  }).toBlob(function(blob) { 
       
    //  })
    })
    let art_state = '已发布'
    $('#btnSave').on('click',function(){
      art_state = '草稿'
    })


    // let FormData = {
    //   title:
    // }
   $('#btn_pub').on('submit',function(e){
    e.preventDefault()
    let fd = new FormData($(this)[0])
    fd.append('state', art_state)
    $image
     .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
       width: 400,
       height: 280
     }).toBlob(function(blob) { 
       fd.append('cover_img',blob)
     })
    fd.forEach((v,k)=>{
      console.log(v,k);
    })
    publish(fd)
   })
   function publish(fd){
    $.ajax({
      method: 'post',
      url: '/my/article/add',
      data: fd,
      contentType: false,
      processData: false,
      success: function(res) {
        if(res.status !== 0) {
          return layer.msg('发布文章失败！')
        }
        layer.msg('发布文章成功！')
        location.href = '/article/art_list.html'
      }
    })
   }
  

})