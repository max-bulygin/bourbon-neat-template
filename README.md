# bourbon-neat-starter

Starter kit for new projects relying on [Bourbon](http://bourbon.io/docs/) mixin library and [Neat](https://neat.bourbon.io/docs/latest/) grid system, Normalize.css, [Animate.css](https://github.com/daneden/animate.css)

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
    * :open_file_folder: `sass`
        * :file_folder: `base` - the most generic styles
        * :file_folder: `blocks` - modules or block specific styles
        * :file_folder: `settings` - globally-available variables and configs
        * :file_folder: `tools` - useful mixins and helper classes
