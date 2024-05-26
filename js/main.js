const navItems = gsap.utils.toArray('.nav-item')
const headline = gsap.utils.toArray('.sc-visual .col-left .headline span')

// 페이지 로딩 완료 시 애니메이션 시작
// window.onload = function () {
  history.scrollRestoration = 'manual'
  introMotionAni()
  mouseAni()
// }

/**
 * @intro
 *
 * **/
function introMotionAni() {
  const tl = gsap.timeline({
    onComplete: () => {
      $('body').removeClass('hidden')
    },
  })

  tl.fromTo(
    '.sc-visual .bg',
    { transform: 'rotate(10deg) translate(-5%, 60%) scale(1.4)' },
    {
      duration: 1,
      ease: 'ease',
      transform: 'rotate(0deg) translate(0%, 0%) scale(1)',
    },
  )
    .fromTo('.header-wrap .line', { opacity: 0 }, { opacity: 1, duration: 0.4 })
    .fromTo('.header-wrap .logo', { opacity: 0 }, { duration: 0.5, opacity: 1 })

    .fromTo(
      '.header .nav-item',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, ease: 'power2.out', stagger: 0.2 },
    )

    .fromTo(
      '.sc-visual .col-left .headline span',
      { opacity: 0, transform: 'rotate(10deg) translate(-5%, 60%)' },
      {
        opacity: 1,
        transform: 'rotate(0deg) translate(0%, 0%) scale(1)',
        stagger: 0.1,
      },
    )

    .fromTo(
      '.sc-visual .title-wrap',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.2 },
    )

    .fromTo(
      '.scroll-to-explore',
      { opacity: 0, y: 20 },
      { duration: 0.2, opacity: 1, y: 0 },
    )

  const introBgTl = gsap.timeline({
    scrollTrigger: {
      trigger: '.sc-visual',
      start: '0% 0%',
      end: '100% 0%',
      scrub: 0.4,
      // markers: true,
    },
  })
  introBgTl
    .addLabel('a')
    .to('.sc-visual .bg img', { yPercent: 10, ease: 'none' }, 'a')
    .to('.sc-visual .bg .dimmed', { opacity: 1 }, 'a+=0.5')

  $(document).mousemove(function (e) {
    x = e.clientX - window.innerWidth / 2

    gsap.to('.sc-visual .bg img', {
      x: x / 30,
    })
  })
}

gsap.set('[data-fade]', { yPercent: 20, opacity: 0 })

gsap.set('[data-rotate]', {
  opacity: 0,
  transform: 'rotate(3deg) translate(-5%, 24%) scale(0.9)',
})

/**
 * data-fade effect
 * @i index
 * @el element
 * **/
$('[data-fade]').each(function (i, el) {
  gsap.to(el, {
    scrollTrigger: {
      trigger: el,
      start: '0% 80%',
      end: '100% 0%',
      // markers: true,
    },
    yPercent: 0,
    opacity: 1,
  })
})

/**
 * data-rotate effect
 * @i index
 * @el element
 * **/

$('[data-rotate]').each(function (i, el) {
  gsap.to(el, {
    scrollTrigger: {
      trigger: el,
      start: '0% 80%',
      end: '100% 0%',
      // markers: true,
    },
    opacity: 1,
    transform: 'rotate(0deg) translate(0, 0) scale(1)',
  })
})

/**
 * detection video effect
 * **/

const video = document.querySelector('.sc-detection .video');
const circle = document.querySelector('.video-area .circle');


circle.addEventListener('click', () => {
  if (video.paused) {
    video.play();    
  } else {
    video.pause(); 
  }
})

gsap.to('.video-wrapper', {
  scrollTrigger: {
    trigger: '.sc-detection .video-box',
    start: '0% 50%',
    end: '100% 100%',
    // markers: true,
    scrub: 1,
  },
  borderRadius: `40px`,
  width: `100%`,
})

/**
 * detection video switch
 */
