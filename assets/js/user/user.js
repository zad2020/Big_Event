/* $(function(){
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        nick: function(value){
            if(value.length > 6){
                return '昵称的长度必须在 1 ~ 6 个字符之间!'
            }
        }
    })

    userinfo();
    // 初始化用户的基本信息
    function userinfo(){
        $.ajax({
            type: 'GET',
            url: '/my/userinfo',
            success: function(res){
                if(res.status !== 0){
                    return layer.msg('获取用户基本信息失败!')
                }
                console.log(res);
                //调用 form.val() 快速为表单赋值
                form.val('forminfo',res.data)
            }
        })
    }
    // 重置表单的数据
    $('#btnuser').on('click',function(e){
        //阻止表单的默认重置行为
        e.preventDefault();
        userinfo();
    })
    // 监听表单的提交事件
    $('.layui-form').submit(function(e){
        //阻止表单的默认提交行为
        e.preventDefault();
        //发起 ajax 数据请求
        $.ajax({
            type: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res){
                if(res.status !== 0){
                    return layer.msg('更新用户信息失败!')
                }
                layer.msg('更新用户信息成功!');
                // 调用父页面中的方法,重新渲染用户的头像和用户的信息
                window.parent.getUserInfo();
            }
        })
    })
}) */

$(function(){
    var form = layui.form
    var layer = layui.layer
    form.verify({
        nick: function(value){
            if(value.length > 6){
                return '用户昵称在 1 ~ 6 个字符之间'
            }
        } 
    })

    initUser();

    // 初始化用户的基本信息
    function initUser() {
        $.ajax({
            type:'GET',
            url:'/my/userinfo',
            success: function(res){
                if(res.status !== 0){
                    return layer.msg('获取用户信息失败!')
                }
                //调用 form.val('lay-filter的值',对象) 快速为表单赋值
                form.val('userinfo',res.data)
            }
        })
    }
    // 重置表单的数据
    $('#btnreser').on('click',function(e){
        //阻止表单的默认重置行为
        e.preventDefault();
        initUser();
    })
    // 监听表单的提交事件
    $('.layui-form').submit(function(e){
        // 阻止表单的默认提交行为
        e.preventDefault();
        // 发起ajax请求
        $.ajax({
            type: 'POST',
            url:'/my/userinfo',
            // serialize方法快速获取表单中的数据
            data:$(this).serialize(),
            success:function(res){
                if(res.status !== 0){
                    return layer.msg('更新失败!')
                }
                layer.msg('更新成功!');
                //调用父页面中的方法,重新渲染用户的头像和用户的信息
                window.parent.getUserInfo();
            }
        })
    })
})