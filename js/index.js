const APP = {
  init: () => {
    // add EventListener
    APP.addEvents();
    APP.fetchProjects();
    // APP.setUp();
  },

  setUp() {
      const options  = {
        rootMargin: "0px 0px 0px 0px"
      }

      function callback(entries, observer) {
        entries.forEach((entry) => {
          if(entry.isIntersecting) {
            entry.target.classList.add("reveal");
            console.log(entry.target);
            observer.unobserve(entry.target);
          }
        })
      }

      let observer = new IntersectionObserver(callback, options);
      let arr = [...document.querySelectorAll("h2"), ...document.querySelectorAll("p"), ...document.querySelectorAll("button")];
      console.log(arr);
      arr.forEach((element) => {
        observer.observe(element);
      })
  }
  ,

  addEvents() {
    document.querySelector(".hamburger-menu").addEventListener("click", () => {
      document.querySelector(".hamburger").classList.toggle("active");

      // toggle mobile nav
      document.querySelector("nav").classList.toggle("mobile-nav");
      document.querySelector("nav").classList.toggle("visibility");
      document.querySelector(".container").classList.toggle("overlay");
      document.body.classList.toggle("fixed");
    });

    document.addEventListener("scroll", APP.debounce(APP.scroll, 100));
    document.querySelector(".container").addEventListener("click", APP.closeMenu);
    document.querySelector(".nav").addEventListener("click", APP.close);
  },

  close(ev) {
    let target = ev.target
    if(target.tagName === "A") {
        if(window.innerWidth <= 600) {
            APP.closeMenu();
        }
    }
  },

  closeMenu() {
    document.querySelector(".hamburger-menu").dispatchEvent(new Event("click"));
  },

  scroll() {
    if (window.scrollY > 0) {
      document.querySelector(".header").classList.add("scroll");
    } else {
      document.querySelector(".header").classList.remove("scroll");
    }
  },

  fetchProjects() {
    fetch("./data.json")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("something went wrong");
      })
      .then((data) => {
        APP.display(data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  display(data) {
    let df = new DocumentFragment();
    data.forEach((item, index) => {
      let a = document.createElement("a");
      let div = document.createElement("div");
      let img = document.createElement("img");
      let h2 = document.createElement("h2");
      let p1 = document.createElement("p");
      let p2 = document.createElement("p");

      a.href = item.href;
      a.alt = "some project";
      a.target = "_blank";
      img.src = "./images/arrow-interface-send.svg";
      h2.textContent = item.heading;
      p1.textContent = item.content;
      p2.textContent = item.tech;

      // adding some css classes
      div.classList.add("card");
      div.classList.add(`card-${index + 1}`);
      p1.classList.add("first");

      div.appendChild(img);
      div.appendChild(h2);
      div.appendChild(p1);
      div.appendChild(p2);
      a.appendChild(div);
      df.appendChild(a);
    });
    document.querySelector(".projects").appendChild(df);
    APP.setUp();
  },

  debounce(func, delay) {
    let timeout = undefined;

    return (ev) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func.call(window, ev);
      }, delay);
    };
  },
};

document.addEventListener("DOMContentLoaded", APP.init);

// to do
// overlay click
// nav links click in mobile view
