$(function(){
    var form = layui.form;

    form.verify({
        pwd:[
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ],
        samepwd:function(value){
            if(value === $('[name=oldPwd]').val()){
                return '新密码不能和原密码相同!'
            }
        },
        repwd:function(value){
            if(value !== $('[name=newPwd]').val()){
                return '两次密码不一致!'
            }
        }
    })
    // 监听表单的submit事件
    $('.layui-form').on('submit',function(e){
        // 阻止表单的默认提交行为
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/my/updatepwd',
            // 快速获取表单的值
            data:  $(this).serialize(),
            success: function(res){
                if(res.status !== 0){
                    return layui.layer.msg('更新密码失败!')
                }
                layui.layer.msg('更新密码成功! 两秒后跳转到登录界面');
                // 重置表单
                $('.layui-form')[0].reset()
                // 延时定时器
                setTimeout(function(){
                    // 跳转到login
                    window.parent.location.href= '/login.html'
                },2000)
            }
        })
    })
})

// $(function(){
//     var form = layui.form;

//     form.verify({
//         pwd:[
//             /^[\S]{6,12}$/
//             ,'密码必须6到12位，且不能出现空格'
//           ],
//         samepwd:function(value){
//             if(value === $('[name=oldPwd]').val()){
//                 return '新旧密码不能相同!'
//             }
//         },
//         repwd:function(velue){
//             if(velue !== $('[name=newPwd]').val()){
//                 return '两次密码不一致!'
//             }
//         }
//     })
//     $('.layui-form').submit(function(e){
//         // 阻止默认行为
//         e.preventDefault();
//         $.ajax({
//             type:'PSOT',
//             url:'/my/updatepwd',
//             // serialize 方法快速获取表单数据
//             data:$(this).serialize(),
//             success:function(res){
//                 if(res.status !== 0){
//                     return layui.layer.msg('更新密码失败!')
//                 }
//                 layui.layer.msg('更新密码成功! 两秒后重新登录!');
//                 // 重置密码
//                 $('.layui-form')[0].reset();
//                 // 延时定时器
//                 setTimeout(function(){
//                     //跳转到login
//                     window.parent.location.href='/login.html';
//                 },2000)
//             }
//         })
//     })
// })