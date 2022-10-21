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
//          <span class="comment__name">Connor Walton</span>
//          <span class="comment__date">02/17/2021</span>
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

// Create a function which adds comment blocks following a specific structure. Comment blocks will be filled with information from the array above

const postComments = (commentDetails) => {
  const commentContainer = document.createElement("div");
  commentContainer.classList.add("comment");

  const commentAvatarSection = document.createElement("div");
  commentAvatarSection.classList.add("comment__avatar-section");

  const commentAvatar = document.createElement("img");
  commentAvatar.classList.add("comment__avatar");
  commentAvatar.setAttribute("src", "./assets/images/Mohan-muruge.jpg");
  commentAvatar.setAttribute("alt", "CW");
  // Place the avatar in to the avatar section
  commentAvatarSection.appendChild(commentAvatar);

  const commentArea = document.createElement("div");

  const commentTitle = document.createElement("div");
  commentTitle.classList.add("comment__title");

  const commentName = document.createElement("span");
  commentName.classList.add("comment__name");
  commentName.innerText = commentDetails.name;

  const commentDate = document.createElement("span");
  commentDate.classList.add("comment__date");
  commentDate.innerText = commentDetails.date;
  // Place name and date into title area of comment
  commentTitle.appendChild(commentName);
  commentTitle.appendChild(commentDate);

  const comment = document.createElement("p");
  comment.classList.add("comment__comment");
  comment.innerText = commentDetails.comment;

  // Place title area and comment in to comment area
  commentArea.appendChild(commentTitle);
  commentArea.appendChild(comment);

  // Place comment avatar section and comment area in to comment container
  commentContainer.appendChild(commentAvatarSection);
  commentContainer.appendChild(commentArea);

  // Place comment container in to index.html
  const postedCommentsSection = document.querySelector(".posted-comments");
  postedCommentsSection.appendChild(commentContainer);
};

const parseArr = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    postComments(arr[i]);
  }
};

parseArr(comments);
