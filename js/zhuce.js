$(function () {
    //用户名正则判断
    $(".yonghuming").focus(function () {
        $(".yhm-t").html("4-16个字符，只支持数字，字母，下划线").css({
            "display": "block",
            "color": "#999",
            "font-size": "12px",
            "margin-top": "10px"
        });

    }).blur(function () {

        var yonghumings = /^[a-zA-Z0-9_]{4,16}$/;
        if ($(".yonghuming").val() == "") {
            $(".yhm-t").html("用户名不能为空").css({
                "color": "red"
            });
        } else if (yonghumings.test($(".yonghuming").val())) {
            $(".yhm-t").html("格式正确").css({
                "color": "green"
            })
        } else {
            $(".yhm-t").html("用户名格式错误").css({
                "color": "red"
            })
        }
    });
    //判断密码是否正确
    $(".mima").focus(function () {
        $(".mima-t").html("6-16个字符，建议使用数字与字母组合").css({
            "color": "#999",
            "display": "block",
            "font-size": "12px",
            "margin-top": "10px"
        })
    }).blur(function () {
        var mm = /^[a-zA-Z0-9]{6,16}$/;
        if ($(".mima").val() == "") {
            $(".mima-t").html("密码不能为空").css({
                "color": "red"
            });
        } else if (mm.test($(".mima").val())) {
            $(".mima-t").html("格式正确").css({
                "color": "green"
            });
        } else {
            $(".mima-t").html("密码格式错误，请重新输入").css({
                "color": "red"
            })
        }

    });

    //使用注册接口
    $(".xieyi").click(function () {
        //判断是否为空
        if ($(".yonghuming").val() == "" || $(".mima").val() == "") {
            alert("用户名或密码不能为空");

        } else {
            var yonghumings = /^[a-zA-Z0-9_]{4,16}$/;
            var mm = /^[a-zA-Z0-9]{6,16}$/;
            if (yonghumings.test($(".yonghuming").val()) && mm.test($(".mima").val())) {
                $.ajax({

                    url: "http://jx.xuzhixiang.top/ap/api/reg.php",
                    type: "GET",
                    data: {
                        username: $('.yonghuming').val(),
                        password: $('.mima').val()

                    },
                    success: function (res) {
                        console.log(res);
                        if (res.code == 1) {
                            if (getCookie("yonghu")) {
                                console.log(1)

                            }
                            else{
                                setCookie("yh",$(".yonghuming").val());
                                setCookie("mm",$(".mima").val());
                                setCookie("anhao",1);
                            }
                            alert(res.msg);
                            location.href="../html/denglu.html";

                        }
                        else{
                            alert(res.msg);
                        }
                    }

                })
            }else{
                alert("您输入的用户名或者密码错误，请重新输入");
            }

        }
    });
    //判断是否七天免登录没有的话把用户名和密码直接赋值到登录页面
    //封装cookie
    function  setCookie(k,v,t){

        var oDate=new  Date();
        oDate.setDate(oDate.getDate()+t);
        document.cookie=`${k}=${v};expires=`+oDate;
    }
    function  getCookie(k){
        var arr=document.cookie.split(";")
        for(var i=0;i<arr.length;i++){
            var  arr1=arr[i].split("=");
            if(arr1[0]===k){
                return  arr1[1];
            }

        }
    }
    function  removeCookie(k){
        serCookie(k,1,-1);
    }










})