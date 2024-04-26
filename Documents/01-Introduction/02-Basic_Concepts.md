# Basic Concepts
When you're building a [SPA (Single Page Application)](https://en.wikipedia.org/wiki/Single-page_application) with Light-Framework, the page layout should all be components (like navbar, side menu, page content, etc...).

## Event And Timer Handling
When creating an event listener or timer (timeout, interval, etc...), use the built-in `ListenerManager` and `TimerManager`, so all the listeners and timers will  be disposed after the component reloads or is removed.
