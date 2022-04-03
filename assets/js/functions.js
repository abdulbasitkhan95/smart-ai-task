var $status = $('.counter');
var $slickElement = $('.slick-car-slider');

function slideText() {
    var tl = gsap.timeline();
    var word = $('.word');

    gsap.set('.bar', {scaleX: 1,yPercent:10, transformOrigin: 'right center'})
    word.each(function(i, element){
        var letterTl = gsap.timeline({delay:i*.1}),
            letterSplit = $(this).find('.word-inner'),
            split = new SplitText(letterSplit, {type: 'chars', charsClass: 'letter'}),
            letterChars = split.chars;
        letterTl
            .add('line')
            .from(element.children[0].children[0], .2, {scaleX:0}, 'line')
            .staggerFrom(letterChars, 0.07, {autoAlpha:0, ease:Power4.easeInOut}, 0.03, 'line')
            .from(element.children[0].children[0], .2, {scaleX:0, transformOrigin:'left center'})
        ;

        tl.add(letterTl, .2);
    });
}

function animateElements() {
    if ($('.animate').length > 0) {
        $('.animate').bind('inview', function (event, isInView) {
            if (isInView) {
                var animate = $(this).attr('data-animation');
                var speedDuration = $(this).attr('data-duration');
                var $t = $(this);
                setTimeout(function () {
                    $t.addClass(animate + ' animated');
                }, speedDuration);
            }
        });
    }
}

function pageLoader() {
    var tl = gsap.timeline({paused: true});
    tl.fromTo(".loading-inner-bg", {opacity: 1}, {opacity: 0, ease: "linear", duration: 0.5})
    tl.fromTo(".wrapper-primary", {height: '100%'}, {height: '0%', ease: "Power2.easeOut", duration: 1}, 0.5)
    tl.fromTo(".wrapper-secondary", {height: '100%'}, {height: '0%', ease: "Power3.easeOut", duration: 1}, 0.5)
    tl.fromTo(".wrapper-white", {height: '100%'}, {height: '0%', ease: "Expo.easeOut", duration: 1}, 0.5)
    tl.play().then(function () {
        setTimeout(function () {
            tl.to("#loader-wrapper", {visibility: 'hidden', ease: "Expo.easeOut", duration: 1});
        }, 500)
        animateElements();
    })
}

$( ".toggle" ).click(function() {
    $(this).toggleClass('active');
    $('nav.right-nav').toggleClass('active');
});

$( ".toggle-back" ).click(function() {
    $('.toggle').toggleClass('active');
    $('nav.right-nav').removeClass('active');
});

$( ".searchbar-btn" ).click(function() {
    $(this).toggleClass('active');
    $('.searchbar').addClass('active');
});

$( ".search-back" ).click(function() {
    $('.searchbar-btn').toggleClass('active');
    $('.searchbar').removeClass('active');
});

$(document).ready(function() {
    slideText();

    $('.slick-car-slider').slick({
        dots: false,
        arrows: false,
        speed: 500,
        fade: true,
        autoplay: true,
        infinite: true,
        autoplaySpeed: 6100,
        asNavFor: '.text-slider-js',
        focusOnSelect: false,
        pauseOnHover:false,
        //swipe: false,
    });

    $('.text-slider-js').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        asNavFor: '.slick-car-slider',
        dots: false,
        arrows: true,
        fade: true,
        infinite: true,
        focusOnSelect: false,
        pauseOnHover:false,
        //swipe: false,
        prevArrow: $('.button-slider .left'),
        nextArrow: $('.button-slider .right'),
    })
        .on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
            var i = (currentSlide ? currentSlide : 0) + 1;
            $status.html('<span class="large">0' + i + '</span><span class="small">/ 0' + slick.slideCount + '</span>');
        })
        .on('beforeChange', function(event, slick, currentSlide, nextSlide){
            slideText()
        });
});

$( window ).on("load", function() {
    pageLoader()
});

