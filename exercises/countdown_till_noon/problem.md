Woo! You have your development environment all set up, so now we're ready to
give into Choo and how it works. Choo is an _event based_ framework, which
means that there's a big continous event loop that communicates with both
sender and recipient. It looks a bit like this:

```
          --------------
          |            |
--------> | Event Loop | ------>
 Messages |            | Actions
          --------------
```

Think of it as a big blackbox that takes messages from your code that say
"Hey, can you activate Event XYZ for me?", and redirects them to the
proper recipient, in this case, an bit of code that only fires on Event XYZ.

You can send messages from anywhere within your code.
