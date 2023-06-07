$(document).ready(() => {
    // Get the navbar
    var navbar = $(".madhu-nav-main");
    // Get the offset position of the navbar
    var offset = navbar.offset();

    $(window).scroll(function () {
        if (navbar && offset) {
            // console.log("$(window).scrollTop() : ", offset.top + " => "+ $(window).scrollTop())
            if ($(window).scrollTop() >= offset.top) {
                navbar.addClass("sticky-top");
            } else {
                navbar.removeClass("sticky-top");
            }
        }

        var scroll = $(window).scrollTop();
        if (scroll >= 50) {
            // $("header").css('top', -($('.header-top').height()));
            $('.header-top').slideUp(300);
        } else if (scroll <= 0){
            // $("header").css('top', 0);
            $('.header-top').slideDown(300);
        }
    });
});
