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
        printLocalStorage();
    });
    printLocalStorage();
});

function addToLocalStorage(username, profilePicture, description) {
    let currentdate = new Date();
    let storage = clubMembers;

    let profilePictureSerial = generateRandomString();
    readImage(profilePicture, profilePictureSerial) // Very not recommanded as localStorage < 10MB

    if (description === "") {
        description = randomDescription();
    }

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
    let imageSize = undefined;
    try {
        imageSize = image.files[0].size;
    } catch (TypeError) {
        return undefined;
    }

    if (imageSize > maxFileSize) return true;
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
        username.classList.add("tdUsername");

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

function randomDescription() {
    // randomStrings generated from chat.bing.com
    let randomStrings = ["I think Aqua is actually the reincarnation of Ai’s lover, not her doctor. He was killed by the same man who murdered Ai, and he wanted to be reborn as her son to protect her from him.",
        "I wonder if Aqua will ever regain his memories of his past life as a doctor. He seems to have forgotten everything after he was born, but maybe there is a trigger that will make him remember.",
        "I believe Aqua has a special power that allows him to manipulate people’s emotions. He can make anyone fall in love with him, or hate him, depending on his mood. He used this power to become a popular idol and to get revenge on his enemies.",
        "I suspect Aqua is not the only one who was reincarnated. Maybe there are others who were involved in his past life, and they are also reborn as idols or celebrities. Maybe Ruby is one of them.",
        "I hope Aqua will find happiness in his new life. He has suffered so much in his past life, and he deserves to be loved and cherished. He should not let his hatred consume him, and he should try to forgive his father.",
        "I wonder what Aqua’s goal is in his new life. Does he want to be a successful idol, or does he want to destroy the entertainment industry? Does he want to expose his father’s crimes, or does he want to kill him personally?",
        "I think Aqua has a complex relationship with Ruby. They are rivals, but they also have a deep connection. They seem to understand each other better than anyone else, and they have a lot of chemistry. Maybe they are soulmates.",
        "I wonder how Aqua will react when he finds out the truth about his mother’s death. Will he be shocked, angry, or sad? Will he blame himself, or will he blame his father? Will he seek justice, or will he seek vengeance?",
        "I believe Aqua is a genius who can do anything he sets his mind to. He has a high IQ, a photographic memory, and a talent for music. He can learn anything quickly, and he can master any skill. He is also very cunning and manipulative.",
        "I hope Aqua will not lose himself in his new life. He has changed so much from his past life, and he has become more ruthless and cold-hearted. He should not forget who he really is, and he should not lose his humanity.",
        "I wonder if Aqua will ever meet his mother’s reincarnation. Maybe she is also an idol, or maybe she is a fan of his. Maybe they will feel a strange attraction to each other, or maybe they will not recognize each other at all.",
        "I think Aqua is hiding a lot of secrets from his fans and the media. He has a dark past, and he has a lot of enemies. He also has a lot of allies, who help him with his plans. He is very careful and cautious, and he does not trust anyone easily.",
        "I believe Aqua is a very lonely person. He does not have any real friends, or any real family. He only has his fans, who love him for his image, not for his true self. He also has Ruby, who is his only equal, but also his biggest rival.",
        "I wonder what Aqua’s personality is like. He seems to have different personas for different situations. He can be charming and charismatic, or cold and aloof, or sweet and innocent, or fierce and rebellious. He can adapt to any role, and he can fool anyone.",
        "I hope Aqua will not go too far with his revenge. He has already done a lot of damage to his father’s reputation and career, and he has also hurt a lot of innocent people along the way. He should not become a monster like his father, and he should not lose his morals.",
        "I think Aqua has a lot of potential as an idol. He has a beautiful voice, a handsome face, and a great stage presence. He can sing any genre, and he can dance any style. He can also play various instruments, and he can write his own songs.",
        "I believe Aqua is in love with Ruby. He may not admit it, or even realize it, but he has feelings for her. He is always thinking about her, and he is always drawn to her. He is jealous of her success, but he also admires her talent.",
        "I wonder how Aqua will end his idol career. Will he retire gracefully, or will he fade away? Will he reveal his true identity, or will he keep it a secret? Will he leave behind a legacy, or will he be forgotten?",
        "I think Aqua is a very brave person. He has faced a lot of challenges and dangers in his life, and he has overcome them all. He has also taken a lot of risks and gambles, and he has won them all. He does not fear anything, except losing his mother.",
        "I hope Aqua will find peace in his new life. He has been through a lot of pain and suffering in his past life, and he has also caused a lot of pain and suffering in his new life. He should learn to let go of his past, and he should embrace his future."]
    return randomStrings[Math.floor(Math.random() * randomStrings.length)];
}