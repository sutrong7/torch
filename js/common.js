$(function () {

    let lastScroll = 0;

    $(window).scroll(function () {
        curr = $(this).scrollTop();
        target = $('.sc-detection').offset().top; 
          
        if (curr > 0) {
            $('.header').removeClass('header-active');
        } else {
            $('.header').addClass('header-active');
        }

        if (curr > target) {
            $('.header').addClass('header-contrast');
        } else {
            $('.header').removeClass('header-contrast');
        }

        if (curr > target) {
            if (curr > lastScroll) {
                $('.header').removeClass('header-active');
            } else {
                $('.header').addClass('header-active');
            }
        }

        lastScroll = curr;
    })

    $('.scroll-to-top').click(function (e) {
        e.preventDefault();
        window.scrollTo({top:0,behavior:"smooth"});
    });
});