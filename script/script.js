function selfChat() {
    var message = document.getElementById("chatMessageText").value;
    if (message.length == 0) {
        return false;
    }
    var messageResponse;
    // messageResponse = listKataPenting[listKataPenting.length-1];
    messageResponse = decision(message);
    // console.log("listMelihatDaftarTask")
    // console.log(listMelihatDaftarTask);
    // console.log("listMenampilkanDeadline");
    // console.log(listMenampilkanDeadline);
    // console.log("listTandai");
    // console.log(listTandai);
    // console.log(dictTask);
    // addTask(0, "IF2211", "Knapsack Problem", "8/10/2021");
    // addTask(2, "IF2211", "Dynamic Programming", "10/12/2021");
    // updateTask(3, "IF2211", "Dynamic Programming", "12/04/2021");
    // deleteTask(1);
    // console.log(dictTask);
    // console.log(dictTaskSelesai);
    // tandaiTaskSelesai(1);
    
    
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
