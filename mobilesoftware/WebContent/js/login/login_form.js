var status = true;

$(document).ready(function(){	
	
	$('#login_btn').click(function(){//login이라는 id를 가지고 있는것을 클릭하였을때 작동
		checkIt();
		
		if(status){
			//loginPro.jsp 파일을 ajax를 사용하여 요청하기위한 작업
			//아이디와 암호를 json으로 만들어 전송한다.
			var jsonv = {id : $("#id").val(), pass : $("#pass").val()};
			//json문법표현 var 변수명 = {key : value, key : value };			
			$.ajax({
				type:"POST",
				url:"/mobilesoftware/login/loginPro.do",
				data:jsonv,
				success:function(data){//data는 리턴값 변수 서블릿의의 결과를 받는다.					
					var str1 = '<p id="ck">';
			    	var loc = data.indexOf(str1);
			    	var len = str1.length;
			    	var check = data.substr(loc+len,1);
			    	if(check == "1"){//로그인에 성공하였을 때
			    		window.location.assign("/mobilesoftware/index.do");
					}else if(check == -1){
						alert("비밀번호가 틀렸습니다.");
						$("#pass").val("");//val()은 값을 가져오지만 val("")는 내용을지움
						$("#pass").focus();
					}else if(check == 0){
						alert("아이디가 틀렸습니다.");
						$("#id").val("");//val()은 값을 가져오지만 val("")는 내용을지움
						$("#id").focus();
					}//end else-------------------->
				}//end 리턴함수 -------------------------------->
			});//end ajax---------------------------------------->
		}//end if------------------------------------------------------>
	});//end 로그인 클릭----------------------------------------------------->
});//end 익명함수----------------------------------------------------------------->

function checkIt(){//아이디 암호 입력 체크
	status = true;
	if(!$.trim($("#id").val())){//'"구분없이 사용가능 val()는 #id의값
		//즉 id라는 id를 가진 곳의 값을 가져온다.
		alert("아이디를 입력하세요.");		
		$("#id").focus();
		status = false;//스테이터스의 값을 바꿔줌으로써 ajax함수로의 진입을 막는다.
		return false;//리턴값을 false를 주면 함수가 종료되면서 밑의 코드를 진행 안한다.
	}
	if(!$.trim($("#pass").val())){
		alert("비민번호를 입력하세요.");		
		$("#pass").focus();
		status = false;
		return false;
	}	
}