/* Automaatisoidaan navigointilistan päivitykset, kun tehdään uusia sivuja
Eli täytyy muuttaa vain silmukan kokoa*/

window.onload=function(){
	var lista = document.getElementById("dropLista");
	
	var kotiLi = document.createElement("li");
	var kotiA = document.createElement("a");
	kotiA.setAttribute("href","index.html");
	kotiLi.appendChild(kotiA);
	
	lista.appendChild(kotiLi);
	//kotiA.setAttribute("value","Koti");
	kotiA.textContent = "Koti";
	for(var i=0 ; i<9 ; i++){
		var luku = i+1;
		var listaLi = document.createElement("li");
		var listaA = document.createElement("a");
		listaA.setAttribute("href","teht"+luku+".html");
		listaLi.appendChild(listaA);
		
		lista.appendChild(listaLi);
		//listaA.setAttribute("value","Tehtävä "+luku);
		listaA.textContent="Tehtävä "+luku;
	}
}