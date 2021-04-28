function getTopic(message) {
    var kataPenting = "";
    var idxKataPenting = -1;
    for (const key in listKataPenting) {
        const element = listKataPenting[key];
        // Harusnya boyormoore
        idxKataPenting = message.indexOf(element);
        if (idxKataPenting != -1) {
            kataPenting = element;
            break;
        }
    }

    if (idxKataPenting == -1) {
        console.log("Kata penting tidak ditemukan");
        return "null";
    }

    var idxWaktu = -1;
    for (const key in listMelihatDaftarTask) {
        const element = listMelihatDaftarTask[key];
        // Harusnya boyormoore
        idxWaktu = message.indexOf(element);
        if (idxWaktu != -1) {
            break;
        }
    }

    if (idxWaktu == -1) {
        console.log("Kata waktu tidak ditemukan");
        return "null";
    }

    // var count = kataPenting.length;

    if (idxWaktu > idxKataPenting) {
        return message.substr(idxKataPenting, idxWaktu - idxKataPenting);
    } else {
        return message.substr(idxKataPenting, message.length - idxKataPenting);
    }
}
