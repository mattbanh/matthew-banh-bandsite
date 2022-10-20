// You must have an array in JavaScript with 3 default comment objects to start.
// Comments must have a name, a timestamp, and the comment text.
//
// You must have a function called displayComment() that
// takes in one comment object as a parameter and displays it
// on the page using JavaScript DOM manipulation.
//
// No template literals should be used.
// All dynamic HTML should be added to DOM via DOM Methods for individual elements.
// Avoid bulk assigning stringified HTML using innerHTML

//  <div class="comment">
//     <div class="comment__avatar-section">
//         <!-- NEED TO ADD JAVASCRIPT TO REPLACE BROKEN IMAGE -->
//         <img
//         class="comment__avatar"
//         src="./assets/images/Mohan-muruge.jpg"
//         alt="CW"
//         />
//     </div>
//     <div>
//         <div class="comment__title">
//         <span class="comment__name">Connor Walton</span>
//         <span class="comment__date">02/17/2021</span>
//         </div>
//         <p class="comment__comment">
//         This is art. This is inexplicable magic expressed in the purest
//         way, everything that makes up this majestic work deserves
//         reverence. Let us appreciate this for what it is and what it
//         contains.
//         </p>
//     </div>
// </div>

comments = [
  {
    name: "Connor Walton",
    date: "02/17/2021",
    comment:
      "This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains.",
  },
  {
    name: "Emilie Beach",
    date: "01/09/2021",
    comment:
      "I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day.",
  },
  {
    name: "Miles Acosta",
    date: "12/20/2020",
    comment:
      "I can't stop listening. Every time I hear one of their songs - the vocals - it give sme goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough.",
  },
];
