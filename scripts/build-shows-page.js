// shows = [
//   {
//     date: "Mon Sept 06 2021",
//     venue: "Ronald Lane",
//     location: "San Francisco, CA",
//   },
//   {
//     date: "Tue Sept 21 2021",
//     venue: "Pier 3 East",
//     location: "San Francisco, CA",
//   },
//   {
//     date: "Fri Oct 15 2021",
//     venue: "View Lounge",
//     location: "San Francisco, CA",
//   },
//   {
//     date: "Sat Nov 06 2021",
//     venue: "Hyatt Agency",
//     location: "San Francisco, CA",
//   },
//   {
//     date: "Fri Nov 26 2021",
//     venue: "Moscow Center",
//     location: "San Francisco, CA",
//   },
//   {
//     date: "Wed Dec 15 2021",
//     venue: "Press Club",
//     location: "San Francisco, CA",
//   },
// ];

// function to show information before returning to listShows function
const buildShow = (showDetails, show) => {
  for (const key in showDetails) {
    // create subheaders for mobile version of shows page
    const showSubheader = document.createElement("h4");
    showSubheader.classList.add("show__subheader");
    showSubheader.innerText = key;
    show.appendChild(showSubheader);

    // populate show with date, venue, location information
    const showInfo = document.createElement("span");
    showInfo.classList.add("show__info");
    // if statement to account for the date, which has different display properties
    if (key === "date") {
      showInfo.classList.add("show__info-date");
    }
    showInfo.innerText = showDetails[key];
    show.appendChild(showInfo);
  }
};

// function to list shows on shows page
const listShows = (showDetails) => {
  // create show card
  const show = document.createElement("div");
  show.classList.add("show");

  let show2 = buildShow(showDetails, show);

  const showButtonContainer = document.createElement("div");
  showButtonContainer.classList.add("show__button-container");

  //   create show card buy tickets button that leads to ticketmaster
  const showButton = document.createElement("a");
  showButton.classList.add("show__button");
  showButton.setAttribute("href", "https://www.ticketmaster.ca/");
  showButton.setAttribute("target", "_blank");
  showButton.innerText = "buy tickets";

  showButtonContainer.appendChild(showButton);

  show.appendChild(showButtonContainer);

  // find and append show HTML to show page so it can be displayed
  const showsList = document.querySelector(".shows-list");
  showsList.appendChild(show);
  highlightShow();
};

// const formatDate = (date) => {
//   let month = dateLeadingZero(date.getMonth() + 1);
//   let day = dateLeadingZero(date.getDate());
//   let year = date.getFullYear();
//   let formattedDate = month + "/" + day + "/" + year;
//   return formattedDate;
// };

// function which converts date from string to date and then sorts array by ascending date
const sortArrayByDate = (arr) =>
  arr.sort((a, b) => {
    let aDate = new Date(a.date);
    let bDate = new Date(b.date);
    return aDate - bDate;
  });

const timeOptions = {
  timeZone: "UTC",
  weekday: "short",
  year: "numeric",
  month: "short",
  day: "numeric",
};

const findTimestamp = (arrObj) => {
  for (key in arrObj) {
    if (key === "date") {
      const date = new Date(arrObj[key]);
      const convertedDate = date.toLocaleString("en-CA", timeOptions);
      formattedDate = convertedDate.replaceAll(",", "");
      return formattedDate;
    }
  }
};

const buildArr = (arr) => {
  showArr = [];
  arr.forEach((arrObj) => {
    let showObj = {};
    for (key in arrObj) {
      // console.log(key);
      if (key === "date" || key === "location") {
        showObj[key] = arrObj[key];
      } else if (key === "place") {
        showObj["venue"] = arrObj[key];
      }
    }
    let showDate = findTimestamp(arrObj);
    showObj.date = showDate;
    showArr.push(showObj);
  });
  return showArr;
};

// function which sends pieces of array to another function
const parseArr = (arr) => {
  let builtArr = buildArr(arr);
  let sortedArr = sortArrayByDate(builtArr);
  for (let i = 0; i < sortedArr.length; i++) {
    listShows(sortedArr[i]);
  }
};

const showsURL =
  "https://project-1-api.herokuapp.com/showdates/?api_key=55efa704-e9f8-4e33-a6e4-da1273101817";

const getShows = () => {
  axios
    .get(showsURL)
    .then((response) => {
      let shows = response.data;
      parseArr(shows);
    })
    .catch((response) => {
      console.log("error");
    });
};
getShows();
// parseArr(shows);

// add eventlistener, load, call click,

// function to remove show-selected class from all and toggle show-selected on click

const addShowSelected = (showList, show, showSelected) => {
  showList.forEach((show) => show.classList.remove("show--selected"));
  showSelected.currentTarget.classList.toggle("show--selected");
};

// function to add click event listener and pass selected elements to addShowSelected
const addClickEvent = (show, showList) => {
  show.addEventListener("click", (showSelected) =>
    addShowSelected(showList, show, showSelected)
  );
};

// function to "highlight" the background of a selected show
const highlightShow = () => {
  const showList = document.querySelectorAll(".show");
  showList.forEach((show) => addClickEvent(show, showList));
};
