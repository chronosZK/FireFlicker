(function(){
    var productContainer = document.getElementById("productContainer");
    var productContainerFragment = document.createDocumentFragment();
    var productCard, image, name,price, updateBtn, deleteBtn;
    var productCardNumber =0;
    db.collection("Products").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            //console.log(doc.id, " => ", doc.data().imageName, " => ", doc.data().name, " => ", doc.data().price, " => ", doc.data().image);
            productCard = document.createElement('div');
            productCard.setAttribute("class","productCard");
            productCardNumber++;
            image = document.createElement('img');
            image.setAttribute("src",doc.data().image);
            name = document.createElement('p');
            name.setAttribute("id","name"+productCardNumber);
            name.textContent = doc.data().name;
            price = document.createElement('p');
            price.setAttribute("id","price"+productCardNumber);
            price.textContent = 'RM ' + doc.data().price;
            updateBtn = document.createElement('button');
            updateBtn.textContent = "EDIT";
            updateBtn.setAttribute("id", "updateBtn"+productCardNumber);
            updateBtn.setAttribute("class", "updateBtn");
            updateBtn.addEventListener('click',(e)=>{
                updateInfo(e,doc.id);
            });
            deleteBtn = document.createElement('button');
            deleteBtn.textContent = "DELETE";
            deleteBtn.setAttribute("id", "deleteBtn");
            deleteBtn.addEventListener('click',(e)=>{
               
                removeInfo(e,doc.id,doc.data().imageName,doc.data().name);
            });
            productCard.appendChild(image);
            productCard.appendChild(name);
            productCard.appendChild(price);
            productCard.appendChild(updateBtn);
            productCard.appendChild(deleteBtn);

            productContainerFragment.appendChild(productCard);
            productContainer.appendChild(productContainerFragment);
        });
    });
}());

function updateInfo(e, docID){
    //--------get ID of the product card------------------
    let idName = e.target.parentElement.getElementsByTagName("P")[0].getAttribute("id");
    let idPrice = e.target.parentElement.getElementsByTagName("P")[1].getAttribute("id");
    let idUpdateBtn = e.target.parentElement.getElementsByTagName("BUTTON")[0].getAttribute("id");
    let getElementIdName = document.getElementById(idName);
    let getElementIdPrice = document.getElementById(idPrice);
    let getElementIdUpdateBtn = document.getElementById(idUpdateBtn);

    if(e.target.parentElement.getElementsByTagName("BUTTON")[0].textContent == "EDIT"){
        //-----------make it content editable-----------
        getElementIdName.contentEditable =true;
        getElementIdPrice.contentEditable =true;
        //-------------------design---------------------
        getElementIdName.style.border = "#fff 1px solid";
        getElementIdPrice.style.border = "#fff 1px solid";
        getElementIdName.focus();
        getElementIdUpdateBtn.innerHTML = "UPDATE";
        getElementIdUpdateBtn.style.backgroundColor = "green";
    }else if(e.target.parentElement.getElementsByTagName("BUTTON")[0].textContent == "UPDATE"){
        let priceSplit = getElementIdPrice.innerHTML.split(" ");
        return db.collection('Products').doc(docID).update({
            name: getElementIdName.innerHTML,
            price: priceSplit[1]
        })
        .then(function() {
            alert(getElementIdName.innerHTML + " Updated Successfully")
            //-----------make it content uneditable-----------
            getElementIdName.contentEditable =false;
            getElementIdPrice.contentEditable =false;
            //-------------------design---------------------
            getElementIdName.style.border = "";
            getElementIdPrice.style.border = "";
            getElementIdUpdateBtn.innerHTML = "EDIT";
            getElementIdUpdateBtn.style.backgroundColor = "rgb(243, 201, 62)";
        })
        .catch(function(error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
    }
}

function removeInfo(e,docID,imageName,name){
    let target = e.target.parentNode;
    // Create a reference to the file to delete
    let imageRef = dbStorage.ref().child('Products/'+imageName);

    db.collection("Products").doc(docID).delete().then(function() {
        // Delete the file
        imageRef.delete().then(function() {
            // File deleted successfully
            target.parentNode.removeChild(target);
            alert(name + " removed successfully");
        }).catch(function(error) {
            // Uh-oh, an error occurred!
            console.log(error);
        });
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
}

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
