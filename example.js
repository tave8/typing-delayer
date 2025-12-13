function callback(value, moreInfo) {
    // <value> contains the input value after waiting the delay from when the user is done typing
    console.log(value)
    console.log(moreInfo)
    // <moreInfo> is an object that can provide more info (for future implementations)

}



const typingDelayer = new TypingDelayer({
    // the input id
    inputId: "myInput",
    // reference to the callback
    onTypingStopped: callback
});