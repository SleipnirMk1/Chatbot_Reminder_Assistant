var kataPenting = [];
dbRefKataPenting.orderByKey().on('value', snapshot => {
    snapshot.val().forEach(element => {
        kataPenting.push(element["Kata Penting"]);
    });
})
var tugas = [];
dbRefKataPenting.orderByKey().on('value', snapshot => {
    snapshot.val().forEach(element => {
        tugas.push(element["Tugas"]);
    });
})

var ubahTask = [];
dbRefUbahTask.orderByKey().on('value', snapshot => {
    snapshot.val().forEach(element => {
        ubahTask.push(element["Ubah Task"]);
    });
})

var waktu = [];
dbRefWaktu.orderByKey().on('value', snapshot => {
    snapshot.val().forEach(element => {
        waktu.push(element["Waktu"]);
    });
})

function selfChat() {
    var messageResponse = kataPenting[kataPenting.length-1];
    var message = document.getElementById("chatMessageText").value;
    if (message.length == 0) {
        return false;
    }

    sendChat(0, message);
    friendChat(messageResponse);
}

function friendChat(message) {
    sendChat(1, message);
}

function sendChat(user, message) {
    message = escapeHtml(message);
    var chatBox = getChatBox(user, message);
    insertChatToLogs(chatBox);
}

function insertChatToLogs(chatBox) {
    document.getElementById("chatlogs").insertAdjacentHTML("beforeend", chatBox);

    document.getElementById("chatMessageText").value = "";
    autoScroll();
}

function getChatBox(user, message) {
    for (let index = 0; index < message.length; index++) {
        if (message[index] == "\n") {
            message = message.substring(0, index) + "<br>" + message.substring(index + 1, message.length);
        }
    }

    var role = "self";
    if (user == 1) role = "friend";

    var divUserPhoto = '<div class="user-photo"><img src="img/' + role + 'Icon.png" alt="Icon ' + role + '" /></div>';
    var divChatMessage = '<p class="chat-message">' + message + "</p>";

    var divChatSelf = '<div class="chat ' + role + '">' + divUserPhoto + divChatMessage + "</div>";

    return divChatSelf;
}

function escapeHtml(str) {
    var map = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
    };
    return str.replace(/[&<>"']/g, function (m) {
        return map[m];
    });
}

function autoScroll() {
    var divChatlogs = document.getElementById("chatlogs");
    divChatlogs.scrollTop = divChatlogs.scrollHeight;
}
