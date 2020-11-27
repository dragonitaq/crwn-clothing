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
