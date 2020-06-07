# Botweet

This application, including the file structure, was created to demonstrate the software architecture and some React Native skills.

**App architeture:**
This application architecture tries to exploit Atomic Design pattern, which bring more organization to files.

**Under the hood:**
- React Native 61.5;
- Some good *spices* ( :D);

**What you can expect (BAD):**
- Bugs (off cource :D);
- Weak form fields validations;
- Missing tests on some modules;
- Some profile images are loaded from internet, the you can face delay to download if no good connection;


**What you can expect (GOOD):**
- [Sketch App](https://www.sketch.com/ "Sketch") file with screens prototypes included in the root directory;
- Pixel perfect screens and components;
- Some Animations with [Lottie](https://airbnb.io/lottie/#/ "Lottie") and Animatable ;
- UX Trends like gradients, micro interactions and another nice stuffs;
- I18n including english and portuguese languages.
- Good and centralized stylization;
- Data persistence with Redux Persist;
- Custom splashscreen with the product logo, as it should be (sorry, I don't like to spoil the design);
- Developer contact and information are on the right Drawer menu.
- Was tested on Android and iOS;

**Design:**
- Logo based on [O Boticário](https://www.boticario.com.br/ "O Boticário") identity;
- The font used in logo is [Bodrum Sweet](https://www.myfonts.com/fonts/buyukselcom/bodrum-sweet/ "Bodrum Sweet");
- The font used in app content is [Montserrat](https://fonts.google.com/specimen/Montserrat "Montserrat");

# Behavior:
All data generated inside the app, is persisted on local storage, no API calls to save data online.

There is no profile screen to change data, but you can do logout and purge Redux store on developer menu.

Some fake posts are present on initial state, then when you create account this posts will be there.

The posts are limited to 280 characters, and you will be advised by the graphical counter on the post input field.

# App images:
![](https://imgur.com/V0wQdme.png)

![](https://i.imgur.com/95ih0XL.png)

![](https://imgur.com/VzLAV4H.png)

# Last considerations:
 This is a good structure to start new React Native projects, it can save a lot of time to jump start.

**Contact:**
- João Belem Junior
- junior.jb@gmail.com
