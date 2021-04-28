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
