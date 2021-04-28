// Algoritma Boyer Moore untuk String Matching, versi javascript

// Membuat dictionary tiap huruf pada pattern untuk shift
function shiftDict(pattern) {
    var retDict = {};
    for (var i = 0; i < pattern.length; i++) {
        retDict[ pattern[i].toLowerCase() ] = Math.max(1, pattern.length - i - 1 );
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
    var match
    while (i < sLen) {
        j = pLen - 1;
        match = true;

        while (j >= 0 && match && i+j < sLen) {
            if (lowPattern.charAt(j) != lowString.charAt(i + j)) {
                match = false;
            }
            else {
                j -= 1;
            }   
        }   

        if (match && i+j < sLen) {
            //console.log("Ditemukan di indeks ke " + i);
            return i;
        }
        else {
            var key = lowString.charAt(i + j);

            if (typeof shift[key] == 'undefined') {
                i += pLen;
            } else {
                i += shift[key];
            }
        }
    }
    
    //console.log("Tidak ditemukan")
    return -1
}

// Dapatkan jenis tugas (praktikum, pr, tubes, tucil, etc)
function getJenisTugas(string, listJenisTugas) {
    for (const i in listJenisTugas) {
        const element = listJenisTugas[i]
        if (boyerMoore(string, element) != -1) {
            return element;
        }
    }
    
    return 'None'
}

// Dapatkan array of tanggal
function getTanggal(string) {
    const polaTanggal = /\d\d\/\d\d\/\d\d+/g; // XX\XX\XXXX
    const tanggalArr = string.match(polaTanggal);
    if (tanggalArr) {
        return tanggalArr;
    }

    return 'None'    
}

// Dapatkan matkul dalam bentuk array, contoh = ['IF3310']
function getMatkul(string) {
    const polaMatkul = /IF\d\d\d\d/g;
    const matkul = string.match(polaMatkul);
    if (matkul) {
        return matkul;
    }

    return 'None' 
}

// Testing
var jenisTugas = ['Tubes', 'Tucil', 'Kuis']

string = "Halo bot, tolong ingetin kalau ada kuis IF3110 Bab 2 sampai 3 pada 22/04/21"
console.log(getJenisTugas(string, jenisTugas))
console.log(getTanggal(string))
console.log(getMatkul(string))