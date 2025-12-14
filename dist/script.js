/**
 * ## TypingDelayer
 *
 * Fire a custom callback upon waiting a delay from when the user stops typing.
 * Ideal for computations that must wait when the user stops typing.
 *
 * @author Giuseppe Tavella
 *
 */
class TypingDelayer {
  constructor({ inputSelector, onTypingStopped, delayMs = 600 }) {
    // chech that all required params have been passed
    if (!inputSelector || !onTypingStopped) {
        throw Error(`Error in "TypingDelayer" library. ` + `You must provide all required parameters.`);
    }

    // the instance of the class
    const self = this;
    // set instance properties
    this.inputSelector = inputSelector;
    this.onTypingStopped = onTypingStopped;
    this.delayMs = delayMs;
    this.lastTimeout = null;

    // start the core typing delay mechanism
    function start() {
      // check that the provided input id resolves to a real html node
      const inputEl = document.querySelector(inputSelector);
      const existsInput = inputEl instanceof HTMLElement;
      console.log(inputSelector)

      if (!existsInput) {
        throw Error(`Error in "TypingDelayer" library. ` + `The provided '${inputSelector}' CSS selector, to select the input, resolves ` + `to a html node that does not exist.`);
      }

      // add event handler
      inputEl.addEventListener("keyup", (event) => {
        self.handleTyping.bind(self)(event);
      });
    }

    // if the document was loaded
    if (document.readyState == "complete") {
      start();
    }
    // before the document is loaded
    else {
      window.addEventListener("load", () => {
        start();
      });
    }
  }

  handleTyping(event) {
    // every time the specified html element is being typed in,
    // clear the timeout of the last timeout, which means,
    // do not run the code that was in the last setTimeout function
    this.clearTimeout();

    // this code will be run in setTimeout
    function runOnFinishDelay() {
      // get the value of that element, supposedly an input
      const inputEl = document.querySelector(this.inputSelector);
      const inputValue = inputEl.value;
      const moreInfo = {
        // the keyboard event object that was triggered by the user
        event: event,
      };
      // call the onTypingStopped callback, providing data,
      // including the value of the input
      this.onTypingStopped(inputValue, moreInfo);
    }

    const newTimeout = setTimeout(runOnFinishDelay.bind(this), this.delayMs);
    // set the new timeout, which means, this code will be run next time
    // target html element will be typed in.
    this.setTimeout(newTimeout);
  }

  clearTimeout() {
    clearTimeout(this.lastTimeout);
  }

  setTimeout(newTimeout) {
    this.lastTimeout = newTimeout;
  }
}
