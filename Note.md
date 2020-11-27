# Note

Normally, SASS should be installed as dev dependency, but if you going to deploy it in heroku, it needs to be dependency as heroku skip installing dev dependency.

---

<!-- +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->

What is the difference between react-router and react-router-dom?

react-router has the core functionality for routing in react and react-router-dom has DOM related features such as `<Link/>` and `<BrowserRouter/>`. Just like how we have two libraries, react and react-DOM, the idea is the same with react-router and react-router-dom! React-router is a routing library that works with react-native as well, so it separates out the core routing functionality that is central to interacting with react from the ui specific library for the different platforms. The reason we only need to import react-router-dom is because react-router-dom will also re-export everything in react-router.

---

<!-- +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->
