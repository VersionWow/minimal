import "./scripts/Lenis.js";
import ScrambleText from "./scripts/ScrambleText.js";

document.oncontextmenu = (e) => {
  e.preventDefault();
};

window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

// Elements
const h1El = document.querySelector(".section__one h1");
const taglineEl = document.querySelector("p.tagline");
const button = document.querySelector(".button");
const app = document.body;
const mainEl = document.querySelector("main");
const marquee = document.querySelector(".marquee");

const scrambleText = new ScrambleText(h1El, {
  timeOffset: 80,
  callback: function () {
    new ScrambleText(taglineEl, {
      timeOffset: 10,
    })
      .play()
      .start();
  },
}).start();

mainEl.onanimationend = (e) => {
  if (e.animationName === "fade") {
    marquee.classList.add("intoview");
  }
};

marquee.onanimationend = (e) => {
  if (e.animationName == "intoview") {
    scrambleText.play().start();
  }
};

const stateMachine = {
  initial: "start",
  states: {
    start: {
      on: { CLICK: "true" },
    },
    true: {
      on: { CLICK: "false" },
    },
    false: {
      on: { CLICK: "true" },
    },
  },
};

button.addEventListener("click", () => {
  scrambleText.play().start();
  console.log("after animation");

  const currentState = app.dataset.state ?? stateMachine.initial;
  const nextState =
    stateMachine.states[currentState].on["CLICK"] ?? currentState;
  app.dataset.state = nextState;

  setState("subscribing");
});

function debounce(callback, wait) {
  let id;
  return (...args) => {
    clearTimeout(id);
    id = setTimeout(() => {
      callback(...args);
    }, wait);
  };
}

const debounceSetState = debounce((newState) => {
  setState(newState);
}, 1000);

let alterValue;
function alterState() {
  return () => {
    if (alterValue === "success") {
      alterValue = "error";

      return alterValue;
    } else {
      alterValue = "success";
      return alterValue;
    }
  };
}

function setState(state) {
  button.dataset.state = state;

  const newState = alterState();

  const activeEls = document.querySelectorAll(`.button span[data-active]`);
  activeEls.forEach((el) => {
    delete el.dataset.active;
  });

  const shownEls = document.querySelectorAll(
    `.button span[data-show=${state}]`,
  );
  shownEls.forEach((el) => {
    el.dataset.active = "true";
  });

  if (state === "subscribing") {
    const alterState = newState();
    debounceSetState(alterState);
  }
}

setState("subscribe");