gsap.to('.video-wrapper', {
  scrollTrigger: {
    trigger: ".video-wrapper",
    start: '-20% 80%',
    end: '100% 0%',
    // markers: true,
    onLeaveBack: () => {
      video.pause();
    },
    onLeave: () => {
      video.pause();
    }
  }
})


function mouseAni() {
  $(document).mousemove(function (e) {
    x = e.clientX
    y = e.clientY
    gsap.to('.cursor', {
      x: x,
      y: y,
      stagger: 0.003,
    })
  })

  $('.video-wrapper').mousemove(function (e) {
    gsap.to('.cursor', {
      scale: 0,
    })
    x = e.offsetX - $('.video-wrapper').width() / 2
    y = e.offsetY - $('.video-wrapper').height() / 2
    gsap.to('.circle .real', 2, {
      x: x,
      y: y,
    })

    $('.video-wrapper').mouseleave(function (e) {
      gsap.to('.cursor', {
        scale: 1,
      })

      gsap.to('.circle .real', 2, {
        x: 0,
        y: 0,
      })
    })
  })
}

/**
 * sensor card effect
 */
const sensorCardList = $('.sc-sensor .image-box')

sensorCardList.each(function (i, el) {
  // 조건에 따라 애니메이션 설정
  const animationProps = {
    scrollTrigger: {
      trigger: el,
      start: '0% 100%',
      end: '80% 100%',
      scrub: 3,
    },
    x: i % 2 === 0 ? '-100%' : '100%',
  }

  // 애니메이션 실행
  gsap.to(el, animationProps)
})

gsap.set('.group-list', { opacity: 0, y: 20 })

gsap.to('.group-list', {
  scrollTrigger: {
    trigger: '.group-list',
    start: '0% 70%',
    end: '0% 0%',
  },
  y: 0,
  opacity: 1,
})

/**
 * app stickey card effect
 */
const appCardList = $('.sc-app .app-card')

appCardList.each(function (i, el) {
  const nextElement = appCardList[i + 1]
  const dimmedElement = $(el).find('.overlay-box')
  gsap.set(dimmedElement, { opacity: 0 })

  if (nextElement) {
    gsap.to(el, {
      scrollTrigger: {
        trigger: nextElement,
        start: '0% 30%',
        end: '0% 0%',
        // markers: true,
        scrub: 1,
      },
      scale: 0.8,
    })

    gsap.to(dimmedElement, {
      scrollTrigger: {
        trigger: nextElement,
        start: '0% 30%',
        end: '0% 0%',
        scrub: 1,
      },
      opacity: 1,
    })
  }
})

/**
 * mission intro clip effect
 */

const clipAni = gsap.timeline({
  scrollTrigger: {
    trigger: '.sc-mission',
    start: '0% 0%',
    end: '100% 100%',
    // markers: true,
    scrub: 1,
    // pin: true,
    // pinSpacing: false,
  },
})

clipAni
  .addLabel('a')
  .to('.mission-intro .back', { clipPath: `circle(100% at 50% 50%)` }, 'a')
  .to('.mission-intro p', { left: `-140%` }, 'a')
  .to('.mission-headline', { opacity: 1 })
  .to('.sc-mission .sub-area', { opacity: 1 })

/***
 * about scroll list effect *
 */

const aboutListItems = $('.sc-about .list-item')

aboutListItems.each(function (i, el) {
  gsap.to(el, {
    scrollTrigger: {
      trigger: el,
      start: '0% 80%',
      end: '100% 80%',
      // markers: true,
      scrub: 5,
      onEnter: () => {
        aboutListItems.removeClass('active')
        $(el).addClass('active')
        $('.image-item').removeClass('active')
        $('.image-item').eq(i).addClass('active')
      },
      onLeaveBack: () => {
        aboutListItems.removeClass('active')
        $(el).addClass('active')

        $('.image-item').removeClass('active')
        $('.image-item').eq(i).addClass('active')
      },
    },
  })
})
