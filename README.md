# Typing Delayer

A computation must run only when the user is done tipying? Problem solved.

A callback will be called when the user will stop typing after the provided or default delay.

This callback will contain the value of the input, which can be now used in your computation.

The callback will therefore be called **only after** waiting the delay from the moment the user is done typing, not when the user is typing.

## Installation

### CDN

```
https://typing-delayer.giutav.workers.dev/script.js
```


### HTML


```
<script src="https://typing-delayer.giutav.workers.dev/script.js"></script>
```


## API

```
instance = new TypingDelayer({
    inputSelector: str of valid CSS selector
    onTypingStopped: function
    delayMs: integer
})
```

```
callback(value: str, moreInfo: obj) 
```

```
moreInfo: {
    event: keyboard event
}
```



## Usage

All you have to do:

- Provide the CSS selector the input where the user types. document.querySelector() will be used, so the first matching html node will be used
- Provide a callback that specifies what you do once you have the input value
- (optional) Provide a delay in milliseconds which means "wait X delay before calling the callback"

### Simplest case

Simplest case with default delay (600 milliseconds).

You can even ignore the returned class instance, if you don't need it, so it's less code.  

```js
 
function callback(value, moreInfo) {
    // <value> contains the input value after waiting the delay from when the user is done typing
    // runComputation(value)

    // <moreInfo> is an object that can provide more info (for future implementations)

}

// ignore returned class instance
new TypingDelayer({
    // the input CSS selector
    inputSelector: "#myInput",
    // reference to the callback
    onTypingStopped: callback
});

```


### Provide delay

```js
 
function callback(value, moreInfo) {
    // <value> contains the input value after waiting the delay from when the user is done typing
    // runComputation(value)

    // <moreInfo> is an object that can provide more info (for future implementations)

}

const typingDelayer = new TypingDelayer({
    // the input CSS selector
    inputSelector: "#myInput",
    // reference to the callback
    onTypingStopped: callback,
    // delay in milliseconds. in this case, waits for 2 seconds before firing callback
    delayMs: 2000
});

```

