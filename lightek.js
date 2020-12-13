var WebSocket = require('ws');
var b = require('bonescript');
var MTID = "23090001";
var relay9 = "P8_7";
var relay0 = "P8_8";
var relay1 = "P8_9";
var relay2 = "P8_10";
var relay3 = "P8_11";
var relay4 = "P8_12";
var relay5 = "P8_15";
var relay6 = "P8_16";
var relay7 = "P8_17";
var relay8 = "P8_18";

var button = "P8_13";


var SERVO = 'P9_14';
var SERVO1 = 'P9_16';
var SERVO2 = 'P8_13';
var SERVO3 = 'P8_19';
var SERVO4 = 'P9_21';
var SERVO5 = 'P9_22';
var SERVO6 = 'P9_28';
var SERVO7 = 'P9_42';

var total = 0;
var position = 0.005;
var position1 = 0.5;
var increment = 0.001;
var increment1 = 0.001;
// creating devh pointer used by d6t library
var duty_cycle = 0;
var duty_cycle1 = 0;
var check = 1;
var mcheck = 1;
var sc250 = 30;
var sc100 = 0;
var checka=0;
var toff=0;
var boff=0;
var xoff=0;
var yoff=0;
var zoff=0;
var tcnt=0;
// opening d6t device
var temp1;
var checktime=250;
var isPaused = false;
var xt = new Array(16);
var lt = new Array(16);
var ct = new Array(16);
var ht = new Array(16);
/*for (var i = 0; i < 60; i++) {
  xt[i] = new Array(60);
}*/
var current=0;
b.pinMode('P9_12', b.INPUT);

  for (var i = 1; i < 17; i++)
    {
		ct[i]=0; 
	}		
// creating devh pointer used by d6t library
//var d6t_devh = new d6t.d6t_devh_t();

// opening d6t device
// d6t.d6t_open(d6t_devh.ref(), d6t.D6T_44L_06, null);
//d6t.d6t_open(d6t_devh.ref(), d6t.D6T_44L_06, null);
//d6t.d6t_open(d6t_devh.ref(), d6t.D6T_44L_06, '/dev/i2c-1');

var connect = function(){
ws = new WebSocket('ws://192.168.1.142:8036/locker/websocket/echoMessage');
ws.on('open', function open() {
	
//b.pinMode(relay1 , b.OUTPUT);
//b.pinMode(relay2 , b.OUTPUT);
//b.pinMode(button, b.INPUT);
 clow(relay1);
  clow(relay2);
 clow(relay3)
 clow(relay6);
  clow(relay7);
 clow(relay8);
  timerv = setInterval(function() {ws.send("mintsctl");}, 3000);

//timerc = setInterval(function() {light();},checktime);
//timerb = setInterval(function() {bcheck();},100);
  console.log('ok');

});
ws.on('close', function close() {
//      setTimeout(function(){connect();}, 5000);

  console.log('disconnected');
});

ws.on('message', function incoming(message) {
        if (message.indexOf("elch:{-")>-1 && message.indexOf("-}")>-1 && message.indexOf("|M")>-1) {    
                bookmess =message.substring(message.indexOf("elch:{-")+7,message.indexOf("-}"));         
         //       cchk(bookmess);
        }
         if (message.indexOf("elop:{-")>-1 && message.indexOf("-}")>-1 && message.indexOf("|M013")>-1) {         
		 bookmess =message.substring(message.indexOf("elop:{-")+7,message.indexOf("-}"));    
            total=total+1;	
			clow(relay1); 
			        clow(relay2); 
			        clow(relay3); 
			updateDuty();
             

                //  alert("return:"+bookmess);
        }
        if (message.indexOf("elop:{-")>-1 && message.indexOf("-}")>-1 && message.indexOf("|M003")>-1) {         
		bookmess =message.substring(message.indexOf("elop:{-")+7,message.indexOf("-}"));    
          total=total+1;	
		 clow(relay1); 
		 clow(relay2); 
		 clow(relay3); ; 
		  updateDuty();
             

                //  alert("return:"+bookmess);
        }
		if (message.indexOf("elop:{-")>-1 && message.indexOf("-}")>-1 && message.indexOf("|M004")>-1) {         
		bookmess =message.substring(message.indexOf("elop:{-")+7,message.indexOf("-}"));   
    		  
                if (duty_cycle1 < 0.5){
					duty_cycle1=duty_cycle1 + 0.05;
				}
				else {
					duty_cycle1 = 0.5;
				}
				
				xoff=1;
				b.analogWrite(SERVO1, duty_cycle1);
				console.log(duty_cycle1);

                //  alert("return:"+bookmess);
        }
		
		if (message.indexOf("elop:{-")>-1 && message.indexOf("-}")>-1 && message.indexOf("|F003")>-1) { 
                bookmess =message.substring(message.indexOf("elop:{-")+7,message.indexOf("-}"));  
				 total=total-1;  
                console.log(position); 
		        if (total<=0){
					total=0;
				if (position == 0.5){
					
				updateDim();
				}
				}
        }
		if (message.indexOf("elop:{-")>-1 && message.indexOf("-}")>-1 && message.indexOf("|F013")>-1) { 
               total=total-1;               
			   bookmess =message.substring(message.indexOf("elop:{-")+7,message.indexOf("-}"));  
                console.log(position); 
			    if (total<=0){
					total=0;
				if (position == 0.5){
					 chigh(relay1); 
			      chigh(relay2); 
			 chigh(relay3); 
				updateDim();
				}
				}
        }
        if (message.indexOf("elop:{-")>-1 && message.indexOf("-}")>-1 && message.indexOf("|F004")>-1) { 
                bookmess =message.substring(message.indexOf("elop:{-")+7,message.indexOf("-}"));   
				 if (duty_cycle1 <= 0.5){
					duty_cycle1=duty_cycle1 - 0.05;
				}
			    if (duty_cycle1 <= 0){
				    duty_cycle1=0;
				}	
		        xoff=1;
				b.analogWrite(SERVO1, duty_cycle1);
                console.log(duty_cycle1);

                //  alert("return:"+bookmess);
        }

  });
};
function chigh(x) {
 b.digitalWrite(x, b.HIGH);
 mm=0;
}

