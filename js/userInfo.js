firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        return firebase.database().ref('/users/' + user.uid).once('value').then(function(snapshot) {
            var ic = (snapshot.val() && snapshot.val().ic) || 'Anonymous';
            var contactNum = (snapshot.val() && snapshot.val().contactNumber) || 'Anonymous';
            var email = user.email;
            
            //alert(fullName + " " + ic + " "+ contactNum+ " "+ address);

            $("#fullName").text(fullName);
            $("#ic").text(ic);
            $("#contactNum").text(contactNum);
            $("#address").text(address);
            $("#email").text(email);
            // ...
          });
       
    } else {
        // No user is signed in.
        window.location.replace("index.html");
    }
});