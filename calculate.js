/*When the enter button is clicked this function will call the appropriate
 calculation functions depending on the options in both dropdowns*/
function buttonClicked(){

    //Gets both options in the dropdowns
    var convertFromType = document.getElementById("selectedValue1").value;
    var convertToType = document.getElementById("selectedValue").value;

    //Gets the user input
    var input = (document.getElementById("convertFromVal").value).split(" ").join("");

    /*First checks if the options in the drop down are the same. If they are
    it will throw an alert showing that there is nothing to convert. Otherwise,
    for the appropriate combination, the right calculation functionw ill be called*/
    if(convertFromType == convertToType){

        alert("There's nothing to convert!");

    } else if(convertFromType == "Binary" && convertToType == "Hexadecimal"){

        document.getElementById("convertToVal").value = binaryToHexadecimal(input);

    } else if(convertFromType == "Binary" && convertToType == "Octal"){

        document.getElementById("convertToVal").value = binaryToOctal(input);

    } else if(convertFromType == "Binary" && convertToType == "Decimal"){

        document.getElementById("convertToVal").value = binaryToDecimal(input);

    } else if(convertFromType == "Hexadecimal" && convertToType == "Decimal"){

        document.getElementById("convertToVal").value = hexadecimalToDecimal(input);

    } else if(convertFromType == "Octal" && convertToType == "Decimal"){

        document.getElementById("convertToVal").value = octalToDecimal(input);

    } else if(convertFromType == "Decimal" && convertToType == "Binary"){

        document.getElementById("convertToVal").value = decimalToBinary(input);

    } else if(convertFromType == "Decimal" && convertToType == "Hexadecimal"){

        //Converts the decimal value to binary then the binary to hexadecimal
        document.getElementById("convertToVal").value = binaryToHexadecimal(decimalToBinary(input));
        
    } else if(convertFromType == "Decimal" && convertToType == "Octal"){

        //Converts the decimal value to binary then the binary to octal
        document.getElementById("convertToVal").value = binaryToOctal(decimalToBinary(input));
        
    } else if(convertFromType == "Hexadecimal" && convertToType == "Binary"){

        //Converts the hexadecimal to decimal then decimal to binary
        document.getElementById("convertToVal").value = decimalToBinary(hexadecimalToDecimal(input));

    } else if(convertFromType == "Octal" && convertToType == "Binary"){

        //Converts the octal to decimal then decimal to binary
        document.getElementById("convertToVal").value = decimalToBinary(octalToDecimal(input));

    } else if(convertFromType == "Octal" && convertToType == "Hexadecimal"){

        //Converts octal to decimal, decimal to binary, then binary to hexadecimal
        document.getElementById("convertToVal").value = binaryToHexadecimal(decimalToBinary(octalToDecimal(input)));

    } else if(convertFromType == "Hexadecimal" && convertToType == "Octal"){

        //Converts hexadecimal to decimal, decimal to binary, then binary to octal
        document.getElementById("convertToVal").value = binaryToOctal(decimalToBinary(hexadecimalToDecimal(input)));

    }
    
}

//Allows user to copy answer
function copyToClipboard(){

    //Checks if there is any value in the element
    if(document.getElementById("convertToVal").value.length == 0){
        //displays an alert if there's no value
        alert("There is no text to copy!");

    } else{

        var copyText = document.getElementById("convertToVal");

        copyText.select();
        copyText.setSelectionRange(0, 99999);
        
        navigator.clipboard.writeText(copyText.value);
      
        alert("Copied the text: " + copyText.value);

    }

}

/*Checks if string input is binary*/
function isBinary(input){

    var binary = false;

    //Checks each digit to see if it's either 0 or 1, otherwise returns false
    for (var i = 0; i < input.length; i++) {

        if (input[i] == "0" || input[i] == "1") {
            binary = true;
        } else {
            binary = false;
        }

    }

    return binary;
    
}

/*Checks if strring input is hexadecimal*/
function isHexa(input){

    var hexa = false;

    //Checks each digit to see if it's less than or equal to 9 or letters A-F, otherwise returns false
    for (var i = 0; i < input.length; i++) {

        if (input[i] <= "9" || (input[i] == "A" || input[i] == "B" || input[i] == "C" || input[i] == "D" || input[i] == "E" || input[i] == "F")) {
            hexa = true;
        } else {   
            hexa = false;
        }

    }

    return hexa;

}

function isOctal(input){

    var octal = false;

    //Checks each digit to see if it's less than or equal to 7, otherwise returns false
    for (var i = 0; i < input.length; i++) {

        if (input[i] <= "7") {
            octal = true;
        } else {
            octal = false;
        }

    }

    return octal;

}

/*Converts Binary to Decimal*/
function binaryToDecimal(itemToConvert){

    //Checks if input is a proper binary sequence
    if(!isBinary(itemToConvert)){

        alert("Input is not valid binary!");
        return "";

    } else {

        var decValSum = 0;

        //Checks if there is a digit that is 1 then does 2^(last index - i)
        for(var i = itemToConvert.length-1; i > -1; i--){
            if(itemToConvert[i] == "1"){
                decValSum = decValSum + (Math.pow(2, ((itemToConvert.length-1)- i)));
            }
        }

        //returns the number split with commas
        return decValSum.toLocaleString('en-US');

    }

}

