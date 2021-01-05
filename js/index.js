//下拉菜单一
    $(".jumei,.hover").hover(function() {
        $(".hover").stop().slideDown("200");
     
        
    },function(){
        $(".hover").stop().slideUp("200");
    })
    //下来菜单二
    $(".gengduo,.hover-1").hover(function() {
        $(".hover-1").stop().slideDown("200");
        
    },function(){
        $(".hover-1").stop().slideUp("200");
    })
    //购物车弹窗
    $(".cat,cat-1").hover(function(){
        $(".cat-1").css({display:"block"})
     },function(){
        $(".cat-1").css({display:"none"})
    })
   
    //首页导航点击那个那个变色
  
            
    
    $(".p1").mousemove(function () { 
        $(".a1").css({display:"block"})
    })
    $(".p1").mouseout(function () {
        $(".a1").css({display:"none"})
    })
  

    $(".p6").mousemove(function () { 
        $(".a6").css({display:"block"})
    })
    $(".p6").mouseout(function () {
        $(".a6").css({display:"none"})
    })

   


     //弹窗
     function dh_right(fu, zi) {
        $(fu).hover(function () {
            $(zi).css({
                "display": "block"
            }).stop().animate({
                "left": "40px",
                "opacity": "1"
            }, 300);
        }, function () {
            $(zi).css({
                "display": "none"
            }).stop().animate({
                "left": "0",
                "opacity": "0.2"
            }, 300);
        });
    }
    dh_right(".p3", ".a3");
    dh_right(".p4", ".a4");
    dh_right(".p5", ".a5");
    dh_right(".p7", ".a7");
    
  
//商品划过效果
$(".sp-1").mousemove(function (){
    $(".cat-che").css({display:"block"})
    $(".text").css({display:"block"})
    $(".sp-1").css({opacity:"0.7"})
})
$(".sp-1").mouseout(function (){
    $(".cat-che").css({display:"none"})
    $(".text").css({display:"none"})
    $(".sp-1").css({opacity:"1"})
})


   