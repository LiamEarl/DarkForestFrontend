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
    "Now with extra Uranium.",
    "13.7 Billion years in development!",
    "Enjoy the lag  :}",
    "Hmmm... I smell genocide.",
    "We take no responsibility for any war crimes.",
    "WARNING: Goth Mommies Within."
];
const comment = comments[Math.floor(Math.random() * comments.length)];
document.getElementById("comment").textContent = comment;