/*Converts Binary to Octal*/
function binaryToOctal(itemToConvert){

    //Checks if input is a proper binary sequence
    if(!isBinary(itemToConvert)){

        alert("Input is not valid binary!");
        return "";

    } else {

        itemToConvert = itemToConvert.split("");
        itemToConvert = itemToConvert.reverse();
        itemToConvert = itemToConvert.join("");

        var octalVal = [];
        var octalValSum = 0;
        var splitList = [];

        if(itemToConvert.length <= 2){
            splitList.unshift(itemToConvert);
        }
        else{
            
            //Loops until itemToConvert has no more values left
            while(itemToConvert.length > 0){
                
                if(itemToConvert.length < 3){
                    splitList.unshift(itemToConvert.split("").reverse().join(""));
                    itemToConvert = "";
                }else{
                    splitList.unshift((itemToConvert.substr(0, 3)).split("").reverse().join(""));
                    itemToConvert = itemToConvert.substr(3, itemToConvert.length);
                }
            }
            
            if(itemToConvert.length <= 3 && itemToConvert.length != 0){
                splitList.push(itemToConvert.split("").reverse().join(""));
            }

        }


        for(var i = 0; i < splitList.length; i++){
            octalValSum = 0;

            for(var j = 3; j >= 0; j--){
                if(splitList[i][j] == "1"){
                    octalValSum = octalValSum + (Math.pow(2, ((splitList[i].length-1)-j)));
                }
            }

            octalVal.push(octalValSum);
            
        }

        return octalVal.join('');
    
    }
    
}

/*Converts Binary to Hexadecimal*/
function binaryToHexadecimal(itemToConvert){

    if(!isBinary(itemToConvert)){

        alert("Input is not valid binary!");
        return "";

    } else {

        itemToConvert = itemToConvert.split("");
        itemToConvert = itemToConvert.reverse();
        itemToConvert = itemToConvert.join("");

        var hexadecVal = [];
        var hexadecValSum = 0;
        var splitList = [];

        /*Program splits the binary value into 4s*/

        //If there are only 3 or less binary digits, push the item into the final split list
        if(itemToConvert.length <= 3){
            splitList.unshift(itemToConvert);
        }
        else{
            
            //Loops until itemToConvert has no more values left
            while(itemToConvert.length > 0){
                
                //If there are less than 4 values left in the list, append the remaining into splitlist
                if(itemToConvert.length < 4){
                    splitList.unshift(itemToConvert.split("").reverse().join(""));
                    itemToConvert = "";
                }else{
                    splitList.unshift((itemToConvert.substr(0, 4)).split("").reverse().join(""));
                    itemToConvert = itemToConvert.substr(4, itemToConvert.length);
                }

            }
            
            if(itemToConvert.length <= 4 && itemToConvert.length != 0){
                splitList.push(itemToConvert.split("").reverse().join(""));
            }

        }

        for(var i = 0; i < splitList.length; i++){
            hexadecValSum = 0;
            for(var j = 3; j >= 0; j--){
                if(splitList[i][j] == "1"){
                    hexadecValSum = hexadecValSum + (Math.pow(2, ((splitList[i].length-1)-j)));
                }
            }

            if(hexadecValSum > 9 && hexadecValSum < 16){

                if(hexadecValSum == 10){
                    hexadecVal.push("A");
                }
                else if(hexadecValSum == 11){
                    hexadecVal.push("B");
                }
                else if(hexadecValSum == 12){
                    hexadecVal.push("C");
                }
                else if(hexadecValSum == 13){
                    hexadecVal.push("D");
                }
                else if(hexadecValSum == 14){
                    hexadecVal.push("E");
                }
                else if(hexadecValSum == 15){
                    hexadecVal.push("F");
                }

            } else{
                hexadecVal.push(hexadecValSum);
            }
            
        }

        return hexadecVal.join('');
    
    }

}

function hexadecimalToDecimal(itemToConvert){

    itemToConvert = itemToConvert.toUpperCase();

    if(!isHexa(itemToConvert)){

        alert("Input is not a valid hexadecimal value!");

    } else {

        itemToConvert = itemToConvert.split("");
        itemToConvert = itemToConvert.reverse();

        var decEquation = 0;

        for(var i = itemToConvert.length-1; i >= 0; i--){

            if(itemToConvert[i] == "A"){
                decEquation = decEquation + 10 * Math.pow(16, i);
            }
            else if(itemToConvert[i] == "B"){
                decEquation = decEquation + 11 * Math.pow(16, i);
            }
            else if(itemToConvert[i] == "C"){
                decEquation = decEquation + 12 * Math.pow(16, i);
            }
            else if(itemToConvert[i] == "D"){
                decEquation = decEquation + 13 * Math.pow(16, i);
            }
                else if(itemToConvert[i] == "E"){
                    decEquation = decEquation + 14 * Math.pow(16, i);
            }
            else if(itemToConvert[i] == "F"){
                decEquation = decEquation + 15 * Math.pow(16, i);
            }
            else{
                decEquation = decEquation + itemToConvert[i] * Math.pow(16, i);
            }

        }

        return (parseInt(decEquation)).toLocaleString('en-US');

    }

}

function octalToDecimal(itemToConvert){

    if(!isOctal(itemToConvert)){

        alert("Input is not a valid Octal Number!");
        return "";

    } else {

        itemToConvert = itemToConvert.split("");
        itemToConvert = itemToConvert.reverse();

        var decEquation = 0;

        for(var i = itemToConvert.length-1; i >= 0; i--){

            decEquation = decEquation + itemToConvert[i] * Math.pow(8, i);

        }

        return (parseInt(decEquation)).toLocaleString('en-US');
    
    }

}

function decimalToBinary(itemToConvert){

    itemToConvert = itemToConvert.replaceAll(',', '');

    if(isNaN(itemToConvert)){

        alert("Input is not a valid Decimal Number!");
        return "";

    } else {

        var temp = itemToConvert;
        var binaryList = [];

        while(itemToConvert >= 1){
            binaryList.push(Math.trunc(itemToConvert % 2));
            itemToConvert = itemToConvert / 2;
        }

        binaryList = binaryList.reverse();

        return binaryList.join('');
    
    }

}

