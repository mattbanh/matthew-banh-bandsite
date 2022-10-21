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

//   <div class="show">
//     <h4 class="show__subheader">Date</h4>
//     <span class="show__info">Mon Sept 06 2021</span>
//     <h4 class="show__subheader">Venue</h4>
//     <span class="show__info">Ronald Lane</span>
//     <h4 class="show__subheader">Location</h4>
//     <span class="show__info">San Francisco, CA</span>
//     <a
//       href="https://www.ticketmaster.ca/"
//       target="_blank"
//       class="show__button"
//       >BUY TICKETS</a
//     >
//   </div>

const listShows = (showDetails) => {
  const show = document.createElement("div");
  show.classList.add("show");

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

  const showButton = document.createElement("a");
  showButton.classList.add("show__button");
  showButton.setAttribute("href", "https://www.ticketmaster.ca/");
  showButton.setAttribute("target", "_blank");
  showButton.innerText = "buy tickets";

  show.appendChild(showButton);

  const showsList = document.querySelector(".shows-list");
  showsList.appendChild(show);
};

const parseArr = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    listShows(arr[i]);
  }
};

parseArr(shows);
