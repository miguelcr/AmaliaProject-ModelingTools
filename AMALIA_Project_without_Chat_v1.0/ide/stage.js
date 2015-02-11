$(document).ready(function(){
//        $("#ucfolder").on('click touchend', function(){
//            if(mobilecheck==true){
//		window.location.href = 'casosUso.html';}
//	});
//        $("#dmfolder").on('click touchend', function(){
//            if(mobilecheck==true){
//		window.location.href = 'diagramaClasses.html';
//            }
//	});
	$("#ucfolder").dblclick(function(){
        window.location.href = "casosUso.html";
    });
        $("#dmfolder").dblclick(function(){
        window.location.href = "diagramaClasses.html";
    });


	$("#roller").mouseenter(function () {
        $("#controlStage").slideUp(200);
    });
    $("header").mouseenter(function () {
        $("#controlStage").slideDown(200);
    });

	//Botao fechar projecto
    $("#voltarPagPrincipal").click(function(){
        ControladorAmalia.toogleDialogoFechaProjecto();
    });

	$("#btnCancelaFecharProjeto").click(function(){
        ControladorAmalia.toogleDialogoFechaProjecto();
    });
    //Confirmaçao de que e para fechar o projecto
    $("#btnFecharProjecto").click(function(){
        ControladorAmalia.FechaProjecto();
        window.location.href = "index.html";

    });

	//Botao para mudar a linguagem para Ingles
	$("#lng_english").click(function(){
		ControladorAmalia.MudaParaEN();
		ControladorAmalia.SetCookie("lang", "en");

	});

	//Botao para mudar a linguagem para Portugues
	$("#lng_portuguese").click(function(){
		ControladorAmalia.MudaParaPT();
		ControladorAmalia.SetCookie("lang", "pt");

	});

	ControladorAmalia.ApplyCookie();
});
