let body = document.getElementsByTagName('body')[0];
let bgColor = 'rgb(255,255,255)';
let fgColor = 'rgb(0,0,0)';
let lightThreshold = 160; //relative luminance of the lighter color
let darkThreshold = 71; //relative luminance of the darker color
let output = document.getElementById('output');
let slider = document.getElementById('color');
let contrast;
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

function splitRGB(color) {
  var rgb = color.match(/\d+/g);
  var output = [];
  for(var i in rgb) {
    //console.log(rgb[i]);
    output.push(rgb[i]);
  }
  return output;
}

var color = bgColor.match(/\d+/g);

function getContrast(l1, l2) {
  var l1con = l1 + 0.05;
  var l2con = l2 + 0.05;
  let con;

  //always get a number between 0 and 1
  if(l1con > l2con){
    con = l2con / l1con;
  } else {
    con = l1con / l2con;
  }

  return con;
}

//l1 = background
//l2 = foreground
/*
Start with l1.  Run as long as l1 is greater than l2, validating this with each iteration.  Change the formula when l1 becomes less that l2.




*/

slider.addEventListener('change', function(){
  console.log(slider.value);
});

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

//0.05 / 1.05 = 0.0476
//? / 1.05 = 0.14
//0.05 / ? = 0.14

//console.log(reverseCalc(relativeLuminance(splitRGB(bgColor)[0], splitRGB(bgColor)[1], splitRGB(bgColor)[2])));
//

function centerMain(){
  main.style.left = (window.innerWidth / 2) - (main.offsetWidth / 2) + 'px';
  main.style.top = (window.innerHeight / 2) - (main.offsetHeight / 2) + 'px';
  console.log((window.innerWidth / 2) - (main.offsetWidth / 2));
  console.log(main.offsetWidth);
  console.log(main.offsetHeight);

}
