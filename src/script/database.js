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

var listTandai = [];
dbRefTandai.orderByKey().on('value', snapshot => {
    snapshot.val().forEach(element => {
        listTandai.push(element["Tandai"]);
    });
})

var listMelihatDaftarTask = []
dbRefMelihatDaftarTask.orderByKey().on('value', snapshot => {
    snapshot.val().forEach(element => {
        listMelihatDaftarTask.push(element["Kata"]);
    });
})

var listMenampilkanDeadline = []
dbRefMenampilkanDeadline.orderByKey().on('value', snapshot => {
    snapshot.val().forEach(element => {
        listMenampilkanDeadline.push(element["Waktu"]);
    });
})

var listHelp = []
dbRefHelp.orderByKey().on('value', snapshot => {
    snapshot.val().forEach(element => {
        listHelp.push(element["Kata"]);
    });
})

var listWaktu = [];
dbRefWaktu.orderByKey().on('value', snapshot => {
    snapshot.val().forEach(element => {
        listWaktu.push(element["Waktu"]);
    });
})

// Penanda waktu untuk tambah task
var listWaktuTambahTask = []
dbRefWaktuTambahTask.orderByKey().on('value', snapshot => {
    snapshot.val().forEach(element => {
        listWaktuTambahTask.push(element["Waktu"]);
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

// // menambahkan kata penting pada tabel kata penting
// function addKataPenting(kataPenting) {
//     dbRefKataPenting.child(listKataPenting.length).set({
//         "Kata Penting": kataPenting
//     });
//     listKataPenting.push(kataPenting);
// }

// // menambahkan kata kunci tugas pada tabel Tugas
// function addTugas(tugas) {
//     dbRefTugas.child(listTugas.length).set({
//         "Tugas": tugas
//     });
//     listTugas.push(tugas);
// }

// // menambahkan kata kunci ubah task pada tabel ubahTask
// function addUbahTask(ubahTask) {
//     dbRefUbahTask.child(listUbahTask.length).set({
//         "Ubah Task": ubahTask
//     });
//     listUbahTask.push(ubahTask);
// }

// // menambahkan kata kunci waktu pada tabel waktu
// function addWaktu(waktu) {
//     dbRefWaktu.child(listWaktu.length).set({
//         "Waktu": waktu
//     });
//     listWaktu.push(waktu);
// }

// menambahkan task pada tabel task
function addTask(idKataPenting, kodeMatkul, materi, tanggal) {
    var task = {
        "IdKataPenting": idKataPenting,
        "Kode Matkul": kodeMatkul,
        "Materi": materi,
        "Tanggal": tanggal
    };
    // console.log("dictTask");
    // console.log(dictTask);
    // console.log("Object.keys(dictTask)");
    // console.log(Object.keys(dictTask));
    // console.log(Object.keys(dictTask)[0]);
    // console.log(Object.keys(dictTask).length);
    // console.log("Object.keys(dictTask)[dictTask.length-1]");
    // console.log(parseInt(Object.keys(dictTask)[Object.keys(dictTask).length-1])+1);
    dbRefTask.child(parseInt(Object.keys(dictTask)[Object.keys(dictTask).length-1])+1).set(task);
    dbRefTask.orderByKey().on('value', snapshot => {dictTask = snapshot.val();})
}

// menambahkan taskselesai pada tabel task selesai
function addTaskSelesai(idTask, idKataPenting, kodeMatkul, materi, tanggal) {
    var taskSelesai = {
        "IdKataPenting": idKataPenting,
        "Kode Matkul": kodeMatkul,
        "Materi": materi,
        "Tanggal": tanggal
    };
    dbRefTaskSelesai.child(idTask).set(taskSelesai);
    dbRefTaskSelesai.orderByKey().on('value', snapshot => {dictTaskSelesai = snapshot.val();})
}

// menandai task selesai dikerjakan
function tandaiTaskSelesai(idTask) {
    var element;
    for (const key in dictTask) {
        const el = dictTask[key];
        // console.log(el);
        if (idTask == key) {
        //     element = el;
            console.log(el);
            addTaskSelesai(idTask, el["IdKataPenting"], el["Kode Matkul"], el["Materi"], el["Tanggal"]);
            deleteTask(idTask);
            break;
        }
    }
}

// update task
function updateTask1(idKataPenting, kodeMatkul, materi, tanggalUpdate) {
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

// update task
function updateTask2(idTask, tanggalUpdate) {
    const newTanggal = {
        "Tanggal": tanggalUpdate
    };
    dbRefTask.child(idTask).update(newTanggal);
    dbRefTask.orderByKey().on('value', snapshot => {dictTask = snapshot.val();})
}

// delete task
function deleteTask(idTask) {
    dbRefTask.child(idTask).remove();
    dbRefTask.orderByKey().on('value', snapshot => {dictTask = snapshot.val();})
}

