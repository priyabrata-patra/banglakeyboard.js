<img src="https://drive.google.com/uc?export=download&id=1Yt05dJt7KYaRRWTTl9ZYEmvwvjHaDG3h" alt="banglakeyboard.js javaScript library logo" title="banglakeyboard.js javaScript library logo" />

# banglaKeyboard.js

**banglaKeyboard.js** is a JavaScript library for typing Bengali using an English keyboard. It is very easy to add in a website and works perfectly all **browsers on PC or mobile**. banglaKeyboard.js is a very lightweight JavaScript program.
[Click here](https://bangla-keyboard.netlify.app/) to see the live demo of banglakeyboard.js.

## Installation

First, download the banglakeyboard.js file and add it to the &lt;head&gt; section of your HTML code, or copy the CDN link below and add it to the &lt;head&gt; section.

### CDN

```html
<script src="https://cdn.jsdelivr.net/gh/priyabrata-patra/banglakeyboard.js@main/banglakeyboard.js"></script>
```

Then, in the &lt;input&gt; and &lt;textarea&gt; fields where you want to type in Bengali using the English keyboard, simply add the word 'bengalikeyboard' as an attribute.

### Example:

```html
<!-- Add banglaKeyboard in input tag -->
<input type="text" id="fname" bengalikeyboard>

<!-- Add banglaKeyboard in textarea tag -->
<textarea id="tname" bengalikeyboard name="fildname" rows="4" cols="50"></textarea>
```

## Use the CDN

We recommend using the CDN version of the library. You don't need to download the ".js" file or specify a version number manually.

Once the CDN is added to your project, everything is handled automatically. When a new version of the library is released, your project will automatically use the latest version.

This means you don't need to download the updated ".js" file and replace it in your project every time the library is updated.

Just add the CDN once — and the updates will be handled automatically.

## Featurrs of banglaKeyboard.js

* The best feature of this keyboard is phonetic typing. You can type Bengali words using English letters. Example:`k ='ক'`,`kh ='খ'`

* Works perfectly on all mobile and PC browsers.

* Full user friendly.

* Provides support for using English and Bengali keyboards together.

* Very lightweight JavaScript program.

## Code Examples

```html
<!DOCTYPE html>
<html>
    <head>
       <title>ENGLISH TO BANGLA CONVERT KEYBOARD</title>

       <!-- Add CDN in head tag -->
       <script src="https://cdn.jsdelivr.net/gh/priyabrata-patra/banglakeyboard.js@main/banglakeyboard.js"></script>

    </head>
    <body>
        <h1>ENGLISH TO BANGLA CONVERT KEYBOARD</h1>
        <div>Please type anything..</div><br>
        
        <!-- Add banglaKeyboard in textarea tag -->
        <textarea id="tname" bengalikeyboard name="fildname" rows="10" cols="55"></textarea>
        
    </body>
</html>
```
## end
Thanks for checking this out. if you have any questions, please contact me.
