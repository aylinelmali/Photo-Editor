let robot = lib220.loadImageFromURL(
  'https://people.cs.umass.edu/~joydeepb/robot.jpg');

function removeBlueAndGreen(x){
  let c = x.copy();
  for(let i = 0; i < c.width; ++i){
    for(let j = 0; j < c.height; ++j){
      let a = c.getPixel(i, j);
      c.setPixel(i, j, [a[0], 0.0, 0.0]);
    }
  }
  c.show();
  return c;
}

function makeGrayscale(x){
  let c = x.copy();
  for(let i = 0; i < c.width; ++i){
    for(let j = 0; j < c.height; ++j){
      let a = c.getPixel(i, j);
      let m = (a[0] + a[1] + a[2])/3;
      c.setPixel(i , j, [m, m, m]);
    }
  }
  c.show();
  return c;
}

function highlightEdges(x){
  let c = x.copy();
  for(let j = 0; j < c.height; ++j){
    for(let i = 0; i < c.width-1; ++i){
      let a1 = c.getPixel(i, j);
      let a2 = c.getPixel(i+1, j);
      let m1 = (a1[0] + a1[1] + a1[2])/3;
      let m2 = (a2[0] + a2[1] + a2[2])/3;
      c.setPixel(i, j, [Math.abs(m1-m2), Math.abs(m1-m2), Math.abs(m1-m2)]);
    }
    let b1 = c.getPixel(c.width-1, j);
    let b2 = x.getPixel(c.width-2, j);
    let d1 = (b1[0] + b1[1] + b1[2])/3;
    let d2 = (b2[0] + b2[1] + b2[2])/3;
    c.setPixel(c.width-1, j, [Math.abs(d1-d2), Math.abs(d1-d2), Math.abs(d1-d2)]);
  }
  c.show();
  return c;
}

function blur(x){
  let c = x.copy();
  for(let j = 0; j < c.height; ++j){
    for(let i = 0; i < c.width; ++i){
      let r = 0; let g = 0; let b = 0; let num = 0;
      if(i < 5){num = i;}
      else if(c.width-i < 6){num = c.width-i-1;}
      else{num = 5;}
      for(let k = 0; k < 2*num+1; ++k){
        let a1 = c.getPixel(i-num+k, j);
        r = r + a1[0];
        g = g + a1[1];
        b = b + a1[2];
      }
      r = r/(2*num+1); g = g/(2*num+1); b = b/(2*num+1);
      c.setPixel(i, j, [r, g, b]);
    }
    let y1 = c.getPixel(0, j);
    let y2 = x.getPixel(1,j);
    let r1 = ((y1[0]+y2[0])/2);
    let g1 = ((y1[1]+y2[1])/2);
    let b1 = ((y1[2]+y2[2])/2);
    c.setPixel(0, j, [r1, g1, b1]);
    let c1 = c.getPixel(c.width-1, j);
    let c2 = x.getPixel(c.width-2, j);
    let r2 = ((c1[0]+c2[0])/2);
    let g2 = ((c1[1]+c2[1])/2);
    let b2 = ((c1[2]+c2[2])/2);
    c.setPixel(c.width-1, j, [r2, g2, b2]);
  }
  c.show();
  return c;
}

test('removeBlueAndGreen function definition is correct', function(){
const white = lib220.createImage(10, 10, [1,1,1]);
const shouldBeRed = removeBlueAndGreen(white);
const pixelValue = shouldBeRed.getPixel(5,5);
assert(pixelValue[0] === 1);
assert(pixelValue[1] === 0);
assert(pixelValue[2] === 0);
});

test('makeGrayscale function definition is correct', function(){
  const white = lib220.createImage(10, 10, [1,1,1]);
  const shouldBeGray = makeGrayscale(white);
  const pixelValue = shouldBeGray.getPixel(5,5);
  assert(pixelValue[0] === 1);
  assert(pixelValue[1] === 1);
  assert(pixelValue[2] === 1);
});