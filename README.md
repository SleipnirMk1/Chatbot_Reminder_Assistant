# Tugas Besar 3 Strategi Algoritma IF2211 ITB: Chatbot Deadline Reminder Assistant

## Algoritma yang Digunakan: Algoritma Boyer-Moore

Algoritma Boyer-Moore merupakan algoritma pencocokan string persis (exact string matching). Algoritma ini dianggap sebagai algoritma paling efisien untuk melakukan pencocokan string. Berbeda dengan algoritma lainnya, algoritma ini mencocokan pattern dimulai dari karakter paling kanan. Pencocokan string dengan menggunakan Algoritma Boyer-Moore terdiri atas dua teknik :

### The Looking-Glass Technique

The Looking-Glass Technique melakukan perbandingkan suatu karakter akhir pada kata W dengan suatu karakter pada teks S. Jika karakter tersebut sama maka jendela karakter akan berjalan mundur pada kedua string dan mengecek kembali kedua karakter. Mencari Suatu kecocokan String pada Teks dengan pola yang akan dicari dengan cara memindahkan atau menggesernya sampai Teks string selesai. 

### The Character-Jump Technique

Character-jump Technique melakukan suatu aksi ketika perbandingan antara dua karakter yang berbeda. Ada dua aksi yang tergantung pada teks S dan kata W yang dimiliki; jika P yaitu karakter pada S yang sedang diproses yang tidak cocok maka ada dua kemungkinan aksi. Mencari karakter yang sesuai dan cara penggeseran sebuah karakter perbandingan terakhir. 

## Requirement Program

-   Javascript
-   Web Browser Pilihan

## Cara Menggunakan Program

-   Masuk ke folder src, lalu buka file index.html
-   Atau melalui link https://chatbot-remainder-assist-f2d5d.web.app
-   Untuk memanggil fitur, cukup chat ke chatbot dengan bahasa natural
-   Ketika menambahkan tugas, untuk mendefinisikan topiknya, harus menggunakan kata “topik”
-   Untuk mendefinisikan tugas dengan id tertentu, setelah kata “task” perlu diikuti dengan id task tersebut


## Identitas

-   13519023 - Ilyasa Salafi Putra Jamal  
-   13519051 - Yudi Alfayat  
-   13519172 - Muhammad Zubair  
