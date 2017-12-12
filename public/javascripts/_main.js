/**
 * Script de exibição do ranking do programa A Fazenda
 * 
 * @author Milton Sylvio da Silva Junior <miltinho_sylvio@hotmail.com>
 * 
 */
const Main = {

	init: function () {

		this.readJson();
	},

	verifyXmlHttp: function() {

		let xmlhttp;

		// Verifica se suporta XMLHttpRequest
		if (window.XMLHttpRequest) {
			xmlhttp = new XMLHttpRequest();
		} else {
			// Adicionamos o ActiveXObject da Microsoft (para IE)
			xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
		}

		return xmlhttp;
	},

	calcPorcentagem: function(positive, negative) {

		const porcentagem = 100;
		let total = positive + negative,
		  	result = [];

	  	if(total > 0) {
		  	result['positivo'] = Math.round((positive * porcentagem) / total); // Aplicamos a regra de 3 para calcular a porcentagem do valor positivo
	  		result['negativo'] = porcentagem - result['positivo'];
	  	} else {
		  	result['positivo'] = 0;
	  		result['negativo'] = 0;
	  	}

  		return result;
	},	

	readJson: function() {
		
		const xmlhttp = this.verifyXmlHttp(), 
			  fileJson = 'fazenda.json';

		 // Verificamos os estados da requisição
		 xmlhttp.onreadystatechange = function(){

			 // Verifica se a página foi carregada corretamente
			 if(xmlhttp.readyState === 4 && xmlhttp.status === 200) {
				 let dadosJSON;
				 
				 try {
				 	dadosJSON = JSON.parse(xmlhttp.responseText);

				 	let dados = dadosJSON.data;

				 	// Ordenamos os personagens por 
					dados.sort( function(a,b) {
					    if(a.positive < b.positive) return 1;
					    if(a.positive > b.positive) return -1;

					    return 0;
					});

					let x = 1,
						list = [];

					dados.forEach(function(d){

					 	let pos = d.positive,
					 		neg = d.negative,
					 		valPos = (pos) ? parseInt(pos) : 0,
					 		valNeg = (neg) ? parseInt(neg) : 0,
					 		results = Main.calcPorcentagem(valPos, valNeg),
					 		resultPos = results['positivo'], 
					 		resultNeg = (results['negativo'] > 0 ) ? results['negativo'] : 100;

				 		const listas = 
				 			`<a href="#" class="list-ranking-item" title="${d.name}" role="button">
				 				<div class="list-ranking-media">
				 					<span class="list-ranking-media-img">
				 						<img src="${d.picture}" alt="${d.name}">
				 					</span>
				 					<span class="list-ranking-media-label">${x}</span>
				 				</div>
				 				<h2 class="list-ranking-title">${d.name}</h2>
				 				<h3 class="list-ranking-description">${d.description}</h3>

				 				<div class="list-ranking-tooltip">
				 					<div class="arrow"></div>
									<ul>
										<li>
											<span class="tooltipt-title">Gostam</span>
											<span class="tooltipt-content">${resultPos}%</span>
										</li>
										<li>
											<span class="tooltipt-title">Não Gostam</span>
											<span class="tooltipt-content">${resultNeg}%</span>
										</li>
									</ul>
				 				</div>
				 			</a>`;

			 			document.getElementById('listRanking').innerHTML += listas;

					 	x++;
					 });

				 } catch(e) {
					 eval("dadosJSON = (" + xmlhttp.responseText + ");");
				 }
			 }
		 }
		 
		 // Abre a requisição com o método e url
		 xmlhttp.open('GET', fileJson, true);

		 // Modifica o MimeType da requisição
		 xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

		 // Envia os valores
		 xmlhttp.send(null);
	}
};

Main.init();