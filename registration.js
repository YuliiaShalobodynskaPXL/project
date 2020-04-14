window.addEventListener('load', loaded);

function loaded() {
    let regisrationButton = document.getElementById("registreer");
    regisrationButton.addEventListener("click", handleRegistrationButton);

}

// VRAAG: moet username uniq zijn?

function handleRegistrationButton() {
    let email = document.getElementById('email').value;
    let username = document.getElementById("username").value;
    let wachtwoord = document.getElementById("wachtwoord").value;
    let wachtwoord_check = document.getElementById("wachtwoord_verificatie").value;
    let output = document.getElementById("error_massage");

    let url = 'https://localhost:5001/api/Authentication/register';

    makeElementEmpty(output);

        //if (typeof(Storage) !== "undefined") {
    if (email.trim() === '' || username.trim() === '' || wachtwoord.trim() === '' || wachtwoord_check.trim() === '') {
        output.appendChild(document.createTextNode("Alle velden moeten ingevuld zijn"));
    } else if (wachtwoord.length < 6) {
        output.appendChild(document.createTextNode("Het wachtwoord is te kort. "));
    } else if (wachtwoord !== wachtwoord_check) {
        output.appendChild(document.createTextNode("De wachtwoorden zijn niet gelijk"));
    } else {
        let registration = { "email": email,"password": wachtwoord,  "nickName": username };

        console.log('111');

        //localStorage.setItem("registration", registrationJson);  ???

        /*
        De ingevulde gegevens worden vervolgens verstuurd naar de backend.
        Indien de registratie succesvol is verlopen, wordt het login-scherm getoond zodat de gebruiker
        kan inloggen. Indien er een fout is opgetreden wordt de foutboodschap getoond.
        */

        fetch(url,
            {
                method: "POST",
                body: JSON.stringify(registration),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                if (response.status === 200) {
                    output.appendChild(document.createTextNode('Registration succesful!, go back to login.'));
                    window.location = ('login.html');
                } else {
                    output.appendChild(document.createTextNode(`error with status ${response.status}`));
                }
            })
            .catch((error) => {
                output.appendChild(document.createTextNode("Oops error"));
            });

    }

    /*
    } else {
         output.textContent = "Sorry! No Web Storage support.. Try another browser";
    }
    */

       
}

function makeElementEmpty(element) {
    while (element.hasChildNodes()) {
        element.removeChild(element.firstChild);
    }
}