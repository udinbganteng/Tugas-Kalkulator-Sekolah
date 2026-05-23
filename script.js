        // fungsi untuk notifikasi error, sengaja saya buat sendiri biar tau kalau error
        function notif() {
            document.getElementById("containerError").classList.toggle('hilang')
        }

        // ini fungsinya membuat variable untuk output dari tombol dan hasil 
        let output = document.getElementById('Output')

        // ini fungsinya untuk mendeteksi semua tombol dengan class = "tombol"
        let button = document.querySelectorAll('.tombol')

        // ini hanya untuk deklarasi operator untuk suatu kondisi aja. misal kayak membantu mendeklarasikan operator hitung apa aja yang dicari untuk mencegah 
        // operator menjadi lebih dari 1 ( kayak gini : 1++++2--2, padahal kan harus 1+2-2)
        const tandaHitung = ["+", "-", "×", "÷"]


        let gerbang = false;
        // ini adalah fungsi yang dipanggil jika tombol dipencet
        function hitung(nilai) {
            // agar pas user terlalu cepat mengetik hasilnya ga ada yang double atau mengganda
            // jika gerbang false berarti gerbang dibuka, namun jika gerbang nilainya true maka gerbang di tutup dan fungsi return langsung menghentikan semua program yang ada dibawahnya
            if (gerbang) return;

            // Mengeluarkan angka 
            if (/[0-9]/.test(nilai)) {
                output.innerText += nilai;

                // 3. Aktifkan kunci gerbang, berarti program dibawah ga jalan dan sementara gabisa input angka selama 100 
                gerbang = true;


                // 4. Buka kunci setelah jeda singkat (misal 100 milidetik)
                // Jeda ini lumayan cepet buat respon manusia, tapi cukup lama untuk mencegah error hardware/double-click
                // lagian mana ada orang normal yang refleknya 100 milidetik atau 0.1 detik
                setTimeout(() => {
                    gerbang = false;
                }, 100);
            }
        

            // untuk mengecek nilai jika yang dipencet adalah operator hitung
            if (nilai === "+" || nilai === "-" || nilai === "×" || nilai === "÷") {

                // mengeccek apakah value input dan karakter terakhir di output adalah sama sama operator hitung?
                if (tandaHitung.includes(nilai) && tandaHitung.includes(output.innerText.slice(-1))) {
                    // kalau iya maka operator terakhir yang lama di hapus dan diganti dengan operator baru
                    output.innerText = output.innerText.slice(0, -1)
                }

                // mengecek apakah output kosong dan nilai yang di input tidak sama dengan minur, kalau output kosong dan nilai input adalah minus
                // maka return atau program berhenti agar tidak ada operator yang keluar.
                // biasanya untuk diawalan untuk membuat angka minus misal -29+10
                if (output.innerText === "" && nilai !== "-") return;

                // output dari nilai yang akan ditambahkan 
                output.innerText += nilai

            }

            // kalau yang dipencet adalah tombol sama dengan, nanti dia akan mencari haril dari angka angka di output
            if (nilai === "=") {

                // try ini untuk mencegah program jadi berhenti karena error
                try {
                    // membuat variable hasil dengan method hitung eval() dan replace() untuk mengganti tanda x sama bagi
                    let hasil = eval(output.innerText.replace("÷", "/").replace("×", "*"))
                    output.innerText = hasil

                } catch {
                    // disini kayaknya kalo ada error pas input angka gitu (kayaknya)
                    document.getElementById("containerError").classList.remove("hilang")
                    output.innerText = ""
                }
                if (output.innerText === "undefined") {
                    // ini kalo output masih kosong dan jika dipencet pasti muncul undefined, nah ini biar munculnya notif aja
                    document.getElementById("containerError").classList.remove("hilang")
                    output.innerText = ""

                }
            }

            // ini fungsinya untuk memotong satu kata dari belakang
            if (nilai === "C") { output.innerText = output.innerText.slice(0, -1) }
            // ini fungsinya untuk menghapus semua angka maupun operator hitung
            if (nilai === "AC") { output.innerText = "" }

        }


        // ini fungsinya untuk mengambil value dari tombol, karena saya ngambilnya tidak di onclicknya
        button.forEach((btn) => {
            btn.addEventListener("click", () => {
                hitung(btn.textContent);
            });
        });
