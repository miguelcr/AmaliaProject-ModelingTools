$(document).ready(function(){




    //ControladorAmalia.supportsLocalStorage();
    actualizaFicheiros();
	ControladorAmalia.ApplyCookie();
	ControladorAmalia.VerificaTutorial1st();

    //botoes provisórios do stage
    $("#btnCreateProject").click(function(){
        ControladorAmalia.toogleDialogoCriaProjecto();
    });

	//botao para cancelar
    $("#btnCancelarCriarProjecto").click(function(){
        ControladorAmalia.toogleDialogoCriaProjecto();
    });

	//botao para criar projeto
    $("#CriaProjecto").submit(function(e){
        var nomeProjecto ="Projecto";
        if($("#nomeProjecto").val()){
            nomeProjecto = $("#nomeProjecto").val();
        }
        ControladorAmalia.CriaProject(nomeProjecto);
        ControladorAmalia.toogleDialogoCriaProjecto();
        projetoNome = nomeProjecto;
        ControladorAmalia.ActualizaVariaveis();
        window.location.href = "stage.html";
        e.preventDefault();
    });

    //DMMLG
    //botão para cancelar ao abrir projecto do browser
    $("#btnCancelarAbrirProjecto").click(function(){
        ControladorAmalia.toogleDialogoAbreProjeto("");
    });

    //RNPS
    //ligação com a cx de diálogo de abertura de projeto
    $("#btnOpenProjectFromBrowser").click(function(){
        ControladorAmalia.toogleDialogoAbreProjeto("proj_");
    });

	//RNPS
	//ligação com a cx de diálogo de exportar o projeto
	$("#btnExportProject").click(function(){
		ControladorAmalia.toogleDialogoAbreProjetoParaExportar("proj_");
	});

	//RNPS
	//botão cancelar do dialogo de exportar projecto


	//RNPS
	//ligação com a cx de diálogo de eliminar o projecto
	$("#btnApagarProjecto").click(function(){
		ControladorAmalia.toogleDialogoAbreProjetoParaEliminar("proj_");
	});

	//RNPS
	//botão cancelar da cx de dialogo de eliminar projecto
	$("#btnCancelarEliminarProjecto").click(function(){
		ControladorAmalia.toogleDialogoAbreProjetoParaEliminar("");
	});

	//RNPS
	//botão eliminar da cx de dialogo de eliminar projecto
	$("#btnEliminarProjecto").click(function(){
		var nome = $("#projetosDisponiveisParaEliminar option:selected").val();
		try{
			localStorage.removeItem(nome);
			alert("Project deleted!");
		} catch (err){
			alert("Error - Please try again!");
			}

            actualizaFicheiros();
    ControladorAmalia.toogleDialogoAbreProjetoParaEliminar("");

	});

    //DMMLG
    //btnAbrir Projecto
    $("#btnAbrirProjecto").click(function(){
        ControladorAmalia.abrirProjeto();
        window.location.href = "stage.html";
    });

    //DMMLG
    //botao para abrir projecto do ficheiro
    $("#btnOpenProjectFile").click(function(){
       if (window.File && window.FileReader && window.FileList && window.Blob)   {
        ControladorAmalia.toggleDialogoAbreProjectoDisco();
       }
    });

	//RNPS
	//botão cancel do dialogo abrir projecto do ficheiro
	$("#btnCancelaAbrirCasosDisco").click(function(){
		ControladorAmalia.toggleDialogoAbreProjectoDisco();
	});

	//botao cancelar exportar projeto
    $("#btnCancelarExportarProjecto").click(function () {
        ControladorAmalia.toogleDialogo("#dialogoExportProjet",false);
    });

	//botao exportar projeto
    $("#btnExportarProjecto").click(function () {
		ControladorAmalia.abrirProjetoParaExportar();
    });

    $("#btnBack").click(function(){    ControladorAmalia.toogleDialogo("#dialogoPrimeiraUtilizacao",false);
    });
    $("#btnPlay").click(function(){
    ControladorAmalia.toogleDialogo("#dialogoPrimeiraUtilizacao",false);
    });

    //Função para ler ficheiros exp obtida de http://www.htmlgoodies.com/beyond/javascript/read-text-files-using-the-javascript-filereader.html#fbid=nRJ-e_eoFaY
function readSingleFile(evt) {
  //Retrieve the first (and only!) File from the FileList object
  var f = evt.target.files[0];

  if (f) {
    var r = new FileReader();
    r.onload = function(e) {
      var diagrama = e.target.result;
      //console.log(diagrama);
      console.log((f.name).split(".").pop());

      //só consigo saber se o conteúdo é de um diagrama ou qualquer coisa feita com o joint.js
      //eventualmente colocar no início do ficheiro um id qq
      if ((f.name).split(".").pop() == "proj") {
          var projetoS =JSON && JSON.parse(diagrama) || $.parseJSON(diagrama);
        projetoNome=projetoS.proj;
        UCBundle= projetoS.CasosUso;
        CLBundle= projetoS.Classe;
        graph.fromJSON(UCBundle.diagCU);
        listaCasos= UCBundle.listaCU;
        listaAtores=UCBundle.listaAtores;
        graph2.fromJSON(CLBundle.diagCL);
        listaClasses=CLBundle.listaCL;
        listaInterfaces=CLBundle.listaIT;
        listaAbstracts=CLBundle.listaABS;
        ControladorAmalia.ActualizaVariaveis();
        window.location.href = "stage.html";
          ControladorAmalia.toggleDialogoAbreProjectoDisco();
      } else {
        alert("Ficheiro inválido");
        ControladorAmalia.toggleDialogoAbreProjectoDisco();
      }
    };
    r.readAsText(f);
  } else {
    alert("Não foi possível abir o ficheiro");
  }
}
    document.getElementById('ficheiroProjecto').addEventListener('change', readSingleFile, false);
});


