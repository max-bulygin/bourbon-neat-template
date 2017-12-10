# bourbon-neat-starter

Starter kit for new HTML projects featuring:
#### CSS
* [Bourbon](http://bourbon.io/docs/)
* [Neat](https://neat.bourbon.io/docs/latest/)
* [Animate.css](https://github.com/daneden/animate.css)
* [Normalize.css](https://github.com/necolas/normalize.css/)

#### JS
* [jQuery](http://api.jquery.com)
* [svg4everybody](https://www.npmjs.com/package/svg4everybody)
* [Owl Carousel 2](https://owlcarousel2.github.io/OwlCarousel2/docs/started-welcome.html)
* [Waypoints](http://imakewebthings.com/waypoints/guides/jquery-zepto/)

## Quick start

* `npm i` installs all npm dependencies;
* `bower i` installs all bower dependencies.
* Running `gulp` will start the server and open page in Chrome.

## Folder structure

* :open_file_folder: `dev` - working directory
    * :open_file_folder: `fonts` - your fonts
    * :open_file_folder: `html` - your html pages
        * :file_folder: `templates` - your page partials
    * :open_file_folder: `img` - images
        * :file_folder: `icons` - your svg icons
        * :file_folder: `sprite` - your png icons
    * :open_file_folder: `js` - javascript
        * :file_folder: `modules` - your js modules
    * :open_file_folder: `sass`
        * :file_folder: `base` - the most generic styles
        * :file_folder: `blocks` - modules or block specific styles
        * :file_folder: `settings` - globally-available variables and configs
        * :file_folder: `tools` - useful mixins and helper classes
