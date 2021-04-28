// Algoritma Boyer Moore untuk String Matching, versi javascript

// Membuat dictionary tiap huruf pada pattern untuk shift
function shiftDict(pattern) {
    var retDict = {};
    for (var i = 0; i < pattern.length; i++) {
        retDict[pattern[i].toLowerCase()] = Math.max(1, pattern.length - i - 1);
    }

    return retDict;
}

// Pattern matching dengan algoritma Boyer Moore
function boyerMoore(string, pattern) {
    // Perbedaan huruf kapital/kecil tidak diperhitungkan, semua dianggap kecil
    var lowString = string.toLowerCase();
    var lowPattern = pattern.toLowerCase();

    var sLen = string.length;
    var pLen = pattern.length;
    var shift = shiftDict(lowPattern);

    var i = 0;
    var j;
    var match;
    while (i < sLen) {
        j = pLen - 1;
        match = true;

        while (j >= 0 && match && i + j < sLen) {
            if (lowPattern.charAt(j) != lowString.charAt(i + j)) {
                match = false;
            } else {
                j -= 1;
            }
        }

        if (match && i + j < sLen) {
            //console.log("Ditemukan di indeks ke " + i);
            return i;
        } else {
            var key = lowString.charAt(i + j);

            if (typeof shift[key] == "undefined") {
                i += pLen;
            } else {
                i += shift[key];
            }
        }
    }

    //console.log("Tidak ditemukan")
    return -1;
}

// Dapatkan jenis tugas (praktikum, pr, tubes, tucil, etc)
function getJenisTugas(string, listJenisTugas) {
    for (const i in listJenisTugas) {
        const element = listJenisTugas[i];
        if (boyerMoore(string, element) != -1) {
            return element;
        }
    }

    return "None";
}

// Dapatkan array of tanggal
function getTanggal(string) {
    // Format DD\MM\YYYY
    const polaTanggal = /\d\d\/\d\d\/\d\d+/g;
    var tanggalArr = string.match(polaTanggal);
    if (tanggalArr) {
        return tanggalArr;
    }

    // Format DD MMMM YY, bulan dengan kata
    const lowString = string.toLowerCase();
    tanggalArr = [];
    var temp, re;
    var listBulan = bulan;
    for (const key in listBulan) {
        const element = listBulan[key];
        re = new RegExp("[0-9][0-9] " + element + " [0-9][0-9]+", "g");
        temp = lowString.match(re);
        for (i in temp) {
            tanggalArr.push(temp[i]);
        }
    }

    if (tanggalArr) {
        var dates = [];
        for (let i = 0; i < tanggalArr.length; i++) {
            var time = tanggalArr[i].split(" ");
            var nomorBulan = toAngkaBulan(time[1]);
            var tanggal = time[0] + "/" + nomorBulan + "/" + time[2];
            dates.push(tanggal);
        }
        console.log(dates);
        return dates;
    }

    return "None";
}

// Dapatkan matkul
function getMatkul(string) {
    const polaMatkul = /IF\d\d\d\d/g;
    const matkul = string.match(polaMatkul);
    if (matkul) {
        return matkul[0];
    }

    return "None";
}

// Testing
var jenisTugas = ["Tubes", "Tucil", "Kuis"];
var bulan = ["januari", "februari", "maret", "april", "mei", "juni", "juli", "agustus", "september", "oktober", "november", "desember"];

string = "Halo bot, tolong ingetin kalau ada kuis IF3110 Bab 2 sampai 3 pada 22 April 2021 dan 23 Mei 2021";
console.log(getJenisTugas(string, jenisTugas));
console.log(getTanggal(string));
console.log(getMatkul(string));

function toAngkaBulan(temp) {
    for (let i = 0; i < bulan.length; i++) {
        const element = bulan[i];
        // console.log(temp == element);
        if (element.toLowerCase() == temp.toLowerCase()) {
            return i + 1;
        }
    }

    return "-1";
}
