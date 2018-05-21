#
Welcome to Emojination


## file load order

1. HTML template files are always loaded before everything else
2. Files beginning with main. are loaded last
3. Files inside any lib/ directory are loaded next
4. Files with deeper paths are loaded next
5. Files are then loaded in alphabetical order of the entire path

### special directories

*imports*

Any directory named imports/ is not loaded anywhere and files must be imported using import.

*node_modules*

Any directory named node_modules/ is not loaded anywhere. node.js packages installed into node_modules directories must be imported using import or by using Npm.depends in package.js.

*client*

Any directory named client/ is not loaded on the server. Similar to wrapping your code in if (Meteor.isClient) { ... }. All files loaded on the client are automatically concatenated and minified when in production mode. In development mode, JavaScript and CSS files are not minified, to make debugging easier. CSS files are still combined into a single file for consistency between production and development, because changing the CSS file’s URL affects how URLs in it are processed.

*server*

Any directory named server/ is not loaded on the client. Similar to wrapping your code in if (Meteor.isServer) { ... }, except the client never even receives the code. Any sensitive code that you don’t want served to the client, such as code containing passwords or authentication mechanisms, should be kept in the server/ directory.

Meteor gathers all your JavaScript files, excluding anything under the client, public, and private subdirectories, and loads them into a Node.js server instance. In Meteor, your server code runs in a single thread per request, not in the asynchronous callback style typical of Node.

*public*

All files inside a top-level directory called public/ are served as-is to the client. When referencing these assets, do not include public/ in the URL, write the URL as if they were all in the top level. For example, reference public/bg.png as <img src='/bg.png' />. This is the best place for favicon.ico, robots.txt, and similar files.

*private*

All files inside a top-level directory called private/ are only accessible from server code and can be loaded via the Assets API. This can be used for private data files and any files that are in your project directory that you don’t want to be accessible from the outside.

*client/compatibility*

This folder is for compatibility with JavaScript libraries that rely on variables declared with var at the top level being exported as globals. Files in this directory are executed without being wrapped in a new variable scope. These files are executed before other client-side JavaScript files.

It is recommended to use npm for 3rd party JavaScript libraries and use import to control when files are loaded.

*tests*

Any directory named tests/ is not loaded anywhere. Use this for any test code you want to run using a test runner outside of Meteor’s built-in test tools.

<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_LOCATION_EXTRA_COMMANDS" />
