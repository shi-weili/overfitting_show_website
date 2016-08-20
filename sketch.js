var mWidth = 2000;
var mHeight = 2000;
var mRectWidth = 2;
var mRectHeight = mHeight;
var mRectNumber = 100;
var mGap = 20;
var mTimeSecElapsed;
var mTimeMillisElapsed;


var mMarkerWidth = 4;
var mMarkerHeight = 50;
var mMaxMarkerHeight = 100;
var mPosY = [];
var mPreviousPosY = [];
var mLength = [];

var mPreviousTimeSec = 0;
var mPreviousTimeMillis = 0;
var mTimeGap = 2;
var mPennerTimeGap = 2;
var mPosUpdated = false;


function setup() {
  // Sets the screen to be 720 pixels wide and 400 pixels high
  var canvas = createCanvas(mWidth, mHeight);
  canvas.parent('sketch');

  background(255);
  noStroke();

  fill(0);
  for (var i = 0; i < mRectNumber; i++) {
   		mPosY[i] = random(0, mHeight);
   		mPreviousPosY[i] = 0;
   		mLength[i] = random(0, mMaxMarkerHeight);
  }

  for (var i = 0; i < mRectNumber; i ++) {
		fill(0);
		rect(i * mGap  - mRectWidth * 0.5, 0, mRectWidth, mRectHeight);
		fill(255);
   		rect(i * mGap - mMarkerWidth * 0.5, mPosY[i], mMarkerWidth,mLength[i]);
  	}

}

function draw() {

	mTimeMillisElapsed = millis() / 1000;
	mTimeSecElapsed = second();

	if (mPosUpdated) {
		for (var i = 0; i < mRectNumber; i ++) {
		fill(0);
		rect(i * mGap  - mRectWidth * 0.5, 0, mRectWidth, mRectHeight);
  		}
	}else{
		var timeDiff = (mTimeMillisElapsed - mPreviousTimeMillis);
		// println("var: "+ easeInOutExpo(mTimeMillisElapsed - mPreviousTimeMillis, mPreviousPosY[0], mPosY[0], 1));
		for (var i = 0; i < mRectNumber; i ++) {
		fill(0);
		rect(i * mGap  - mRectWidth * 0.5, 0, mRectWidth, mRectHeight);
		fill(255);

		var penner = easeInOutExpo(timeDiff, 0, 1, mPennerTimeGap);
		var diff = (mPosY[i] -  mPreviousPosY[i]) * penner;
   		rect(i * mGap - mMarkerWidth * 0.5, mPreviousPosY[i] + diff, mMarkerWidth,mLength[i]);
  		}



	}





  	if (mTimeMillisElapsed - mPreviousTimeMillis > mTimeGap) {
  		mPreviousTimeSec = mTimeSecElapsed;
  		mPreviousTimeMillis = mTimeMillisElapsed;
  		mPosUpdated = true;
		for (var i = 0; i < mRectNumber; i ++) {
			mPreviousPosY[i] = mPosY[i];
		}
		//mPreviousPosY[i] =  mPosY[i];
  		reCalculateY();
  		mPosUpdated = false;
  	}



}

function reCalculateY() {
	for (var i = 0; i < mRectNumber; i++) {
   		mPosY[i] = random(0.1, mHeight);
  }
}

function easeInOutExpo(t, b, _c, d) {
	var c = _c - b;
    if (t === 0) {
      return b;
    }
    if (t === d) {
      return b + c;
    }
    if ((t /= d / 2) < 1) {
      return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
    } else {
      return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    }
};
