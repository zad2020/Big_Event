$(function(){
    initcate();
    var layer = layui.layer;
    var form = layui.form;
    function initcate(){
        $.ajax({
            type: "GET",
            url: "/my/article/cates",
            success: function (res) {
                // console.log(res);
                var htmlStr = template('tpl-table',res)
                $('tbody').html(htmlStr)
            }
        });
    }
    var index = null
    // 为添加类别按钮绑定点击事件
    $('#btnasd').on('click',function(){
        index = layer.open({
            type: 1,
            title: '添加文章分类',
            area: ['500px', '250px'],
            content: $('#cated').html()
          });     
    })

      // 通过代理的形式，为 form-add 表单绑定 submit 事件
    $('body').on('submit','#form-add',function(e){
        //阻止表单的默认提交行为
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/my/article/addcates",
            //快速获取表单中的值  serialize
            data: $(this).serialize(),
            success: function (res) {
                if(res.status !== 0){
                    return layer.msg('新增文章分类失败!')
                }
                initcate();
                layer.msg('新增文章分类成功!');
                layer.close(index);
                
            }
        });
    })

    // 通过代理的方式,为 btn-dait 按钮绑定点击事件
    var indexEdit = null;
    $('tbody').on('click','.btn-dait',function(){
        indexEdit = layer.open({
            type: 1,
            title: '修改文章分类',
            area: ['500px', '250px'],
            content: $('#asd').html()
          }); 
          var id = $(this).attr('data-id');
            //发起请求获取对应分类的数据
          $.ajax({
              type: "GET",
              url: "/my/article/cates/" + id,
              success: function (res) {
                 form.val('form-dait',res.data)
              }
          });
    })

    // 通过代理的方式,为 修改分类的表单绑定 submit 事件
    $('body').on('submit','#form-dait',function(e){
        //阻止默认行为
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/my/article/updatecate",
            data: $(this).serialize(),
            success: function (res) {
                if(res.status !== 0){
                    return layer.msg('更新分类信息失败!')
                }
                layer.msg('更新分类信息成功!')
                //关闭弹出层
                layer.close(indexEdit);
                // 刷新列表数据
                initcate();
            }
        });
    })
    //通过代理的方式,为删除按钮绑定点击事件
    $('tbody').on('click','.btn-delete',function(){
       var id = $(this).attr('data-id');
        // 提示用户是否要删除
        layer.confirm('是否确定删除?', {icon: 3, title:'提示'}, function(index){
            //do something
            $.ajax({
                type: "GET",
                url: "/my/article/deletecate/"+ id,
                success: function (res) {
                    if(res.status !== 0){
                        return layer.msg('删除文章分类失败!')
                    }
                    layer.msg('删除文章分类成功!');
                    initcate();
                }
            });
            layer.close(index);
          });


      /*  var id = $(this).attr('data-id');
       //提示用户是否要删除
       layer.confirm('是否确定删除?', {icon: 3, title:'提示'}, function(index){
           //do something
           $.ajax({
               type: "GET",
               url: "/my/article/deletecate/" + id,
               success: function (res) {
                   if(res.status !== 0){
                       return layer.msg('删除文章分类失败!')
                   }
                   layer.msg('删除文章分类成功!')
                   // 关闭弹出层
                   layer.close(indexEdit)
                   initcate();
               }
           });
           layer.close(index);
         }); */
    })
})
// 插值表达式
// template('模板的id',对象) 方法