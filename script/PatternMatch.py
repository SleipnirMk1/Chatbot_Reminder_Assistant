# Algoritma Boyer Moore untuk String Matching

# Membuat dictionary tiap huruf pada pattern untuk shift
def shiftDict(pattern) :
    retDict = {}
    for i in range(len(pattern)):
        retDict[ pattern[i].lower() ] = max(1, len(pattern) - i - 1 )

    return retDict

# Pattern matching dengan algoritma Boyer Moore
def boyerMoore(string, pattern) :
    # Perbedaan huruf kapital/kecil tidak diperhitungkan, semua dianggap kecil
    lowString = string.lower()
    lowPattern = pattern.lower()

    sLen = len(string)
    pLen = len(pattern)
    shift = shiftDict(lowPattern)

    i = 0
    while i < sLen :
        j = pLen - 1
        match = True
        remaining = True

        while j >= 0 and match and i+j < sLen :
            if lowPattern[j] != lowString[i + j] :
                match = False
            else:
                j -= 1       

        if match and i+j < sLen :
            print("Ditemukan di indeks ke " + str(i))
            return i
        else:
            try :
                i += shift.get( lowString[i+j] )
            except :
                i += pLen
    
    print("Tidak ditemukan")
    return -1
        
    
def main():

    string = "Aku ada kuis stima tanggal 15 mei tentang string matching"
    pattern = "Kuis"
    idx = boyerMoore(string, pattern)
    print(idx)
 
if __name__ == '__main__':
    main()