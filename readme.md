<img src=https://i.imgur.com/IIlbpnq.gif width="300px" height="150px">

# CONNECT 4

Connect 4 is a 2 player board game in which players choose a color and take turns dropping their colored discs into a vertical game board. The board typically consists of 7 columns and 6 rows, when the player's pieces are dropped into the board they occupy the lowest available space within that column. The object of the game is to try and get 4 consecutive pieces in any alignment: vertical, horizontal, or diagonal. This version of Connect Four is inspired by a retro futuristic Cyberpunk art design. Connect Four was originally created by Howard Wexler and Ned Strongin and published by Milton Bradley / Hasbro in 1974. [Click here to learn more!](https://en.wikipedia.org/wiki/Connect_Four)

## Screenshots:

![Screenshot Play](https://i.imgur.com/NVdpraT.png)
![Screenshot Win](https://i.imgur.com/0DEfpre.png)

## Technologies Used:

The technologies used to implement this version of the game are: **HTML, JavaScript, & CSS**

## Getting started:

This version of connect 4 is deployed via GitHub Pages. You can try out the game yourself by following this link:<br>
https://micahsellis.github.io/Connect4/<br>
_The recommended browser to play this game is [Google Chrome](https://google.com/chrome/)._

## Next Steps:

- Create AI to play against a single player.
- Create a mobile friendly version of the game.
- Add animation effects to the pieces falling onto the board.

## Wireframe:

![wireframe](https://i.imgur.com/9MbRlZb.jpg?1)

## Pseudocode:

```
1) Define required constants:
    1.1) Define a colors object with keys of 'null' (when the circle is empty), and players 1 & -1. The value assigned to each key represents the color to display for an empty circle (null), player 1 and player -1.

2) Define required variables used to track the state of the game:
    2.1) Use a board array to represent the circles.
    2.2) Use a turn variable to remember whose turn it is.
    2.3) Use a winner variable to represent three different possibilities - player that won, a tie, or game in play.


3) Store elements on the page that will be accessed in code more than once in variables to make code more concise, readable and performant:
    3.1) Store the 42 elements that represent the circles on the page.

4) Upon loading the app should:
    4.1) Initialize the state variables:
        4.1.1) Initialize the board arrays to 42 nulls to represent empty circles. The 7 arrays nested in the board array will represent the different columns each containing 6 elements.
        4.1.2) Initialize whose turn it is to 1 (player 'X'). Player 'O' will be represented by -1.
        4.1.3) Initialize winner to null to represent that there is no winner or tie yet. Winner will hold the player value (1 or -1) if there's a winner. Winner will hold a 'T' if there's a tie.
    4.2) Render those state variables to the page:
        4.2.1) Render the board:
            4.2.1.1) Loop over each of the 42 elements that represent the circles on the page, and for each iteration:
                4.2.1.1.2) Use the index of the iteration to access the mapped value from the board arrays.
                4.3.1.1.3) Set the background color of the current element by using the value as a key on the circles lookup object (constant).
        4.2.2) Render a message:
            4.2.2.1) If winner has a value other than null (game still in progress), render whose turn it is.
            4.2.2.2) If winner is equal to 'T' (tie), render a tie message.
            4.2.2.3) Otherwise, render a congratulatory message to which player has won.
    4.3) Wait for the user to click a circle...

5) Handle a player clicking a circle:
    5.1) Obtain the index of the circle that was clicked by either:
        5.1.1) "Extracting" the index from an id assigned to the element in the HTML, or
        5.1.2) Looping through the cached circle elements using a for loop and breaking out when the current circle element equals the event object's target.
    5.2) If the board has a value at the index, immediately return because that circle is already taken.
    5.3) If winner is not null, immediately return because the game is over.
    5.4) Update the board array at the index with the value of turn.
    5.5) Flip turns by multiplying turn by -1 (flips a 1 to -1, and vice-versa).
    5.6) Set the winner variable if there's a winner:
        5.6.1) Loop through the board arrays to see if there are 4 consecutive places occupied by player 1 or -1
            5.6.1.1) Loop through each column to see if there is a winner
            5.6.1.2) Loop through each row to see if there is a winner
            5.6.1.3) Loop through each diagonal to see if there is a winner
    5.7) If there's no winner, check if there's a tie:
        5.7.1) Set winner to 'T' if there are no more nulls in the board array.
    5.8) All state has been updated, so render the state to the page (step 4.2).


6) Handle a player clicking the replay button:
    6.1) Revert all color elements on the page back to the original state.
    6.2) Do steps 4.1 (initialize the state variables) and 4.2 (render).
```

