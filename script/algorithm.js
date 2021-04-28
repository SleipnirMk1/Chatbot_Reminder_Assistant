// const { isError } = require("node:util");

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

function isExistKataWaktu(message) {
    for (const key in listWaktu) {
        const element = listWaktu[key];
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
    // return getTopic(message);

    if (isMenampilkanDeadline(message) && isExistKataPenting(message)) {
        // req: katapenting (sudah)
        return "Menampilkan Deadline";
    }
    
    if (isUpdate(message)) {
        // req: tanggal
        var idTask, tanggal;
        // idTask 0 ada, idTask 1 tidak ada
        idTask = 0; // Task 0 - IF2211 - kuis - String matching tanggal berubah dari 12/02/2021 menjadi tanggal 12/02/2021
        // idTask = 1; // Task tidak dapat ditemukan 
        tanggal = "12/02/2021";
        var isReqAllExist = true;
        if (isReqAllExist) {
            if (dictTask.hasOwnProperty(idTask)) {
                var element = dictTask[idTask];
                // updateTask2(idTask, tanggal);
                return "Task " + idTask + " - " + 
                element["Kode Matkul"] + " - " + 
                listKataPenting[element["IdKataPenting"]] + " - " + 
                element["Materi"] + " tanggal berubah dari " + 
                element["Tanggal"] + " menjadi tanggal " +
                tanggal;
            } else {
                return "Task tidak dapat ditemukan";
            }
        } else {
            return "Maaf, pesan tidak dikenali";
        }
    } 
    
    if (isTandai(message)) {
        // ...task x..., req: idTask
        var idTask;
        idTask = 0;
        var element = dictTask[idTask];
        var isReqAllExist = true;
        if (isReqAllExist) {
            // tandaiTaskSelesai(idTask);
            return "Task " + idTask + " - " + 
            element["Kode Matkul"] + " - " + 
            listKataPenting[element["IdKataPenting"]] + " - " + 
            element["Materi"] + " sudah dimasukkan ke dalam task daftar yang sudah dikerjakan";
        } else {
            return "Maaf, pesan tidak dikenali";
        }
    } 
    
    if (isHelp(message)) {
        // req: tidak ada
        return "Help";
    } 

    if (isMelihatDaftarTask(message) && isExistKataWaktu(message)) { 
        // req: waktu (sudah)
        
        return "Melihat Daftar Task";
    } 

    if (isExistKataPenting(message)) {
        // req: katapenting (sudah), kodematkul, topik, tanggal
        
        return "Menambahkan task baru";
    }
    
    return "Maaf, pesan tidak dikenali";
}
