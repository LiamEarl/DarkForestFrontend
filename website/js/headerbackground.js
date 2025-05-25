const imageStyles = [
    "url('public/assets/Menu1.jpg')",
    "url('public/assets/Menu2.jpg')",
    "url('public/assets/Menu3.jpg')",
    "url('public/assets/Menu4.jpg')",
    "url('public/assets/Menu5.jpg')",
    "url('public/assets/Menu6.jpg')",
    "url('public/assets/Menu7.jpg')"
];
document.addEventListener('DOMContentLoaded', function() {
    const imgStyle = imageStyles[Math.floor(Math.random() * 7)];
    document.body.style.backgroundImage = imgStyle;
    
    document.getElementById
});