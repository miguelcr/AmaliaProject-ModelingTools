/**
 * @author jorge et al.
 */

/*
DMMLG
Iniciação de variaveis
*/
var positionx_class=200;
var positiony_class=20;
var positionx_interface=150;
var positiony_interface=80;
var positionx_abstract=250;
var positiony_abstract=100;
var widthPaperFromStart = Math.round(screen.availWidth)-500;
var heightPaperFromStart =Math.round(screen.availHeight-250);
var widthPaper = Math.round(screen.availWidth)-500;
var heightPaper = Math.round(screen.availHeight)-250;
var rectxwidth =0;
var rectHeigth = heightPaper -120;
var scrollleft = $(document).scrollLeft();
var scrolltop = $(document).scrollTop();



ControladorAmalia.ReadVariaveis();

ControladorAmalia.ApplyCookie();

//DMMLG
// Função para inserir classes no grafico
function insertClassOnToGraph(){
    var classeGraph = Amalia.dia.getGrafClass(positionx_class,positiony_class);
    positionx_class += 10;
    positiony_class += 10;
    graph2.addCell([classeGraph]);
    listaClasses.push(classeGraph.attributes.name);
    }

//DMMLG
// Função para inserir interface no grafico
function insertInterfaceOnToGraph(){
    var interfaceGraph = Amalia.dia.getGrafInterface(positionx_interface,positiony_interface);
    positionx_interface += 10;
    positiony_interface += 10;
    graph2.addCell([interfaceGraph]);
    listaInterfaces.push(interfaceGraph.attributes.name);
}

//DMMLG
//Função para inserir abstract no grafico
function insertAbstractOnToGraph(){
    var abstractGraph = Amalia.dia.getGrafAbstract(positionx_abstract,positiony_abstract);
    positionx_abstract +=10;
    positiony_abstract +=10;
    graph2.addCell([abstractGraph]);
    listaAbstracts.push(abstractGraph.attributes.name);
}




//************************************************
//** Função para adicionar campos de texto para **
//**     atributos ou métodosde uma Classe      **
//************************************************
function addAtributoMetodo(classe){
	//Div para o Atributo
	var atributoP = $("<div />").addClass(classe);

	//Campo de texto para o atributo
	var nomeAtributo = $("<input />").addClass("nome_"+classe);
	nomeAtributo.attr ("type", "text");
	//nomeAtributo.attr ("placeholder", classe);

	//botão para apagar atributo
	var btnApaga = $("<input />").addClass("btnApaga");
	btnApaga.attr("type", "button");
	btnApaga.attr("value","-");

	atributoP.append(nomeAtributo);
	atributoP.append(btnApaga);

	return atributoP;
}

function addMetodoInterface(interf){
	//Div para o Atributo
	var metodoP = $("<div />").addClass(interf);

	//Campo de texto para o atributo
	var nomeMetodo = $("<input />").addClass("nome_"+interf);
	nomeMetodo.attr ("type", "text");
	//nomeMetodo.attr ("placeholder", interf);

	//botão para apagar metodo
	var btnApaga = $("<input />").addClass("btnApaga");
	btnApaga.attr("type", "button");
	btnApaga.attr("value","-");

	metodoP.append(nomeMetodo);
	metodoP.append(btnApaga);

	return metodoP;
}

//***************************
//** Iniciador do Diagrama **
//***************************
function iniciarDiagrama(graph2){
		//Objetos da barra de ferramentas
	//var lixoGraf = Amalia.dia.getGrafLixo (10,400);
	var classGraf = Amalia.dia.getGrafClass(10,20);
	var abstractGraf = Amalia.dia.getGrafAbstract(10,140);
	var interfaceGraf = Amalia.dia.getGrafInterface(10,270);

	//Adicionar ao gráfico os objetos da barra de ferramentas
	graph2.addCells([classGraf, abstractGraf, interfaceGraf]);

}

