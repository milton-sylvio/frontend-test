'use strict';/**
 * Script de exibição do ranking do programa A Fazenda
 * 
 * @author Milton Sylvio da Silva Junior <miltinho_sylvio@hotmail.com>
 * 
 */var Main={init:function init(){this.readJson()},verifyXmlHttp:function verifyXmlHttp(){var xmlhttp=void 0;// Verifica se suporta XMLHttpRequest
if(window.XMLHttpRequest){xmlhttp=new XMLHttpRequest}else{// Adicionamos o ActiveXObject da Microsoft (para IE)
xmlhttp=new ActiveXObject('Microsoft.XMLHTTP')}return xmlhttp},calcPorcentagem:function calcPorcentagem(positive,negative){var porcentagem=100;var total=positive+negative,result=[];if(total>0){result['positivo']=Math.round(positive*porcentagem/total);// Aplicamos a regra de 3 para calcular a porcentagem do valor positivo
result['negativo']=porcentagem-result['positivo']}else{result['positivo']=0;result['negativo']=0}return result},readJson:function readJson(){var xmlhttp=this.verifyXmlHttp(),fileJson='fazenda.json';// Verificamos os estados da requisição
xmlhttp.onreadystatechange=function(){// Verifica se a página foi carregada corretamente
if(xmlhttp.readyState===4&&xmlhttp.status===200){var dadosJSON=void 0;try{dadosJSON=JSON.parse(xmlhttp.responseText);var dados=dadosJSON.data;// Ordenamos os personagens por 
dados.sort(function(a,b){if(a.positive<b.positive)return 1;if(a.positive>b.positive)return-1;return 0});var x=1,list=[];dados.forEach(function(d){var pos=d.positive,neg=d.negative,valPos=pos?parseInt(pos):0,valNeg=neg?parseInt(neg):0,results=Main.calcPorcentagem(valPos,valNeg),resultPos=results['positivo'],resultNeg=results['negativo']>0?results['negativo']:100;var listas='<a href="#" class="list-ranking-item" title="'+d.name+'" role="button">\n\t\t\t\t \t\t\t\t<div class="list-ranking-media">\n\t\t\t\t \t\t\t\t\t<span class="list-ranking-media-img">\n\t\t\t\t \t\t\t\t\t\t<img src="'+d.picture+'" alt="'+d.name+'">\n\t\t\t\t \t\t\t\t\t</span>\n\t\t\t\t \t\t\t\t\t<span class="list-ranking-media-label">'+x+'</span>\n\t\t\t\t \t\t\t\t</div>\n\t\t\t\t \t\t\t\t<h2 class="list-ranking-title">'+d.name+'</h2>\n\t\t\t\t \t\t\t\t<h3 class="list-ranking-description">'+d.description+'</h3>\n\n\t\t\t\t \t\t\t\t<div class="list-ranking-tooltip">\n\t\t\t\t \t\t\t\t\t<div class="arrow"></div>\n\t\t\t\t\t\t\t\t\t<ul>\n\t\t\t\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t\t\t\t<span class="tooltipt-title">Gostam</span>\n\t\t\t\t\t\t\t\t\t\t\t<span class="tooltipt-content">'+resultPos+'%</span>\n\t\t\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t\t\t\t<span class="tooltipt-title">N\xE3o Gostam</span>\n\t\t\t\t\t\t\t\t\t\t\t<span class="tooltipt-content">'+resultNeg+'%</span>\n\t\t\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t\t</ul>\n\t\t\t\t \t\t\t\t</div>\n\t\t\t\t \t\t\t</a>';document.getElementById('listRanking').innerHTML+=listas;x++})}catch(e){eval('dadosJSON = ('+xmlhttp.responseText+');')}}};// Abre a requisição com o método e url
xmlhttp.open('GET',fileJson,true);// Modifica o MimeType da requisição
xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');// Envia os valores
xmlhttp.send(null)}};Main.init();
//# sourceMappingURL=main.js.map
