$(function(){
  let form = layui.form
  function initArtCateList(){
    $.ajax({
      method: 'get',
      url:'/my/article/cates',
      success: function(res){
        if(res.status !== 0) {
          return layer.msg('获取分类列表失败')
        }
        let htmlStr = template('tpl-artCateList',res)
        $('tbody').html(htmlStr)
      }
    })
  }
  initArtCateList()

   // 添加文章分类
  let index = null
  $('#btnAdd').on('click',function(){
      index = layer.open({
      area:['500px','250px'],
      type:1,
      title: '添加文章分类'
      ,content: $('#dialog-add').html()
    });          
  })
  // 监听确认提交
  $(document).on('submit','#form-add',function(e){
    e.preventDefault()
    $.ajax({
      method: 'post',
      url: '/my/article/addcates',
      data: $(this).serialize(),
      success: function(res){
        if(res.status !== 0) {
          return layer.msg('新增文章分类失败!')
        }
        layer.msg('新增文章分类成功!')
        initArtCateList()
        layer.close(index)
      }
    })
  })
   // 修改文章分类
  let indexEdit = null
  $('tbody').on('click','.btn-edit',function(){
    indexEdit = layer.open({
      area:['500px','250px'],
      type:1,
      title: '修改文章分类'
      ,content: $('#dialog-edit').html()
   })
   let id = $(this).attr('data-Id')
   $.ajax({
     method:'get',
     url: '/my/article/cates/' + id ,
     success: function(res) {
       form.val('form-edit',res.data)
     }
   })
  })
  // 监听确认提交
  $('body').on('submit','#form-edit',function(e){
    e.preventDefault()
    console.log('ok');
    $.ajax({
      method: 'post',
      url: '/my/article/updatecate',
      data: $(this).serialize(),
      success: function(res) {
        console.log(res);
        if(res.status !== 0) {
          return layer.msg('修改文章分类失败!')
        }
        initArtCateList()
        layer.close(indexEdit)
      }
    })
  })


  // 删除
  $('tbody').on('click','.btn-remove',function(){
    let id = $(this).attr('data-id')
    layer.confirm('确认删除?', function(index){
      //do something
      $.ajax({
        method:'get',
        url: '/my/article/deletecate/' + id,
        success: function(res){
          if(res.status !== 0) {
            return layer.msg('删除文章分类失败！')
          }
        initArtCateList()
        }
      })
      layer.close(index);
    });       
  })
  
})