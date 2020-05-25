var helpImg = "help.png";   //varsılan resim
var tiklamaSayisi = 0;     //tıklama sayısını tutar (ilk ikinci olarak)
var acikImgSayisi = 0; //açık reim sayısını tutuyor 2 açık varken 3. yü açmamak için   
var timeout;
var bilinen = 0;           //bilinen sayısını tutacak
var ilkIndis, ikinciIndis;  //tıklanan resimleri tutmak için
var hamle = 0;               //hamle sayısını tutar
var sure = 0, saat, dk, sn;
var kont = true;  //setInterval için
var interval;     //interval için
var x1 = document.getElementById("sesClick"); //click sesi çalması için
var x2 = document.getElementById("sesGiggle"); //click sesi çalması için
var x3 = document.getElementById("sesTada"); //click sesi çalması için
var x4 = document.getElementById("sesDing"); //click sesi çalması için

//resimler her biri çift olarak tanımlandı
var resimler;
//img tagındaki resimlerin sırasını seçmek için dizi tanımlandı
//bu sıra aşağıda random olarak seçilecek
var sira ,msg;
var imgSrc = [];   //yüklenen resimlerin saklamak için
      
var ele = document.querySelector('#ana');
var imgs = ele.getElementsByTagName("img");
var ind;       //0 - 15 arasında rastgele seçilen sayı
var imgSecim;  // liste sonundaki resmi tutar

function resimleriRandomSec(){
   resimler = ["arrow-L.png", "arrow-r.png", "kure1.png", "kure2.png","gblue.png",
                "shapes.png", "saat.png", "eye1.png", "eye2.png", "gred.png",
                "arrow-L.png", "arrow-r.png", "kure1.png", "kure2.png","gblue.png",
                "shapes.png", "saat.png", "eye1.png", "eye2.png", "gred.png"
                ];
   //bu sıra aşağıda random olarak seçilecek
   sira = [0, 1, 2, 3, 4, 5, 6, 7 ,8 ,9 ,10, 11, 12, 13, 14, 15, 16, 17, 18, 19];

   for (let i = 0; i < sira.length; i++) {
      //daha önce sçilen indislerin değeri -1 yapılıyor
      //eğer aynı indis random seçimden geldi ise yeniden seç
      do{
         //rastgele sira seç
         ind = Math.floor(Math.random() * sira.length); 

         //seçilen rastgele sıraya resmi koy ve bu resmi listeden çıkar 
         if(sira[ind] >= 0){
            //listenin sonundaki resmi al ve aldıktan sonra
            //listeden çıkar
            var imgSecim = resimler.pop();  
            imgSrc[sira[ind]] =  imgSecim;  
         }
      }while(sira[ind] == -1);
      //seçilen indis -1 yapılıyor
      //bir dahaki aynı indis seçiminde dikkate alınmaması için
      sira[ind] = -1;
   }

  //varsayılan resimlerin yüklenmesi hepsi ? şeklinde
   for (let i = 0; i < imgs.length; i++) {
      imgs[i].src = "images/" + helpImg; 
      imgs[i].id = i;   //herbir resme id özelliği ekle
   } 

   //resimlere tıklama olayı ekleme
   for (let i = 0; i < imgs.length; i++) {
      imgs[i].addEventListener("click", secilenResim);
      imgs[i].style.opacity=1;
      imgs[i].style.opacity=1;
   }
}

//Ekrana yerleştirilecek resimler random seçilir
resimleriRandomSec();

//seçilen resmi göster ---------------------------------------------------------
function secilenResim(event){   

   //kullanıcı süresini başlat
   if(kont){
      interval = setInterval(sureGuncelle, 1000);
      kont = false;
   }
   //iki resimden fazla açma
   if(acikImgSayisi < 2){
      event.target.src = "images/" + imgSrc[event.target.id];
      playClick();  //resme click te click sesi çal
      acikImgSayisi++;
      tiklamaSayisi++;
   }
    
   if(tiklamaSayisi == 1){
      ilkIndis = event.target.id;
   }
   if(tiklamaSayisi == 2){
      
      hamle++;
      //oyuncu hamle sayısını güncelle
      document.getElementById("hamle").innerHTML = "Hamle:" + hamle;
      ikinciIndis = event.target.id;
      
      //tıklanan iki resim eşitmi
      if(ilkIndis != ikinciIndis && imgSrc[ilkIndis] == imgSrc[ikinciIndis]) {
         
         //Bu resimler doğru şekilde açıldığından tekrar dinlenmiyor
         imgs[ilkIndis].removeEventListener("click", secilenResim);
         imgs[ikinciIndis].removeEventListener("click", secilenResim);
         imgs[ilkIndis].style.opacity=0.65;        //pasif görünüm
         imgs[ikinciIndis].style.opacity=0.65;     //pasif görünüm

         acikImgSayisi = 0;      //açık resim sayısını sıfırla
         tiklamaSayisi = 0;      //tiklama sayısını sıfırla
         clearTimeout(timeout);     //gizle timeOut'unu sıfırla

         //Ding Sesi çal
         playDing();

         bilinen++;
         //if(bilinen == imgs.length/2){ //kazanma durumu
         if(bilinen == 1){ //kazanma durumu
            clearInterval(interval);
            if(dk > 0){
              msg = "Tebrikler! <br>" + "Hamle : " + hamle + "<br>Süreniz :" + dk + " dk. " + sn + " s"; 
            }else{
               msg = "Tebrikler! <br>" + "Hamle : " + hamle + "<br>Süreniz : "  + sn + " s"; 
            } 
            sonMesaj(msg);
            //tiklamaSayisi = 0;
            //acikImgSayisi = 0;
         }
      }else{
         if(acikImgSayisi == 2) timeout = setTimeout(imgGizle, 800);
         tiklamaSayisi = 0;
      }  
   }
}
/**************************************************************************************** */
//açık resimleri gizle
function imgGizle(){
   imgs[ilkIndis].src = "images/" + helpImg; 
   imgs[ikinciIndis].src = "images/" + helpImg; 

   acikImgSayisi = 0;
   //gizle timeOut'unu sıfırla
   clearTimeout(timeout);
}
//oyunu yeniden başlat
function restart(){
   location.reload();
}

//her saniye oyuncu süresini günceller
function sureGuncelle(){
   sure++;   
   saat = Math.floor(sure / 3600);
   dk = Math.floor(sure / 60);
   sn = sure - saat*3600 - dk*60;
   document.getElementById("sure").innerHTML = "süre:" + saat+":" + dk+":" + sn;
}

function playClick() { //Her click'te çalınacak ses
  x1.play(); 
} 
function playGiggle() { //Her bilemediğinde çalınacak ses
   x2.play(); 
 } 
 function playTada() { //Bildiğinde çalınacak ses
   x3.play(); 
 } 
 function playDing() { //Bildiğinde çalınacak ses
   x4.play(); 
 } 

 /* son mesaj ekranı popup */
 function sonMesaj(mesaj) {
    playTada();
   document.getElementById("mesaj").classList.toggle("show");
   document.getElementById("mesaj").innerHTML = mesaj;
}