function clow(x) {
  b.digitalWrite(x, b.LOW);
}
function check(){
b.digitalRead(button, checkButton);
}
function checkButton(x) {
  if(x.value == 1){
     console.log(x);
 //   b.digitalWrite('P8_13', b.HIGH);
  }
  else{
    console.log(x)
//    b.digitalWrite('P8_13', b.LOW);
  }
}
b.pinMode(relay1 , b.OUTPUT);
b.pinMode(relay2 , b.OUTPUT);
b.pinMode(relay3 , b.OUTPUT);
b.pinMode(relay4 , b.OUTPUT);
b.pinMode(relay5 , b.OUTPUT);
b.pinMode(relay6 , b.OUTPUT);
b.pinMode(relay7 , b.OUTPUT);
b.pinMode(relay8 , b.OUTPUT);
//b.pinMode(relay9 , b.OUTPUT);
//b.pinMode(relay0 , b.OUTPUT);

 chigh(relay1);
 chigh(relay2);
 chigh(relay3);
 chigh(relay4);
 chigh(relay5);
 chigh(relay6);
 chigh(relay7);
 chigh(relay8);

 b.analogWrite(SERVO, 0);
 b.analogWrite(SERVO1, 0.01);
 
 
connect();
// timerc = setInterval(function() {light();},checktime);
//b.pinMode('P8_13', b.INPUT);
//setInterval(check,300);
function printStatus(x) {
    console.log(x.value);
    if(x.value === 0){
		mcheck = 1;
   //      b.digitalWrite(led, 1);
    console.log("No Motion Detected");
    }
    else{
		mcheck = 2;
    console.log("Motion Detected");
   //      b.digitalWrite(led, 0);
    }
}

function printStatus1(x) {
    console.log('x.value1 = ' + x.value);
  //  console.log('x.err1 = ' + x.err);
}

