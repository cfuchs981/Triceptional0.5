TDE = 0; 
BMR = 0; 



function switchcard() {
	var blockone = document.getElementById("firstcard"); 
	var blocktwo = document.getElementById("secondcard"); 
	if(blockone.style.display != 'none' ) {
		blockone.style.display = 'none'; 
		blocktwo.style.display = 'block'; 
	}
	else {
		blocktwo.style.display = 'none'; 
		blockone.style.display = 'block'; 
	}
}

function calculate() {
	var sex = document.getElementById("sex").value; 
	var activity = document.getElementById("activity").value; 
	if((sex != 0 && sex != 1) || activity > 4 || activity < 0) {
		alert("Invalid range for sex or activity"); 
		return; 
	} 
	get_TDEBMR(); 
	get_macros(); 
	get_weight(); 
	switchcard(); 
}

function get_macros() {
	//We do a 30/35/35 split for a moderate carb diet: protein/fat/carb
	//4 cal per gram of carbs and protein, 9 cal for fat 
	//this calculates range to maintain weight, to cut (-500 cal) and to bulk (+500)
	var mweight = document.getElementById("TDE").innerHTML; 
	var bweight = parseInt(mweight) + 500; 
	var cweight = parseInt(mweight) - 500; 

	document.getElementById("mprotein").innerHTML = parseInt((mweight * 0.30) / 4);
	document.getElementById("mcarb").innerHTML = parseInt((mweight * 0.35) / 4); 
	document.getElementById("mfat").innerHTML = parseInt((mweight * 0.35) / 9); 
	document.getElementById("cprotein").innerHTML = parseInt((cweight * 0.30) / 4); 
	document.getElementById("ccarb").innerHTML = parseInt((cweight * 0.35) / 4); 
	document.getElementById("cfat").innerHTML = parseInt((cweight * 0.35) / 9); 
	document.getElementById("bprotein").innerHTML = parseInt((bweight * 0.30) / 4);
	document.getElementById("bcarb").innerHTML = parseInt((bweight * 0.35) / 4); 
	document.getElementById("bfat").innerHTML = parseInt((bweight * 0.35) /9); 

}

function get_TDEBMR() {
	//convert weight to kg 
	var kgweight = document.getElementById("weightlb").value / 2.2; 
	var sex = document.getElementById("sex").value; 
	var age = document.getElementById("age").value; 
	var heightcm = document.getElementById("height").value * 2.54; 
	var activity = document.getElementById("activity").value; 

	if(sex == 0) { //use woman equation
		BMR = 655.1 + ( 9.563 * kgweight ) + ( 1.850 * heightcm ) - ( 4.676 * age );
	}
	else { //use male equation
		BMR = 66.47 + ( 13.75 * kgweight ) + ( 5.003 * heightcm ) - ( 6.755 * age );
	}
	
	if(activity == 0) TDE = 1.2; 
	if(activity == 1) TDE = 1.375; 
	if(activity == 2) TDE = 1.55; 
	if(activity == 3) TDE = 1.7; 
	if(activity == 4) TDE = 1.9;
	TDE = TDE * BMR; 

	document.getElementById("TDE").innerHTML = parseInt(TDE); 
	document.getElementById("BMR").innerHTML = parseInt(BMR); 
}

function get_weight() {

	var weight = document.getElementById("weightlb").value; 
	var height = document.getElementById("height").value; 
	var BMI = weight / (height * height) * 703; 
	document.getElementById("BMI").innerHTML = parseInt(BMI); 

	var lowend = 1000; 
	var highend = -1; 
	//do hamwi equation
	var base = 100; 
	if(height < 60) {
		base -= 5 * (60 - height); 
	}
	else if(height > 60) {
		base += 5 * (height - 60); 
	}
	lowend = Math.min(lowend, base); 
	highend = Math.max(highend, base);
	//end hamwi  

	//start miller 
	var kgweight = weight / 2.2; 
	var sex = document.getElementById("sex").value; 
	if(sex == 1) { //man
		var base = 56.2; 
		if(height < 60) {
			base -= 1.41 * (60 - height); 
		}
		else if(height > 60) {
			base += 1.41 * (height - 60); 
		}
	}
	else if(sex == 0) { //woman
		var base = 53.1; 
		if(height < 60) {
			base -= 1.36 * (60 - height); 
		}
		else if(height > 60) {
			base += 1.36 * (height - 60); 
		}
	}
	base = base * 2.2; //back to lbs
	lowend = Math.min(lowend, base); 
	highend = Math.max(highend, base);


	document.getElementById("low").innerHTML = parseInt(lowend);
	document.getElementById("high").innerHTML = parseInt(highend);
}

window.onload = function() {
	document.getElementById("submit").addEventListener('click', calculate);   

	document.getElementById("backbutton").addEventListener('click', switchcard); 

}