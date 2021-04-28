const { isError } = require("node:util");

function isUpdate(message) {
    for (const key in listUbahTask) {
        const element = listUbahTask[key];
        re = new RegExp(element);
        if (re.test(message)) {
            return true;
        }
        if (boyerMoore(message, element) != -1) {
            return true;
        }
    }
    return false;
}

function isTandai(message) {
    for (const key in listTandai) {
        const element = listTandai[key];
        re = new RegExp(element);
        if (re.test(message)) {
            return true;
        }
        if (boyerMoore(message, element) != -1) {
            return true;
        }
    }
    return false;
}

function isMenampilkanDeadline(message) {
    for (const key in listMenampilkanDeadline) {
        const element = listMenampilkanDeadline[key];
        re = new RegExp(element);
        if (re.test(message)) {
            return true;
        }
        if (boyerMoore(message, element) != -1) {
            return true;
        }
    }
    return false;
}

function isMelihatDaftarTask(message) {
    for (const key in listMelihatDaftarTask) {
        const element = listMelihatDaftarTask[key];
        re = new RegExp(element);
        if (re.test(message)) {
            return true;
        }
        if (boyerMoore(message, element) != -1) {
            return true;
        }
    }
    return false;
}

function isExistKataPenting(message) {
    for (const key in listKataPenting) {
        const element = listKataPenting[key];
        re = new RegExp(element);
        if (re.test(message)) {
            return true;
        }
        if (boyerMoore(message, element) != -1) {
            return true;
        }
    }
    return false;
}

function isHelp(message) {
    for (const key in listHelp) {
        const element = listHelp[key];
        re = new RegExp(element);
        if (re.test(message)) {
            return true;
        }
        if (boyerMoore(message, element) != -1) {
            return true;
        }
    }
    return false;
}

function decision(message) {
    return getTopic(message);

    if (isMelihatDaftarTask(message)) {
        // req: tidak ada
        return "Melihat Daftar Task";
    }

    if (isMenampilkanDeadline(message) && isExistKataPenting(message)) {
        // req: katapenting (sudah)
        return "Menampilkan Deadline";
    }

    if (isUpdate(message)) {
        // req: tanggal
        return "Update";
    }

    if (isTandai(message)) {
        // ...task x..., req: idTask
        return "Tandai";
    }

    if (isHelp(message)) {
        // req: tidak ada
        return "Help";
    }

    if (isExistKataPenting(message)) {
        // req: katapenting (sudah), kodematkul, topik, tanggal
        return "Menambahkan task baru";
    }
    return "Maaf, pesan tidak dikenali";
}
