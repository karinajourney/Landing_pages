Vue.component("carousel-item", {
    props: {
      image: {
        type: Array,
      },
    },
    template: `
      <div class="carousel__item">
        <img class="carousel__item__image" :src="image.src" :alt="image.alt"/>
        <h2 class="carousel__item__caption">{{image.caption}}</h2>
      </div>
    `,
  });
  
  Vue.component("carousel-nav", {
    template: `
      <div class="carousel__nav">
        <div
          class="carousel__nav__arrow"
          :class="arrow.class"
          v-for="arrow in arrows"
          :key="arrow.action"
          @click="$emit('arrow-clicked',arrow.action)"
        >
          <span class="carousel__nav__arrow__icon" v-html="arrow.icon"></span>
        </div>
      </div>
    `,
    data() {
      return {
        arrows: [
          {
            icon: "&lsaquo;",
            class: "carousel__nav__arrow--prev",
            action: -1,
          },
          {
            icon: "&rsaquo;",
            class: "carousel__nav__arrow--next",
            action: 1,
          },
        ],
      };
    },
  });
  
  Vue.component("carousel-bullets", {
    props: {
      images: {
        type: Array,
      },
      selected: {
        type: String,
      },
    },
    template: `
      <div class="carousel__bullets">
        <span
          class="carousel__bullet"
          :class="{'carousel__bullet--selected': selected==image.src}"
          v-for="image in images"
          :key="image.src"
          @click="$emit('bullet-selected', image.src)"
        ></span>
      </div>
    `,
  });
  
  new Vue({
    el: "#carousel",
    data: {
      images: [
        {
          src: "../image/nft_demo4.jpg",
          alt: "img no 1",
          caption: "",
        },
        
        {
          src: "../image/nft_demo3.jpg",
          alt: "img no 3",
          caption: "",
        },
        {
          src: "../image/nft_demo6.jpg",
          alt: "img no 4",
          caption: "",
        },
        {
          src: "../image/nft_demo1.jpg",
          alt: "img no 2",
          caption: "",
        },
        {
          src: "../image/nft_demo7.jpg",
          alt: "img no 6",
          caption: "",
        },
        {
          src: "../image/nft_demo4.1.jpg",
          alt: "img no 1",
          caption: "",
        },
        
      ],
      currentImage: "../image/nft_demo4.jpg",
      imgIdx: 0,
      imgCount: null,
      translateWidth: 0,
      carouselWidth: 600,
      carouselHeight: 400,
      transitionTime: 700,
      showTime: 3000,
      carouselInterval: null,
    },
    created() {
      this.imgCount = this.images.length-1;
      // this.imgCount = 4;
      this.setCarouselParams();
      this.getCurrentIdx();
      this.setTranslateWidth();
      this.autoChange();
    },
    updated() {
      this.getCurrentIdx();
      this.setTranslateWidth();
    },
    methods: {
      changeImageWithBullet(data) {
        this.currentImage = data;
      },
      getCurrentIdx() {
        this.imgIdx = this.images.findIndex(img => img.src === this.currentImage);
      },
      setCurrentImage() {
        this.currentImage = this.images[this.imgIdx].src;
      },
      setTranslateWidth() {
        this.translateWidth = this.imgIdx * this.carouselWidth;
        document.documentElement.style.setProperty(
          "--carousel-translate",
          -this.translateWidth + "px"
        );
      },
      setCarouselParams() {
        document.documentElement.style.setProperty(
          "--carousel-height",
          this.carouselHeight + "px"
        );
        document.documentElement.style.setProperty(
          "--carousel-width",
          this.carouselWidth + "px"
        );
        document.documentElement.style.setProperty(
          "--carousel-transition-time",
          this.transitionTime + "ms"
        );
      },
      changeImageWithNav(value) {
        const newIdx = this.imgIdx + value;
        if (newIdx < this.imgCount && newIdx >= 0) {
          this.imgIdx = newIdx;
        } else if (newIdx === this.imgCount) {
          this.imgIdx = 0;
        } else if (newIdx < 0) {
          this.imgIdx = this.imgCount - 1;
        }
        this.setCurrentImage();
        this.setTranslateWidth();
      },
      autoChange() {
        this.carouselInterval = setInterval(() => {
          this.changeImageWithNav(1);
        }, this.showTime);
      },
      pauseAutoChange() {
        clearInterval(this.carouselInterval);
      },
    },
  });