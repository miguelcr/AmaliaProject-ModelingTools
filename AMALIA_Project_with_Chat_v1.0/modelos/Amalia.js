/**
 * @author jorge et al.
 */

//Extensão da Biblioteca joint.js para incluir um caso de uso
//Na realidade um objecto com uma imagem e o nome actor por baixo



joint.shapes.basic.Actor = joint.shapes.basic.Generic.extend({

    markup: '<g class="rotatable"><g class="scalable"><image/></g></g><text/>',

    defaults: joint.util.deepSupplement({

        type: 'basic.Actor',
	angle: 0,
        attrs: {
            text: {
		'text': 'Actor',
		'font-size': 14,
		'ref-x': .5,
		'ref-y': 75,
		'y-alignment': 'middle',
		'text-anchor': 'middle',
		'ref': 'image',
		'fill': 'black',
	    },
	    image: {
		'width': 35,
		'height': 70
		}
        }
    }, joint.shapes.basic.Generic.prototype.defaults)
});

joint.shapes.basic.Lixo = joint.shapes.basic.Generic.extend({
	markup: '<g class="rotatable"><g class="scalable"><image/></g></g><text/>',
	 defaults: joint.util.deepSupplement({

        type: 'basic.Lixo',
	angle: 0,
        attrs: {

	    image: {
		'width': 70,
		'height': 70
		}
        }
    }, joint.shapes.basic.Generic.prototype.defaults)

});

//***********************************

//Gerar extensões para ligações
// AS extensões não funcionam coma gravação
// Problemas com o markup
// necessário definir

//***********************************
amaliaLinks = {};

// associação genérica

amaliaLinks.Association = joint.dia.Link.extend({
	defaults:{
			type:'amaliaLinks.Association',
			labels: [{ position: .9, attrs: { text: { text: '1' } } },
				{ position: .1, attrs: { text: { text: '*' } } } ]
	},
	setCardinality: function(dir,esq){
		(this.get('labels'))[0].attrs.text.text =  dir ;
		(this.get('labels'))[1].attrs.text.text =  esq ;
	},
	getCardinality: function(){
		return [(this.get('labels')[0]).attrs.text.text,(this.get('labels')[1]).attrs.text.text];
	},
	getCardinalityString: function(){
		var card = this.getCardinality();
		return card[0]+";"+card[1];
	}
});


joint.shapes.uml.AssociationAmalia = joint.dia.Link.extend({
	defaults:{
			type:'amaliaLinks.Association',
			labels: [{ position: .9, attrs: { text: { text: '1' } } },
				{ position: .1, attrs: { text: { text: '*' } } } ]
	}
	,
	setCardinality: function(dir,esq){
		(this.get('labels'))[0].attrs.text.text =  dir ;
		(this.get('labels'))[1].attrs.text.text =  esq ;
	},
	getCardinality: function(){
		return [(this.get('labels')[0]).attrs.text.text,(this.get('labels')[1]).attrs.text.text];
	},
	getCardinalityString: function(){
		var card = this.getCardinality();
		return card[0]+";"+card[1];
	}
});

//composição genérica
amaliaLinks.Composition = joint.dia.Link.extend({
		defaults: {
        type: 'amaliaLinks.Composition',
         labels: [{ position: .85, attrs: { text: { text: '1' } } },
				{ position: .15, attrs: { text: { text: '*' } } } ],
        attrs: { '.marker-target': { d: 'M 40 10 L 20 20 L 0 10 L 20 0 z', fill: 'black' }}
   },
   setCardinality: function(dir,esq){
		(this.get('labels'))[0].attrs.text.text =  dir ;
		(this.get('labels'))[1].attrs.text.text =  esq ;
	},
		getCardinality: function(){
		return [(this.get('labels')[0]).attrs.text.text,(this.get('labels')[1]).attrs.text.text];
	},
	getCardinalityString: function(){
		var card = this.getCardinality();
		return card[0]+";"+card[1];
	}

});
//agregação genérica
amaliaLinks.Agregation = joint.dia.Link.extend({
    defaults: {
        type: 'amaliaLinks.Agregation',
         labels: [{ position: .85, attrs: { text: { text: '1' } } },
				{ position: .15, attrs: { text: { text: '*' } } } ],
        attrs: { '.marker-target': { d: 'M 40 10 L 20 20 L 0 10 L 20 0 z', fill: 'white' }}
    },
       setCardinality: function(dir,esq){
		(this.get('labels'))[0].attrs.text.text =  dir ;
		(this.get('labels'))[1].attrs.text.text =  esq ;
	},
		getCardinality: function(){
		return [(this.get('labels')[0]).attrs.text.text,(this.get('labels')[1]).attrs.text.text];
	},
	getCardinalityString: function(){
		var card = this.getCardinality();
		return card[0]+";"+card[1];
	}

});

