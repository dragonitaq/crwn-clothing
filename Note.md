# Note

Normally, SASS should be installed as dev dependency, but if you going to deploy it in heroku, it needs to be dependency as heroku skip installing dev dependency.

---

<!-- +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->

What is the difference between react-router and react-router-dom?

react-router has the core functionality for routing in react and react-router-dom has DOM related features such as `<Link/>` and `<BrowserRouter/>`. Just like how we have two libraries, react and react-DOM, the idea is the same with react-router and react-router-dom! React-router is a routing library that works with react-native as well, so it separates out the core routing functionality that is central to interacting with react from the ui specific library for the different platforms. The reason we only need to import react-router-dom is because react-router-dom will also re-export everything in react-router.

---

<!-- +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->

When we `import { Link } from 'react-router-dom'` and use `<Link>` in React, it will always be rendered as HTML anchor tag. Then we can style it like we normally do.

---

<!-- +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->

Sometimes, in React component we will see `<div/>` is shorthand of `<div></div>`.
We can use the shorthand if we don't have children. It is actually a feature of HTML5 but babel will make sure that it's compatible with HTML 4.

---

<!-- +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->

`import { ReactComponent as Logo }` is a special syntax from React.

This new special syntax is used when importing SVG in React. The ReactComponent import name is special and tells Create React App that you want a React component that renders an SVG, rather than its filename.

---

<!-- +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->

One important thing to keep in mind about redux is that the reducer is something that represents the state and how it changes INSIDE of the store. The store is actually what allows us to provide the context of the state (which is composed from our root reducer) to our entire application. You can see the store as a service that allows us to "dispatch" actions to our reducers (which are just functions that take the current state, and an action) and go through a case statement to determine what new object to return.

The reducers are just how the store gets the objects that it uses as the state, but all the coordination and context that the connect HOC uses in order to allow our components to "hook" into state and dispatch is handled by the store object. So you can think our root reducer as the thing that just manages how our store gets the state object, but the store is the central coordinator inside of our redux flow.

---

<!-- +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->

Reselect’s createSelector function are memoized. That’s a fancy word to mean that the function remembers the arguments passed-in the last time it was invoked and doesn’t recalculate if the arguments are the same. You can view it a little bit like caching.

Reselect selectors can be composed/chained together easily. This way, each selector stays small and focused on one task.

---

<!-- +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->

Prerequisite understanding:

1. If reducer return new value (new object), then this mean state change
2. When state change, store will run every mounted component's mapStateToProps

I hope this is clear at this point, because it is crucial to explain why memoization is needed

Imagine component A has some expensive calculation in its mapStateToProps

```Javascript
const mapState = (state) => {
     return {profit: expensiveCalculation(state.num1,state.num2,state.num3)};
}
```

Now recall what I mentioned earlier: any state change will run all mapStateToProps!

Imagine component B dispatch an action that return new state from reducer, even though this state change has nothing to do with component A, store will still use the same state to run component A's mapStateToProps, thus the expensiveCalculation run every single time for no obvious reason!

To prevent this, reselect library help us with memoization

```Javascript
const mapState = (state) => {
     return {profit: selectProfit(state)};
}
```

When mapStateToProps is called again due to any state update of any other components, Reselect will not run expensive calculation if the input values state.num1, state.num2, state.num3 remain the same with previous run.

So now you understand the purpose of selector, but keep in mind that redux state change doesn't directly cause component to re-render, the thing that really cause component to re-render is mapStateToProp!

Also keep in mind that: state change = trigger every mapStateToProps

Component will re-render if mapStateToProps return object that has different content compare to previous content

content = the value of mapStateToProp's object properties

The process is:

Action dispatch---> reducer update state ---> if state change ---> mapStateToProp run, receive latest state and compare current content with previous content ---> if content difference then re-render (by utilizing shouldComponentUpdate)

Example:

previous state change: mapStateToProps = ()=> ({count: 1})
current state change: mapStateToProps = ()=> ({count: 2})

This will re-render the component

Do note that state change doesn't necessary lead to different content, because content usually read only small slice of the state!!!

To carry out the experiment:

try mapStateToProps = ()=> ({count: Math.random()}) , this will re-render component every time any action is dispatched.

try mapStateToProps = ()=> ({count: 1}) , this will not re-render component every time any action is dispatched.

---

<!-- +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->

Reselect does offer more benefits than just memoization for computed values, it allows us to abstract away the logic for pulling shared state values across the application into components. For example, if you have 4 components that need the hidden property from the cart state, using a selector is like abstracting away the code to get that value. If we ever change the shape of our cart state object, or if we change the way we get that value (say through computation instead) then we just have to change the code in the selector logic instead of updating it in 4 different places in the codebase. The performance hit is also negligible; reselect is written efficiently since selectors are all pure functions which compute extremely quickly as the derivation depends on nothing but the inputs. You can kind of see this as a general best practice of splitting up large functions in javascript into multiple smaller pure functions that are easily re-shareable (even if we don't need to at the moment)!

In our app, most Reselect simply pull a value off the object, while we're not memoizing a computation we are abstracting the logic to pull the value. The official documentation just has them as a composable selector; if you check the documentation you'll see in their examples they write selectors for all values off a redux state which may get used to pull properties off and compute them together in another selector.

---

<!-- +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->

## Dispatch shorthand

connect() actually passes dispatch into our components as a props even if we do not supply a second argument to it. So if we don't supply mapDispatchToProps as the second parameter, connect() will pass the dispatch into our component. What's great about it is that it saves the effort to write mapDispatchToProps.

We can certainly use it in lieu of mapDispatchToProps as well as use it for multiple actions. The key idea is that if you don't need to create more elaborate functions or use structured selectors, passing dispatch directly into your component is perfectly viable.

The idea is mostly around the context of the component you're building and the functions you are passing into it. Having mapDispatchToProps makes the component a bit more readable because you've separated the functions that are meant to be props being passed in as exactly that; props. If you instead pass dispatch in, it's an argument that you use inside of your component, and if you end up creating function definitions inside of your component which you then call somewhere in the component body, it makes it a bit harder to read. This might be necessary in some cases though where it relies on some internal component state, but the idea is that you have access to both methods with either mapDispatchToProps or just taking the dispatch property as a prop.

---

<!-- +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->

Words from Yihua regarding file & folder name case sensitivity for git:

It's possible that when you changed the names to lowercase, git didn't actually save your changes since by default it tends to ignore lower case folder name changes(which is super annoying), so even though on your local it was updated, GitHub was not aware! It happened to me before on another project so I definitely empathize :P the easiest way to force the change is to use the command line mv command and move the folder into a new one with the name you want rather than renaming it manually in your editor.

---

<!-- +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->

## Link vs history.push

history.push is more powerful than Link as Link is component and require user to click it while history. history.push on the other hand, may or may not require user interaction depend on your implementation and you can use it pretty much any where in the component (like componentDidMount where you can only use Link in render). In short if you need a link, then use Link, or else use history.push for more flexible and powerful purpose.

---

<!-- +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->

## API call vs subscription

The only caveat here is that the only time we'll ever get new data from our back end is when we remount our shop. This is because we're no longer leveraging the live updates stream style that the observable pattern lended us when we were using onsSnapshot as before. Now we're literally doing one off API calls inside of our component at Mount leveraging the promised chain style of doing asynchronous event handling now.

---

<!-- +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->

If redux-thunk middleware is enabled, anytime you attempt to dispatch a function instead of an object, this middleware will call that function which dispatch method itself as the first argument.

TRedux-thunk is just a function that returns a function that gets access to dispatch so that we can dispatch multiple actions and handle asynchronous code inside of it.
