function isUpdate(message) {
    for (const key in listUbahTask) {
        const element = listUbahTask[key];
        if (boyerMoore(message, element) != -1) {
            return true;
        }
    }
    return false;
}

function isTandai(message) {
    for (const key in listTandai) {
        const element = listTandai[key];
        if (boyerMoore(message, element) != -1) {
            return true;
        }
    }
    return false;
}

function isMenampilkanDeadline(message) {
    for (const key in listMenampilkanDeadline) {
        const element = listMenampilkanDeadline[key];
        if (boyerMoore(message, element) != -1) {
            return true;
        }
    }
    return false;
}

function isMelihatDaftarTask(message) {
    for (const key in listMelihatDaftarTask) {
        const element = listMelihatDaftarTask[key];
        if (boyerMoore(message, element) != -1) {
            return true;
        }
    }
    return false;
}

function isHelp(message) {
    for (const key in listHelp) {
        const element = listHelp[key];
        if (boyerMoore(message, element) != -1) {
            return true;
        }
    }
    return false;
}

function isExistKataWaktu(message) {
    for (const key in listWaktu) {
        const element = listWaktu[key];
        if (boyerMoore(message, element) != -1) {
            return true;
        }
    }
    return false;
}

function decision(message) {
    if (isUpdate(message)) {
        // req: tanggal
        var idTask, tanggal;
        // idTask 0 ada, idTask 1 tidak ada
        // idTask = 0; // Task 0 - IF2211 - kuis - String matching tanggal berubah dari 12/02/2021 menjadi tanggal 12/02/2021
        // idTask = 1; // Task tidak dapat ditemukan

        var idxTask = boyerMoore(message, "task");
        if (idxTask == -1) {
            return "Task tidak ditemukan";
        }

        var idxID = idxTask;
        var space = false;
        while ((message[idxID] == " " || !space) && idxID < message.length) {
            if (message[idxID] == " ") {
                space = true;
            }
            idxID++;
        }

        if (idxID >= message.length) {
            return "Input salah";
        }

        var id = "";
        while (message[idxID] != " " && idxID < message.length) {
            id += message[idxID];
            idxID++;
        }

        tanggal = getTanggal(message);

        var isReqAllExist = tanggal != "None" && id != "None";
        if (isReqAllExist) {
            try {
                var idInt = parseInt(id);
            } catch (error) {
                return "Id Task tidak ditemukan";
            }

            if (dictTask.hasOwnProperty(idInt)) {
                var element = dictTask[idInt];
                updateTask2(idInt, tanggal[0]);
                return (
                    "Task " +
                    idInt +
                    " - " +
                    element["Kode Matkul"] +
                    " - " +
                    listKataPenting[element["IdKataPenting"]] +
                    " - " +
                    element["Materi"] +
                    " tanggal berubah dari " +
                    element["Tanggal"] +
                    " menjadi tanggal " +
                    tanggal
                );
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

        var idxTask = boyerMoore(message, "task");
        if (idxTask == -1) {
            return "Task tidak ditemukan";
        }

        var idxID = idxTask;
        var space = false;
        while ((message[idxID] == " " || !space) && idxID < message.length) {
            if (message[idxID] == " ") {
                space = true;
            }
            idxID++;
        }

        if (idxID >= message.length) {
            return "Input salah";
        }

        var id = "";
        while (message[idxID] != " " && idxID < message.length) {
            id += message[idxID];
            idxID++;
        }

        try {
            var idInt = parseInt(id);
            var found = false;
            // console.log(idInt);
            for (const key in dictTask) {
                // console.log(key == idInt);
                if (key == idInt) {
                    console.log(key);
                    found = true;
                    break;
                }
            }

            if (!found) {
                return "Id Task tidak ditemukan";
            }

            var element = dictTask[idInt];
            if (true) {
                tandaiTaskSelesai(idInt);
                return (
                    "Task " +
                    idInt +
                    " - " +
                    element["Kode Matkul"] +
                    " - " +
                    listKataPenting[element["IdKataPenting"]] +
                    " - " +
                    element["Materi"] +
                    " sudah dimasukkan ke dalam task daftar yang sudah dikerjakan"
                );
            }
        } catch (error) {
            return "Id Task tidak ditemukan";
        }
    }

    var topik = getTopic(message);
    if (isMelihatDaftarTask(message) && isExistKataWaktu(message) && topik == "null") {
        // req: waktu (sudah)

        var idxSejauh = boyerMoore(message, "sejauh");

        if (idxSejauh != -1) {
            var keys = [];
            for (const key in dictTask) {
                keys.push(key);
            }

            var task = "[Daftar Deadline]\n";
            task += getTask(keys, keys.length);
            return task;
        }

        var waktu = getTanggal(message);
        if (waktu.length == 2) {
            var time1 = waktu[0].split("/");
            var time2 = waktu[1].split("/");

            try {
                var date1 = new Date();
                var date2 = new Date();
                // console.log(time2);

                date1.setFullYear(time1[2], time1[1], time1[0]);
                date2.setFullYear(time2[2], time2[1], time2[0]);

                // console.log(date1);

                var idTasks = [];
                for (key in dictTask) {
                    const element = dictTask[key];
                    var timeTask = element["Tanggal"].split("/");
                    var dateTask = new Date(timeTask[2], timeTask[1], timeTask[0]);
                    if (date1 <= dateTask && dateTask <= date2) {
                        idTasks.push(key);
                    }
                }

                var task = "[Daftar Deadline]\n";
                task += getTask(idTasks, idTasks.length);
                return task;
            } catch (error) {
                console.log(error);
                return "Tidak ada deadline tugas";
            }
        } else if (waktu.length == 1) {
            var time2 = waktu[0].split("/");
            // console.log(time2);
            try {
                var date1 = new Date();
                var date2 = new Date();

                date2.setFullYear(time2[2], time2[1], time2[0]);

                // console.log(date1);

                var idTasks = [];
                for (key in dictTask) {
                    const element = dictTask[key];
                    var timeTask = element["Tanggal"].split("/");
                    var dateTask = new Date(timeTask[2], timeTask[1], timeTask[0]);
                    if (date1 <= dateTask && dateTask <= date2) {
                        idTasks.push(key);
                    }
                }

                var task = "[Daftar Deadline]\n";
                task += getTask(idTasks, idTasks.length);
                return task;
            } catch (error) {
                console.log(error);
                return "Tidak ada deadline tugas";
            }
        }
    }

    var kataPenting = getJenisTugas(message, listKataPenting);
    if (isMenampilkanDeadline(message) && kataPenting != "None") {
        // req: katapenting (sudah)

        var deadline = getDeadline(message);

        if (deadline == "null") {
            return "Tidak ada deadline yang dimaksud";
        } else {
            var dead = "";
            for (let i = 0; i < deadline.length; i++) {
                if (i != deadline.length - 1) {
                    dead += deadline[i] + ", ";
                } else {
                    dead += deadline[i];
                }
            }
            return dead;
        }
    }

    if (kataPenting != "None" && topik != "null") {
        // req: katapenting (sudah), kodematkul, topik, tanggal
        var tanggal = getTanggal(message);
        var kodeMatkul = getMatkul(message);
        var idKataPenting = listKataPenting.indexOf(kataPenting);
        if (tanggal != "None" && kodeMatkul != "None") {
            addTask(idKataPenting, kodeMatkul, topik, tanggal[0]);
            return (
                "[TASK BERHASIL DICATAT]\n" +
                "(ID: " +
                (parseInt(Object.keys(dictTask)[Object.keys(dictTask).length - 1]) + 1) +
                ") " +
                tanggal[0] +
                " - " +
                kodeMatkul +
                " - " +
                listKataPenting[idKataPenting] +
                " - " +
                topik
            );
        } else {
            return "Maaf, anda kekurangan informasi.";
        }
    }

    if (isHelp(message)) {
        return getHelpMessage();
    }

    return "Maaf, pesan tidak dikenali";
}

function getTask(keys, n) {
    var tasks = "";
    for (let i = 0; i < n; i++) {
        const element = dictTask[keys[i]];
        tasks += "(ID:" + keys[i] + ") " + element["Tanggal"] + " - " + element["Kode Matkul"] + " - " + listKataPenting[element["IdKataPenting"]] + " - " + element["Materi"] + "\n";
    }
    return tasks;
}

// getDeadline
function getDeadline(message) {
    var idxKataPenting = -1;
    var kataPenting = "null";
    for (let i = 0; i < listKataPenting.length; i++) {
        const element = listKataPenting[i];
        idxKataPenting = boyerMoore(message, element);
        if (idxKataPenting != -1) {
            kataPenting = element;
            break;
        }
    }

    if (idxKataPenting == -1) {
        console.log("tidak ditemukan kata penting");
        return "null";
    }

    var idxMatkul = idxKataPenting;
    var space = false;
    while ((message[idxMatkul] == " " || !space) && idxMatkul < message.length) {
        if (message[idxMatkul] == " ") {
            space = true;
        }
        idxMatkul++;
    }

    var kataMatkul = "";
    while (message[idxMatkul] != " " && idxMatkul < message.length) {
        kataMatkul += message[idxMatkul];
        idxMatkul++;
    }

    // console.log(kataMatkul);

    var deadlines = [];
    for (const key in dictTask) {
        if (dictTask[key]["Kode Matkul"] == kataMatkul) {
            deadlines.push(dictTask[key]["Tanggal"]);
        }
    }

    if (deadlines.length != 0) {
        return deadlines;
    } else {
        var idxKataTask = boyerMoore(message, "task");
        if (idxKataTask == -1) {
            console.log("Tidak ada kata task");
            return "null";
        }

        var idxID = idxKataTask;
        var space = false;
        while ((message[idxID] == " " || !space) && idxID < message.length) {
            if (message[idxID] == " ") {
                space = true;
            }
            idxID++;
        }

        if (idxID < message.length) {
            var id = "";
            while (message[idxID] != " " && idxID < message.length) {
                id += message[idxID];
                idxID++;
            }

            console.log(id);

            try {
                var idInt = parseInt(id);
                for (const key in dictTask) {
                    const element = dictTask[key];
                    if (key == idInt) {
                        deadlines.push(element["Tanggal"]);
                    }
                }

                if (deadlines.length != 0) {
                    return deadlines;
                } else {
                    return "null";
                }
            } catch (error) {
                return "null";
            }
        } else {
            return "null";
        }
    }
}
