window.onload=function(){
    const sideMenu = document.getElementById("aside");
    const menuBtn  = document.getElementById("menu-btn");
    const closeBtn = document.getElementById("close-btn");

    menuBtn.addEventListener('click', () => {
        sideMenu.style.display = 'block';
    })

    closeBtn.addEventListener('click', () => {
        sideMenu.style.display = 'none';
    })
}