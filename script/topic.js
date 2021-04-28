function getTopic(message) {
    // var kataPenting = "";
    // var idxKataPenting = -1;
    // for (const key in listKataPenting) {
    //     const element = listKataPenting[key];
    //     // Harusnya boyormoore
    //     idxKataPenting = boyerMoore(message, element);
    //     if (idxKataPenting != -1) {
    //         kataPenting = element;
    //         break;
    //     }
    // }

    // if (idxKataPenting == -1) {
    //     console.log("Kata penting tidak ditemukan");
    //     return "null";
    // }

    var idxKataTopik = boyerMoore(message, "topik");

    if (idxKataTopik == -1) {
        console.log('Tidak ada terdapat kata "topik"');
        return "null";
    }

    var idx = idxKataTopik;
    var space = false;
    while (message[idx] == " " || !space) {
        if (message[idx] == " ") {
            space = true;
        }
        idx++;
    }

    var idxWaktu = -1;
    for (const key in listMelihatDaftarTask) {
        const element = listMelihatDaftarTask[key];
        // Harusnya boyormoore
        // console.log(element);
        idxWaktu = boyerMoore(message, element);
        if (idxWaktu != -1) {
            break;
        }
    }

    if (idxWaktu == -1) {
        console.log("Kata waktu tidak ditemukan");
        return "null";
    }

    // var count = kataPenting.length;

    if (idxWaktu > idx) {
        return message.substr(idx, idxWaktu - idx);
    } else {
        return message.substr(idx, message.length - idx);
    }
}

function getHelpMessage() {
    var message = "[Fitur]\n";
    var fitur = [
        "Menambahkan task baru",
        "Melihat daftar task yang harus dikerjakan",
        "Menampilkan deadline dari suatu task",
        "Memperbarui suatu task",
        "Menandai suatu task telah selesai dikerjakan",
    ];

    const kataPenting = listKataPenting;

    for (let i = 0; i < fitur.length; i++) {
        message += i + 1 + ". " + fitur[i] + "\n";
    }

    message += "\n[Daftar kata penting]\n";

    for (let i = 0; i < kataPenting.length; i++) {
        if (i != kataPenting.length - 1) {
            message += i + 1 + ". " + kataPenting[i] + "\n";
        } else {
            message += i + 1 + ". " + kataPenting[i];
        }
    }

    return message;
}
