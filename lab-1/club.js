// First initialization of localStorage
var clubMembers = retrieveDataFromLocalStorage('club-data');
var clubMembersImages = retrieveDataFromLocalStorage('profile-picture');

document.addEventListener("DOMContentLoaded", function () {
    document.querySelector('#add-club-member').querySelector("#submit").addEventListener('click', function () {
        let monformulaire = document.forms["add-club-member"];
        if (monformulaire.elements["username"].value === "") {
            alert("Please put at least one character in your username.");
        } else if (isUsernameAlreadyExist(monformulaire.elements["username"].value)) {
            alert("Username already has been taken !");
        } else if (fileRestriction(monformulaire.elements["profile-picture"])) {
            alert("Please insert a file size < 512KB !");
        } else {
            addToLocalStorage(monformulaire.elements["username"].value, monformulaire.elements["profile-picture"], monformulaire.elements["description"].value);
            console.log(monformulaire.elements["profile-picture"].files[0]);
        }
    });
    printLocalStorage();
});

function inizialization() {
    if (retrieveDataFromLocalStorage("club-data") === null) {
        localStorage.setItem("club-data", JSON.stringify([]));
    }
    if (retrieveDataFromLocalStorage("profile-picture") === null) {
        localStorage.setItem("profile-picture", JSON.stringify({}));
    }
}

function addToLocalStorage(username, profilePicture, description) {
    let currentdate = new Date();
    let storage = clubMembers;

    let profilePictureSerial = generateRandomString();
    readImage(profilePicture, profilePictureSerial) // Very not recommanded as localStorage < 10MB

    let club = {
        username: username,
        profilePicture: profilePictureSerial,
        description: description,
        date: currentdate.getFullYear() + "/" + (currentdate.getMonth() + 1) + "/" + currentdate.getDate() + " " + currentdate.getHours() + ":" + currentdate.getMinutes(), // YYYY/MM/DD
    };

    storage.push(club);
    localStorage.setItem("club-data", JSON.stringify(storage));
}

function isUsernameAlreadyExist(username) {
    return clubMembers.find(function (club) {
        return club.username === username;
    });
}

function fileRestriction(image) {
    const maxFileSize = 512 * 1024; // 512KB
    let imageSize = image.files[0].size;

    if (imageSize === undefined) return undefined;
    else if (imageSize > maxFileSize) return true;
    return false;
}

function retrieveDataFromLocalStorage(key) {
    if (localStorage.getItem(key)) {
        return JSON.parse(localStorage.getItem(key));
    }
    else if (key === "club-data") return [];
    else if (key === "profile-picture") return {};
    else return undefined;
}

function printLocalStorage() {
    let memberTab = document.getElementById("user-table-body");
    memberTab.innerHTML = '';

    clubMembers.forEach((elemMembers) => {

        let newLine = document.createElement("tr");
        let username = document.createElement("td");
        let profilePicturetd = document.createElement("td");
        let profilePictureimg = document.createElement("img");
        let description = document.createElement("td");
        let date = document.createElement("td");

        username.textContent = elemMembers.username;

        profilePictureimg.src = clubMembersImages[elemMembers.profilePicture] || 'storage/img/default.png';
        profilePicturetd.classList.add("profilepicture");

        profilePictureimg.onerror = function() {
            this.onerror = null;
            this.src = 'storage/img/default.png'
        };
        profilePictureimg.alt = "Default Profile picture";

        description.textContent = elemMembers.description;
        date.textContent = elemMembers.date;

        profilePicturetd.appendChild(profilePictureimg);
        newLine.append(username, profilePicturetd, description, date);
        memberTab.appendChild(newLine);
    });

    document.forms["add-club-member"].reset();
}

function readImage(input, serial) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            storeProfilePictureImage(serial, e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}

function generateRandomString () {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const serialLength = 20;
    let serialNumber = '';
    for (let i = 0; i < serialLength; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        serialNumber += characters[randomIndex];
        if (i === 4 || i === 9) {
            serialNumber += '-';
        }
    }
    return serialNumber;
}

function storeProfilePictureImage(serial, image) {
    clubMembersImages[serial] = image;
    localStorage.setItem('profile-picture', JSON.stringify(clubMembersImages));
}
