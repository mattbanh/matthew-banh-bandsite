shows = [
  {
    date: "Mon Sept 06 2021",
    venue: "Ronald Lane",
    location: "San Francisco, CA",
  },
  {
    date: "Tue Sept 21 2021",
    venue: "Pier 3 East",
    location: "San Francisco, CA",
  },
  {
    date: "Fri Oct 15 2021",
    venue: "View Lounge",
    location: "San Francisco, CA",
  },
  {
    date: "Sat Nov 06 2021",
    venue: "Hyatt Agency",
    location: "San Francisco, CA",
  },
  {
    date: "Fri Nov 26 2021",
    venue: "Moscow Center",
    location: "San Francisco, CA",
  },
  {
    date: "Wed Dec 15 2021",
    venue: "Press Club",
    location: "San Francisco, CA",
  },
];

const listShows = (showDetails) => {
  // create show card
  const show = document.createElement("div");
  show.classList.add("show");

  // loop through key:value pairs and populate the card with show information
  for (const key in showDetails) {
    const showSubheader = document.createElement("h4");
    showSubheader.classList.add("show__subheader");

    showSubheader.innerText = key;
    show.appendChild(showSubheader);
    const showInfo = document.createElement("span");

    showInfo.classList.add("show__info");
    if (key === "date") {
      showInfo.classList.add("show__info-date");
    }
    showInfo.innerText = showDetails[key];
    show.appendChild(showInfo);
  }
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

  const showsList = document.querySelector(".shows-list");
  showsList.appendChild(show);
};

const parseArr = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    listShows(arr[i]);
  }
};

parseArr(shows);

// function to change colour on select
const showList = document.querySelectorAll(".show");
showList.forEach((show) => {
  show.addEventListener("click", (showSelected) => {
    showList.forEach((show) => show.classList.remove("show--selected"));
    showSelected.currentTarget.classList.toggle("show--selected");
  });
});
