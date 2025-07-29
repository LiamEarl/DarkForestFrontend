const imageStyles = [
    "Menu1.jpg",
    "Menu2.jpg",
    "Menu3.jpg",
    "Menu4.jpg",
    "Menu5.jpg",
    "Menu6.jpg",
    "Menu7.jpg"
];
const imgStyle = imageStyles[Math.floor(Math.random() * imageStyles.length)];

document.body.style.backgroundImage = "url('../../public/assets/".concat(imgStyle).concat("')");
    
const comments = [
    "The best thing since sliced bread!",
    "Now with enriched Uranium!",
    "13.7 Billion years in development!",
    "Enjoy the lag :}",
    "I smell WAR.",
    "We take no responsibility for any war crimes.",
    "WARNING: Game lies within.",
    "Peace is not an option. At least... not a good one.",
    "Definitely not inspired by Stellaris.",
    "Real Talk: DO NOT REUSE PASSWORDS BETWEEN SITES AND APPLICATIONS!",
    "Loading a clever comment...",
];
const comment = comments[Math.floor(Math.random() * comments.length)];
document.getElementById("comment").textContent = comment;