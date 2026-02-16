var vT=false;
var vT2=false;
var convs=true;
var toSee=false;
const header=document.querySelector(".header");
function addTitle(){
    if (vT){
document.querySelector("#addTitle").style.display="none";
vT=false;

    }else{
    document.querySelector("#addTitle").style.display="flex";
    vT=true;
    document.querySelector("#addText").style.display="none";
vT2=false;
}
}


function addText(){
    if (vT2){
document.querySelector("#addText").style.display="none";
vT2=false;
    }else{
    document.querySelector("#addText").style.display="flex";
    vT2=true;
    document.querySelector("#addTitle").style.display="none";
vT=false;
}
}

var vI=false;
function addIMG(){
    if (vI){
document.querySelector("#addIMG").style.display="none";
vI=false;
    }else{
    document.querySelector("#addIMG").style.display="flex";
    vI=true;
}
}
const sup = { "0":"⁰","1":"¹","2":"²","3":"³","4":"⁴","5":"⁵","6":"⁶","7":"⁷","8":"⁸","9":"⁹" };
const sub = { "0":"₀","1":"₁","2":"₂","3":"₃","4":"₄","5":"₅","6":"₆","7":"₇","8":"₈","9":"₉" };

const textarea = document.querySelector("textarea");

function toSuperscript(str) {
  return [...str].map(x => sup[x]||x).join("");
}

function toSubscript(str) {
  return [...str].map(x => sub[x]||x).join("");
}

textarea.addEventListener("input", function() {
  if (convs==false){
    console.log("saindo");
    return
  }
  let txt = this.value;

txt = txt.replace(/\\rad\(([^)]+)\)/g, "√($1)");
txt = txt.replace(/\\rad(\d+)/g, "√$1");
txt = txt.replace(/\\var/g, "∆");
txt = txt.replace(/\\div/g, "÷");

// União de conjuntos
txt = txt.replace(/\\uniao\b/g, "∪");

// Interseção de conjuntos
txt = txt.replace(/\\inter\b/g, "∩");




  // 2️⃣ Potências com parênteses ou número simples
  txt = txt.replace(/\^(\([^)]+\)|\d+)/g, (_, exp) => {
    if(exp.startsWith("(") && exp.endsWith(")")) {
      return "(" + [...exp.slice(1,-1)].map(c => sup[c]||c).join("") + ")";
    } else {
      return toSuperscript(exp);
    }
  });

  // 3️⃣ Frações: (num)/(num) ou num/num
 txt = txt.replace(/(\(?\d+\)?)[\/\\](\(?\d+\)?)/g, (_, num, den) => {
  const n = [...num.replace(/[()]/g,"")].map(x => sup[x] || x).join("");
  const d = [...den.replace(/[()]/g,"")].map(x => sub[x] || x).join("");
  return n + "⁄" + d;
});

this.value = txt;
});
const input=document.querySelector("input[type='file']");
const preview=document.querySelector(".capa");

input.addEventListener("change", function() {
  const file = this.files[0]; // pega o primeiro arquivo selecionado
  if (!file) return;

  // verifica se é imagem
  if (!file.type.startsWith("image/")) {
    alert("Selecione apenas imagens!");
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    preview.src = e.target.result; // define a imagem
    preview.style.display = "block"; // mostra o preview
    preview.parentElement.style.display="block";
    document.querySelector("#capaCNT").style.display="none";
  };
  reader.readAsDataURL(file); // lê como base64
});



function publishTitle(){
    let Title=document.querySelector("#titulo");
    if (Title.value.length == 0){
        alert("O campo deve ser preenchido")
    }else{
    let p=document.createElement("p");
    let div=document.createElement("div");
    let btn=document.createElement("img");
    btn.tabIndex=0;
    btn.src="rmv.png";
    btn.addEventListener("click",function(){
this.parentElement.remove();
    });
    btn.classList.add("rmv");
    div.classList.add("titleBox");
    p.classList.add("titulo")
    p.innerText=Title.value;
    div.appendChild(btn);
    div.appendChild(p);
    document.querySelector(".container").appendChild(div);
    document.querySelector("#addTitle").style.display="none";
    vT=false;
    Title.value="";
    }
}


function publishText(){
    let Title=document.querySelector("#texto");
    if (Title.value.length == 0){
        alert("O campo deve ser preenchido")
    }else{
    let p=document.createElement("p");
    let div=document.createElement("div");
    let btn=document.createElement("img");
    btn.tabIndex=0;
    btn.src="rmv.png";
    btn.addEventListener("click",function(){
this.parentElement.remove();
    });
    btn.classList.add("rmv");
    div.classList.add("textBox");
    p.classList.add("text")
    p.innerText=Title.value;
    div.appendChild(btn);
    div.appendChild(p);
    document.querySelector(".container").appendChild(div);
    document.querySelector("#addText").style.display="none";
    vT2=false;
    Title.value="";
    }
}

let convsBTN=document.querySelector("#convs");
convsBTN.addEventListener("click",function (){


if(convs==true){
  convs=false;
  
  this.style.background="#2ca44f";
  this.innerText="Ativar Conversão de Texto"
}else{
  convs=true;
  
  this.style.background="red";
  this.innerText="Desativar Conversão de Texto"
}


})

const seeAs=document.querySelector("#seeAs");
seeAs.addEventListener("click", ()=>{
  
header.style.display="none";
document.querySelectorAll(".textBox").forEach(div=>{
  div.classList.remove("textBox");
  div.classList.add("simple");
})

document.querySelectorAll(".titleBox").forEach(div=>{
  div.classList.remove("titleBox");
  div.classList.add("simple");
});
if(document.querySelector(".capa").src.length==0){
  document.querySelector("#capaCNT").style.display="none";
  
}


})

async function gerarPDF() {
  const { jsPDF } = window.jspdf;

  const elemento = document.querySelector(".container");

  const canvas = await html2canvas(elemento);
  const imgData = canvas.toDataURL("image/png");

  const pdf = new jsPDF("p", "mm", "a4");

  const largura = 210; 
  const altura = (canvas.height * largura) / canvas.width;

  pdf.addImage(imgData, "PNG", 0, 0, largura, altura);
  pdf.save("documento.pdf");
}

async function gerar(){
  
document.querySelectorAll(".textBox").forEach(div=>{
  div.classList.remove("textBox");
  div.classList.add("simple");
})

document.querySelectorAll(".titleBox").forEach(div=>{
  div.classList.remove("titleBox");
  div.classList.add("simple");
});
if(document.querySelector(".capa").src.length==0){
  document.querySelector("#capaCNT").style.display="none";
  
}
await gerarPDF();
header.style.display="none";
document.querySelector(".container").style.display="none";
document.querySelector(".concluido").style.display="inline-block"
}


function ver(){
      if (toSee){
document.querySelector(".comandos").style.display="none";
toSee=false;

    }else{
    document.querySelector(".comandos").style.display="flex";
    toSee=true;

}
}
