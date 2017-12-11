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

## Basic rules and how it works

1. Use `bower` to manage all CSS dependencies, and `npm` for all JS dependencies. It may be subject to change in the future.
2. All work is going on in`dev` folder where Gulp will generate some files and folders:
    * `css` folder with `styles.css` and `styles.css.map`;
    * `index.html` file compiled from `html` folder and other pages you placed there;
    * `bundle.js`, `bundle.min.js`, `bundle.min.js.map` files in `js` folder, compiled from `scripts.js`;
    * `icons.svg` and `sprite.png` files generated from corresponding `img` sub-folders;

## Upcoming features task list

- [ ] Add code style linters
- [ ] Setup full build process
- [ ] Add few more useful jQuery plugins such as Fancybox, Smooth Scroll etc
- [ ] Bring more useful classes and code snippets in project, expand classes with generic 'fit everywhere' styles