//funcao para atualizar a lista de projetos recentes
function actualizaFicheiros(){
    if(document.getElementById('z01').firstChild){
        document.getElementById('z01').removeChild(document.getElementById('z01').firstChild);}
    if(document.getElementById('z02').firstChild){
        document.getElementById('z02').removeChild(document.getElementById('z02').firstChild);}
    if(document.getElementById('z03').firstChild){
        document.getElementById('z03').removeChild(document.getElementById('z03').firstChild);}
    if(document.getElementById('z04').firstChild){
        document.getElementById('z04').removeChild(document.getElementById('z04').firstChild);}
    if(document.getElementById('z05').firstChild){
        document.getElementById('z05').removeChild(document.getElementById('z05').firstChild);}
    if(document.getElementById('z06').firstChild){
        document.getElementById('z06').removeChild(document.getElementById('z06').firstChild);}
    if(document.getElementById('i01').firstChild){
        document.getElementById('i01').removeChild(document.getElementById('i01').firstChild);}
    if(document.getElementById('i02').firstChild){
        document.getElementById('i02').removeChild(document.getElementById('i02').firstChild);}
    if(document.getElementById('i03').firstChild){
        document.getElementById('i03').removeChild(document.getElementById('i03').firstChild);}
    if(document.getElementById('i04').firstChild){
        document.getElementById('i04').removeChild(document.getElementById('i04').firstChild);}
    if(document.getElementById('i05').firstChild){
        document.getElementById('i05').removeChild(document.getElementById('i05').firstChild);}
    if(document.getElementById('i06').firstChild){
        document.getElementById('i06').removeChild(document.getElementById('i06').firstChild);}
    var proj ="proj_";
    var opt=[];
    var nome1 =[];
        for(var i = 0; i < localStorage.length; i++){
            var nome = localStorage.key(i);
            console.log(nome.substring(0,proj.length));
            if(nome.substring(0,proj.length) == proj){
                opt.push(nome);
                console.log(opt);
            }
        }
        if(opt.length>5){
            for(var j=0; j<5;j++){
                var name = opt[j].slice(5,opt[j].length);
                var p = document.createElement("P");
                var text = document.createTextNode(name);
                var idi="#i0"+(j+1)+"";
                var idZ="#z0"+(j+1)+"";
                var idia="p0"+(j+1);
                p.setAttribute("id", idia);
                p.appendChild(text);
                p.addEventListener("click",function(){ControladorAmalia.abreProjecto2($opt[j])});
                $(idZ).append(p);
                var htmli="<p>"+(j+1)+"</p>";
                $(idi).append(htmli);
            }
            }
        else{
            for(var j=0; j<opt.length;j++){
                var name = opt[j].slice(5,opt[j].length);
                var p = document.createElement("P");
                var text = document.createTextNode(name);
                var idi="#i0"+(j+1)+"";
                var idZ="#z0"+(j+1)+"";
                var idia="p0"+(j+1);
                nome1.push(opt[j]);
                p.appendChild(text);
                p.setAttribute("id", idia);
                console.log(opt[j]);
                console.log(nome);
//                p.addEventListener("click",function(){ControladorAmalia.abreProjecto2(nome)});
                $(idZ).append(p);
                var htmli="<p>"+(j+1)+"</p>";
                 $(idi).append(htmli);
            }
        }

    if(document.getElementById('p01')){ document.getElementById('p01').addEventListener('click',function(){ ControladorAmalia.abreProjecto2(nome1[0])});}
    if(document.getElementById('p02')){
document.getElementById('p02').addEventListener('click',function(){ ControladorAmalia.abreProjecto2(nome1[1])});}
    if(document.getElementById('p03')){
    document.getElementById('p03').addEventListener('click',function(){ ControladorAmalia.abreProjecto2(nome1[2])});}
    if(document.getElementById('p04')){
    document.getElementById('p04').addEventListener('click',function(){ ControladorAmalia.abreProjecto2(nome1[3])});}
    if(document.getElementById('p05')){
 document.getElementById('p05').addEventListener('click',function(){ ControladorAmalia.abreProjecto2(nome1[4])});}
    if(document.getElementById('p06')){
   document.getElementById('p06').addEventListener('onclick',function(){ ControladorAmalia.abreProjecto2(nome1[6])});
    }
};

