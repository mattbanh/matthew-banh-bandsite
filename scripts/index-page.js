// Create a function which adds comment blocks following a specific structure. Comment blocks will be filled with information from the array above
const displayComments = (commentDetails) => {
  const commentContainer = document.createElement("div");
  commentContainer.classList.add("comment");

  const commentAvatarSection = document.createElement("div");
  commentAvatarSection.classList.add("comment__avatar-section");

  const commentAvatar = document.createElement("img");
  commentAvatar.classList.add("comment__avatar");
  // Option to add avatar to comments in the future
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

  const commentLikesContainer = document.createElement("div");
  commentLikesContainer.classList.add("comment__likes-container");

  const commentLikeButton = document.createElement("img");
  commentLikeButton.classList.add("comment__like-button");
  commentLikeButton.setAttribute("id", commentDetails.id);
  commentLikeButton.setAttribute("src", "./assets/icons/SVG/icon-like.svg");

  const commentLikesCount = document.createElement("span");
  commentLikesCount.classList.add("comment__likes-count");
  commentLikesCount.innerText = commentDetails.likes;

  commentLikesContainer.appendChild(commentLikeButton);
  commentLikesContainer.appendChild(commentLikesCount);

  const commentDeleteButton = document.createElement("img");
  commentDeleteButton.classList.add("comment__delete-button");
  commentDeleteButton.setAttribute("id", commentDetails.id);
  commentDeleteButton.setAttribute("src", "./assets/icons/SVG/icon-delete.svg");

  const commentActionsContainer = document.createElement("div");
  commentActionsContainer.classList.add("comment__actions-container");
  // create comment actions container
  commentActionsContainer.appendChild(commentLikesContainer);
  commentActionsContainer.appendChild(commentDeleteButton);

  // Place title area, comment, and comment actions in to comment area
  commentArea.appendChild(commentTitle);
  commentArea.appendChild(comment);
  commentArea.appendChild(commentActionsContainer);

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

// functions for date formatting to be displayed in the comments
const dateLeadingZero = (date) => {
  return date.toString().padStart(2, "0");
};
const formatDate = (date) => {
  let month = dateLeadingZero(date.getMonth() + 1);
  let day = dateLeadingZero(date.getDate() + 1);
  let year = date.getFullYear();
  let formattedDate = month + "/" + day + "/" + year;
  return formattedDate;
};
const findTimestamp = (arrObj) => {
  for (key in arrObj) {
    if (key === "timestamp") {
      const date = new Date(arrObj[key]);
      const formattedDate = formatDate(date);
      return formattedDate;
    }
  }
};

// function to format objects in array provided form herokuapp API
const buildArr = (arr) => {
  commentArr = [];
  arr.forEach((arrObj) => {
    let commentObj = {};
    for (key in arrObj) {
      // console.log(key);
      if (
        key === "name" ||
        key === "comment" ||
        key === "id" ||
        key === "likes"
      ) {
        commentObj[key] = arrObj[key];
      }
    }
    // option to add avatar in the future
    if (!("avatar" in commentObj) && (commentObj.avatar = {})) {
      commentObj["avatar"] = "";
    }

    let commentDate = findTimestamp(arrObj);
    commentObj.date = commentDate;
    commentArr.push(commentObj);
  });
  return commentArr;
};

// function which sends pieces of array to another function
const parseArr = (arr) => {
  const postedCommentsSection = document.querySelector(".posted-comments");
  clearChildren(postedCommentsSection);
  let commentArr = buildArr(arr);
  let sortedArr = sortArrayByDate(commentArr);
  // loops through array and sends objects to function which will render the comments
  for (let i = 0; i < sortedArr.length; i++) {
    displayComments(sortedArr[i]);
  }
  addLike();
  deleteElement();
};

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

// functions using axios and herokuapp API
const commentsURL =
  "https://project-1-api.herokuapp.com/comments?api_key=55efa704-e9f8-4e33-a6e4-da1273101817";

// post new comment from form
const postNewComment = (authorName, authorComment) => {
  axios
    .post(commentsURL, {
      name: authorName,
      comment: authorComment,
    })
    .then((response) => {
      getComments();
      // commentArr[arr.length - 1].avatar = "./assets/images/Mohan-muruge.jpg";
    })
    .catch((error) => {
      console.log(error);
    });
};
// get comments from herokuapp and pass through to parseArr
const getComments = () => {
  axios
    .get(commentsURL)
    .then((response) => {
      let comments = response.data;
      parseArr(comments);
    })
    .catch((error) => {
      console.log(error);
    });
};
getComments();

// delete comment upon clicking delete button
const deleteComment = (elementId) => {
  axios
    .delete(
      `https://project-1-api.herokuapp.com/comments/${elementId}?api_key=55efa704-e9f8-4e33-a6e4-da1273101817`
    )
    .then((response) => {
      if (response.status === 200) {
        getComments();
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

const likeComment = (elementId) => {
  axios
    .put(
      `https://project-1-api.herokuapp.com/comments/${elementId}/like?api_key=55efa704-e9f8-4e33-a6e4-da1273101817`
    )
    .then((response) => {
      if (response.status === 200) {
        getComments();
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

// add submit event listener to form, validate and post
const submitNewComment = () => {
  form.addEventListener("submit", (event) => {
    // prevents refresh of page on submit
    event.preventDefault();
    // continues if formValidation passes
    if (formValidation() === true) {
      const authorName = event.target.name.value;
      const authorComment = event.target.comment.value;
      postNewComment(authorName, authorComment);
      // clear form
      document.getElementById("comments-form__form").reset();
    } else {
      return;
    }
  });
};
submitNewComment();

// delete comment event listener with delete button
const deleteClickEvent = (button) => {
  button.addEventListener("click", (event) => deleteComment(event.target.id));
};

const deleteElement = () => {
  const deleteButton = document.querySelectorAll(".comment__delete-button");

  deleteButton.forEach((button) => deleteClickEvent(button, deleteButton));
};

// like comment event listener with put and like button
const likeClickEvent = (button) => {
  button.addEventListener("click", (event) => likeComment(event.target.id));
};

const addLike = () => {
  const likeButton = document.querySelectorAll(".comment__like-button");
  likeButton.forEach((button) => likeClickEvent(button));
};
