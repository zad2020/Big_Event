$(function () {
    var layer = layui.layer;
    var form = layui.form;
    initcate()
    // 初始化富文本编辑器
    initEditor()
    //定义加载文章分类的方法
    function initcate() {
        $.ajax({
            type: "GET",
            url: "/my/article/cates",
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取文章分类列表失败!')
                }
                // 调用模板引擎,渲染分类的下拉菜单
                var htmlStr = template('tpl-cate', res);
                $('[name=cate_id]').html(htmlStr)
                // 一定要记住调用form.render()方法
                form.render();
            }
        });
    }
    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)

    // 为选择封面按钮,绑定点击事件函数
    $('#btn-file').on('click', function () {
        $('#input').click();
    })

    // 监听 input 的 change 事件,获取用户选择的文件列表
    $('#input').on('change', function (e) {
        // 获取文件的列表数组
        var files = e.target.files;
        // 判断用户是否选择了文件
        if (files.length === 0) {
            return
        }
        // 根据选择的文件，创建一个对应的 URL 地址：
        var newImgURL = URL.createObjectURL(files[0]);
        // 先销毁旧的裁剪区域，再重新设置图片路径，之后再创建新的裁剪区域：
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    })

    // 定义文章的发布状态
    var str_state = '已发布';
    // 为存为草稿按钮绑定点击事件处理函数
    $('#btnsave').on('click', function () {
        str_state = '草稿';
    })

    // 为表单绑定 submit 事件
    $('#form-pub').on('submit', function (e) {
        // 1. 阻止表单的默认提交行为
        e.preventDefault();
        // 2.基于form表单,快速创建 FormDate 对象
        var fd = new FormData($(this)[0]);
        // 3. 将文章的发布状态,存到fd中
        fd.append('state', str_state);
        // 4.将封面裁剪过后的图片,输出为一个文件对象
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) {       // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                // 5.将文件对象,存到 fd中
                fd.append('cover_img',blob);
                // 6.发起ajax请求
                publishArticle(fd)
            })
    })
    function publishArticle(fd) {
        $.ajax({
          method: 'POST',
          url: '/my/article/add',
          data: fd,
          // 注意：如果向服务器提交的是 FormData 格式的数据，
          // 必须添加以下两个配置项
          contentType: false,
          processData: false,
          success: function(res) {
            if (res.status !== 0) {
              return layer.msg('发布文章失败！')
            }
            layer.msg('发布文章成功！')
            // 发布文章成功后，跳转到文章列表页面
            location.href = '/article/list.html'
          }
        })
    }
})