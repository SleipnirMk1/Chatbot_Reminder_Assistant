var listKataPenting = [];
dbRefKataPenting.orderByKey().on('value', snapshot => {
    snapshot.val().forEach(element => {
        listKataPenting.push(element["Kata Penting"]);
    });
})
var listTugas = [];
dbRefTugas.orderByKey().on('value', snapshot => {
    snapshot.val().forEach(element => {
        listTugas.push(element["Tugas"]);
    });
})

var listUbahTask = [];
dbRefUbahTask.orderByKey().on('value', snapshot => {
    snapshot.val().forEach(element => {
        listUbahTask.push(element["Ubah Task"]);
    });
})

var listWaktu = [];
dbRefWaktu.orderByKey().on('value', snapshot => {
    snapshot.val().forEach(element => {
        listWaktu.push(element["Waktu"]);
    });
})
var dictTask = {};
dbRefTask.orderByKey().on('value', snapshot => {
    dictTask = snapshot.val();
})

var dictTaskSelesai = {};
dbRefTaskSelesai.orderByKey().on('value', snapshot => {
    dictTaskSelesai = snapshot.val();
})

function addKataPenting(kataPenting) {
    dbRefKataPenting.child(listKataPenting.length).set({
        "Kata Penting": kataPenting
    });
    listKataPenting.push(kataPenting);
}
function addTugas(tugas) {
    dbRefTugas.child(listTugas.length).set({
        "Tugas": tugas
    });
    listTugas.push(tugas);
}
function addUbahTask(ubahTask) {
    dbRefUbahTask.child(listUbahTask.length).set({
        "Ubah Task": ubahTask
    });
    listUbahTask.push(ubahTask);
}
function addWaktu(waktu) {
    dbRefWaktu.child(listWaktu.length).set({
        "Waktu": waktu
    });
    listWaktu.push(waktu);
}

function addTask(idKataPenting, kodeMatkul, materi, tanggal) {
    var task = {
        "IdKataPenting": idKataPenting,
        "Kode Matkul": kodeMatkul,
        "Materi": materi,
        "Tanggal": tanggal
    };
    dbRefTask.child(parseInt(Object.keys(dictTask)[dictTask.length-1])+1).set(task);
    dbRefTask.orderByKey().on('value', snapshot => {dictTask = snapshot.val();})
}
function addTaskSelesai(idKataPenting, kodeMatkul, materi, tanggal) {
    var taskSelesai = {
        "IdKataPenting": idKataPenting,
        "Kode Matkul": kodeMatkul,
        "Materi": materi,
        "Tanggal": tanggal
    };
    dbRefTaskSelesai.child(parseInt(Object.keys(dictTaskSelesai)[dictTaskSelesai.length-1])+1).set(taskSelesai);
    dbRefTaskSelesai.orderByKey().on('value', snapshot => {dictTaskSelesai = snapshot.val();})
}


function updateTask(idKataPenting, kodeMatkul, materi, tanggalUpdate) {
    var idTask = 0;
    dbRefTask.orderByKey().on('value', snapshot => {
        for (var key in snapshot.val()) {
            var value = snapshot.val()[key];
            if (value["IdKataPenting"] === idKataPenting && value["Kode Matkul"] === kodeMatkul &&
                value["Materi"] === materi) {
                idTask = key;
                break;
            }
        }
    })
    const newTanggal = {
        "Tanggal": tanggalUpdate
    };
    dbRefTask.child(idTask).update(newTanggal);
    dbRefTask.orderByKey().on('value', snapshot => {dictTask = snapshot.val();})
}

function deleteTask(idTask) {
    dbRefTask.child(idTask).remove();
    dbRefTask.orderByKey().on('value', snapshot => {dictTask = snapshot.val();})
}

function selfChat() {
    var messageResponse = listKataPenting[listKataPenting.length-1];
    console.log(dictTask);
    // addTask(0, "IF2211", "Knapsack Problem", "8/10/2021");
    // addTask(2, "IF2211", "Dynamic Programming", "10/12/2021");
    // updateTask(3, "IF2211", "Dynamic Programming", "12/04/2021");
    // deleteTask(1);
    // console.log(dictTask);
    // console.log(dictTaskSelesai);
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
