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
                theNum = (theNum.charAt(0)=='0' && theNum.charAt(1)!='.') ? theNum.substring(1) : theNum;
        }    
        
        //viewer에 입력값 세팅
        if(theNum) {
            //viewer.innerHTML = (theNum.indexOf('.')>0) ? theNum : theNum.replace(addexp, ',');
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

            viewer.innerHTML = (resultNum.indexOf('.')>0) ? resultNum : resultNum.replace(addexp, ',');
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



//.querySelector()는 CSS 선택자로 요소를 선택하게 해줍니다. 주의할 점은 선택자에 해당하는 첫번째 요소만 선택한다는 것입니다.
/*	
document.querySelector( 'selector' )
document.querySelector( '.xyz' )
는 클래스 값이 xyz인 첫번째 요소에 접근합니다.
*/

//.querySelectorAll()은 특정 CSS 선택자를 가진 모든 요소를 배열로 가져오는 메서드입니다.
/*
document.querySelectorAll( 'selector' )

예를 들어
document.querySelectorAll( '.abc' )
는 클래스 값이 abc인 모든 요소를 가져옵니다.
document.querySelectorAll( '.abc, .def' );
클래스 값이 abc 또는 def인 모든 요소를 가져옵니다.




웹문서를 만드는 경우, 문서가 로드되었을때를 기점으로 문서를 초기화하고, 각종 설정을 부여하는 것은 빈번한 일입니다. 이 시점에 접근하기 위해 사용되는 이벤트들에 대하여 알아봅니다.

onload
문서의 모든 콘텐츠(images, script, css, etc)가 로드된 후 발생하는 이벤트이다(load 이벤트라고들 한다).
window.onload = function() { //실행될 코드 }

window.onload같은 경우 전체 페이지의 모든 외부리소스와 이미지가 브라우저에 불리워진 이후에 작동을 하게 되어 이미지가 안뜨거나 딜레이가 생길때는 그 만큼의 시간을 기다려야 하는 문제가 있습니다.
    
출처: http://webdir.tistory.com/515 [WEBDIR]

JavaScript 부모요소와 자식요소에 같은 이벤트를 바인딩했을 때
Event Bubbling
*/
