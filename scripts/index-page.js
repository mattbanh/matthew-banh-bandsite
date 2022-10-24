comments = [
  {
    name: "Connor Walton",
    date: "02/17/2021",
    comment:
      "This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains.",
    avatar: "",
  },
  {
    name: "Emilie Beach",
    date: "01/09/2021",
    comment:
      "I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day.",
    avatar: "",
  },
  {
    name: "Miles Acosta",
    date: "12/20/2020",
    comment:
      "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough.",
    avatar: "",
  },
];

// Create a function which adds comment blocks following a specific structure. Comment blocks will be filled with information from the array above
const displayComments = (commentDetails) => {
  const commentContainer = document.createElement("div");
  commentContainer.classList.add("comment");

  const commentAvatarSection = document.createElement("div");
  commentAvatarSection.classList.add("comment__avatar-section");

  const commentAvatar = document.createElement("img");
  commentAvatar.classList.add("comment__avatar");
  if (commentDetails.avatar !== "") {
    commentAvatar.setAttribute("src", commentDetails.avatar);
  } else {
    commentAvatar.setAttribute("src", "./assets/images/default-avatar.svg");
  }
  commentAvatar.setAttribute("alt", "user avatar");
  // Place the avatar in to the avatar section
  commentAvatarSection.appendChild(commentAvatar);

  const commentArea = document.createElement("div");
  commentArea.classList.add("comment__comment-container");

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
  if (postedCommentsSection.innerText === "") {
    // checks if commentContainer is empty, if it is, it should append the first child
    postedCommentsSection.appendChild(commentContainer);
  } else {
    // if commentContainer is not empty, prepend can work to add newer comment above older comment
    postedCommentsSection.prepend(commentContainer);
  }
};

// function which converts date from string to date and then sorts array by ascending date
const sortArrayByDate = (arr) =>
  arr.sort((a, b) => {
    let aDate = new Date(a.date);
    let bDate = new Date(b.date);
    return aDate - bDate;
  });

// function which sends pieces of array to another function
const parseArr = (arr) => {
  let sortedArray = sortArrayByDate(arr);
  // loops through array and sends objects to function which will render the comments
  for (let i = 0; i < arr.length; i++) {
    displayComments(arr[i]);
  }
};

// call the parseArr function to sort and post comments
parseArr(comments);

// function to clear children from a parent element
const clearChildren = (parentElement) => {
  while (parentElement.hasChildNodes()) {
    parentElement.removeChild(parentElement.firstChild);
  }
};

const form = document.querySelector("#comments-form__form");
const formName = document.getElementById("comments-form__name");
const formComment = document.getElementById("comments-form__comment");

// function to check if form is valid
const formValidation = () => {
  if (formName.value === "" && formComment.value === "") {
    formName.classList.add("comments-form__input--invalid");
    formName.setAttribute("placeholder", "Please enter your name");
    formComment.classList.add("comments-form__input--invalid");
    formComment.setAttribute("placeholder", "Please enter your comment");
    return false;
  } else if (formName.value === "") {
    formName.classList.add("comments-form__input--invalid");
    formName.setAttribute("placeholder", "Please enter your name");
    return false;
  } else if (formComment.value === "") {
    formComment.classList.add("comments-form__input--invalid");
    formComment.setAttribute("placeholder", "Please enter your comment");
    return false;
  } else {
    return true;
  }
};

// function to reset any changes made by form validation
const removeInvalid = () => {
  form.addEventListener("input", (event) => {
    if (event.target === formName) {
      formName.setAttribute("placeholder", "Enter your name");
      formName.classList.remove("comments-form__input--invalid");
    }
    if (event.target === formComment) {
      formComment.setAttribute("placeholder", "Add a new comment");
      formComment.classList.remove("comments-form__input--invalid");
    }
  });
};
removeInvalid();

// function which takes submitted comment and adds to comments array,
// which is then put in to parseArr and displayComments functions to re-render comments
const addNewComment = () => {
  // locate comments form and add submit event listener
  form.addEventListener("submit", (event) => {
    // prevents refresh of page on submit
    event.preventDefault();
    // continues of formValidation passes
    if (formValidation() === true) {
      // pulling event targets to be inserted in to object
      let authorName = event.target.name.value;
      const currentDate = new Date();
      let authorDate = currentDate.toLocaleDateString();
      let authorComment = event.target.comment.value;
      let authorAvatar = document.querySelector(".comments-form__avatar").src;

      // building new object to be inserted in to array
      const newComment = {
        name: authorName,
        date: authorDate,
        comment: authorComment,
        avatar: authorAvatar,
      };

      // insert object in to array
      comments.push(newComment);
      // clear form
      document.getElementById("comments-form__form").reset();
      // clear posted comments
      const postedCommentsSection = document.querySelector(".posted-comments");
      clearChildren(postedCommentsSection);
      //  execute parseArr to sort array and executes displayComments which will re-render comments with newest on top
      parseArr(comments);
    } else {
      return;
    }
  });
};
addNewComment();
