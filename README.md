# electronCalc
Simple calculator in electron. The purpose of this is not to make an incredibly accurate calculator but to experiment and practice using electron.

![screenshot](https://media.githubusercontent.com/media/Matthew-Smith/electronCalc/master/screenshot.png)

## What it does
This app has a main window that has the standard buttons you would find on a calculator and a history window that shows all the previously evaluated equations. The math evaluations are done by the npm package String-Math.

When you Press the H button from the calculator the history window will open, and when you select one of the equations from history it will close the history window and put the equation into the results section.

## Running
To run clone the source then navigate to the folder you cloned it into and run the following
```
npm install
npm start
```

## Known bugs
You can place decimals in a number multiple times (but not back to back)
