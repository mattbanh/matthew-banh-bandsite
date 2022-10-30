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

// function which converts date from string to date and then sorts array by ascending date
const sortArrayByDate = (arr) =>
  arr.sort((a, b) => {
    let aDate = new Date(a.date);
    let bDate = new Date(b.date);
    return aDate - bDate;
  });

// format date to be displayed for shows
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
// build array from provided from API
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
// function to get shows from herokuapp API
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

// Functions below are all for highlighting a show
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
