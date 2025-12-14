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
  constructor({ inputSelector, onTypingStopped, delayMs = 600 }, config={}) {
    // chech that all required params have been passed
    if (!inputSelector || !onTypingStopped) {
      throw Error(`Error in "TypingDelayer" library. ` + `You must provide all required parameters.`);
    }

    const { callerContext } = config;

    // the instance of the class
    const self = this;
    // set instance properties
    this.inputSelector = inputSelector;
    this.onTypingStopped = onTypingStopped;
    this.delayMs = delayMs;
    this.lastTimeout = null;
    // the context of the caller. the user must specify which context
    // "this" should point to. otherwise
    this.callerContext = callerContext ? callerContext : this;

    // start the core typing delay mechanism
    function start() {
      // check that the provided input id resolves to a real html node
      const inputEl = document.querySelector(inputSelector);
      const existsInput = inputEl instanceof HTMLElement;

      if (!existsInput) {
        throw Error(
          `Error in "TypingDelayer" library. ` +
            `The provided '${inputSelector}' CSS selector, to select the input, resolves ` +
            `to a html node that does not exist.`
        );
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
      // binding the callback context to the context it was provided,
      // will make sure that the function reference passed as callback
      // for "onTypingStopped" will make the "this" in the callback,
      // correctly point to the context it was called from
      // this means the callback for onTypingStopped will be able
      // to access "this" as expected. for example, if the
      // onTypingStopped callback is a class method, this means
      // this class method will have the "this" correctly point to
      // the class instance.
      // this is not an extra feature, instead it's a mechanism
      // to make what's expected, work as expected
      this.onTypingStopped.bind(this.callerContext)(inputValue, moreInfo);
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