//include
amaliaLinks.Include = joint.dia.Link.extend({
	defaults: {
        type: 'amaliaLinks.Include',
         labels: [{ position: .5, attrs: { text: { text: ' << include >> ' } } } ],
        attrs: { '.connection': { stroke: 'black', 'stroke-dasharray': '5 2'},
				'.marker-source': { stroke: 'black', d: 'M 10 0 L 0 5 L 10 10 z' }}
    }
});
//extend
amaliaLinks.Extend = joint.dia.Link.extend({
	defaults: {
        type: 'amaliaLinks.Extends',
         labels: [{ position: .5, attrs: { text: { text: ' << extend >> ' } } } ],
        attrs: {'.connection': { stroke: 'black', 'stroke-dasharray': '5 2'},
				'.marker-target': { stroke: 'black', d: 'M 10 0 L 0 5 L 10 10 z'} }
    }
});
//**************************************************************************
// »»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»» Objeto Amalia
//*****************************************************************************
Amalia = {

	// »»»»»»»»»»»»»»»»»»»»»»»» ELEMENTOS DE DIAGRAMA QUE NÃO LIGAÇÕES «««««««««««««««««««««««««««««««««««««««
	dia:{


		//Gráfico de um ator >>>>>>>>>>>>>>>>>>é necessário definir o texto attrs.text.text, se for Actor attrs.text fica undefined
		getGrafAtor : function(posX, posY){
			var ator = new joint.shapes.basic.Actor(
			{
				position: { x: posX, y: posY },
    			size: { width: 35, height: 70},
    			attrs: {
    				text:{text:"Actor",'fill': 'grey'},
    				image: { 'xlink:href': "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMzNweCIgaGVpZ2h0PSI2M3B4IiB2ZXJzaW9uPSIxLjEiPgoKICAgIDxkZWZzPjwvZGVmcz4KICAgIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAuNSwwLjUpIj4KICAgICAgICA8ZWxsaXBzZSBjeD0iMTYiIGN5PSI5IiByeD0iNy41IiByeT0iNy41IiBmaWxsPSJncmV5IiBzdHJva2U9IiM4MDgwODAiPjwvZWxsaXBzZT4KICAgICAgICA8cGF0aCBkPSJNIDE2IDE2IEwgMTYgNDEgTSAxNiAyMSBMIDEgMjEgTSAxNiAyMSBMIDMxIDIxIE0gMTYgNDEgTCAxIDYxIE0gMTYgNDEgTCAzMSA2MSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJncmV5IiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHBvaW50ZXItZXZlbnRzPSJub25lIj48L3BhdGg+CiAgICA8L2c+Cgo8L3N2Zz4="}}
			}

			);
			return ator;
		},
		//Gráfico do Lixo
		getGrafLixo: function(posX, posY){
			var lixo = new joint.shapes.basic.Lixo(
				{
					position : {x: posX , y: posY},
					size: {width: 100, height:100},
					attrs:{
						image:{'xlink:href': "data:image/svg+xml;base64,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"}
					}
				}
			);

			return lixo;
		},

		//Gráfico de um caso de uso
		getGrafCasoUso : function(posX, posY){

			var prop ={
			position: {x: posX, y: posY},
			size: {width: 100, height: 50},
			attrs: { circle:{fill: 'yellow'},
				text: {text: "Use Case" , fill:'black'}}};

			return new joint.shapes.basic.Circle(prop);

		},
		//Gráfico de uma classe sem atributos ou métodos.
		getGrafClass : function (posX, posY){
			var prop = {
				position:{x: posX, y: posY},
				size:{width:100, height: 100},
				name : "Class",
				attributes : [], //Array de Strings
				methods: [], //Array de Strings

			};
			return new joint.shapes.uml.Class(prop);
		},
		//Gráfico de uma classe abstrata sem métodos  ou atributos
		getGrafAbstract : function (posX, posY){
			var prop = {
				position :{ x: posX, y:posY },
				size : {width:100, height: 100},
				name : "Abstrat",
				attributes :[], //Array de Strings
				methods:[], //Array de Strings
			};
			return new joint.shapes.uml.Abstract(prop);
		},
		//Gráfico de uma interface sem métodos ou atributos
		getGrafInterface : function (posX, posY){
			var prop = {
				position :{ x: posX, y:posY },
				size : {width:100, height: 100},
				name : "Interface",
			//	attributes :[], //Array de Strings
				methods:[], //Array de Strings
			};
			return new joint.shapes.uml.Interface(prop);
		}
	},

	//»»»»»»» LIGAÇÕES ENTRE ELEMENTOS ««««««««««««««««««««««««««
	liga:{
		//Gráfico de uma ligação de tipo include
		getGrafLigaInclude : function (idCima, idBaixo){

			var liga = new joint.shapes.uml.Generalization({source: {id: idBaixo },target: {id:idCima}});
			liga.label(0,{position:.5,
					attrs:{
						text:{text:' << include >> '}
					}});

			return liga;

			return new amaliaLinks.Include({source: {id: idCima },target: {id:idBaixo}});

		},

		//Gráfico de uma ligação de tipo extend
		getGrafLigaExtend : function (idCima, idBaixo){

			var liga = new joint.shapes.uml.Generalization({
                source: {id: idCima },target: {id:idBaixo}
                                                        });
			liga.label(0,{position:.5,
					attrs:{
						text:{text:' << extend >> '}
					}});

			return liga;


			//return new amaliaLinks.Extend({source: {id: idCima },target: {id:idBaixo}});

		},

		//Gráfico de uma ligação de tipo associação/participação Antiga?
		getGrafLigaAssocia : function (idCima, idBaixo){
			return new joint.shapes.uml.Association({source: {id: idCima },target: {id:idBaixo}});

		},
		getGrafLigaAssociaComCardinalidade: function (idCima, idBaixo,cardCima,cardBaixo){


			var liga = new joint.shapes.uml.Association ({source: {id: idCima },target: {id:idBaixo}});

			//Associar a cardinalidade
			liga.label(0,{position:.9,
					attrs:{
						text:{text:cardCima}
					}});
			liga.label(1,{position:.1,
					attrs:{
						text:{text:cardBaixo}
					}
				});

			/*
			var liga = new amaliaLinks.Association ({source: {id: idCima },target: {id:idBaixo}});
			liga.setCardinality(cardCima,cardBaixo);
			//var card = liga.getCardinalityString();
			//console.log(card);
			*/
			return liga;
		},
		getGrafLigaAssociaAmaliaComCardinalidade: function(idCima, idBaixo, cardCima,cardBaixo){
			var liga = new joint.shapes.uml.Association ({source: {id: idCima },target: {id:idBaixo}});
			liga.label(0,{position:.9,
					attrs:{
						text:{text:cardCima}
					}});
			liga.label(1,{position:.1,
					attrs:{
						text:{text:cardBaixo}
					}
					});
			//liga.setCardinality(cardCima,cardBaixo);
			//var card = liga.getCardinalityString();
			//console.log(card);
			return liga;
		},

		//Gráfico de uma herança/generalização
		getGrafLigaHeranca : function (idCima, idBaixo){
			return new joint.shapes.uml.Generalization({source: {id: idCima },target: {id:idBaixo}});
		},

		//Gráfico de agregação
		getGrafLigaAgregacao : function (idCima, idBaixo){
			return new joint.shapes.uml.Aggregation({source: {id: idCima },target: {id: idBaixo }});
		},

		getGrafLigaAgregacaoComCardinalidade: function (idCima, idBaixo, cardCima, cardBaixo){
			var liga = new joint.shapes.uml.Aggregation({source: {id: idCima },target: {id: idBaixo }});

			liga.label(0,{position:.85,
					attrs:{
						text:{text:cardCima}
					}});
			liga.label(1,{position:.15,
					attrs:{
						text:{text:cardBaixo}
					}
					});


			/*
			var liga = new amaliaLinks.Agregation ({source: {id: idCima },target: {id:idBaixo}});
			liga.setCardinality(cardCima,cardBaixo);
			*/
			return liga;
		},
		//Gráfico de composição
		getGrafLigaComposicao : function (idCima, idBaixo){
			return new joint.shapes.uml.Composition({source: {id: idCima},target: {id: idBaixo}});
		},

		getGrafLigaComposicaoComCardinalidade:function(idCima,idBaixo,cardCima,cardBaixo){
			var liga = new joint.shapes.uml.Composition({source: {id: idCima},target: {id: idBaixo}});

			liga.label(0,{position:.85,
					attrs:{
						text:{text:cardCima}
					}});
			liga.label(1,{position:.15,
					attrs:{
						text:{text:cardBaixo}
					}
					});

			/*
			var liga = new amaliaLinks.Composition ({source: {id: idCima },target: {id:idBaixo}});
			liga.setCardinality(cardCima,cardBaixo);
			*/
			return liga;
		},

		//Gráfico de implementação
		getGrafLigaImplementacao : function (idCima, idBaixo){
			return new joint.shapes.uml.Implementation({source: {id: idCima },target: {id:idBaixo}});
		}

	}

};
