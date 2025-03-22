var cl = console.log;

var borderColorOpacity = 1,
    borderColor1 = `rgba(66,133,244, ${borderColorOpacity})`, // Blue
    borderColor2 = `rgba(219,68,55, ${borderColorOpacity})`,  // Red
    borderColor3 = `rgba(244,180,0, ${borderColorOpacity})`,  // Yellow
    borderColor4 = `rgba(15,157,88, ${borderColorOpacity})`;  // Green

var i = 0, iDirection = true, iObj,
    k = 20, kDirection = false, kObj,
    l = 40, lDirection = true, lObj,
    m = 60, mDirection = false, mObj,
    n = 80, nDirection = true, nObj;

var shadowBlur = 3,
   shadow1 = {
    x: 0,
    y: 0,
    blured: `${shadowBlur}`,
    color: '#f92056',
    shadowOffset: 100,
    toString: shadowToString,
  }, 
  shadow2 = {
    x: 0,
    y: 0,
    blured: `${shadowBlur}`,
    color: '#00deff',
    shadowOffset: 0,
    toString: shadowToString,
  };

// MOVING BORDER AND SHADOW
function showAndMove() {
  if (showAndMove.enable) return;
  showAndMove.enable = true;
  
  showAndMove.timer = setTimeout(function f() {
    // Change shadow
    box.style.textShadow = shadow1.toString() + ', ' + shadow2.toString();
    
    // Change border
    box.style.borderImage = `linear-gradient(${i}deg, ${borderColor1} ${k}%, ${borderColor2} ${l}%, ${borderColor3} ${m}%, ${borderColor4} ${n}%)`;
    
    i++; 
    
    kObj = getNextValue(k, kDirection, 0, 25, 1); // Adjust range for 4 colors
    k = kObj.value;
    kDirection = kObj.flag;
    
    lObj = getNextValue(l, lDirection, 25, 50, 1); // Adjust range for 4 colors
    l = lObj.value;
    lDirection = lObj.flag;

    mObj = getNextValue(m, mDirection, 50, 75, 1); // Adjust range for 4 colors
    m = mObj.value;
    mDirection = mObj.flag;

    nObj = getNextValue(n, nDirection, 75, 100, 1); // Adjust range for 4 colors
    n = nObj.value;
    nDirection = nObj.flag;
    
    // Cycle
    showAndMove.timer = setTimeout(f, 10);
  }, 0);
}

// Extra functions
function getNextValue(value, flag, min, max, step) {
  if (flag && value < max) {
    value += step;  
  } else if (flag && value >= max) {
    flag = false;
    value -= step;
  } else if (!flag && value > min) {
    value -= step;
  } else if (!flag && value <= min) {
    flag = true;
    value += step;
  }
 
  return {
    value: value,
    flag: flag
  };
};

function shadowToString() {
  getNextShadowPosition(this, this.shadowOffset);
  return this.x + 'px ' + this.y + 'px ' + this.blured + 'px ' + this.color;
}

function getNextShadowPosition(shadow, offset) {
  shadow.x = -Math.cos((i + offset) / 10) * 10;
  shadow.y = -Math.sin((i + offset) / 10) * 10;
}

// Start the animation on page load
document.addEventListener('DOMContentLoaded', () => {
  showAndMove(); // Start the animation immediately
});
