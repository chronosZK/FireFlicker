function submit(){
    var progressBar = document.getElementById("progressBar");
    var progressValue = document.getElementById("progressValue");
    var storageRef = dbStorage.ref().child('Products/'); // Create a root reference
    var imgfile = document.getElementById("imgfile");  //get image file
    var uploadTask = storageRef.child(imgfile.files[0].name).put(imgfile.files[0]);
    var name = document.getElementById("name");
    var price = document.getElementById("price");

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        function(snapshot) {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
            progressValue.innerHTML = 'Downloading paused...';
            break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
            progressBar.value = progress;
            progressValue.innerHTML = progress + '%';
            break;
        }
        }, function(error) {
            // Handle unsuccessful uploads
        }, function() {
        // Upload completed successfully, now we can get the download URL
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            db.collection("Products").add({ //add into firestore
                name: name.value,
                price: price.value,
                image: downloadURL,
                imageName: imgfile.files[0].name
            })
            .then(function() {
                alert(name.value + " has been added into list");
                progressBar.value = 0;
                imgfile.value = "";
                progressValue.innerHTML = "";
                name.value = "";
                price.value = "";
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
            });
        });
    });
}