var light = function() { 
    b.digitalRead('P9_12', printStatus);
    b.analogRead('P9_40', printStatus1);

    var data = d6t.d6t_read_js(d6t_devh);
 // performing read, getting pointer to data from d6t device handle
//    d6t.d6t_read(d6t_devh.ref());
 //   var dataptr = ref.reinterpret(d6t_devh.rdbuf, d6t_devh.bufsize, 0);
	var temp;
	var tempc;
	var tempk = 0;
	var temp1;
	var sumtemp=0;
	var sumtemp1=0;
//	tcnt=tcnt+1;
    for (var i = 1; i < 17; i++)
    {
		if (i==1){
			tempc=data[i];
			tempk=tempk+1;
		}
		else {
			//if ((tempc+1.5>data[i])&& (tempc-1.5<data[i]) || (data[0] > data[i])){
			if ((tempc+1.5>data[i])&& (tempc-1.5<data[i])){	
				tempk=tempk+1;
			}
			
			tempc=data[i];
		}
		temp = data[i];
        lt[i] = data[i];
        if  ((ct[i] > data[i])  || (ct[i]==0) ){
			ct[i] = data[i];
		}      
        temp1 = ct[i];       	
		if ((temp > sumtemp) && (temp < 40)){
 		sumtemp=temp;
		}
		if ((temp1 > sumtemp1) && (temp1 < 40)){
 		sumtemp1=temp1;
		}
	//	if (checktime==10000){
    //    console.log("%d: %d %d", i,  ct[i], data[i]);
		
	//	}
    }
	//console.log(tempk);
    if (tempk>14){
	  for (var i = 1; i < 17; i++)
	  {  
		ct[i]=lt[i];
	  }
	  console.log(sumtemp,sumtemp1,data[0],checktime);
//	  console.log("update");
	}
    else {

	
	}
	//if ((sumtemp-sumtemp1 > 2) || (sumtemp > data[0])){
		if (sumtemp-sumtemp1 > 2) {
      	    for (var i = 1; i < 17; i++)
            {
			ht[i] = lt[i];
			}
			
     		check = 1;
			
//			console.log("past:"+xt[current]+",now:"+sumtemp);
	    
         	}
		else 
		{
            for (var i = 1; i < 17; i++)
            {
			ht[i] = ct[i]
			}
			check = 2;
//			console.log("past:"+xt[current]+",now:"+sumtemp);
	     
        }
	

	//else {
	if (check == 2 || xoff==0){
        
		 checktime=250;
		 sc250=sc250+1;
	//	 if (sc250>10){
	//		  updateDim();
		//	  sc100=0;
	//	  }	 
		 if (sc250>20){
		//	 
		  //  if (sc100>2){ 
		 //   position1 =  position;
      	//	updateDim();
		//	sc100=0;
		 //   }
		//	else {
			 b.analogWrite(SERVO, 0);
	         b.analogWrite(SERVO1, 0);
	        
		//	}
		  //   if (position > 0){
		  //      position1 =  position;
		//	    updateDim()
		//	 }
			 position = 0;
		 }
		  
    //     position = 0;
		 
      //          check=0;
	 //  updateDim();
		
	//	chigh(relay1);
	//	clow(relay2);
	
		
                clearInterval(timerc);
                timerc = setInterval(function() {light();},checktime);


	}
  //  else {  	
	if (check == 1 || mcheck == 2 || xoff==1){
       checktime=10000;
	   sc250=0;
	   sc100=sc100+1;
		
	//    position = 0;
       updateDuty();
		
	   
	//	b.analogWrite(SERVO, duty_cycle);
	//	b.analogWrite(SERVO1, duty_cycle1);
	//	clow(relay1);
	//	chigh(relay2);
	
		console.log(duty_cycle,duty_cycle1);
                clearInterval(timerc);
                timerc = setInterval(function() {light();},checktime);
//	}
	}
//	if (tcnt>2){  
    if (sumtemp==0){}
    else {
	xt[current]=sumtemp;
    }
	//	tcnt=0
//	}
  //  current=(current+1)%16;
    // last byte is error check code used for crc
  //  var pec = ref.get(dataptr, d6t_devh.bufsize-1, ref.types.uint8);
//	console.log("temp:"+sumtemp);
 //   console.log("pec: 0x%s", pec.toString(16));

	
};
function scheduleNextUpdate() {
    // adjust position by increment and 
    // reverse if it exceeds range of 0..1
    position = position + increment;
    if(position < 0) {
        position = 0.05;
        increment = -increment;
		
    } else if(position >= 0.5) {
		 b.analogWrite(SERVO, position);
	     b.analogWrite(SERVO1, position);
		 
	     
        
        position = 0.5;
      //  increment = -increment;
    }
	if(position < 0.5) {
    setTimeout(updateDuty, 20);
    }
	// call updateDuty after 200ms
    
}
function scheduleNextDim() {
    // adjust position by increment and 
    // reverse if it exceeds range of 0..1
    position = position + increment;
    if(position < 0) {
        position = 0;
		 
        increment = -increment;
		
    } else if(position >= 0.5) {
		position = 0.5;
        increment = -increment;
    }
	if(position != 0) {
    setTimeout(updateDim, 20);
    }
	// call updateDuty after 200ms
    
}
function updateDim() {
    // compute and adjust duty_cycle based on
    // desired position in range 0..1
    var duty_cycle = position;
	
	if (position<0.01){
		
		
		
		b.analogWrite(SERVO, 0);
         b.analogWrite(SERVO1, 0.01);
		
	}
	else {
	b.analogWrite(SERVO, position);
	
	b.analogWrite(SERVO1, position, null,scheduleNextDim);
    }
	//    console.log("Duty Cycle1: " + 
//        parseFloat(duty_cycle) + " %");   
}
function updateDuty() {
    // compute and adjust duty_cycle based on
    // desired position in range 0..1
    var duty_cycle = position;
	b.analogWrite(SERVO, duty_cycle);
	
	
	if (position<0.01){
	
	b.analogWrite(SERVO, 0);
	b.analogWrite(SERVO1, 0.01);
	}
    else {	
	
    b.analogWrite(SERVO, duty_cycle);
	b.analogWrite(SERVO1, duty_cycle, null,scheduleNextUpdate);
    }
//    console.log("Duty Cycle: " + 
//        parseFloat(duty_cycle) + " %");   
}
process.on('exit', function () {
    d6t.d6t_close(d6t_devh.ref());
});

