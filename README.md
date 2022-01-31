# Originally forked from Minimum Viable Startpage

![Screenshot](https://user-images.githubusercontent.com/2105468/151853013-1334cbb9-8e55-4cc1-bb76-b1d63f63621e.png)



## What is a startpage?
A startpage is a small custom webpage that replaces the new tab page of your browser. It's usually done for the sake of aesthetics or to raise the efficiency of your day-to-day work with the Internet. (But mostly for aesthetics)

## Shortcuts
MVS supports keyboard shortcuts, so you don't even have to use the mouse to get anywhere! By default shortcuts come in the <kbd>Tab</kbd>+<kbd>KEY</kbd> format. <kbd>Tab</kbd> in this case is the *shortcut starter* which tells the page to start listening for shortcuts. <kbd>KEY</kbd> is the actual shortcut unique to each item on the page. Both parts of a keyboard shortcut are customizable.

Forgot which key led to which page? Simply pressing <kbd>Tab</kbd> will briefly flash all the shortcuts next to their relevant links.

## Customization
To change the groups of links and keyboard shortcuts, change the `MASTER_MAP` object inside `script.js`. The syntax should be extremely intuitive.

## Installation
To install this startpage and use it on your local machine, simply clone the repository and set your browser's new tab URL to the `index.html` filepath.

(Note: Your browser may not support changing new tab's URL natively. I use [New Tab Redirect](https://chrome.google.com/webstore/detail/new-tab-redirect/icpgjfneehieebagbmdbhnlpiopdcmna) extension for Chrome.)

## Credits
* [Wallpaper used for the background](https://wallpapercave.com/wp/VD8ldiL.jpg)

## License
Distributed under the MIT license. See LICENSE for details.
