/**
 * @author jorge
 */

//obtenção de um diagrama de casos de uso
var getCasoUso = function(posX, posY){
		var prop ={
		position: {x: posX, y: posY},
		size: {width: 50, height: 100},
		attrs: { circle:{fill: 'yellow', stroke: 'black'},
				text: {text: "Caso" , fill:'black'}}};

		return new joint.shapes.basic.Circle(this.prop);
};
