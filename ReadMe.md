#WPGulpTheme
A theme to demonstrate simplest implementation of WPGulp Boilerplate.
![WPGulpTheme](https://i.imgur.com/DzCCnKz.png)


## What Can [WPGulp](https://github.com/ahmadawais/WPGulp) Do?
 1. Live reloads browser with BrowserSync
 2. CSS: Sass to CSS conversion, Autoprixing, Sourcemaps, CSS minification.
 3. JS: Concatenates & uglifies Vendor and Custom JS files.
 4. Images: Minifies PNG, JPEG, GIF and SVG images.
 5. Watches files for changes in CSS or JS


##Getting Started ?
- Configure the project paths in gulpfile.js (Line #23 to #47)
- Open the project folder in the terminal and type `sudo npm install`  wait for the files to get downloaded. It will take about 2 minutes to add a node_modules folder inside your project.
- Once the download is complete type `gulp` and boom!


##Prerequisite & Gotchas
- Tested and built on Mac OS Yosemite.
- You must have Git and Node, NPM, Gulp installed globally. 
- You should never commit `node_modules` folder, you should exclude it in `.gitignore` file.

##Task Branches
- Live browser reload with [BrowserSync](https://github.com/ahmadawais/WPGulpTheme/tree/BrowserSync)
- Images minification with [Imagemin](https://github.com/ahmadawais/WPGulpTheme/tree/Images)


##License
The MIT License (MIT)
Copyright (c) 2016 ahmadawais <ahmadawais.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
