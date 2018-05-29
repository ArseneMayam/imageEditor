/**
 * Created by mmayam on 2017-12-18.
 */
"use strict";

document.addEventListener("DOMContentLoaded",function () {
    console.log("DOMContentLoaded");

    // canvas principal
    let canvas = document.getElementById("canvas");
    console.log("canvas ",canvas);
    //get l'image sélectionné
    let selectedImage = document.getElementById('selectedImage');

    // scale image
    let scaleSlider = document.getElementById("scaleSlider");
    console.log("scaleSlider",scaleSlider);
    let scale = 1.0;
    let MINIMUM_SCALE = 1.0;
    let MAXIMUM_SCALE = 3.0;

    // opacite range
    let opaciteRange = document.getElementById("opaciteRange");
    let scaleOpa = 1.0;
    // saturation range
    let saturationRange = document.getElementById("saturationRange");
    console.log("saturationRange",saturationRange);
    let scaleSat = 1.0;
    // blur range
    let blurRange = document.getElementById("blurRange");
    console.log("blurRange",blurRange);
    let scaleBlur = 1.0;
    //contrast range
    let contrastRange = document.getElementById("contrastRange");
    console.log("contrastRange",contrastRange);
    let scaleContrast = 1.0;
    //hue rotate
    let hueRange = document.getElementById("hueRange");
    console.log("hueRange",hueRange);
    let scaleHue = 1.0;
    //ombre
    let ombreRange = document.getElementById("ombreRange");
    console.log("ombreRange",ombreRange);
    let scaleOmbre = 1.0;
    // input text
    let inputText = document.getElementById("textInput");
    console.log("inputText",inputText);
    let valeurText = "Veuillez saisir un text";
    inputText.oninput = function (e) {
        valeurText = e.target.value;
        console.log("text saisie",valeurText);
    };
    // couleur text
    let inputColText = document.getElementById("textColor");
    let valColText = "black"; // defaut
    inputColText.onchange= function (e) {
        valColText = e.target.value;
        console.log("couleur text",valColText);
    };
    // police text
    let policeText = document.getElementById("police");
    console.log("policeText",policeText);
    let valeurPolice = 50; // par defaut
    policeText.onchange = function (e) {
        valeurPolice = e.target.value;
        console.log("valeurPolice",valeurPolice);
    };
    // font family text
    let fontText = document.getElementById("fontfamily");
    let valeurFont ="Arial"; // defaut
    fontText.onchange = function (e) {
      valeurFont = e.target.value;
      console.log("valeurFont",valeurFont);
    };
    // font weight
    let fontWeight = document.getElementById("fontweight");
    console.log("fontWeight",fontWeight);
    let valeurWeight = "normal"; // defaut
    fontWeight.onchange = function (e) {
        valeurWeight = e.target.value;
        console.log("valeurWeight",valeurWeight);
    };
    // modal photo
    let modal = document.getElementById("myModal");
    // bttn photo
    let bttnPhoto = document.getElementById("bttnPhoto");
    console.log("bttnPhoto",bttnPhoto);
   /* bttnPhoto.addEventListener("click",function () {
       console.log("click bttn photo");
      // window.alert("test");
       // modal.style.display = "block";
    });*/


    let ctx = canvas.getContext('2d');
    // canvas width et height
    let width = canvas.width;
    console.log("width ", width);
    let height = canvas.height;
    console.log("height ", height);


    // cree et colorie rectangle
    ctx.fillStyle ="gray";
    ctx.fillRect(0,0,width,height);

    // ecoute sur le fichier image selectionnée
    selectedImage.addEventListener("change",function () {
        // recuper le fichier image
        let file = this.files[0];
        console.log(file.name,file.type);

        if(img_verification(file)){
            console.log("le fichier ", file.name," est une image");

            // une Image
            let image = new Image();
            load_img_FileReader(file,image);




            ///initialisaton
             ctx.fillStyle = "cornflowerblue";
             ctx.strokeStyle = "yellow";
             ctx.shadowColor = "rgba(50,50,50,1.0)";
             ctx.shadowOffsetX = 5;
             ctx.shadowOffsetY = 5;
             ctx.shadowBlur = 10;

           // drawImage(image);

            image.addEventListener('load',function () {
                //canvas.width = this.width;
               // canvas.height = this.height;

                ctx.clearRect(0,0,canvas.width,canvas.height);
               ctx.drawImage(this,0,0,width,height);
               for(let i = 0; i <4; i++){
                    imagesFiltres(this,i);
               }

            });
            // scale image
            scaleSlider.onchange = function (e) {
                scale = e.target.value;
                console.log("scale",scale);

                scaleImage(scale,image);
            };
            // saisie de text
            canvas.addEventListener('click',function (e) {

                drawtext(ctx,valeurText,e,valColText,valeurPolice,valeurFont,valeurWeight);
            });


            // changement de l'opacite
            opaciteRange.onchange = function (e) {
                scaleOpa = e.target.value;
                ctx.filter = 'opacity(' +scaleOpa +'%)';
                ctx.drawImage(image,0,0,width,height);
            };

            // changement saturation
            saturationRange.onchange = function (e) {
                scaleSat = e.target.value;
                ctx.filter ='saturate('+scaleSat+'%)';
                ctx.drawImage(image,0,0,width,height);
            };
            // changemenet blur
            blurRange.onchange = function (e) {
                scaleBlur = e.target.value;
                ctx.filter ='blur('+scaleBlur+'px)';
                ctx.drawImage(image,0,0,width,height);

            };
            //changement contrast
            contrastRange.onchange = function (e) {
                scaleContrast = e.target.value;
                ctx.filter='contrast('+scaleContrast+'%)';
                ctx.drawImage(image,0,0,width,height);
            };
            // changement hue
            hueRange.onchange = function (e) {
                scaleHue = e.target.value;
                ctx.filter='hue-rotate('+scaleHue+'deg)';
                ctx.drawImage(image,0,0,width,height);

            };
            //changement ombre
            ombreRange.onchange = function (e) {
                scaleOmbre = e.target.value;
                ctx.filter='drop-shadow(16px 16px 20px red) invert('+scaleOmbre+'%)';
                ctx.drawImage(image,0,0,width,height);
            };

            // le button black and white
            let button = document.getElementById("blackwhite");
            button.addEventListener("click",function () {
                imgBlacWhite();
            });

            // button couleur
            let bttnCouleur = document.getElementById("filterColor");
            bttnCouleur.addEventListener("click",function () {
                imgCouleur(image);
            });

            // bttn negative color
            let bttnNegativeColor = document.getElementById("negativeColor");
            bttnNegativeColor.addEventListener("click",function () {
                console.log("bttn negative filter");
                negativeFilter();
            });

            //bttn clip
            let bttnClip = document.getElementById('clip');
            bttnClip.addEventListener('click',function () {
                console.log("bttn clip");
                clipimage(canvas,ctx);

            });

            //bttn enregistrer
            let bttnEnregistrer = document.getElementById("enregistrer");
            bttnEnregistrer.addEventListener("click",function () {
                    //saveImage(canvas,ctx,image);
                progressBar(100,$('#progressBar'));
                let data = canvas.toDataURL();
                localStorage.setItem('data',data);
                console.log(data);



            });

            let bttnCharger = document.getElementById("charge");
            bttnCharger.addEventListener("click",function () {


                let bannerImg = document.getElementById('test64image');
               // bannerImg.src =  localStorage.getItem('dataImage');
                bannerImg.src =  localStorage.getItem('data');
                //context.drawImage(bannerImg,50,50);

            });

        }

    });




////////////////////////////////////////////////////////////////////////////////////////////////
//FUNCTIONS

    // cree images
    function imagesFiltres(image, index) {
        console.log("function images filtres");
        let imgdiv = document.getElementById("imagesDiv");

        let canvas = document.createElement('canvas');
        canvas.width = 300;
        canvas.height = 300;
        let context = canvas.getContext('2d');

        context.drawImage(image,0,0,canvas.width,canvas.height);

        switch (index){
            case 0 : ;
                canvas.addEventListener('click',function () {
                    imgCouleur(image);
                });
                break;
            case 1 : imgBlacWhite(context ,canvas) ;
                canvas.addEventListener('click',function () {
                    imgBlacWhite();
                });
            break;
            case 2: negativeFilter(context ,canvas);
                canvas.addEventListener('click',function () {

                    negativeFilter();
                });
                break;
            case 3: dropShadow(context,image);
                canvas.addEventListener('click',function () {
                   // window.alert("dropshadow");
                    let nb = 1;
                    dropShadow(context,image,nb);
                });
        }

        imgdiv.appendChild(canvas);

    }

    // Cree canvas
    function createCanvas(w,h) {
        let canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        let context = canvas.getContext('2d');
        context.fillStyle = "gray";
        context.fillRect(0,0,canvas.width,canvas.height);

        return canvas;
    }

// verifie si fichier est une image
    function img_verification(file) {
        let imgtype = file.type.split("/")[1];
        console.log(imgtype);
        return (["jpeg", "png"].indexOf(imgtype) >= 0);
    }

// lecture d'image avec dataURL
    function load_img_dataURL(file, image) {
        image.addEventListener('load', function(){
            URL.revokeObjectURL(image.src);
        });
        image.src = URL.createObjectURL(file);
    }

// lecture d'image avec fileReader
    function load_img_FileReader(file, image) {
        let reader = new FileReader();
        reader.addEventListener('load', function() {
            image.src = reader.result; // Le contenu du fichier est stocké dans la propriété result de FileReader
        });
        reader.readAsDataURL(file);
    }
    // function drawImage
    function drawImage(image){

        image.addEventListener('load',function () {
            let sw = width * scale;
            let sh = height* scale;
            ctx.clearRect(0,0,width,height);
            ctx.drawImage(image, -sw/2 + w/2, -sh/2 + h/2, sw, sh);
        });

    }
    // function scale image
    function scaleImage(scale,image) {
        let w = canvas.width;
        let h = canvas.height;
        let sw = w * scale;
        let sh = h * scale;

        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.drawImage(image,-sw/2 + w/2, -sh/2 + h/2, sw,sh);
    }


//function save image
    function saveImage(context,canvas,image) {
        canvas = document.createElement('canvas');
        context = canvas.getContext('2d');
        let data;


        canvas.width = image.width;
        canvas.height = image.height;
        /*context.drawImage(image,50,50);
        data = canvas.toDataURL('image\jpg',1.0);*/
        data = canvas.toDataURL();
        console.log(data);

        try{
            localStorage.setItem("dataImage", data);
        }catch (e){
            console.log("Strorage faled : " + e);
        }


    }

// function
    function drawScaleText(value) {
        let text = parseFloat(value).toFixed(2);
        let percent = parseFloat(value - MINIMUM_SCALE)/parseFloat(MAXIMUM_SCALE-MINIMUM_SCALE);

        scaleOutput.innerText = text;
        percent = percent < 0.35 ? 0.35 : percent;
        scaleOutput.style.fontSize = percent*MAXIMUM_SCALE/1.5 + 'em';
    }

    // black and white filter
    function imgBlacWhite(context = null,canv = null ) {
        console.log("black white filter");

        if (context != null && canv != null){
            let data = undefined,
                i = 0;
            let imageData = context.getImageData(0,0,canv.width, canv.height);
            data = imageData.data;
            for(i= 0; i < data.length -4; i+=4){
                let average = (data[i] + data[i+1]+ data[i+2])/3;
                data[i] = average;
                data[i+1] = average;
                data[i+2] = average;
            }
            context.putImageData(imageData,0,0);
        }
        else{
        let data = undefined,
            i = 0;
        let imageData = ctx.getImageData(0,0,canvas.width, canvas.height);
        data = imageData.data;
        for(i= 0; i < data.length -4; i+=4){
            let average = (data[i] + data[i+1]+ data[i+2])/3;
            data[i] = average;
            data[i+1] = average;
            data[i+2] = average;
        }
        ctx.putImageData(imageData,0,0);
        }
    }

    // filter color
    function imgCouleur(image,context, canv) {
        if(context != null && canv != null){
            context.drawImage(image,0,0,image.width,image.height,0,0,
                context.canv.width,context.canv.height);
        }
        else{
        ctx.drawImage(image,0,0,image.width,image.height,0,0,
        ctx.canvas.width,ctx.canvas.height);
        }
    }

    // negative filter
    function negativeFilter(context = null,canv = null) {
        console.log("negative filter");

        if (context != null && canv != null) {
            let imageData = context.getImageData(0,0,canv.width, canv.height),
                data = imageData.data;
            for(let i=0; i <= data.length - 4; i+=4){
                data[i] = 255 - data[i];
                data[i+1] = 255 - data[i+1];
                data[i+2] = 255 - data[i+2];
            }
            context.putImageData(imageData,0,0);
        }
        else{
        let imageData = ctx.getImageData(0,0,canvas.width, canvas.height),
            data = imageData.data;
        for(let i=0; i <= data.length - 4; i+=4){
            data[i] = 255 - data[i];
            data[i+1] = 255 - data[i+1];
            data[i+2] = 255 - data[i+2];
        }
        ctx.putImageData(imageData,0,0);

        }
    }

    //drop shadow 
    function dropShadow(ctex,image, nb) {
        if(ctex != null && image != null){
            ctex.filter = ' drop-shadow(16px 16px 20px red) invert(75%)';
            ctex.drawImage(image,0,0,canvas.width,canvas.height);
        }
       if (ctex != null && image != null && nb != null) {

          /*  ctx.drawImage(image,0,0,image.width,image.height,0,0,
                ctx.canvas.width,ctx.canvas.height);*/
            ctx.filter = 'drop-shadow(16px 16px 20px red) invert(75%)';

            ctx.drawImage(image,0,0, ctx.canvas.width,ctx.canvas.height);
        }

    }

    //clip image
    function clipimage(context,canvas,image){
        context.save();
        context.beginPath();
        context.arc(canvas.width/2,canvas.height/2,200,0, 2*Math.PI,false);
        context.stroke();
        context.clip();
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(image,canvas.width/10,canvas.height/10);
        //context.restore();

    }

    function drawtext(context,text,evt,couleur,police,font,weight) {
        let rect = evt.target.getBoundingClientRect();
        let pos = {
            x : evt.clientX - rect.left,
            y : evt.clientY - rect.top,
        };
        context.font = weight+" "+police +"px "+font;
        context.textBaseline = 'alphabetic';
        context.strokeStyle = couleur;
        context.fillText(text,pos.x,pos.y);
        context.fillStyle= couleur;
         context.fill();
       // context.strokeStyle();
        context.stroke();
    }


    function progressBar(percent, $element) {
        let progressBarWidth = percent * $element.width() / 100;
        $element.find('div').animate({ width: progressBarWidth }, 500).html(percent + "%&nbsp;");
    }

});