function actualizaArvoreClasse(){
    $("#classeslista").empty();
    var htmlclasses ="";
    if(listaClasses.length>0){
        for(var i =0; i<listaClasses.length; i++){
         htmlclasses +='<li class="fileCL"><a>' + listaClasses[i] + '</a></li>';
        }
        $("#classeslista").append(htmlclasses);
    }
    $("#abstractlista").empty();
    var htmlAbstract="";
    if(listaAbstracts.length>0){
        for(var i =0; i<listaAbstracts.length; i++){
         htmlAbstract +='<li class="fileAB"><a>' + listaAbstracts[i] + '</a></li>';
        }
        $("#abstractlista").append(htmlAbstract);
    }
    $("#interfacelista").empty();
    var htmlInterface="";
    if(listaInterfaces.length>0){
        for(var i =0; i<listaInterfaces.length; i++){
         htmlInterface +='<li class="fileIT"><a>' + listaInterfaces[i] + '</a></li>';
        }
        $("#interfacelista").append(htmlInterface);
    }
}
//*******************************************
//**           Página Carregada            **
//** Eventos e funcionaliddes da interface **
//*******************************************
$(document).ready(function(){




	// Tipos de instancias dos objetos
	var instanceClass = joint.shapes.uml.Class;//são todos
	var instanceAbstract = joint.shapes.uml.Abstract; //Classe abstracta
	var instanceInterface = joint.shapes.uml.Interface;// Interface
    //DMMLG
	//var instanceLixo = joint.shapes.basic.Lixo;//Lixo
	//var widthPaper = Math.round(screen.availWidth * .95);
	//var heightPaper =  Math.round(screen.availHeight *.75);
	var minWidthDiagramPaper = 120;
	var minHeightDiagramPaper = 0;
	var minSizePaper = g.rect(0,0,widthPaper,heightPaper);

	//console.log("w-"+widthPaper+ "h-"+heightPaper);

    var paper = new joint.dia.Paper({
	id:'t',
    el: $('#modelo'),
	width: widthPaper,
	height: heightPaper,// ainda tenho um problema com isto
	gridSize:10,
	model: graph2
	});
    graph2.fromJSON(classesDIAG);

       zoomfit();

    //DMMLG
// dimensionar o paper ao tamanho do diagrama
function zoomfit(){
    paper.fitToContent(0,0,20,0);
        if(paper.options.height < heightPaperFromStart ){
            paper.setDimensions(paper.options.width,heightPaperFromStart);
        }
        if(paper.options.width < widthPaperFromStart){
            paper.setDimensions(widthPaperFromStart, paper.options.height);
        }
        heightPaper = paper.options.height;
        widthPaper = paper.options.width;
    }

	//iniciarDiagrama(graph2);

	//Eventos a capturar

	//mousedown
	paper.on('cell:pointerdown',function(cellView,evt, x, y){

		var elemento = cellView.model;

		//trazer o elemento clicado para a frente do diagrama
		elemento.toFront();

	});

	//Drop into para estabelecer ligações, mouseup
	paper.on('cell:pointerup', function(cellView, evt, x, y){

		var elementoCima = cellView.model;
		if (x > widthPaper-20){
            widthPaper = widthPaper+50;
			paper.setDimensions(widthPaper,heightPaper);
            //rect.position{x:0,y:(heightPaper-120)};
		}
        if(y > heightPaper-20){
            heightPaper = heightPaper +50;
            paper.setDimensions(widthPaper,heightPaper);
            //rect.position({x:0, y:(heightPaper-120)});
        }


		//area de diagrama x > 120
		if (x <widthPaper){

			//Acertar posição
			ControladorAmalia.elementoConfinadoAoPaper(minWidthDiagramPaper,minHeightDiagramPaper,widthPaper,heightPaper, elementoCima);//tenho problema com a largura

			//Obter o elemento que ficou por baixo daquele que estou a deslocar
			var elementoBaixo = graph2.get('cells').find(function(cell){
				// esquisito mas o elemento de cima também é dos elementos do grupo e eu não estou interessado
				if (cell.id === elementoCima.id){return false;}

				//estou interessado Classes Inferfaces e Classes Abstratas cuja bounding box contem o ponto x,y
				//e essas coinsas são tudo classes
				if(cell instanceof instanceClass
					&& cell.getBBox().containsPoint(g.point(x, y))){
						return true;
					}else{
						return false;
					}
			});

			//Estabelecer ligações se ainda não existirem
			if (elementoBaixo && !_.contains(graph2.getNeighbors(elementoBaixo), elementoCima)){

				//Casos
				if(elementoBaixo instanceof instanceInterface
					&& elementoCima instanceof instanceClass
					&& !(elementoCima instanceof instanceInterface)){

						//O elemento de Baixo é uma interface - segue-se uma implementação se o de cima não for uma interface
						ControladorAmalia.associaImplementa(graph2,elementoCima,elementoBaixo);

				}else if (elementoBaixo instanceof instanceAbstract
					&& elementoCima instanceof instanceClass
					&& !(elementoCima instanceof instanceInterface) ){

						// elemento de baixo é classe abstrata a de cima é classe ou classe abstrata --> herança
						ControladorAmalia.associaHeranca(graph2,elementoCima.id,elementoBaixo.id);

				}else if (!(elementoBaixo instanceof instanceAbstract || elementoBaixo instanceof instanceInterface)
					&&!(elementoCima instanceof instanceAbstract || elementoCima instanceof instanceInterface)){

						ControladorAmalia.toogleDialogoAssociaClasses(elementoCima.id,elementoBaixo.id);

				}

			}
		}
		zoomfit();
	});

		//Duplos clicks para mudar os momes dos objectos e alterar os seus atributos.
    paper.on('cell:pointerdblclick',function(cellView,evt, x, y){

		var elemento = cellView.model;

		if (elemento instanceof instanceInterface){

			ControladorAmalia.toogleDialogoAlteraInterface(elemento);
		}
		else
			ControladorAmalia.toogleDialogoAlteraClasses(elemento);

	});


// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ToolBox Events <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<//
    //DMMLG
    //
	//Add Use Case graph2 to paper
	$("#addClassGraph").click(function(e){
		insertClassOnToGraph();
        e.preventDefault();
	});
    $("#addInterfaceGraph").click(function(e){
		insertInterfaceOnToGraph();
        e.preventDefault();
	});

	//Add Actor graph2 to paper
    $("#addAbstractGraph").click(function(e){
        insertAbstractOnToGraph();
        e.preventDefault();
         });

    //Zoom paper to fit content
    $("#makeZoomToFit").click(function(e){
            zoomfit();
    });

    //Clear Diagram
    $("#clearDiagram").click(function(e){
	    ControladorAmalia.toogleDialogoLimpaDiagrama();
    });




	//////////>>>>>>>>>>>>>>>>>>>>>>>>>>Eventos do IDE diagrama de classes e dialogos
		//Experiencia gravar e repor

	$("#btnVoltarInicio").click(function(){
        ControladorAmalia.ActualizaVariaveis();
        window.location.href ="stage.html";
	});


	//Gravar para o Disco em JSON
	$("#btnGuardarCasosUsoDisco").click(function(){
		ControladorAmalia.gravarProjectoNoDisco();
	});

	 //Botao fechar projecto
    $("#btnClose").click(function(){
        ControladorAmalia.toogleDialogoFechaProjecto();
    });
    $("#btnCancelaFecharProjeto").click(function(){
        ControladorAmalia.toogleDialogoFechaProjecto();
    });

	//Botões de cx de dialogo de limpar diagrama
	$("#btnCancelaFecharProjeto").click(function(){
		ControladorAmalia.toogleLimpaDiagrama();
	});

	$("#btnLimpar").click(function(){
		ControladorAmalia.toogleDialogoLimpaDiagrama();
		graph2.clear();
        listaClasses.length = 0;
        listaInterfaces.length = 0;
        listaAbstracts.length = 0;
	});
    $("#btnCancelaLimpar").click(function(){
		ControladorAmalia.toogleDialogoLimpaDiagrama();
    });


    //Confirmaç\ao de que é para fechar o projecto
    $("#btnFecharProjecto").click(function(){
        ControladorAmalia.FechaProjecto();
        window.location.href = "index.html";
    });

    //RNPS
    //botão para gravar o projecto
    $("#btnGravarProjeto").click(function(){
        ControladorAmalia.diagramaCasoUsoParaJSON();
        ControladorAmalia.diagramaClassesParaJSON();
        ControladorAmalia.createUseCaseBundle(diagramaCU,listaCasos,listaAtores);
        ControladorAmalia.createClassesBundle(diagramaCL, listaClasses, listaInterfaces, listaAbstracts);
        ControladorAmalia.gravarProjectoNoBrowser();
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


	//--------------------------Botão cancelar do dialogoAlteraClasses
	$("#btnCancelarAlteraClasse").click(function(){

		 $("div.metodo").each(function(){
		 	$(this).remove();
		 });
		 $("div.atributo").each(function(){
		 	$(this).remove();
		 });
		ControladorAmalia.toogleDialogoAlteraClasses("");
	});
	//---------------------------Botão alterar do dialogoAlteraClasses
	$("#classeMostra").submit(function(e){
		var atributosArray = new Array();
		var metodosArray = new Array();

		//Capturar os atributos
		$("div.atributo").each(function(){
			var desigAtributo = $($(this).find("input.nome_atributo")[0]).val();
			atributosArray.push(desigAtributo);
			$(this).remove();
		});

		//Capturar os métodos
		$("div.metodo").each(function(){
			var desigMetodo = $($(this).find("input.nome_metodo")[0]).val();
			metodosArray.push(desigMetodo);
			$(this).remove();
		});
		var idClasse = $("#idClasse").val();
		var elemento = graph2.getCell(idClasse);

		ControladorAmalia.setClasse(graph2,atributosArray,metodosArray);
		ControladorAmalia.toogleDialogoAlteraClasses("");
        e.preventDefault();
	});
	//--------------------------Botão Limpar Nome
	$("#btnLimparNome").click(function(){
		$("#nomeDaClasse").val("");
	});
	//--------------------------Botão Add Atributo
	$("#btnAddAtributo").click(function(){
		$("#atributosClasse").append(addAtributoMetodo("atributo"));
	});
	//--------------------------Botão para Apagar atributo
	$("#atributosClasse").on("click",".btnApaga",function(){
		$(this).parent().remove();
	});
	//---------------------------Botão add Método -- btnAddMetodo
	$("#btnAddMetodo").click(function(){
		$("#metodosClasse").append(addAtributoMetodo("metodo"));
	});
	//--------------------------Botão para Apagar método
	$("#metodosClasse").on("click",".btnApaga",function(){
		$(this).parent().remove();
	});

    //DMMLG
    //botão eliminar classe
	 $("#btnEleminarAlterarClasse").click(function (){
        ControladorAmalia.removeClasse(graph2);
		ControladorAmalia.toogleDialogoAlteraClasses("");
    });

	//--------------------------Botão cancelar do dialogoAlteraInterface
	$("#btnCancelarAlteraInterface").click(function(){

		 $("div.metodo").each(function(){
		 	$(this).remove();
		 });
		ControladorAmalia.toogleDialogoAlteraInterface("");
	});
	//---------------------------Botão alterar do dialogoAlteraInterface
	$("#classes").submit(function(e){
		var metodosArray = new Array();

		//Capturar os métodos
		$("div.metodo").each(function(){
			var desigMetodo = $($(this).find("input.nome_metodo")[0]).val();
			metodosArray.push(desigMetodo);
			$(this).remove();
		});
		var idInterface = $("#idInterface").val();
		var elemento = graph2.getCell(idInterface);
		ControladorAmalia.setInterface(graph2,metodosArray);
		ControladorAmalia.toogleDialogoAlteraInterface("");
        e.preventDefault();

	});
	//--------------------------Botão Limpar Nome
	$("#btnLimparNomeInt").click(function(){
		$("#nomeDaInterface").val("");
	});
	//---------------------------Botão add Método -- btnAddMetodoInt
	$("#btnAddMetodoInt").click(function(){
		$("#metodosInterface").append(addMetodoInterface("metodo"));
	});
	//--------------------------Botão para Apagar método
	$("#metodosInterface").on("click",".btnApaga",function(){
		$(this).parent().remove();
	});

	//DMMLG
    // botao eleminar interface
    $("#btnEleminarAlterarInterface").click(function(){
        ControladorAmalia.removeInterface(graph2);
		ControladorAmalia.toogleDialogoAlteraInterface("");
    });

	//--------------------------Botão Cancela ligação de Classes
	$("#btnCancelaLigacaoClasses").click(function(){
		ControladorAmalia.toogleDialogoAssociaClasses("","");
	});
	//--------------------------Botão liga Classes
	$("#btnLigaClasses").click(function(){
		ControladorAmalia.associaClasses(graph2);
		ControladorAmalia.toogleDialogoAssociaClasses("","");
		zoomfit();
	});

	//*************************************************
	//  Adaptar o dialogo de associação de classes
	//************************************************
	$("#ligarClasses").change(function(){
		if ($("#ligarClasses option:selected").val() == "h"){
			$("#cardCima").hide();
			$("#cardBaixo").hide();
		}else{
			$("#cardCima").show();
			$("#cardBaixo").show();
		}

	});

	//***********************************************************
	//** Simplificar o Interface quando a trabalhar no modelo  **
	//***********************************************************
	//    entra no modelo só deixa o título
	$("#modelo").mouseenter(function(){
		$("#controloDiagramaClasses").slideUp(200);
	});
	//    entra no título mostra ferramentas globais e navegação
	$("header").mouseenter(function(){
		$("#controloDiagramaClasses").slideDown(200);

	});
});



window.setInterval(actualizaArvoreClasse,1000);
window.setInterval(ControladorAmalia.ActualizaVariaveis,1000);
