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
            console.log("Ditemukan di indeks ke " + i);
            return i;
        }
        else {
            try {
                i += shift.get( lowString[i+j] )
            }
            catch (e) {
                i += pLen
            }
        }
    }
    
    console.log("Tidak ditemukan")
    return -1
}

var string = "Aku ada kuis stima tanggal 15 mei tentang string matching"
var pattern = "Kuis"
var idx = boyerMoore(string, pattern)
console.log(idx)
 