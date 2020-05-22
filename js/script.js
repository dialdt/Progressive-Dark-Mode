let body = document.getElementsByTagName('body')[0];
let bgColor = 'rgb(255,255,255)';
let fgColor = 'rgb(0,0,0)';
let lightThreshold = 160; //relative luminance of the lighter color
let darkThreshold = 71; //relative luminance of the darker color
let output = document.getElementById('output');
let slider = document.getElementById('color');
let main = document.getElementsByClassName('main')[0];

// from http://www.w3.org/TR/WCAG20/#relativeluminancedef
function relativeLuminance(R8bit, G8bit, B8bit) {

    var RsRGB = R8bit/255;
    var GsRGB = G8bit/255;
    var BsRGB = B8bit/255;

    var R = (RsRGB <= 0.03928) ? RsRGB/12.92 : Math.pow((RsRGB+0.055)/1.055, 2.4);
    var G = (GsRGB <= 0.03928) ? GsRGB/12.92 : Math.pow((GsRGB+0.055)/1.055, 2.4);
    var B = (BsRGB <= 0.03928) ? BsRGB/12.92 : Math.pow((BsRGB+0.055)/1.055, 2.4);

    // For the sRGB colorspace, the relative luminance of a color is defined as:
    var L = 0.2126 * R + 0.7152 * G + 0.0722 * B;

    return L;
}

function changeBackground(v){
  v = Number(v);
  let f;
  let con;
  let diff = 150;
  let adj = diff;
    //correct mid range
  if((v >= 70 && v <= 160) || v >= 220 && v <= 255){
    adj = diff + 70;
  };

  if(v - adj >= 0) {
    f = v - adj;
    con = (relativeLuminance(f, f, f) + 0.05) / (relativeLuminance(v, v, v) + 0.05);
  } else {
    f = v + adj;
    con = (relativeLuminance(v, v, v) + 0.05) / (relativeLuminance(f, f, f) + 0.05);
  };

  let lv = relativeLuminance(v, v, v);
  let lf = relativeLuminance(f, f, f);
  //output.innerHTML += v;
  console.log(v);
  body.style.backgroundColor = `rgb(${v}, ${v}, ${v})`;
  body.style.color = `rgb(${f}, ${f}, ${f})`;
  document.getElementById('output').innerHTML = `Contrast 1: ${(1 / con).toFixed(0)}<br />BG #${fullColorHex(v,v,v)} <br/> FG #${fullColorHex(f,f,f)}`
}

var rgbToHex = function (rgb) {
  var hex = Number(rgb).toString(16);
  if (hex.length < 2) {
       hex = "0" + hex;
  }
  return hex;
};

var fullColorHex = function(r,g,b) {
  var red = rgbToHex(r);
  var green = rgbToHex(g);
  var blue = rgbToHex(b);
  return red+green+blue;
};

function centerMain(){
  main.style.left = (window.innerWidth / 2) - (main.offsetWidth / 2) + 'px';
  main.style.top = (window.innerHeight / 2) - (main.offsetHeight / 2) + 'px';
  console.log((window.innerWidth / 2) - (main.offsetWidth / 2));
  console.log(main.offsetWidth);
  console.log(main.offsetHeight);

}
