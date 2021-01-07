"use strict";

$(function () {
  // 获取购物车中商品
  if (localStorage.getItem("u-id")) {
    var mm = function mm() {
      $.ajax({
        type: "Get",
        url: "http://jx.xuzhixiang.top/ap/api/cart-list.php",
        data: {
          id: localStorage.getItem("u-id")
        },
        success: function success(res) {
          console.log(res.data);
          var html = "";
          res.data.forEach(function (v) {
            html += "<li class=\"lid\">\n                    <input type=\"checkbox\" class=\"choose checked-A-btn\">\n                    <img src=\"".concat(v.pimg, "\" alt=\"\">\n                    <p>").concat(v.pname, "</p>\n                    <i class=\"danjia\">").concat(v.pprice, "</i>\n                    <div class=\"tianjia\">\n                        <div class=\"jian\" data-id=\"").concat(v.pid, "\">\n                            -\n                        </div>\n                        <input type=\"text\" value=\"").concat(v.pnum, "\" class=\"zhi\" data-num=\"").concat(v.pnum, "\">\n                        <div class=\"jia\" data-id=\"").concat(v.pid, "\">\n                            +\n                        </div>\n                    </div>\n                    <b class=\"xiaoji\">").concat(Number(v.pprice) * Number(v.pnum), "</b>\n                    <button class=\"shan\" li_id=\"").concat(v.pid, "\">\n                        \u5220\u9664\n                    </button>\n                </li>");
          });
          $("#car_box").html(html);
          schanshu(); //删除商品

          clickchoose(); //复选框判断

          dataAdd(); //增加商品

          dataReduce(); //减少商品

          jiean(); //结算按钮

          shuzhi(); //input框

          kong(); //购物车为空显示图
        }
      });
    };

    // input框
    var shuzhi = function shuzhi() {
      $(".zhi").focus(function () {
        var shu = $(this).val();
        console.log(shu);
        localStorage.setItem("shu", JSON.stringify(shu));
      }).blur(function () {
        var shu1 = JSON.parse(localStorage.getItem("shu"));
        console.log(shu1);
        $(this).val(shu1);
      });
    }; //减少商品


    var dataReduce = function dataReduce() {
      $(".jian").click(function () {
        var _this = this;

        var nowNum = $(this).next().attr("data-num");

        if ($(this).next().val() - 0 == 1) {
          return;
        }

        $(this).next().attr("data-num", nowNum - 1);
        $.ajax({
          url: "http://jx.xuzhixiang.top/ap/api/cart-update-num.php",
          type: "Get",
          data: {
            uid: localStorage.getItem("u-id"),
            pid: $(this).attr("data-id"),
            pnum: nowNum - 1
          },
          success: function success() {
            $(_this).next().val($(_this).next().val() - 1);
            $(_this).parent().next().html(parseInt(parseInt($(_this).parent().prev().html()) * $(_this).next().val()));
            getTotalPrice();
          },
          error: function error(_error) {
            console.log(_error);
          }
        });
      });
    }; //增加商品


    var dataAdd = function dataAdd() {
      $(".jia").click(function () {
        var _this2 = this;

        var nowNum = $(this).prev().attr("data-num");
        $(this).prev().attr("data-num", nowNum - 0 + 1);
        $.ajax({
          url: "http://jx.xuzhixiang.top/ap/api/cart-update-num.php",
          type: "Get",
          data: {
            uid: localStorage.getItem("u-id"),
            pid: $(this).attr("data-id"),
            pnum: +nowNum + 1
          },
          success: function success() {
            $(_this2).prev().val($(_this2).prev().val() - 0 + 1);
            $(_this2).parent().next().html(parseInt($(_this2).parent().prev().html()) * $(_this2).prev().val());
            getTotalPrice();
          },
          error: function error(_error2) {
            console.log(_error2);
          }
        });
      });
    }; //计算总价


    var getTotalPrice = function getTotalPrice() {
      var sum = 0;

      for (var i = 0; i < $(".checked-A-btn").length; i++) {
        if ($(".checked-A-btn").eq(i).prop("checked")) {
          //判断单选按钮是否勾选
          sum += +$(".xiaoji").eq(i).html(); //求和
        }
      }

      $("#zongjia").html(sum);
    }; //选择框判断


    var clickchoose = function clickchoose() {
      var totoalchoose = document.querySelector("#quan");
      var achoose = document.querySelectorAll(".choose"); //单选框
      //点击全选的时候将所有单选框勾选上

      totoalchoose.onclick = function () {
        for (var j = 0; j < achoose.length; j++) {
          if (totoalchoose.checked) {
            achoose[j].checked = true;
          } else {
            achoose[j].checked = false;
          }
        }

        getTotalPrice();
      }; //调用的时候遍历一遍单选按钮


      for (var i = 0; i < achoose.length; i++) {
        var flag = true;

        if (!achoose[i].checked) {
          flag = false;
          break;
        }

        totoalchoose.checked = flag;
      } //判断勾选的单选框的选择情况，有一个没选择全选按钮就不勾选


      for (var j = 0; j < achoose.length; j++) {
        achoose[j].onclick = function () {
          var flag = true;

          for (var _i = 0; _i < achoose.length; _i++) {
            if (!achoose[_i].checked) {
              flag = false;
              break;
            }
          }

          totoalchoose.checked = flag;
          getTotalPrice();
        };
      }
    }; // 删除商品


    var schanshu = function schanshu() {
      var shan = document.getElementsByClassName("shan");

      for (var i = 0; i < shan.length; i++) {
        $(shan[i]).click(function () {
          var paid = this.getAttribute("li_id");
          $.ajax({
            type: "Get",
            url: "http://jx.xuzhixiang.top/ap/api/cart-delete.php",
            data: {
              uid: localStorage.getItem("u-id"),
              pid: paid
            },
            success: function success() {
              clickchoose();
              getTotalPrice();

              if ($(".jia").length == 0) {
                var totoalchoose = document.querySelector("#quan");
                totoalchoose.checked = false;
              }
            }
          });
          this.parentNode.remove();
          kong();
        });
      }
    }; // 结算


    var jiesuan = function jiesuan() {
      console.log("aaaaaaa");

      for (var i = 0; i < $(".checked-A-btn").length; i++) {
        if ($(".checked-A-btn").eq(i).prop("checked")) {
          //判断单选按钮是否勾选
          // sum += +$(".xiaoji").eq(i).html(); //求和
          var paid = $(".shan").eq(i).attr("li_id");
          $.ajax({
            type: "Get",
            url: "http://jx.xuzhixiang.top/ap/api/cart-delete.php",
            data: {
              uid: localStorage.getItem("u-id"),
              pid: paid
            },
            success: function success() {
              var totoalchoose = document.querySelector("#quan");
              totoalchoose.checked = false;
              $("#zongjia").text(0);
              mm();
            }
          });
        }
      }
    }; // 判断本地有没有钱


    var qian = function qian() {
      if (localStorage.getItem("u-id")) {
        var uu = localStorage.getItem("u-id");
        console.log(uu);

        if (localStorage.getItem("".concat(uu))) {
          var _qian = localStorage.getItem("".concat(uu));

          $("#yu").text(_qian);
        } else {
          localStorage.setItem("".concat(uu), 0);
        }
      }
    };

    //调用
    var jianqian = function jianqian() {
      var fuqian = Number($("#zongjia").text());
      var youqian = Number($("#yu").text());
      var shengxia = youqian - fuqian;
      console.log(shengxia);
      $("#yu").text(shengxia);
      var uu = localStorage.getItem("u-id");
      localStorage.setItem("".concat(uu), shengxia);
    }; // 结算按钮函数


    var jiean = function jiean() {
      $(".jiesuan").click(function () {
        clickchoose(); //复选框

        getTotalPrice(); //总价

        console.log($("#yu").text());
        console.log($("#zongjia").text());
        console.log(Number($("#yu").text()) < Number($("#zongjia").text()));

        if (Number($("#yu").text()) > Number($("#zongjia").text())) {
          jianqian();
          jiesuan();
          kong();
        } else if (Number($("#yu").text()) < Number($("#zongjia").text())) {
          $(".chongzhi").css({
            display: "block"
          });
          $("#quxiao").click(function () {
            $(".chongzhi").css({
              display: "none"
            });
          }); // 充值按钮

          $("#chong").click(function () {
            var uid = localStorage.getItem("u-id");
            console.log(uid);
            var yue = Number(localStorage.getItem("".concat(uid))); //获取本地余额

            console.log(yue);
            var xin = $("#chongzhi").val();
            yue += Number(xin);
            localStorage.setItem("".concat(uid), yue);
            qian();
          });
        }
      });
    };

    mm();
    qian();
  } //   判断是否登录


  function kong() {
    if (localStorage.getItem("yonghu")) {
      // 判断购物车里是否有商品，然后改变状态
      $.ajax({
        type: "Get",
        url: "http://jx.xuzhixiang.top/ap/api/cart-list.php",
        data: {
          id: localStorage.getItem("u-id")
        },
        success: function success(res) {
          console.log(res);
          console.log(res.data.length);
          console.log(res.data.length == 0);

          if (res.data.length == 0) {
            $(".butto").css({
              display: "none"
            });
            $("#bo_ji").text("共0件商品");
            $("#kong").css({
              display: "block"
            });
          } else {
            $(".butto").css({
              display: "flex"
            });
            $("#kong").css({
              display: "none"
            });
            $("#bo_ji").text("共" + res.data.length + "件商品");
          }
        }
      });
    }
  }
});