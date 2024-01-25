$(function(){

	var delay = 3000;
	var curIndex = 0;
	var amt; //declarando aqui no escopo global pq vou usar nas duas funcoes

	initSlider();
	autoPlay();

	function initSlider(){
		amt = $('.sobre-autor').length;
		var sizeContainer = 100 * amt; //se tiver 3 imagens, fica 300 o  tamanho(%)
		var sizeBoxSingle = 100 / amt; //se tiver 3 imagens, cada uma fica com 33%
		$('.sobre-autor').css('width',sizeBoxSingle+'%');
		//sobre-autor fica com o valor de cada um, só que em porcentagem
		$('.scroll-wraper').css('width',sizeContainer+'%'); 
		//scroll-wraper fica com o valor total, só que em porcentagem

		for(var i = 0; i < amt; i++){
//botando para aparecer a primeira bolinha sempre marcada.
			if(i == 0)
				$('.slider-bullets').append('<span style="background-color:rgb(170,170,170);"></span>');
			else
				$('.slider-bullets').append('<span></span>');
		}
		
	}
	
	function autoPlay(){
        //fazendo funcao setInterval com um delay especifico pra ficar rodando sempre, 
        //e a cada looping, chamar a funcao de trocar de slide.
		setInterval(function(){
			curIndex++; //index definido la em cima
			if(curIndex == amt){ //quando o contador for chegar ao limite, a qntd de slides, 
				curIndex = 0; //ele reseta, e chama 
            }
			goToSlider(curIndex); //vai pro slider que está o contador atual
		},delay)//delay definido la em cima
	}
	
	function goToSlider(curIndex){
		var offSetX = $('.sobre-autor').eq(curIndex).offset().left - $('.scroll-wraper').offset().left;
        //o .left ta pegando toda a distancia com base na pagina, mas pra pegar com base na div
		//pra dar scroll certo,temos que diminuir a div da scroll-wraper, o pai.

		//agora, vamos primeiramente resetar todas as bolinhas
		$('.slider-bullets span').css('background-color','rgb(200,200,200)');
		//e manter destacado aquele que estiver no eq do index, que veio da funcao autoplay, 
		//antes de ser resetada pela condição de ser igual a 0.
		$('.slider-bullets span').eq(curIndex).css('background-color','rgb(170,170,170)');
		$('.scrollEquipe').stop().animate({'scrollLeft':offSetX+'px'});

	}
	//colocar stop nos dois animates pra nao dar conflito.(stop o outro animate antes)
	$(window).resize(function(){
		$('.scrollEquipe').stop().animate({'scrollLeft':0});
		//pra evitar quebrar quando redimensiona, botar o scroll pra voltar pra posicao inicial 
	})


})