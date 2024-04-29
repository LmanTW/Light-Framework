# What Is Light-Framework
Light-Framework is a really simple framework for building [SPA (Single Page Application)](https://en.wikipedia.org/wiki/Single-page_application). I want this framework to be minimal, so the framework itself only provides a component system and several other functionalities, but other functionalities can be easily added using the plugin system.

> "Only use the things you need." that's what he said (me).

## Keep Things Simple
You don't need hundreds of kilobytes to build a simple [SPA (Single Page Application)](https://en.wikipedia.org/wiki/Single-page_application), so why not just keep things simple? That's why Light-Framework doesn't have complex concepts, and contains some basic functionalities.

## Downsides
Nothing is perfect, and Light-Framework is no exception.

* **More Code**: You may need to write more code compared to other frameworks (Although I don't think this is a bad thing on a small scale, because you should understand what's happening in your program, and writing your own code can be helpful.).
* **Not Friendly For SEO**: [SEO](https://en.wikipedia.org/wiki/Search_engine_optimization) may require server-side rendering, because it'll be better if search engines can fetch the full content of your application (The component system will require script execution, so content in the component won't be visible to search engines.).
* **Not For Scale**: Light-Framework is not for large-scale applications, because sometimes "simple" just makes everything more "complicated".
