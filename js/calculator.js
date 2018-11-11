window.onload = function(){
    var num = document.getElementsByClassName('num');
    var ops = document.getElementsByClassName('ops');
    var result = document.getElementById('equals');
    var viewer = document.getElementById('viewer');
    var AllClear = document.getElementById('allClear');
    var oldNum = '';
    var theNum = '';
    var operator = '';
    var resultNum = '';
    var addexp = /\B(?=(\d{3})+(?!\d))/g;

    //입력값 세팅
    var setNum = function(){
        
        var dataNum = this.getAttribute('data-num');

        if(result.getAttribute('data-result') && !operator) {
            oldNum = '';
            theNum = '';
            result.setAttribute('data-result', '');
        }
        //입력값
        switch (dataNum) {
            case '.':
                if(theNum == '0' || !theNum) {
                    theNum = '0' + dataNum;
                }else if(theNum.indexOf('.') > 0) {
                    return;     
                }else{
                    theNum += dataNum;
                }
                break;
            case 'change':
                if(theNum=='0') {
                    return;
                }else if(theNum.charAt(0)=='-') {
                    theNum = theNum.substring(1);
                }else {
                    theNum = '-' + theNum;
                }
                break;
            case 'percent':
                if(theNum != '0') {
                    theNum = (theNum/100).toString();
                }
                
                break;
            default:
                if(!theNum) {
                    theNum = dataNum;
                }else if(theNum) {
                    theNum += dataNum;
                };
                theNum = (theNum.length > 1 && theNum.charAt(0)=='0' && theNum.charAt(1)!='.') ? theNum.substring(1) : theNum;
        }    
        console.log('setNum내부 dataNum: '+dataNum);
        console.log('setNum내부 theNum: '+theNum);
        //viewer에 입력값 세팅
        if(theNum) {
            view(theNum);
        }    
    };

    //연산자 세팅
    var setOps = function(){
        //현재값 확인
        if(!theNum) {
            if(!oldNum) {
                oldNum = '0';
            }else if(oldNum) {
                operator = this.getAttribute('data-ops');
                return;
            }
        }else if(theNum) {
            if(!oldNum)
                oldNum = theNum;
            else if(oldNum) {
                setResult();
            }
        }
        //입력값 초기화
        theNum = '';
        //연산자 세팅
        operator = this.getAttribute('data-ops');    
    }
    
    //계산
    var setResult = function(){
        var oldNumInt;
        var theNumInt;

        if(theNum && oldNum) {
            oldNumInt = parseFloat(oldNum);
            theNumInt = parseFloat(theNum);
            switch (operator) {
                case 'plus':
                    resultNum = oldNumInt + theNumInt;
                    break;

                case 'minus':
                    resultNum = oldNumInt - theNumInt;
                    break;

                case 'times':
                    resultNum = oldNumInt * theNumInt;
                    break;

                case 'divided-by':
                    if(theNum == '0') {
                        viewError();
                        return;
                    }else {
                        resultNum = oldNumInt / theNumInt; 
                    }  
                    break;
            }
            
            if(!resultNum.toString().split('.')[1]){
                resultNum = resultNum.toString();               
            }else{
                resultNum = resultNum.toFixed(8).toString();
            }

            view(resultNum);
            result.setAttribute('data-result', resultNum);
            oldNum = resultNum;
            theNum = '';
            operator = '';
            resultNum = '';
        }else{
            return;
        }
    };
    
    var view = function(str) {        
        viewer.innerHTML = (str.indexOf('.')>0) ? str : str.replace(addexp, ',');
    }
    
    var viewError = function() {
        console.log('inError');
        viewer.innerHTML = 'Error';
        theNum = '';
        oldNum = '';
        resultNum = '';
        result.setAttribute('data-result', '');
    }
    
    //클릭이벤트
    for (var i = 0, l = num.length; i < l; i++) {
        num[i].onclick = setNum;
    };
    
    for (var i = 0, l = ops.length; i < l; i++) {
        ops[i].onclick = setOps;
    };
    
    result.onclick = setResult;
    
    AllClear.onclick = function() {
        window.location.reload();
    }
    



};


