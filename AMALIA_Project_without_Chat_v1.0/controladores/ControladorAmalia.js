/**
 * @author jorge et al.
 */

//Criacao das variaveis de projeto
var projetoNome; //nome - designacao do projeto
//DMMLG
// Classe Caso de uso
function criaCaso(id,nome, operacao,tipo, entity, masterent){
    this.id_caso = id,
    this.nome_caso = nome,
    this.operacao_caso = operacao,
    this.tipo_caso= tipo,
    this.entity_caso=entity,
    this.masterent = masterent;
    };
function criaActor(id,nome){
    this.name = nome;
    this.id = id;
};

var listaCasos=[];    //array com lista de nomes de casos de uso
var listaAtores=[];   //array com lista de nomes de atores
var graph = new joint.dia.Graph;    //diagrama de casos de uso
var UCBundle;   // conjunto de elementos que constituem o IDE casos de uso
var casoUso;
var classesDIAG;
var listaClasses = []; //array com lista de classes
var listaInterfaces = [] //array com lista de interfaces
var listaAbstracts = [] //arraycom lista de abstracts
var graph2 = new joint.dia.Graph;   //diagrama de classes
var CLBundle;   // conjunto de elementos que constituem o IDE de classes
var nome;
var language="languages/english.xml";



ControladorAmalia ={

	VerificaTutorial1st: function(){
		if(ControladorAmalia.GetCookie("tutorial") == ""){
			console.log("VAMOS VER O TUTORIAL");
			ControladorAmalia.toogleDialogo("#dialogoPrimeiraUtilizacao", false);
			ControladorAmalia.SetCookieForever("tutorial","watched");
		}
	},

    SetCookie: function(cname, cvalue){
			 var d = new Date();
			 d.setTime(d.getTime() + (30*24*60*60*1000));
			 var expires = "expires=" + d.toUTCString();
		    var cPlace = "path=/";
			 document.cookie = cname + "=" + cvalue + "; " + expires + "; " + cPlace;
			 console.log(cname + " " + cvalue + " " + cPlace);
			 console.log("Cookie Set - OK! para " + cvalue);
	  },

	SetCookieForever:function(cname, cvalue){
		 var cPlace = "path=/";
		 document.cookie = cname + "=" + cvalue + "; " + cPlace;
		 console.log(cname + " " + cvalue + " " + cPlace);
		 console.log("Cookie Set - OK! para " + cvalue);
	},

    GetCookie: function (cname) {
			var name = cname + "=";
		  //console.log("NOME DO COOKIE:"+name);
		  var ca = "";
			var ca = document.cookie.split(';');
		  //console.log("ca = " + ca);
			for(var i=0; i<ca.length; i++) {
				 var c = ca[i];
				 while (c.charAt(0)==' ') c = c.substring(1);
				 if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
			}
			return "";
	  },

    ApplyCookie: function (){
			var lang = ControladorAmalia.GetCookie("lang");
			 //console.log(lang);
			 if(lang == ""){
					//console.log("NÂO ESTÀ DEFINIDO O COOKIE");
					ControladorAmalia.MudaParaEN();
					ControladorAmalia.SetCookie("lang", "en");
			 } else {
				  if(ControladorAmalia.GetCookie("lang") == "pt"){
						 ControladorAmalia.MudaParaPT();
						 ControladorAmalia.SetCookie("lang", "pt");
						 //console.log("mudou para PT");
				  } else {
						 ControladorAmalia.MudaParaEN();
						 ControladorAmalia.SetCookie("lang", "en");
						 //console.log("mudou para EN");
				  }
			 }
	  },

	MudaParaEN: function(){
		$.ajax({
                url: language,
                success: function (xml) {
                    $(xml).find('text').each(function () {
                        var id = $(this).attr('id');
                        var text = $(this).text();
                        $("#" + id).html(text);
                    });
                    $(xml).find('input').each(function () {
                        var id = $(this).attr('id');
                        var text = $(this).text();
                        $("#" + id).prop('placeholder',text);
                    });
                    $(xml).find('button').each(function () {
                        var id = $(this).attr('id');
                        var text = $(this).find('value').text();
                        var title= $(this).find('title').text()
                        $("#" + id).prop('value', text);
                        $("#" + id).prop('title', title);
                    });
                     $(xml).find('graph').each(function () {
                        var id = $(this).attr('id');
                        var text = $(this).find('alt').text();
                        var title= $(this).find('title').text()
                        $("#" + id).prop('alt', text);
                        $("#" + id).prop('title', title);
                    });
                }
            });
	},

	MudaParaPT: function(){
		$.ajax({
                url: 'languages/portugues.xml',
                success: function (xml) {
                    $(xml).find('text').each(function () {
                        var id = $(this).attr('id');
                        var text = $(this).text();
                        $("#" + id).html(text);
                    });
                    $(xml).find('input').each(function () {
                        var id = $(this).attr('id');
                        var text = $(this).text();
                        $("#" + id).prop('placeholder',text);
                    });
                    $(xml).find('button').each(function () {
                        var id = $(this).attr('id');
                        var text = $(this).find('value').text();
                        //console.log(text);
                        var title= $(this).find('title').text()
                        $("#" + id).prop('value', text);
                        $("#" + id).prop('title', title);
                    });
                     $(xml).find('graph').each(function () {
                        var id = $(this).attr('id');
                        var text = $(this).find('alt').text();
                        var title= $(this).find('title').text()
                        $("#" + id).prop('alt', text);
                        $("#" + id).prop('title', title);
                    });
                }
            });
	},



    //DMMLG
    //Atualiza a informação nas variaveis em memoria do browser
    ActualizaVariaveis: function(){
        localStorage.setItem("classes", JSON.stringify(listaClasses));
        localStorage.setItem("abstract", JSON.stringify(listaAbstracts));
        localStorage.setItem("interface",JSON.stringify(listaInterfaces));
        localStorage.setItem("graph",JSON.stringify(graph));
        localStorage.setItem("graph2",JSON.stringify(graph2));
        localStorage.setItem("actores",JSON.stringify(listaAtores));
        localStorage.setItem("casos",JSON.stringify(listaCasos));
        localStorage.setItem("projectname", projetoNome);
    },

    //DMMLG
    //Le valores do localStorage
    ReadVariaveis : function(){
            projetoNome = localStorage.getItem("projectname");
            listaCasos = JSON.parse(localStorage.getItem("casos"));
            listaAtores = JSON.parse(localStorage.getItem("actores"));
            classesDIAG = JSON.parse(localStorage.getItem("graph2"));
            graph2.fromJSON(classesDIAG);
            casoUso = JSON.parse(localStorage.getItem("graph"));
            graph.fromJSON(casoUso);
            listaInterfaces = JSON.parse(localStorage.getItem("interface"));
            listaAbstracts = JSON.parse(localStorage.getItem("abstract"));
            listaClasses = JSON.parse(localStorage.getItem("classes"));

    },

	//funcao fechar projeto e remover itens do Local Storage
    FechaProjecto : function(){
            localStorage.removeItem("projectname");
            localStorage.removeItem("casos");
            localStorage.removeItem("actores");
            localStorage.removeItem("graph2");
            localStorage.removeItem("graph");
            localStorage.removeItem("interface");
            localStorage.removeItem("abstract");
            localStorage.removeItem("classes");
    },


	// Aparecer desaparecer dialogos para mudar os atributos dos elementos do diagrama.

	toogleDialogo: function (dialogoNome, focus){

		if ($(dialogoNome).css("display") == "block"){
			$(dialogoNome).css("display","none");
		}else{
			$(dialogoNome).css("display","block");
			if(focus){
				$(focus).focus();
			}
		}
	},

	//funcao para verificacao do browser se suporta Local Storage
    supportsLocalStorage: function () {
        try {
        return 'localStorage' in window && window['localStorage'] !== null;
        }     catch (e) {
        return false;
	  }
	},

	// Provavelmente desnecessario
	toogleDialogoSemFocus:function(dialogoNome){
		if ($(dialogoNome).css("display") == "block"){
			$(dialogoNome).css("display","none");
		}else{
			$(dialogoNome).css("display","block");
		}
	},
	// aparecer dialogo para criar projecto
    toogleDialogoCriaProjecto:function(){
    ControladorAmalia.toogleDialogo("#dialogoCriaProjecto", "#nomeProjecto");
    this.ActualizaVariaveis();

    },

	//aparecer dialogo para alterar o nome do ator
	toogleDialogoAtor: function (actorId){

		$("#idActor").val(actorId);
		$("#nomeActor").val(""); // ir buscar o nome atual ao modelo

		ControladorAmalia.toogleDialogo("#dialogo_actor","#nomeActor");

	},

    //aparecer caixa de dialogo do caso de uso
	toogleDialogoCasoUso: function(caso){
		if (caso){
			var elementoCaso = caso.toJSON();
            var existe = false;
			var nomeCaso = elementoCaso.attrs.text.text;
            	//console.log(nomeCaso);
			//clear all checkboxes
			$("#idlcrud1").prop('checked', false);
			$("#idlcrud2").prop('checked', false);
			$("#idlcrud3").prop('checked', false);
			$("#idlcrud4").prop('checked', false);
			$("#idlcrud5").prop('checked', false);
            var id = caso.id;
            for(var i = 0; i < listaCasos.length; i++){
                if(id == listaCasos[i].id_caso){
				 // if the use case is not new
				 for(var j = 0; j < listaCasos[i].operacao_caso.length; j++){
					 //if LCRUD is set, it will check the corresponding checkboxes
					 if(listaCasos[i].operacao_caso[j] == 'l'){
						 $("#idlcrud1").prop('checked', true);
					 }
					 if(listaCasos[i].operacao_caso[j] == 'c'){
						 $("#idlcrud2").prop('checked', true);
					 }
					 if(listaCasos[i].operacao_caso[j] == 'r'){
						 $("#idlcrud3").prop('checked', true);
					 }
					 if(listaCasos[i].operacao_caso[j] == 'u'){
						 $("#idlcrud4").prop('checked', true);
					 }
					 if(listaCasos[i].operacao_caso[j] == 'd'){
						 $("#idlcrud5").prop('checked', true);
					 }
                 }

                    $("#listaEntidades").val(listaCasos[i].entity_caso);
                    $("#listaEntidadesMaster").val(listaCasos[i].masterent);
                    existe=true;
                }
                }
            if(!existe){
                $("#listaEntidades").val("");
                $("#listaEntidadesMaster").val("");
            }
			$("#idCaso").val(caso.id);
			$("#nomeCasoUso").val(nomeCaso);// Colocar o nome actual
		}
		ControladorAmalia.toogleDialogoMostraClasses();
		ControladorAmalia.toogleDialogo("#dialogo_casos_uso","#nomeCasoUso");

	},

	//dialogo para associar casos de uso
	toogleDialogoAssociaCasos: function(elementoCimaId, elementoBaixoId){

		if( elementoCimaId && elementoBaixoId){
			$("#elementoCimaId").val(elementoCimaId);
			$("#elementoBaixoId").val(elementoBaixoId);
		}else{
			$("#elementoCimaId").val("");
			$("#elementoBaixoId").val("");
		}

		ControladorAmalia.toogleDialogo("#dialogo_associa_casos",false);

	},

	//dialogo para alterar atributos de classes
	toogleDialogoAlteraClasses: function (classe){

		if (classe){
			var classeJSON = classe.toJSON();
            //console.log(classe);
			$("#idClasse").val(classeJSON.id);
			$("#nomeDaClasse").val(classeJSON.name);
			//atributos
			var atributos = classeJSON.attributes;
			for(i = 0 ; i < atributos.length ; i++){

                    $("#atributosClasse").append(ControladorAmalia.addAtributoMetodo("atributo",atributos[i]));

			}
			//metodos
			var metodos = classeJSON.methods;
			for(i = 0 ; i < metodos.length ; i++){
				$("#metodosClasse").append(ControladorAmalia.addAtributoMetodo("metodo",metodos[i]));
			}

		}else{
			$("#idClasse").val("");
			$("#nomeDaClasse").val("");

		}
        this.toogleDialogo("#dialogoAlteraClasse","#nomeDaClasse");
	},

	//dialogo para alterar atributos de classes
	toogleDialogoAlteraInterface: function (classe){

		if (classe){
			var classeJSON = classe.toJSON();
			$("#idInterface").val(classeJSON.id);
			$("#nomeDaInterface").val(classeJSON.name);
			//metodos
			var metodos = classeJSON.methods;
			for(i = 0 ; i < metodos.length ; i++){
				$("#metodosInterface").append(ControladorAmalia.addAtributoMetodo("metodo",metodos[i]));
			}

		}else{
			$("#idInterface").val("");
			$("#nomeDaInterface").val("");

		}

		ControladorAmalia.toogleDialogo("#dialogoAlteraInterface","#nomeDaInterface");


	},

	//dialogo para associar Classes
	toogleDialogoAssociaClasses: function(elementoCimaId,elementoBaixoId){

		if (elementoCimaId && elementoBaixoId){
			$("#elementoCimaId").val(elementoCimaId);
			$("#elementoBaixoId").val(elementoBaixoId);
			if ($("#ligarClasses option:selected").val() == "h"){
				$("#cardCima").hide();
				$("#cardBaixo").hide();
			}else{
				$("#cardCima").show();
				$("#cardBaixo").show();
			}
		}else{
			$("#elementoCimaId").val("");
			$("#elementoBaixoId").val("");
		}

		ControladorAmalia.toogleDialogo("#dialogoAssociaClasses", false);

	},

    //RNPS
    //Dialogo para mostrar os projeto disponiveis em memória
    toogleDialogoAbreProjeto:function(proj){
        $("#tipoDeProjetoAbrir").val(proj);
        $("#projetosDisponiveis").empty();

        for(var i = 0; i < localStorage.length; i++){
            var nome = localStorage.key(i);
            if(nome.substring(0,proj.length) == proj){
                var opt = $("<option>");
                opt.val(nome);
                opt.html(nome);
                $("#projetosDisponiveis").append(opt);
            }
        }
        this.toogleDialogo("#dialogoAbreProjeto", false);
    },

	//RNPS
    //Dialogo para mostrar os projeto disponiveis em memória para exportar
    toogleDialogoAbreProjetoParaExportar:function(proj){
        $("#tipoDeProjetoAbrir").val(proj);
        $("#projetosDisponiveisParaExportar").empty();

        for(var i = 0; i < localStorage.length; i++){
            var nome = localStorage.key(i);
            //console.log(nome.substring(0,proj.length));
            if(nome.substring(0,proj.length) == proj){
                var opt = $("<option>");
                opt.val(nome);
                //console.log(opt.val());
                opt.html(nome);
                $("#projetosDisponiveisParaExportar").append(opt);
                //console.log($("#projetosDisponiveisParaExportar"));
            }
        }
        this.toogleDialogo("#dialogoExportProjet", false);
    },

	//RNPS
	//Dialogo para mostrar os projectos disponíveis em memória para eliminar
	toogleDialogoAbreProjetoParaEliminar:function(proj){
        $("#tipoDeProjetoAbrir").val(proj);
        $("#projetosDisponiveisParaEliminar").empty();

        for(var i = 0; i < localStorage.length; i++){
            var nome = localStorage.key(i);
            if(nome.substring(0,proj.length) == proj){
                var opt = $("<option>");
                opt.val(nome);
                opt.html(nome);
                $("#projetosDisponiveisParaEliminar").append(opt);
            }
        }
        this.toogleDialogo("#dialogoEraseProjet", false);
    },

    //RNPS
    //funcao para mostrar as classes disponiveis na cx de dialogo de casos de uso
    toogleDialogoMostraClasses: function (){
        var todos = [];
        todos = listaClasses.concat(listaAbstracts,listaInterfaces);
        //console.log(todos);
        //console.log(todos.length);
	    $("#entityList").empty();
	    $("#masterEntityList").empty();
        var html = "";
        if(todos.length != 0){
            for(var i = 0; i < todos.length; i++){
             html += '<option value="' + todos[i] + '">';
            }
		   //console.log(html);
            $("#entityList").append(html);
            $("#masterEntityList").append(html);

        }
    },


    toggleDialogoAbreProjectoDisco:function(){
        this.toogleDialogo("#dialogoAbreProjectoDisco",false);
    },

	//funcao para chamar cx de dialogo para gravar o projeto
	toggleDialogoGravaDiaCasosDisco:function(focus){
		this.toogleDialogo("#dialogoGravaDiaCasosDisco",projetoNome);
	},
	//funcao para chamar cx de dialogo para fechar projeto
    toogleDialogoFechaProjecto : function(){
        this.toogleDialogo("#dialogoFechaProjecto",false);
    },

	//funcao para chamar cx de dialogo para fechar projeto
    toogleDialogoLimpaDiagrama : function(){
        this.toogleDialogo("#dialogoLimpaDiagrama",false);
    },


    //DMMLG
    //Função para criar e guardar as variaveis de um projecto
    CriaProject : function (projecto){
        projetoNome = projecto;
    },

	//>>>>>>>>>>>>>>>>>>>> Alterar atributos dos elementos dos diagramas
	setNomeActor : function (graph){

		//Não sei se isto é a melhor forma obriga a que o controlador conheça detalhes da vista
		var nomeActor = $("#nomeActor").val();
        if(nomeActor ==""){
        nomeActor
            ="Actor";
        }
		var idActor = $("#idActor").val();
			//definido nome para já alterar no gráfico
			//alterar modelo registando o nome
			var actor = graph.getCell(idActor);
            actor.attr({ text:{text:nomeActor} });
            var existe = false;
            var objectAtor = new criaActor(idActor,nomeActor);
            for(var i=0; i<listaAtores.length ; i++){
                //console.log(i);
                //console.log(listaAtores);
                if(listaAtores[i].id == idActor){
                    //console.log("entrou");
                    listaAtores[i] = objectAtor;
                    existe = true;
                    //console.log("entrou ca dentro");
                    //console.log(existe);
                    //console.log(listaAtores);
                }
            }
                if(!existe){
                    listaAtores.push(objectAtor);
                }
	},

    // função para remover o actor do paper
    removeActor : function(graph){
        var idActor = $("#idActor").val();
        if(idActor){
            for(var i=0;i<listaAtores.length;i++){
                if(listaAtores[i].id == idActor){
                 listaAtores.splice(i,1);
                }
            }
            graph.getCell(idActor).remove();

        }
    },
    //DMMLG
    // funçao que guarda a informação de um caso de uso no array listaCasos
	setNomeCaso : function (graph){
		var nomeCaso = $("#nomeCasoUso").val();//nome do caso de uso
		var idCaso =$("#idCaso").val(); //id do caso de uso
        var entity=$("#listaEntidades").val();// entidade associada
        var masterentity= $("#listaEntidadesMaster").val();// entidade master associada
        var operation= [];// array para guardar o tipo de operação que é o caso de uso
        
        // função para ver quais as funções que estão checked na checkbox no controlador
        $("input:checkbox[name=lcrud]:checked").each(function()
            {
                // inserir no array operation, as operações que aquele caso de uso efectua
                operation.push($(this).val());
            //console.log(operation);
            });
        //console.log(operation);
        
        // definido o nome do caso daqui chamar alterações ao modelo
		//registando novo nome e largura + altura
		if (nomeCaso && idCaso){
			// definido o nome do caso daqui chamar alterações ao modelo
			//registando novo nome e largura + altura
			var caso = graph.getCell(idCaso);
			caso.resize( nomeCaso.length * 8 + 40 , 50);
			caso.attr({text:{text:nomeCaso}});
            caso.name = nomeCaso;
            // variavel auxiliar para verificar se o caso de uso já existe no array
            var existe = false;
            //console.log(existe);
            // criar um novo caso de uso
            var casouso = new criaCaso(idCaso,nomeCaso,operation,null,entity,masterentity);
            //console.log(casouso);
            for(var i =0; i<listaCasos.length ; i++){
                // verifica se já existe no array o caso de uso a criar/alterar by ID
                if(listaCasos[i].id_caso == idCaso){
                    // altera a informação do caso de uso
                    listaCasos[i] = casouso;
                    // o caso de uso existe
                    existe = true;
                    //console.log("entrou ca dentro");
                    //console.log(existe);
                    //console.log(listaCasos);
                }
            }
                if(!existe){
                    listaCasos.push(casouso);
                }


        }
	},

	// funcao para remover caso de uso de array
    removeCasoUso : function(graph){
        var idCaso = $("#idCaso").val();
        if(idCaso){
        graph.getCell(idCaso).remove();
            for(var i =0; i<listaCasos.length ; i++){
                if(listaCasos[i].id_caso == idCaso){
                    listaCasos.splice(i,1);
                }
            }
        }},
        
	//Altera as características de uma classe
	setClasse : function(graph, atributos, metodos){
		//Obter o nome da classe
		var nomeClasse = $("#nomeDaClasse").val();
		// Obter o Id da classe
		var idClasse =$("#idClasse").val();
		//Definir a largura
		var largura = nomeClasse.length;
		//Descobrir qual a string mais comprida
		for (i = 0 ; i < atributos.length ; i++){
			var t = atributos[i].length;
			if(t > largura) {largura = t;}
		}
		for ( i = 0 ; i < metodos.length ; i++ ){
			var t = metodos[i].length;
			if ( t > largura ) { largura = t;}
		}
		//Calcular a largura
		var largura = largura * 8 + 40;
		//Calcular a altura
		var altura = ( 3 + atributos.length + metodos.length ) * 15;

		if(nomeClasse && idClasse){

			//A altura e a largura miníma é sempre de 100
			if( altura < 100 ) {altura = 100;}
			if (largura < 100){ largura = 100;}

			//obter o elemento
			var classe = graph.getCell(idClasse);
            if(classe.attributes.type == "uml.Class"){
            removefrom(listaClasses,classe.attributes.name);
                listaClasses.push(nomeClasse);
            }
            else{
            removefrom(listaAbstracts,classe.attributes.name);
                listaAbstracts.push(nomeClasse);
            }

			//Alterar o tamanho para que caibam os elementos a adicionar
			classe.resize( largura, altura);
			//colocar os elementos a adicionar
			classe.set( { name:nomeClasse } );
			classe.set( { attributes:atributos } );
			classe.set( { methods:metodos } );
				//Modificar o xml
		}

	},

    // DMMLG
    // remove classe do graph
    removeClasse:function (graph){
     var idclasse = $("#idClasse").val();
        if(idclasse){
            if(graph.getCell(idclasse).attributes.type == "uml.Class"){
            removefrom(listaClasses,graph.getCell(idclasse).attributes.name);
            }
            else{
            removefrom(listaAbstracts,graph.getCell(idclasse).attributes.name);
            }
            graph.getCell(idclasse).remove();

        }
    },
	//Altera as características de uma interface
	setInterface : function(graph, metodosInt){
		//Obter o nome da classe
		var nomeInterface = $("#nomeDaInterface").val();
		// Obter o Id da classe
		var idInterface =$("#idInterface").val();
		//Definir a largura
		var largura = nomeInterface.length;
		//Descobrir qual a string mais comprida
		for ( i = 0 ; i < metodosInt.length ; i++ ){
			var t = metodosInt[i].length;
			if ( t > largura ) { largura = t;}
		}
		//Calcular a largura
		var largura = largura * 8 + 40;
		//Calcular a altura
		var altura = ( 3 + metodosInt.length ) * 15;

		if(nomeInterface && idInterface){

			//A altura e a largura miníma é sempre de 100
			if( altura < 100 ) {altura = 100;}
			if (largura < 100){ largura = 100;}

			//obter o elemento
			var elinterface = graph.getCell(idInterface);
            removefrom(listaInterfaces,elinterface.attributes.name);
			//Alterar o tamanho para que caibam os elementos a adicionar
			elinterface.resize( largura, altura);
			//colocar os elementos a adicionar
			elinterface.set( { name:nomeInterface } );
		//	elinterface.set( { attributes:atributos } );
			elinterface.set( { methods:metodosInt } );
				//Modificar o xml
		}
        listaInterfaces.push(nomeInterface);

	},

    //DMMLG
    // funcao que remove a interface do graph
	removeInterface:function (graph){
     var idInterface = $("#idInterface").val();
        if(idInterface){
            removefrom(listaInterfaces,graph.getCell(idInterface).attributes.name);
            graph.getCell(idInterface).remove();
        }
    },
	//Estabelecer ligações
	//AssociarCasos
	associaCasos : function (graph){
		var elementoCimaId = $("#elementoCimaId").val();
		var elementoBaixoId = $("#elementoBaixoId").val();
		var ligaCasos = $('input[name="ligaCasos"]:checked').val();
		if (elementoCimaId && elementoBaixoId && ligaCasos){
			if(ligaCasos == "include"){
				var liga = Amalia.liga.getGrafLigaInclude(elementoCimaId,elementoBaixoId);
				//registar a ligação no modelo e a posição final
				//entre que elementos e de que tipo
			}else if (ligaCasos == "extends"){
				var liga = Amalia.liga.getGrafLigaExtend(elementoCimaId,elementoBaixoId);
				//registar a ligação no modelo
				//entre que elementos e de que tipo
			}else{
				var liga = false;
			}
			if (liga){
				graph.addCell(liga);
				(graph.getCell(elementoCimaId)).translate(150,150);


			}
		}

	},
	//Associar Actor a Caso
	associaActorAoCaso: function (graph, elementoCimaId, elementoBaixoId){
		var liga = Amalia.liga.getGrafLigaAssocia(elementoCimaId,elementoBaixoId);
		//registar a ligação no modelo
		//entre que elementos e de que tipo
		// o elemento de Cima é sempre um caso de uso
		graph.addCell(liga);
		(graph.getCell(elementoCimaId)).translate(150,0);
	},
	//especialização de Actor ou classes quando o elemento de baixo é classe abstrata
	associaHeranca: function (graph, elementoCimaId, elementoBaixoId){
		var liga = Amalia.liga.getGrafLigaHeranca(elementoCimaId,elementoBaixoId);
		//registar a ligação no modelo
		//entre que elementos e de que tipo
		graph.addCell(liga);
		(graph.getCell(elementoCimaId)).translate(0,150);
	},
	//ligações entre classes
	associaClasses: function(graph){
		var elementoCimaId = $("#elementoCimaId").val();
		var elementoBaixoId = $("#elementoBaixoId").val();
		var ligaClasses = $('#ligarClasses option:selected').val();
		var cardCima =$('#cardCima option:selected').val();
		var cardBaixo = $('#cardBaixo option:selected').val();
		if (elementoCimaId && elementoBaixoId && ligaClasses){
			switch (ligaClasses){
				case "h":
					var liga = Amalia.liga.getGrafLigaHeranca(elementoCimaId,elementoBaixoId);
					break;
				case "c":
					var liga = Amalia.liga.getGrafLigaComposicaoComCardinalidade(elementoCimaId,elementoBaixoId,cardCima,cardBaixo);
					break;
				case "a":
					var liga = Amalia.liga.getGrafLigaAgregacaoComCardinalidade(elementoCimaId,elementoBaixoId,cardCima,cardBaixo);
					break;
				case "s":
					var liga = Amalia.liga.getGrafLigaAssociaAmaliaComCardinalidade(elementoCimaId,elementoBaixoId,cardCima,cardBaixo);
					break;
				default:
					var liga = false;
				break;
			}

			if (liga){
				// este bloco de código está por todo o lado secalha deveria estar isolado
				graph.addCell(liga);
				(graph.getCell(elementoCimaId)).translate(0,150);
			}
		}
	},
	//associa classes concretas ou abstratas a interfaces
	associaImplementa: function (graph,elementoCima,elementoBaixo){
		var liga = Amalia.liga.getGrafLigaImplementacao(elementoCima.id,elementoBaixo.id);
		if (liga){
			graph.addCell(liga);
			elementoCima.translate(0,150);
		}

	},
	//*************************************************
	//** Reposiciona elementos para que fiquem dentro
	//** do paper
	//*************************************************
	elementoConfinadoAoPaper: function(minWidth, minHeight, maxWidth, maxHeight,elemento){

		var acertoAOlhoPorcento = 130; // Uma correção por tentativa e erro para atinar com a margem do canvas
		var zonaDiagrama = g.rect(minWidth+1, minHeight+1, maxWidth-acertoAOlhoPorcento, maxHeight-1);

		//If selected object isn't of Association type following coditions must be verified. BUG#1 FIXED!
		if(!elemento instanceof joint.shapes.uml.Association){
		var bBoxElemento = elemento.getBBox();


		if(!zonaDiagrama.containsPoint(bBoxElemento.origin())){

			elemento.position(zonaDiagrama.pointNearestToPoint(bBoxElemento.origin()).x, zonaDiagrama.pointNearestToPoint(bBoxElemento.origin()).y);
		}

		if(!zonaDiagrama.containsPoint(bBoxElemento.bottomLeft())){

			if(elemento.toJSON().size){
				elemento.position(zonaDiagrama.pointNearestToPoint(bBoxElemento.bottomLeft()).x ,
								 zonaDiagrama.pointNearestToPoint(bBoxElemento.bottomLeft()).y - elemento.toJSON().size.height );
			}

		}

		if (!zonaDiagrama.containsPoint(bBoxElemento.topRight())){

			if(elemento.toJSON().size){
				elemento.position(zonaDiagrama.pointNearestToPoint(bBoxElemento.topRight()).x -  elemento.toJSON().size.width,
								 zonaDiagrama.pointNearestToPoint(bBoxElemento.topRight()).y );
			}
		}

		if (!zonaDiagrama.containsPoint(bBoxElemento.corner())){
			elemento.position(zonaDiagrama.pointNearestToPoint(bBoxElemento.corner()).x - elemento.toJSON().size.width,
							zonaDiagrama.pointNearestToPoint(bBoxElemento.corner()).y - elemento.toJSON().size.height);
		}
		}
	},


	//*************************************************
	//** Produção de xml
	//*************************************************
	diagramaToXML: function (){

		//elementos e ligações do diagrama
		var elementoscasos = graph.getElements();
		var ligacoescasos = graph.getLinks();
        var elementosclasses = graph2.getElements();
        var ligacoesclasses = graph2.getLinks();

		var xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
		//processamento
        xml +='<project version="AMALIA_MOBILE_0.1">\n';
        xml +='\t<name>'+projetoNome +'</name>\n';
        
        //Use Cases com distinção entre diagramas existentes e não existentes
        
        if (elementoscasos.length == 0){
        	xml +='\t<use_case_diagram empty="true">\n';
        	xml +='\t</use_case_diagram>\n';
        }else{
        
        	xml +='\t<use_case_diagram empty="false">\n';
			xml += ControladorAmalia._elementosToXML(graph,elementoscasos);
			xml += ControladorAmalia._ligacoesToXML3(graph,ligacoescasos);
        	xml +='\t</use_case_diagram>\n';
        }
        
        //Modelo de Domínio
        xml +='\t<domain_model>\n';
        xml += ControladorAmalia._elementosToXML(graph2,elementosclasses);
		xml += ControladorAmalia._ligacoesToXML3(graph2,ligacoesclasses);
        xml +='\t</domain_model>\n';
        xml +='</project>';
        var blob = new Blob([xml], {
            type: "text/plain;charset=utf-8"
        });
        var nome = projetoNome + ".xml";
        saveAs(blob, nome);
	},
	//função interna para obter o xml do elementos
	_elementosToXML: function (graph, elementos){

		var xml = "\t\t<elements>\n";
		for (i = 0 ; i < elementos.length ; i++){

				var el =graph.getCell(elementos[i].id).toJSON();

				//elementos da barra de ferramentas ignorar
				//if (el.position.x < 120){ continue;}
				// restantes elementos
				xml += '\t\t\t<element id="' + el.id + '">\n';
				var tipoElemento = (el.type).split(".")[0];
				if (tipoElemento == "uml"){
					xml += ControladorAmalia._classeToXML(el);
				}else if (tipoElemento == "basic"){
					xml += ControladorAmalia._casosAtoresToXML(el);
				}
				xml += "\t\t\t</element>\n";
			}
		xml += '\t\t</elements>\n';
		return xml;

	},
	//função interna para obter o xml de uma classe
	_classeToXML: function(el){
		var xml ="";
		if (el.type == "uml.Class"){
			xml += '\t\t\t\t<type>class</type>\n';
		}else if (el.type == "uml.Abstract"){
			xml += '\t\t\t\t<type>abstract class</type>\n';
		}else if (el.type == "uml.Interface"){
			xml += '\t\t\t\t<type>interface</type>\n';
		}
		xml += '\t\t\t\t<name>' + el.name + "</name>\n";
		
		//Changed tag name from <atributes> and <atribute> to <attributes> and <attribute>
		if (el.attributes){
            if((el.attributes).length !=0){
			xml += "\t\t\t\t<attributes>\n";
			for (j = 0 ; j < (el.attributes).length ; j++){
				//xml += "\t\t\t\t\t<attribute>" + el.attributes[j] + "</attribute>\n";
				xml += ControladorAmalia._getAttributeTag ( el.attributes[j] );
			}
			xml += "\t\t\t\t</attributes>\n";
            }
		}
		if (el.methods){
            if((el.methods).length !=0){
			xml +="\t\t\t\t<methods>\n";
			for (j = 0 ; j < (el.methods).length ; j++){
				xml += "\t\t\t\t\t<method>" + el.methods[j] + "</method>\n";
			}
			xml +="\t\t\t\t</methods>\n";
            }
		}
		return xml;
	},
	//função interna para obter o xml de atores e casos de uso
	_casosAtoresToXML: function (el){
		var xml = "";
		if (el.type == "basic.Actor"){
			xml += '\t\t\t\t<type>actor</type>\n';
			if( el.attrs.text){
				xml += '\t\t\t\t<name>'+el.attrs.text.text+'</name>\n';
			}
		}else if (el.type == "basic.Circle"){
			xml += '\t\t\t\t<type>use case</type>\n';
			if( el.attrs.text){
				xml += '\t\t\t\t<name>'+el.attrs.text.text+'</name>\n';
                for(var a=0; a<listaCasos.length; a++){
                    if(listaCasos[a].id_caso == el.id){
                        if(listaCasos[a].operacao_caso.length!=0){
                        xml += '\t\t\t\t<operations>\n';
                        
                        //Acho que está aqui o problema com o aparecer de uma operação a mais <= passa para < para deixar de colocar 
                        //operação extra vazia que aparecia sempre que se assinalava uma checkbox BUG # <operation></operation>
                        
                        
                        for(var j=0;j < listaCasos[a].operacao_caso.length; j++){
                        xml +='\t\t\t\t\t<operation>';
                        if(listaCasos[a].operacao_caso[j] == 'l'){
                        xml += 'list';
                        }
                        if(listaCasos[a].operacao_caso[j] == 'c'){
                        xml += 'create';
                        }
                        if(listaCasos[a].operacao_caso[j] == 'r'){
                        xml += 'read';
                        }
                        if(listaCasos[a].operacao_caso[j] == 'u'){
                        xml += 'update';
                        }
                        if(listaCasos[a].operacao_caso[j] == 'd'){
                        xml += 'delete';
                        }
                        xml += '</operation>\n';
                        }
                        xml +='\t\t\t\t</operations>\n';
                        }
                                                if(listaCasos[a].entity_caso != ""){

                        xml +='\t\t\t\t<entity>'+listaCasos[a].entity_caso+'</entity>\n';
                                                }
                        if(listaCasos[a].masterent != ""){
                        xml +='\t\t\t\t<masterEntity>'+ listaCasos[a].masterent + '</masterEntity>\n';
                        }
                    }
                }
			}
		}
		return xml;
	},
	//função interna para obter o xml das ligações
	_ligacoesToXML3 : function( graph, ligacoes){
		var xml="\t\t<connections>\n";

		for (i = 0 ; i < ligacoes.length ; i++ ){

				var lig = graph.getCell( ligacoes[i].id).toJSON();
				xml +='\t\t\t<connection id="' + lig.id + '">\n';
				if (lig.type == "uml.Generalization"){
                    if(lig.labels){
                    	var labelZero = lig.labels[0].attrs.text.text;
						if (labelZero == " << include >> "){
							xml +='\t\t\t\t<type>include</type>\n';

						}else if (labelZero == " << extend >> "){
							xml +='\t\t\t\t<type>extend</type>\n';
						}
                }
                else{
					xml +='\t\t\t\t<type>inheritance</type>\n';
                }
				}else if (lig.type == "uml.Composition"){
					xml +='\t\t\t\t<type>composition</type>\n';
					
					//changed cadinalaty to cardinality BUG - erro na estrutura do XML que fazia com que tag abrisse mas não fechasse.
					//changed cardinalaty to cardinality - erro ortográfico
					
					
					xml +='\t\t\t\t<cardinality_destination>'+lig.labels[0].attrs.text.text+'</cardinality_destination>\n';
					xml +="\t\t\t\t<cardinality_source>"+lig.labels[1].attrs.text.text+"</cardinality_source>\n";
				}else if (lig.type == "uml.Aggregation"){
					xml +='\t\t\t\t<type>aggregation</type>\n';
					xml +='\t\t\t\t<cardinality_destination>'+lig.labels[0].attrs.text.text+'</cardinality_destination>\n';
					xml +="\t\t\t\t<cardinality_source>"+lig.labels[1].attrs.text.text+"</cardinality_source>\n";
				}else if(lig.type == "uml.Implementation"){
					xml +='\t\t\t\t<type>implementation</type>\n';
				}else if(lig.type == "uml.Association"){
					if (lig.labels){
							xml +='\t\t\t\t<type>association</type>\n';
							
							//mais caca a abertura e fecho não estavam ok
							
							xml +='\t\t\t\t<cardinality_destination>'+lig.labels[0].attrs.text.text+'</cardinality_destination>\n';
							xml +="\t\t\t\t<cardinality_source>"+lig.labels[1].attrs.text.text+"</cardinality_source>\n";
					}else{
						xml +='\t\t\t\t<type>association</type>\n';
					}
				}
				xml +='\t\t\t\t<source_id>' + lig.source.id+ '</source_id>\n';
				xml +='\t\t\t\t<destination_id>' + lig.target.id+ '</destination_id>\n';
				xml +='\t\t\t</connection>\n';
			}

		xml += "\t\t</connections>\n";
		return xml;
	},
	
    // internal function to generate <attribute> tags that use visibility and type information
    _getAttributeTag: function (attrString){
    	
    	var attrXML = "";
    	attrXML += "\t\t\t\t\t<attribute" + ControladorAmalia._getAttrVisibility( attrString );
    	attrXML += ControladorAmalia._getAttrType( attrString ) + ">";
    	attrXML += ControladorAmalia._getAttrName( attrString ) + "</attribute>\n";
    	return attrXML;
    	
    },
    //internal function to get attribute visibility
    _getAttrVisibility : function(attrString){
    	var vis = " visibility=";
    	
    	if (attrString.indexOf( "+" ) != -1){
    		return vis + "\"public\"";
    	}else if (attrString.indexOf( "-" ) != -1){
    		return vis + "\"private\"";
    	}else if ( attrString.indexOf( "#" ) != -1){
    		return vis + "\"protected\"";
    	}else{
    		// default value private
    		return vis + "\"private\"";
    	}
    	
    },
    //internal function to get attribute type
    _getAttrType: function ( attrString ){
    
    	var type = " type=";
    	if ( attrString.indexOf ( ":" ) == -1 ){
    		//default value String;
    		return type + "\"string\"";
    	}else{
    		var attrSubstrings = attrString.split( ":" );
    		return type + "\""+attrSubstrings[attrSubstrings.length - 1].trim()+"\"";
    	}
    },
    //internal function to get attribute name
    _getAttrName: function ( attrString ) {
    	var name = attrString.split ( ":" )[0];
    	
    	return name.replace(/\+|-|#/g,"").trim();
    },
    
    
    //RNPS-DMMLG
    //Gravar Projecto no Browser
    gravarProjectoNoBrowser: function(){
        //bloco para tentar armazenar em "local storage"
        try{
            //estrutura JSON para armazenar os dois diagramas
            var projecto = new Object();
            projecto.proj= projetoNome;
            projecto.CasosUso = UCBundle;
            projecto.Classe =CLBundle;
            var prefixo = "proj";
            var teste = JSON.stringify(projecto);
            localStorage.setItem(prefixo + "_" + projetoNome, teste);
		      if(ControladorAmalia.GetCookie("lang") == "pt"){
				alert("O seu projecto foi guardado!");
              } else {
                alert("Your project have been saved!");
              }
        }
        catch(err){
            if(ControladorAmalia.GetCookie("lang") == "pt"){
				alert("Erro - Por favor tente outra vez!");
              } else {
                alert("Error - Please try again!");
              }
        }

    },

	//funcao para gravar o projeto no disco
    gravarProjectoNoDisco: function(){
    try {
            this.createUseCaseBundle(graph,listaCasos,listaAtores);
this.createClassesBundle(graph2, listaClasses, listaInterfaces, listaAbstracts);
        //estrutura JSON para armazenar os dois diagramas
            var projecto = new Object();
            projecto.proj = projetoNome;
            projecto.CasosUso = UCBundle;
            projecto.Classe = CLBundle;
            var diagramaCasosJSON = JSON.stringify(projecto);

            var blob = new Blob([diagramaCasosJSON], {
                type: "text/plain;charset=utf-8"
            });
            //console.log(blob);
        var name = projetoNome + ".proj";
            saveAs(blob, name);
        } catch (err) {
            if(ControladorAmalia.GetCookie("lang") == "pt"){
				alert("Erro - Não gravou o projecto!");
              } else {
                alert("Error - Project has not been save!");
              }
        }
    },

    //RNPS-DDMLG
    //Abrir projeto atraves da cx de dialogo abre projeto
    abrirProjeto:function (){
        graph.clear();
        graph2.clear();
        var nome = $("#projetosDisponiveis option:selected").val();
        var projeto = localStorage.getItem(nome);
        // fazer o parse para JSON
        var projetoS =JSON && JSON.parse(projeto) || $.parseJSON(projeto);
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
        this.ActualizaVariaveis();
    },
	
	//Abrir projeto atraves da lista dos projeto mais recentes
     abreProjecto2:function(nomeProjecto){
         //console.log(nomeProjecto);
    var projeto = localStorage.getItem(nomeProjecto);
        // fazer o parse para JSON
    var projetoS =JSON && JSON.parse(projeto) || $.parseJSON(projeto);
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

},
	
	//abre projeto para poder exportar (carrega as variaveis globais)
	abrirProjetoParaExportar:function (){
        var nome = $("#projetosDisponiveisParaExportar option:selected").val();
        projetoNome= nome;
        var projeto = localStorage.getItem(projetoNome);
        // fazer o parse para JSON
        var projetoS =JSON && JSON.parse(projeto) || $.parseJSON(projeto);
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
        this.ActualizaVariaveis();
        this.diagramaToXML();
        this.toogleDialogo("#dialogoExportProjet", false);
        this.FechaProjecto();
    },

	//***************************
	//**   Funções Utilitárias **
	//***************************
	//-----------------------------------------------Adicionar um atributo ou um método ao dialogoAlteraClasse
	addAtributoMetodo: function(classe,valor){
		//Div para o Atributo
		var atributoP = $("<div />").addClass(classe);

		//Campo de texto para o atributo
		var nomeAtributo = $("<input />").addClass("nome_"+classe);
		nomeAtributo.attr ("type", "text");
		//nomeAtributo.attr ("placeholder", classe);
		nomeAtributo.val(valor);

		//botão para apagar atributo
		var btnApaga = $("<input />").addClass("btnApaga");
		btnApaga.attr("type", "button");
		btnApaga.attr("value","-");

		atributoP.append(nomeAtributo);
		atributoP.append(btnApaga);

		return atributoP;
	},

	addMetodoInterface: function(interf,metodo){
		//Div para o Metodo
		var metodoP = $("<div />").addClass(interface);

		//Campo de texto para o Metodo
		var nomeMetodo = $("<input />").addClass("nome_"+interf);
		nomeMetodo.attr ("type", "text");
		nomeMetodo.attr ("placeholder", interf);
		nomeMetodo.val(metodo);

		//botão para apagar atributo
		var btnApaga = $("<input />").addClass("btnApaga");
		btnApaga.attr("type", "button");
		btnApaga.attr("value","-");

		metodoP.append(nomeAtributo);
		metodoP.append(btnApaga);

		return atributoP;
	},

    //RNPS-DMMLG
    //Passar diagrama de Casos de Uso para JSON
    diagramaCasoUsoParaJSON: function(){
        var modeloJSONCU = graph.toJSON();
        //console.log(modeloJSONCU);
        diagramaCU = modeloJSONCU;
        //console.log(diagramaCU);
    },

    //RNPS-DMMLG
    //Criacao de estrutura JSON para o segmento de projeto
    createUseCaseBundle :function(diagrama,casos,atores){
        UCBundle = { diagCU : diagrama, listaCU : casos, listaAtores : atores };
        var teste = JSON.stringify(UCBundle);
    },
    //RNPS-DMMLG
    //Passar diagrama de Casos de Uso para JSON
    diagramaClassesParaJSON: function(){
        var modeloJSONCL = graph2.toJSON();
        //console.log(modeloJSONCL);
        diagramaCL = modeloJSONCL;
        //console.log(diagramaCL);
    },

    //RNPS-DMMLG
    //Criação de estrutura JSON para o segmento de projeto
	createClassesBundle: function(diagrama, classes, interfaces, abstratas){
        CLBundle = {diagCL : diagrama, listaCL: classes, listaIT: interfaces, listaABS: abstratas};
    }
};


//<<<<<<<<<<<<<<<<<<<<< Change CSS style sheets with cookies >>>>>>>>>>>>>>>>>>>>>>>
//http://www.thesitewizard.com/javascripts/change-style-sheets.shtml

// *** TO BE CUSTOMISED ***

var style_cookie_name = "style" ;
//var language_cookie_name ="language";
var style_cookie_duration = 30 ;
//var language_cookie_duration= 30;

// *** END OF CUSTOMISABLE SECTION ***
// You do not need to customise anything below this line

function switch_style ( css_title )
{
// You may use this script on your site free of charge provided
// you do not remove this notice or the URL below. Script from
// http://www.thesitewizard.com/javascripts/change-style-sheets.shtml
  var i, link_tag ;
  for (i = 0, link_tag = document.getElementsByTagName("link") ;
    i < link_tag.length ; i++ ) {
    if ((link_tag[i].rel.indexOf( "stylesheet" ) != -1) &&
      link_tag[i].title) {
      link_tag[i].disabled = true ;
      if (link_tag[i].title == css_title) {
        link_tag[i].disabled = false ;
      }
    }
    set_cookie( style_cookie_name, css_title,
      style_cookie_duration );
  }
}
function set_style_from_cookie()
{
  var css_title = get_cookie( style_cookie_name );
  if (css_title.length) {
    switch_style( css_title );
  }
}
function set_cookie ( cookie_name, cookie_value,
    lifespan_in_days, valid_domain )
{
    // http://www.thesitewizard.com/javascripts/cookies.shtml
    var domain_string = valid_domain ?
                       ("; domain=" + valid_domain) : '' ;
    document.cookie = cookie_name +
                       "=" + cookie_value +
                       "; max-age=" + 60 * 60 *
                       24 * lifespan_in_days +
                       "; path=/" + domain_string ;
}
function get_cookie ( cookie_name )
{
//    // http://www.thesitewizard.com/javascripts/cookies.shtml
//    var cookie_string = document.cookie ;
//	console.log(cookie_name);
//	console.log(cookie_string);
//    if (cookie_string.length != 0) {
//        var cookie_value = cookie_string.match (
//                        '(^|;)[\s]*' +
//                        cookie_name +
//                        '=([^;]*)' );
//        return decodeURIComponent ( cookie_value[2] ) ;
//    }
//    return '' ;

	var name = cookie_name + "=";
		  //console.log("NOME DO COOKIE:"+cookie_name);
		  var ca = "";
			var ca = document.cookie.split(';');
		  //console.log("ca = " + ca);
			for(var i=0; i<ca.length; i++) {
				 var c = ca[i];
				 while (c.charAt(0)==' ') c = c.substring(1);
				 if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
			}
			return "";
}




function removefrom( array, valor){
    var index =array.indexOf(valor);
    if(index>=0){
       array.splice(index,1);
}
}
