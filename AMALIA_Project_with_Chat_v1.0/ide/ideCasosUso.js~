/**
 * @author jorge
 */

//***************************
//** Iniciador do Diagrama **
//***************************
var positionx_uso = 200;
var positiony_uso = 20;
var positionx_actor = 150;
var positiony_actor = 80;
var widthPaperFromStart = Math.round(screen.availWidth) - 500;
var heightPaperFromStart = Math.round(screen.availHeight - 250);
var widthPaper = Math.round(screen.availWidth) - 500;
var heightPaper = Math.round(screen.availHeight - 250);
var rectxwidth = 0;
var rectHeigth = heightPaper - 120;
var scrollleft = $(document).scrollLeft();
var scrolltop = $(document).scrollTop();


ControladorAmalia.ReadVariaveis();
//var b  =  element.scrollHeight - element.clientHeight;
//var c  =  element.scrollWidth - element.clientWidth;

//FUNÇÃO ATÉ VER DESNECESSÁRIA - NÃO ESTÁ A USO
function iniciarDiagramaCasosUso(graph) {
    // Gráficos do Ator e do caso de uso na posição da barra de ferramentas
    var caso = Amalia.dia.getGrafCasoUso(Math.round(screen.availWidth * .95) - 60, 20);
    var ator = Amalia.dia.getGrafAtor(Math.round(screen.availWidth * .95) - 23, 80);
    //Adicionar o ator e o caso de uso à barra de ferramentas
    graph.addCells([caso, ator]);


}


//RNPS
//Function to insert an Use Case in paper
//function insertUseCaseOnToGraph(){
//	var caso = Amalia.dia.getGrafCasoUso(Math.round(screen.availWidth * .95)-200,20);
//	graph.addCells([caso]);
//}


//Function to insert an Use Case in paper
function insertUseCaseOnToGraph() {
    var caso = Amalia.dia.getGrafCasoUso(positionx_uso, positiony_uso);
    positionx_uso = positionx_uso + 10;
    positiony_uso = positiony_uso + 10;
    graph.addCells([caso]);
    ControladorAmalia.toogleDialogoCasoUso(caso);
}


//RNPS
//Function to insert an Actor in paper
//function insertActorOnToGraph(){
//    var ator = Amalia.dia.getGrafAtor(Math.round(screen.availWidth * .95)-23,80);
//    graph.addCells([ator]);
//}

//funcao para inserir ator no paper
function insertActorOnToGraph() {
    var ator = Amalia.dia.getGrafAtor(positionx_actor, positiony_actor);
    positionx_actor = positionx_actor + 10;
    positiony_actor = positiony_actor + 10;
    graph.addCells([ator]);
    ControladorAmalia.toogleDialogoAtor(ator.id)
}



//funcao que atualiza lista de casos de uso na floating box
function actualizaArvoreUC(){
    $("#atoreslista").empty();
    var htmlatores ="";
    if(listaAtores.length>0){
        for(var i =0; i<listaAtores.length; i++){
         htmlatores +='<li class="fileAT"><a>' + listaAtores[i].name + '</a></li>';
        }
        $("#atoreslista").append(htmlatores);
    }
      $("#casoslista").empty();
    var htmlcasos ="";
    if(listaCasos.length>0){
        for(var i =0; i<listaCasos.length; i++){
         htmlcasos +='<li class="fileUC"><a>' + listaCasos[i].nome_caso + '</a></li>';
        }
        $("#casoslista").append(htmlcasos);
    }

}

