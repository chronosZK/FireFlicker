
function openMenu(){
    document.getElementById("navO").style.display = "none";
    document.getElementById("navBar").style.width = "100%";
    document.getElementById("navO").style.marginRight = " 0px";
   document.getElementById("pageTittle").style.marginLeft = "87px";
}

function closeMenu()
{
    document.getElementById("pageTittle").style.marginLeft = "0px";
    document.getElementById("navO").style.display = "block";
    document.getElementById("navO").style.marginRight = " 50px";
    document.getElementById("navBar").style.width = "0";
}