let robot = lib220.loadImageFromURL(
  'https://people.cs.umass.edu/~joydeepb/robot.jpg');

// imageMap(img: Image, func: (img: Image, x:number, y:number) => Pixel): Image
function imageMap(img, f){
let copy = img.copy();
for(let i = 0; i < copy.width; ++i){
  for(let j = 0; j < copy.height; ++j){
    copy.setPixel(i, j, f(copy, i, j));
  }
}
return copy;
}

function imageMask(img, f, maskValue){
return imageMap(img, function(image, x, y){
  if(f(img, x, y)){ return maskValue;}
  else{ return image.getPixel(x, y);}
});
}

function blurPixel(img, x, y){
  let r = 0; let g = 0; let b = 0;
  if(x >= 5 && x <= img.width-6){
    for(let i = 0; i < 11; ++i){
      let arr = img.getPixel(x-5+i, y);
      r = r + arr[0];
      g = g + arr[1];
      b = b + arr[2];
    } 
    r = r/11; g = g/11; b = b/11;
    return [r, g, b];
  }
  else if(x < 5 && x > img.width-6){
    for(let i = 0; i < img.width-1; ++i){
      let arr = img.getPixel(i, y);
      r = r + arr[0];
      g = g + arr[1];
      b = b + arr[2];
    }
    r = r/(img.width-1); g = g/(img.width-1); b = b/(img.width-1);
    return [r, g, b];
  }
  else if(x < 5){
    for(let i = 0; i < x + 6; ++i){
      let arr = img.getPixel(i, y);
      r = r + arr[0];
      g = g + arr[1];
      b = b + arr[2];
    }
    r = r/(x+6); g = g/(x+6); b = b/(x+6);
    return [r, g, b];
  }
  else{
    for(let i = x-5; i < img.width; ++i){
      let arr = img.getPixel(i, y);
      r = r + arr[0];
      g = g + arr[1];
      b = b + arr[2];
    }
    r = r/(img.width+5-x); g = g/(img.width+5-x); b = b/(img.width+5-x);
    return [r, g, b];
  }
}

function blurImage(img){
  return imageMap(img, blurPixel);
}

function isDark(img, x, y){
  let arr = img.getPixel(x, y);
  if((arr[0] < 0.5) && (arr[1] < 0.5) && (arr[2] < 0.5)){return true;}
  return false;
}

function darken(img){
  return imageMask(img, isDark, [0, 0, 0]);
}

function isLight(img, x, y){
  let arr = img.getPixel(x, y);
  if((arr[0] >= 0.5) && (arr[1] >= 0.5) && (arr[2] >= 0.5)){return true;}
  return false;
}

function lighten(img){
  return imageMask(img, isLight, [1, 1, 1]);
}

function lightenAndDarken(img){
  let newImg = lighten(img);
  return darken(newImg);
}

function pixelEq(p1, p2){
  const epsilon = 0.002;
  for(let i = 0; i < 3; ++i){
    if(Math.abs(p1[i] - p2[i]) > epsilon) {
      return false;
    }
  }
  return true;
};

test('identity function with imageMap', function(){
  let identityFunction = function(image, x, y){
    return image.getPixel(x, y);
  };
  let inputImage = lib220.createImage(10, 10, [0.2, 0.2, 0.2]);
  inputImage.setPixel(0, 0, [0.5, 0.5, 0.5]);
  inputImage.setPixel(5, 5, [0.1, 0.2, 0.3]);
  inputImage.setPixel(2, 8, [0.9, 0.7, 0.8]);
  let outputImage = imageMap(inputImage, identityFunction);
  assert(pixelEq(outputImage.getPixel(0, 0), [0.5, 0.5, 0.5]));
  assert(pixelEq(outputImage.getPixel(5, 5), [0.1, 0.2, 0.3]));
  assert(pixelEq(outputImage.getPixel(2, 8), [0.9, 0.7, 0.8]));
  assert(pixelEq(outputImage.getPixel(9, 9), [0.2, 0.2, 0.2]));
});

test('imageMap function definition is correct', function(){
  let identityFunction = function(image, x, y){
    return image.getPixel(x, y);
  };
  let inputImage = lib220.createImage(10, 10, [0, 0, 0]);
  let outputImage = imageMap(inputImage, identityFunction);
  let p = outputImage.getPixel(0, 0);
  assert(p[0] === 0);
  assert(p[1] === 0);
  assert(p[2] === 0);
  assert(inputImage !== outputImage);
});

