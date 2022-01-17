$(function(){
  let form = layui.form
  let q = {
    pagenum: 1,
    pagesize: 3,
    cate_id: '',
    state:''
  }
 let hasrow = null
  template.defaults.imports.dataFormat = function(dt){
    let date = new Date(dt)
    let y = date.getFullYear()
    let m = (date.getMonth() + 1).toString().padStart(2,'0')
    let d = date.getDate().toString().padStart(2,'0')
    let hh = date.getHours().toString().padStart(2,'0')
    let mm = date.getMinutes().toString().padStart(2,'0')
    let ss = date.getSeconds().toString().padStart(2,'0')
    return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
  };
 
  function initArtList(){
    $.ajax({
      method: 'get',
      url: '/my/article/list',
      data: q ,
      success: function(res) {
        if(res.status !== 0) {
          return layer.msg('获取文章列表失败！')
        }
        let htmlStr = template('tpl-artList',res)
        $('tbody').html(htmlStr)
        renderPage(res)
        hasrow = res.data.length
      }
    })
  }

  initArtList()
  initCateList()
  function initCateList() {
    $.ajax({
      method: 'get',
      url: '/my/article/cates',
      success: function(res) {
        let htmlStr = template('tpl-cateList',res)
        $('#art-cateList').html(htmlStr)
        form.render()
      }
    })
  }

  // 监听删除按钮点击事件
  $('tbody').on('click','.btn-remove',function(e) {
    let id = $(this).attr('data-id')
    let len = $('.btn-remove').length
    layer.confirm('确认删除?', {icon: 3, title:'提示'}, function(index){
      //do something
      $.ajax({
        method: 'get',
        url: '/my/article/delete/' + id,
        success: function(res){
          if(res.status !== 0) {
            return layer.msg('删除文章失败！')
          }
          layer.msg('删除文章成功！')
          if( hasrow === 1) {
            q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1
          }
          initArtList()
        }
      })
      layer.close(index);
    });
   
  })
  
  // 监听筛选表格提交
  $('#list-search').on('submit',function(e){
    e.preventDefault()
    q = {
      pagenum: 1,
      pagesize: 3,
      cate_id: $('[name=cate_id]').val(),
      state:$('[name=state]').val()
    }
    initArtList()
  })
  

  // 定义渲染分页
  function renderPage(res){
    var laypage = layui.laypage; 
    //执行一个laypage实例
    laypage.render({
      elem: 'page' //注意，这里的 test1 是 ID，不用加 # 号
      ,count: res.total, //数据总数，从服务端得到
      limit: q.pagesize,
      curr:q.pagenum,
      limits:[3, 5, 10, 15, 20],
      layout: ['count','limit','prev', 'page', 'next','skip'],
      jump: function(obj,first){
        //obj包含了当前分页的所有参数，比如：
        //得到当前页，以便向服务端请求对应页的数据。
        q.pagenum = obj.curr  
        q.pagesize = obj.limit
        //首次不执行
        if(!first){
          initArtList()
        }
      }             
    })   
  }
})