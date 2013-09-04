localizr.js
========

localizr.js provides a simple way to localize your web apps!

###Why?
Simple - i was not statisfied with the alternatives that are provided by various (i18n) plugins. I had the following scenario when i developed localizr:

A SharePoint Server with a custom Web Part and the requirements stated that the Web Part's language should be based on the 
culture of the server and not be depending on the client's browser. Most of the plugins i found on the internet loaded the 
resources based on the browser's language, but in my case this was just stupid... server language is english but the web part is
in german, wtf right?

###How?
localizr.js loads JSON objects from the web server via an async ajax call and allows you to easily access them with the following API.

#####Resource Files
Resources Files are stored on the web server in JSON format. However, they are stored as `.js` files in order to be compatible
with all types of web servers (i.e. SharePoint blocks `.json` files from being loaded).

Lets consider the following file, `/path/to/resources/en.js`.
```javascript
{
  "welcome_msg" : "Hello World",
  "goodbye_msg" : "Good Bye"
}
```

Now, if you would like to have the same in, for example, german, here you go `path/to/resources/de.js`
```javascript
{
  "welcome_msg" : "Hallo Welt",
  "goodbye_msg" : "Auf Wiedersehen"
}
```

#####Loading Resource Files

To load the resources file and start localizing your app, use the following code:

```javascript
//load the english resources
localizr.init("path/to/resources", "en", function() {
  
  //alerts 'Hello World'
  alert(localizr.get("welcome_msg");
});
```

To load the german resources, simply change from `en` to `de`.

```javascript
//load the german resources
localizr.init("path/to/resources", "de", function() {
  
  //alerts 'Hallo Welt'
  alert(localizr.get("welcome_msg"));
});

```

The really cool thing about this approach is that you can virtually use any mechanism to detect the language and load 
the correct resources! If you want to change the language based on the client's browser, that's cool - just use `navigator.language`
to get the language and create your resource files accordingly! 

If you want to change the language based on the server, and the server provides you with the current culture (whether from server side code or javascript), that's cool too!
In my case, i got it to work with SharePoint just fine - i use `SP.Res.lcid` to decide which language the server is running in and created the files like this: `1033.js`, `1031.js`, etc..