$(document).ready(function () {
    ControladorAmalia.supportsLocalStorage();
    ControladorAmalia.ReadVariaveis();
    //var graph = new joint.dia.Graph;
    //var ModeloJSON
    var modeloJSON = "";
    //os casos de uso são shapes.basic.Circle e os atores shapes.basic.Actor
    var instanceCasoUso = joint.shapes.basic.Circle;
    var instanceActor = joint.shapes.basic.Actor;
    var instanceRect = joint.shapes.basic.Rect;
    // tamanho do paper
    var minWidthDiagramPaper = 0;
    //var toolbarAreaWidth = Math.round(screen.availWidth * .95)-120; //determina a largura da toolbar
    var treeAreaWidth = 120;
    var minHeightDiagramPaper = 0;


    var paper = new joint.dia.Paper({
        id: 't',
        el: $('#modelo'),
        width: widthPaper,
        height: heightPaper,
        gridSize: 10,
        model: graph,
    });
    graph.fromJSON(casoUso);
    zoomfit();
    //DMMLG
    // dimensionar o paper ao tamanho do diagrama
    function zoomfit() {
        paper.fitToContent(0, 0, 20, 0);
        if (paper.options.height < heightPaperFromStart) {
            paper.setDimensions(paper.options.width, heightPaperFromStart);
        }
        if (paper.options.width < widthPaperFromStart) {
            paper.setDimensions(widthPaperFromStart, paper.options.height);
        }
        heightPaper = paper.options.height;
        widthPaper = paper.options.width;
    }
    //Eventos que é necessário capturar.
    //mouse down para trazer elementos para a frente do diagrama
    paper.on('cell:', function (cellView, evt) {

    });
    paper.on('cell:pointerdown', function (cellView, evt, x, y) {

        var elemento = cellView.model;

        //        graph.addCell(circle);
        //trazer o elemento clicado para a frente do diagrama
        elemento.toFront();



    });


    document.addEventListener('click:down', function (evt) {
        alert("teste");
    });

    //mouse up para estabelecer ligações entre os elementos na área de desenho
    paper.on('cell:pointerup', function (cellView, evt, x, y) {

        var elementoCima = cellView.model;
        //console.log(JSON.stringify (elementoCima.toJSON()));
        //console.log((elementoCima.toJSON()).position.x);

        //RNPS
        //Crescimento (20px) do paper, caso um elemento chega a uma das extremidades do paper
        if (x > widthPaper - 20) {
            widthPaper = widthPaper + 50;
            paper.setDimensions(widthPaper, heightPaper);
            //rect.position{x:0,y:(heightPaper-120)};
        }
        if (y > heightPaper - 20) {
            heightPaper = heightPaper + 50;
            paper.setDimensions(widthPaper, heightPaper);
            //rect.position({x:0, y:(heightPaper-120)});
        }

        //area de diagrama x > 120 - mudado para area de diagrama x < 120
        if (x < widthPaper) {

            //Acertar posi├º├úo
            ControladorAmalia.elementoConfinadoAoPaper(minWidthDiagramPaper, minHeightDiagramPaper, widthPaper, heightPaper, elementoCima); //tenho problema com a largura

            //Obter o elemento que ficou por baixo daquele que estou a deslocar
            var elementoBaixo = graph.get('cells').find(function (cell) {
                // esquisito mas o elemento de cima tamb├®m ├® dos elementos do grupo e eu n├úo estou interessado
                if (cell.id === elementoCima.id) {
                    return false;
                }

                //estou interessado em casos de uso e atores cuja bounding box contem o ponto x,y

                if ((cell instanceof instanceCasoUso || cell instanceof instanceActor || cell instanceof instanceRect) && cell.getBBox().containsPoint(g.point(x, y))) {
                    return true;
                } else {
                    return false;
                }
            });

            //Agora que tenho o elemento de cima e o debaixo posso implementar o comportamento de liga├º├úo
            //se existir um elemento de baixo e se os dois elementos n├úo estiverem ligados - n├úo vale a pena fazer
            // mais do que uma liga├º├úo
            if (elementoBaixo && !_.contains(graph.getNeighbors(elementoBaixo), elementoCima)) {

                // se os dois elementos s├úo casos de uso podemos ter include ou extend
                if (elementoBaixo instanceof instanceCasoUso && elementoCima instanceof instanceCasoUso) {

                    // Abre um dialogo com as op├º├Áes include ou extends o processamento do dialogo ├® feito em
                    //ControladorAmalia.associaCasos(graph)
                    ControladorAmalia.toogleDialogoAssociaCasos(elementoCima.id, elementoBaixo.id);

                }
                // Um caso de uso ├® colocado sobre um ator. O ator participa no caso de uso.
                if (elementoBaixo instanceof instanceActor && elementoCima instanceof instanceCasoUso) {

                    ControladorAmalia.associaActorAoCaso(graph, elementoCima.id, elementoBaixo.id);

                }
                //Um ator ├® colocado sobre um ator, ent├úo temos heran├ºa
                if (elementoBaixo instanceof instanceActor && elementoCima instanceof instanceActor) {

                    ControladorAmalia.associaHeranca(graph, elementoCima.id, elementoBaixo.id);
                }
            }

            //RNPS
            //Every element that is mouse down can be removed
            //Objective: create an floating area in paper in the bottom left corner that when an element is over it, it will be removed

        }


    });

    //Duplos clicks para mudar os momes dos objectos e alterar o tamanho dos casos de uso.
    paper.on('cell:pointerdblclick', function (cellView, evt, x, y) {
        var elemento = cellView.model;

        //mudar atributos do caso de uso
        if (elemento instanceof instanceCasoUso) {
            // esta era uma tentativa de ter uma só função para chamar os dois dialogos mais é uma complicação
            //mais vale a função comentada
            //ControladorAmalia.toogleDialogoMudaNome(elemento.id,"#idCaso","#dialogo_casos_uso","#nomeCasoUso");
            ControladorAmalia.toogleDialogoCasoUso(elemento);

        }
        //mudar atributos do ator
        if (elemento instanceof instanceActor) {
            ControladorAmalia.toogleDialogoAtor(elemento.id);

        }

    });




    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ToolBox Events <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<//
    //RNPS
    //
    //Add Use Case graph to paper
    $("#addUseCaseGraph").click(function (e) {
        insertUseCaseOnToGraph();
        //ControladorAmalia.toogleDialogoCasoUso();
        e.preventDefault();
    });

    //Add Actor graph to paper
    $("#addActorGraph").click(function (e) {
        insertActorOnToGraph();
        e.preventDefault();
    });

    //Zoom paper to fit content
    $("#makeZoomToFit").click(function (e) {
        zoomfit();

    });

    //Clear Diagram
    $("#clearDiagram").click(function (e) {
        graph.clear();
        listaAtores = [];
        listaCasos = [];
    });






    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Eventos dos dialogos <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<//
    //Alterar o nome do Caso de Uso
    $("#caso_uso").submit(function (e) {

        ControladorAmalia.setNomeCaso(graph);
        ControladorAmalia.toogleDialogoCasoUso("");
        e.preventDefault();

    });
    //Remover Caos de uso do paper
    $("#btnDeleteCasoUso").click(function () {
        ControladorAmalia.removeCasoUso(graph);
        ControladorAmalia.toogleDialogoCasoUso("");
    });

    //Cancelar a alteração do nome do Caso de uso
    $("#btnCancelarAlterarNomeCasoUso").click(function () {
        ControladorAmalia.toogleDialogoCasoUso("");
    });


    //Alterar o nome do Actor
    $("#ator_nome").submit(function (e) {

        ControladorAmalia.setNomeActor(graph);
        ControladorAmalia.toogleDialogoAtor("");
        e.preventDefault();
    });

    //Cancelar a alteração do nome do Actor
    $("#btnCancelarAlterarNomeActor").click(function () {
        ControladorAmalia.toogleDialogoAtor("");
    });
    //Remover Actor do paper
    $("#btnDeleteActor").click(function () {
        ControladorAmalia.removeActor(graph);
        ControladorAmalia.toogleDialogoAtor("");
    });


    //Associar os casos de uso com include ou extends
    $("#ligacaoCasos").click(function () {
        ControladorAmalia.associaCasos(graph);
        ControladorAmalia.toogleDialogoAssociaCasos("", "");
    });
    //Cancelar Associação entre casos de uso
    $("#cancelaLigacao").click(function () {
        ControladorAmalia.toogleDialogoAssociaCasos("", "");
    });

    //Experiencia gravar e repor
    $("#btnGuardarCasosUso").click(function () {
        ControladorAmalia.toogleDialogoGravarDiagrama("diagramaCasosUso");
    });
    //Gravar para o disco em JSON---> fazer focus do dialogo gravar
    $("#btnGuardarCasosUsoDisco").click(function () {
        ControladorAmalia.gravarProjectoNoDisco();
    });

    //botao cancelar dentro da janela Gravar
    $("#btnCancelarGravarDiscoDiaCasos").click(function () {
        ControladorAmalia.toggleDialogoGravaDiaCasosDisco(false);
    });


    //JSONSAVEINFILE
    //botao gravar(acçao) dentro da janela Gravar
    $("#btnGravarDiscoDiaCasos").click(function () {
        ControladorAmalia.toggleDialogoGravaDiaCasosDisco(false);
    });
    //DMMLG
    //Alteração de linguagem
	$("#lng_english").click(function () {
        language ='languages/english.xml';
        ControladorAmalia.ActualizaVariaveis();
        location.reload();
    });
    $("#lng_portuguese").click(function () {
        language ='languages/portugues.xml';
        ControladorAmalia.ActualizaVariaveis();
        location.reload();
    });

    //Cancelar a abertura do ficheiro
    $("#btnCancelaAbrirCasosDisco").click(function () {
        ControladorAmalia.toggleDialogoAbreDiagramaCasosUsoDisco();
    });
    //Cancelar a Gravação

    $("#btnCancelaGravarDiagrama").click(function () {
        ControladorAmalia.toogleDialogoGravarDiagrama("");
    });
    // Voltar ao inicío
    $("#btnVoltarInicio").click(function () {
        window.location.href = "stage.html";
    });

    //Botao fechar projecto
    $("#btnClose").click(function(){
        ControladorAmalia.toogleDialogoFechaProjecto();
    });
    $("#btnCancelaFecharProjeto").click(function(){
        ControladorAmalia.toogleDialogoFechaProjecto();
    });
    //Confirmaçao de que é para fechar o projecto
    $("#btnFecharProjecto").click(function(){
        ControladorAmalia.FechaProjecto();
        window.location.href = "index.html";

    });
    //Gravar o diagrama
    $("#btnGravarDiagrama").click(function () {
        ControladorAmalia.gravarDiagramaNoBrowser(graph);
    });
    $("#btnGravarDiscoDiaCasos").click(function () {
        ControladorAmalia.diagramaCasoUsoParaJSON(graph);
        ControladorAmalia.diagramaClassesParaJSON(graph2);
        ControladorAmalia.createUseCaseBundle(diagramaCU, listaCasos, listaAtores);
        ControladorAmalia.createClassesBundle(diagramaCL, listaClasses, listaInterfaces, listaAbstracts);
        ControladorAmalia.gravarProjectoNoDisco();
        ControladorAmalia.toggleDialogoGravaDiaCasosDisco(false);
    });

    //Obter o diagrama do disco JSON
    $("#btnRestaurarCasosUsoDisco").click(function () {
        if (window.File && window.FileReader && window.FileList && window.Blob) {
            //console.log("consigo ler");
            ControladorAmalia.toggleDialogoAbreDiagramaCasosUsoDisco();
        } else {
            alert("Não é possível abir ficheiros do disco com este browser, utilizar a última versão do firefox(por exemplo) ");
            console.log("Estou lixado");
        }
    });



    //Cancelar a abertura do ficheiro
    $("#btnCancelaAbrirCasosDisco").click(function () {
        ControladorAmalia.toggleDialogoAbreDiagramaCasosUsoDisco();
    });
    //Cancelar a Gravação

    $("#btnCancelaGravarDiagrama").click(function () {
        ControladorAmalia.toogleDialogoGravarDiagrama("");
    });
    // Voltar ao inicío
    $("#btnVoltarInicio").click(function () {
        window.location.href = "stage.html";
    });

    //Gravar o diagrama
    $("#btnGravarDiagrama").click(function () {
        ControladorAmalia.gravarDiagramaNoBrowser(graph);
    });

    //RNPS
    //botão para gravar o projecto
    $("#btnGravarProjeto").click(function () {
        ControladorAmalia.diagramaCasoUsoParaJSON(graph);
        ControladorAmalia.diagramaClassesParaJSON(graph2);
        ControladorAmalia.createUseCaseBundle(diagramaCU, listaCasos, listaAtores);
        ControladorAmalia.createClassesBundle(diagramaCL, listaClasses, listaInterfaces, listaAbstracts);
        ControladorAmalia.gravarProjectoNoBrowser();

    });

    //RNPS
    //Save the diagram
    $("#btnGravarDiagramaAuto").click(function () {
        ControladorAmalia.gravarDiagramaNoBrowser(graph);
    });


    //Experiência repor
    $("#btnRestaurarCasosUso").click(function () {
        ControladorAmalia.toogleDialogoAbreDiagrama("diagramaCasosUso");
    });

    //btnCancelaAbrirDiagrama
    $("#btnCancelaAbrirDiagrama").click(function () {
        ControladorAmalia.toogleDialogoAbreDiagrama("");
    });

    //btnAbrirDiagrama ---- Abrir o Diagrama
    $("#btnAbrirDiagrama").click(function () {
        ControladorAmalia.abirDiagrama(graph);
    });
    //FIXME - Esta função pertencia à barra de menus inícial e não está a ser utilizada
    // Botão Apagrar diagrama
    $("#btnApagarDiagrama").click(function () {
        graph.clear();
        iniciarDiagramaCasosUso(graph);
    });



    //****************************************
    //**          Exportar para xml         **
    //**     Não é necessário para gravar   **
    //** mas pode ser útil para outra coisa **
    //****************************************
    $("#btnExportarDiagramaCasosParaXML").click(function () {

        var xml = ControladorAmalia.diagramaToXML();
        console.log(xml);
        ControladorAmalia.toogleDialogoMostarXMLCasos(xml);

    });

    //***********************************************************
    //** Simplificar o Interface quando a trabalhar no modelo  **
    //***********************************************************
    $("#modelo").mouseenter(function () {
        $("#controlCasosUso").slideUp(200);
    });
    $("header").mouseenter(function () {
        $("#controlCasosUso").slideDown(200);
    });



    //Função para ler ficheiros exp obtida de http://www.htmlgoodies.com/beyond/javascript/read-text-files-using-the-javascript-filereader.html#fbid=nRJ-e_eoFaY
    function readSingleFile(evt) {
        //Retrieve the first (and only!) File from the FileList object
        var f = evt.target.files[0];

        if (f) {
            var r = new FileReader();
            r.onload = function (e) {
                var diagrama = e.target.result;
                //console.log(diagrama);
                console.log((f.name).split(".").pop());

                //só consigo saber se o conteúdo é de um diagrama ou qualquer coisa feita com o joint.js
                //eventualmente colocar no início do ficheiro um id qq
                if ((f.name).split(".").pop() == "dcu") {
                    if (diagrama.substr(0, diagrama.indexOf(":")) == '{"cells"') {
                        //console.log("é um ficheiro com um modelo");
                        graph.clear();
                        graph.fromJSON(JSON.parse(diagrama));
                        ControladorAmalia.toggleDialogoAbreDiagramaCasosUsoDisco();
                    } else {
                        alert("Ficheiro inválido");
                        ControladorAmalia.toggleDialogoAbreDiagramaCasosUsoDisco();
                    }
                } else {
                    //console.log("Ficheiro inválido");
                    alert("Ficheiro inválido");
                    ControladorAmalia.toggleDialogoAbreDiagramaCasosUsoDisco();
                }
                //console.log(  "conteudo: " + contents.substr(0,contents.indexOf(":")));
            };
            r.readAsText(f);
        } else {
            alert("Não foi possível abir o ficheiro");
        }
    }

    //window.onbeforeunload = confirmExit;


});
window.setInterval(actualizaArvoreUC,1000);
window.setInterval(ControladorAmalia.ActualizaVariaveis,1000);


