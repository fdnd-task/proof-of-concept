gsap.to("#legends-marquee", {
  scrollTrigger: {
    trigger: "#legends-marquee",
    scrub: 2,
    start: "top-=400",
    end: "bottom-=100",
  },
  "--x": 1.8,
});

//-----------------HERO SECTION VIDEO ANIMATION-------------------------//

document
  .querySelector(".hero-play-button button")
  .addEventListener("click", () => {
    document
      .querySelector(".iframe-container")
      .classList.add("iframe-container-animation");
    setTimeout(() => {
      document.querySelector(".iframe-container").scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
    }, "500");
  });

//-----------------NAV REMOVE ON SCROLL-------------------------//
const showAnim = gsap
  .from(".top-nav", {
    yPercent: -100,
    paused: true,
    duration: 0.2,
  })
  .progress(1);

ScrollTrigger.create({
  start: "top top",
  end: 99999,
  onUpdate: (self) => {
    self.direction === -1 ? showAnim.play() : showAnim.reverse();
  },
});

//-----------------HERO TITLE ANIMATION-------------------------//
gsap.to(".slide-first", {
  opacity: 1,
  scale: 1,
  duration: 0.2,
  delay: 0.5,
  stagger: {
    each: 0.4,
  },
  onComplete() {
    gsap.to(".hero-title-legends span", {
      scale: 1,
      duration: 0.2,
      opacity: 1,
      stagger: {
        from: "left",
        each: 0.3,
      },
      onComplete() {
        gsap.to(".slide-second", {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          onComplete() {
            gsap.to(".hero-video", {
              x: 0,
              duration: 0.3,
            });
            gsap.to(".hero-play-button", {
              x: 0,
              opacity: 1,
              duration: 0.3,
            });
          },
        });
      },
    });
  },
});

//-----------------OPEN & CLOSE MENU-------------------------//
document
  .querySelector(".open-menu-button-wrapper")
  .addEventListener("click", () => {
    document.querySelector(".mobile-menu").classList.add("mobile-menu-slider");
    document.querySelector("body").style.overflow = "hidden";
    gsap.to(".menu-stagger", {
      y: 0,
      opacity: 1,
      delay: 0.4,
      ease: "none",
      stagger: {
        each: 0.2,
      },
    });
  });

document.querySelector(".close-menu-button").addEventListener("click", () => {
  document.querySelector(".mobile-menu").classList.remove("mobile-menu-slider");
  document.querySelector("body").style.overflow = "scroll";
  gsap.to(".menu-stagger", {
    y: -30,
    opacity: 0,
    duration: 0.2,
    delay: 0.4,
    stagger: {
      each: 0.1,
    },
  });
});

//-----------------SCREEN WIDTH CHECK-----------------------//

// This function makes sure the menu is removed and body is set to scroll when user resizes the screen above 600px when in mobile menu //

window.addEventListener("resize", () => {
  if (window.innerWidth >= 600) {
    document
      .querySelector(".mobile-menu")
      .classList.remove("mobile-menu-slider");
    document.querySelector("body").style.overflow = "scroll";
  }
});

// document
//   .querySelector(".open-menu-button-wrapper")
//   .addEventListener("click", () => {
//     gsap.to(".mobile-menu", {
//       scale: 1,
//       duration: 0.5,
//     });
//   });
