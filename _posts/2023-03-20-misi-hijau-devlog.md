---
title: "Misi Hijau: Devlog #1"
tag:
- programming
- art
- gamedev
excerpt: "The first 5 days of Misi Hijau development! *I will write this in Indonesian :)"
---

# AKHIRNYA AKU DIAJAK!
![vscode](/blog/image/misi-hijau-1.png)

Bulan lalu, aku GAK ditawarin sekolah (guru informatika/guru lain) buat ikut lomba [Code Olympiad 2023](https://www.codeolympiad.id/). Padahal, sekolahku ini termasuk event organizer-nya. Aku malahan tahu dari temenku, how pathetic. Karena gak diundang, aku tadinya mau ikut, tapi bayar 100 ribu. Gak mungkin menang rasanya, but *"do this for experience, I guess?"*

Anyways, aku gak ikut lomba itu akhirnya karena temanya lumayan susah. Dan aku bersyukur banget sekarang karena aku akhirnya diajak ikut lomba koding minggu ini! Sekarang skill Pythonku udah lumayan bagus, which is great. Plus, dibayarin sekolah (termasuk materai 10 ribu, lmao). Kurang enak apa lagi coba?

Well, bad news is:
* Aku belum pernah ikut lomba koding sama sekali sebelumnya
* Kayanya terakhir kali aku bikin game itu tahun lalu 💀
* Aku bisa buruk di manajemen waktu

Tapi untungnya lusa aku udah libur, jadi aku bisa ngerjain game ini tAnpa Perlu puSIng saMa uRusan sEkoLah!!

Candaaa 🙂 Aku kan anak kesayangan wakasis buat ngedit video (*somehow*) sekaligus koordinator bidang IT OSIS terabsurd sepanjang sejarah PHI (my school). Aku bakal pergi ke Tasikmalaya karena program Sahabat Belajar pas 5 April (*which apparently is also* tanggal technical meeting lomba kodingku). Dan juga, aku harus bantu (doang karena semua beban ditanggung ke ketua OSIS xixiix 🤍) nyiapin buat kegiatan Sahabat Belajar itu. *But nah, the timing for this competition is still way better than the previous one.*

# Ide
Nyari ide itu susah BANGET, apalagi *when you're constrained in a theme*. Dan worse, aku baru pakai semua tenaga otakku untuk bikin [It'll be Alright](/_posts/2023-03-14-the-crazy-animation-project.md). Oh ya, aku diajak sehari setelah aku nyelesain animasi itu, ahha.

Aku udah nyoba nyari ide sendiri dan nanya orang (dan ChatGPT because why not). Benar-benar gak ada yang bikin aku semangat banget! "Tech for a better future"... *literally nothing in my mind fits that tbh*. Aku sebenarnya belum punya ide solid tentang game ini, jadi aku berusaha ngejar kode aja dulu dengan *rough idea*. Awalnya, aku mau bikin sesuatu yang berkaitan sama misi menyelamatkan kota dari krisis energi dengan bikin semacam mesin pembangkit energi hijau, tapi kayanya itu susah banget jadi ku-cancel.

Kemarin, habis aku tidur siang karena agak tertekan, aku akhirnya bisa ngarang cerita yang lumayan bagus tentang misi penyelamatan Bumi yang dilakuin oleh sekelompok astronot muda. Pimpinannya of course astronot Indonesia karena aku bener-bener pengen unsur "NKRI"-nya dapet, haha. Tapi nama astronotnya Alyssa... yasudahlah, mungkin jadi Alisa nanti.

# Progress
<p style="text-align: center;">
    <video autoplay width=400px>
    <source src="/blog/image/misi-hijau-rec-1.mp4" type="video/mp4">
    Your browser does not support the video tag.
    </video> 
</p>

- Aku udah nyelesain semacam "abstraction layer" buat gameku. Apa ya namanya, entahlah, I'm bad at terminologies. Itu udah hampir rampung (90%) dan adalah komponen game berupa kelas-kelas di file `base.py`-ku yang bisa dikonstruksi di inisialisasi di awal game dengan mudah.
- Spaceship di gameku udah punya kontrol dan animasi api yang ngikutin level! <br>(Fun fact: pergerakan pemain sama kameranya udah kutulis ulang kayak 4 kali)
- Managemen level udah lumayan rampung, kemungkinan bisa langsung lanjut tanpa perlu terlalu banyak refactoring.

Untuk strukturnya aku usahain biar bisa serapi mungkin (*thank you [bro Eason](https://ezntek.github.io/) for the AMAZING feedback*) biar easy to wrap around my smol brain and others' brain too I guess.

Aku udah nyelesain these (*based on my roadmap*):

> - [x] Finish basic enhancement utilities for pyxel
>    - [x] Key listener (partial)
>    - [x] Camera
>    - [x] Sprites
>    - [x] Ticker
> - [x] Player movements
> - [x] Camera movements
> - [x] Player animations
> - [x] Just wrap this entire thing around my smol brain

I guess bagus, apalagi dalam 5 hari lol.

# appendix
Gila gue jaksel banget ya, ea.