$(function(){
	
		/*
			Sitema de pesquisa
        */

        var currentValue = 0;
        var isDrag = false;
        var preco_maximo = 70000;
        var preco_atual = 0;

		//funcoes pra detectar o click do mouse

        $('.pointer-barra').mousedown(function(){
        	isDrag = true;
			//se o botao estiver apertado, isDrag é true
        })

        $(document).mouseup(function(){
        	isDrag = false;
			//se não, é false
        	enableTextSelection();
        })

		//funcao para configurar o evento de arrastar o botao

        $('.barra-preco').mousemove(function(e){
			//vamos pegar a posicao atual do mouse, pra isso temos que acessar as variaveis do evento(e)
        	if(isDrag){
				//quando o mouse estiver se movendo, E o isDrag for true(apertado)
        		disableTextSelection();
				//
        		var elBase = $(this);
				//funcao que pega posicao do mouse
        		var mouseX = e.pageX - elBase.offset().left;
				//verificacoes simples, se arrastar muito pra esquerda, fica em zero
				//se arrastar muito pra direita, depois da barra, trava no valor da largura
        		if(mouseX < 0)
        			mouseX = 0;
        		if(mouseX > elBase.width())
        			mouseX = elBase.width();

				/*antes o botao tava calculado estaticamente no css, agora vai ser dinamico, entao
				o left vai ser modificado, vai ser A POSICAO do mouse, subtraido da metade de seu width
				pro centro do botao ser no centro, e nao na ponta.*/
        		$('.pointer-barra').css('left',(mouseX-13)+'px');
				//deixando o valor da posicao em porcentagem
        		currentValue = (mouseX / elBase.width()) * 100; 
				//com base nesse valor em porcentagem, vamos atribuindo esse valor para o gradiente
        		$('.barra-preco-fill').css('width',currentValue+'%');

				//mudar dinamicamente o valor do preço escolhido(setar classe no html)
        		//TODO: Ajustar o formato do preço!
				/*regra de 3 basica pra descobrir o valor setado de acordo com o valor maximo e o valor
				da porcentagem
				se dividir a posição(em porcentagem) por 100, e multiplicar pelo valor maximo(em reais)
				vai dar o valor atual.*/
        		preco_atual = (currentValue/100) * preco_maximo;
				//ja vou converter essa variavel pra uma nova formatacao
				preco_atual = formatarPreco(preco_atual);
        		$('.preco_pesquisa').html('R$'+preco_atual);//html e nao css, pq vamos trocar o texto.
        	}
        })

		function formatarPreco(preco_atual){
			//funcao nativa do js pra ter duas casas decimais
        	preco_atual = preco_atual.toFixed(2);
			//array - dividir em duas partes, split no ponto, delimitador. indice 0 e 1.
        	preco_arr = preco_atual.split('.');
			//com o array que fizemos, vamos colocar ele dentro de uma funcao pra formatar melhor.
        	var novo_preco = formatarTotal(preco_arr);

        	return novo_preco;

        }

        function formatarTotal(preco_arr){

        	if(preco_arr[0] < 1000){
				//se for menos que mil reais, vai ser normal, indice 0, virgula, indice 1
        		return preco_arr[0]+','+preco_arr[1];
        	}else if(preco_arr[0] < 10000){
				//se for menor que 10.000, o pega o primeiro numero, depois ponto, depois a substring do 
				//primeiro numero começando do 1(depois da virgula) e indo ate o final,
				//depois poe o restante, depois da virgula dos centavos
        		return preco_arr[0][0]+'.'+preco_arr[0].substr(1,preco_arr[0].length)+
        		','+preco_arr[1];
        	}else{
        		return preco_arr[0][0]+preco_arr[0][1]+'.'+preco_arr[0].substr(2,preco_arr[0].length)+
        		','+preco_arr[1];
        	}
        
        }


		/*ha um glitch, quando vc aperta o mouse e arrasta, o navegador nao sabe se vc ta pressionand
		botao ou marcando texto, entao tem que fazer essas duas funcoes, pra desabilitar o text selection 
		quando começar a mover o mouse com o pointer-barra marcado, e dar habilitar o tesxt selection
		quando o desapertar o mouse*/
        function disableTextSelection(){
	          $("body").css("-webkit-user-select","none");
	          $("body").css("-moz-user-select","none");
	          $("body").css("-ms-user-select","none");
	          $("body").css("-o-user-select","none");
	          $("body").css("user-select","none");
        }

        function enableTextSelection(){
	          $("body").css("-webkit-user-select","auto");
	          $("body").css("-moz-user-select","auto");
	          $("body").css("-ms-user-select","auto");
	          $("body").css("-o-user-select","auto");
	         $("body").css("user-select","auto");
        }


		/*Sistema de slide de pagina individual de cada carro*/

		var imgShow = 3;
        var maxIndex = Math.ceil($('.mini-img-wraper').length/3) - 1;
        var curIndex = 0;

        initSlider();
        navigateSlider();
        clickSlider();
        function initSlider(){
           var amt = $('.mini-img-wraper').length * 33.3;
           var elScroll = $('.nav-galeria-wraper');
           var elSingle = $('.mini-img-wraper');
		   //porcentagem total do container, para caber todas as imagens, mesmo com overflow.
		   //em porcentagem, pra depois ser dividida melhor
           elScroll.css('width',amt+'%');
		   //a partir disso, vamos calcular o tamanho de cada imagem, que vai ser uma regra de 3
		   //33,3, que é o valor de cada um, vezes 100 sobre a quantidade.
		   //se for 3 imagens, fica 100/100 = 1, (). 33,3 * 1 = 33,3%  
           elSingle.css('width',33.3*(100/amt)+'%');
        }

        function navigateSlider(){
             $('.arrow-right-nav').click(function(){
                  if(curIndex < maxIndex){
                      curIndex++;
                      var elOff = $('.mini-img-wraper').eq(curIndex*3).offset().left - $('.nav-galeria-wraper').offset().left;
                      $('.nav-galeria').animate({'scrollLeft':elOff+'px'});
                  }else{
                     //console.log("Chegamos até o final!");
                  }
              });

             $('.arrow-left-nav').click(function(){
                 if(curIndex > 0){
                      curIndex--;
                      var elOff = $('.mini-img-wraper').eq(curIndex*3).offset().left - $('.nav-galeria-wraper').offset().left;
                      $('.nav-galeria').animate({'scrollLeft':elOff+'px'});
                  }else{
                      //console.log("Chegamos até o final!");
                  }
             })
        }


        function clickSlider(){
                $('.mini-img-wraper').click(function(){
					//quando clicar em qualquer um das miniimagens, tudo vai ficar transparente
                   $('.mini-img-wraper').css('background-color','transparent');
				   //mas o que foi clicado(this), será mudado.
                   $(this).css('background-color','rgb(210,210,210)');
				   //vamos pegar o background-image, que é children do mini-img-wraper
                   var img = $(this).children().css('background-image');
				   //e colocar ela na div pra aparecer maior.
                   $('.foto-destaque').css('background-image',img);
                })
				//ao chamar essa funcao pela primeira vez, vai deixar o eq 0 como clicado como padrao
				//(a parte que só eh chamada no click, ta em cima, a parte que chama naturalmente, eh
				//o proprio clickSlider.)
                $('.mini-img-wraper').eq(0).click();

        }
		
		
		
		
		
		/*clicar e ir pra div contato com base no atributo goto*/
/*
		$('[goto=contato]').click(function(){
			//quando clicar, botar todos os itens do menu com cor preta, e o atual, vermelho.
			$('nav a').css('color', 'black');
			$(this).css('color', 'red')
			//quando clicar, quero que anime, a funcao scrolTop do body html, vai estar no 
			//top do offset do #contato(id).
			$('html, body').animate({'scrollTop':$('#contato').offset().top});
			return false;
		})*/

		//mini img --style="background-color:rgb(210,210,210);"
		//foto desrtaque --- style="background-image:url('imagens/carro1.jpg');"

		//manipulando url
		var directory = '/xampp/htdocs/projetos/Projeto_5/'
       
		//aonde tiver esse atributo goto = contato
        $('[goto=contato]').click(function(){
            //location.href - atualiza a pagina = diretorio padrao, e o caminho que quero que ele va
            location.href=directory+'index.html?contato';
            return false;
        })
        

        checkUrl();


        function checkUrl(){
            /*la em cima pegamos o link.
            agora vamos separar ela a partir das barras, pq ela pega o diretorio inteiro
            depois vamos pegar o ultimo elemento do array do split, que é o quantidade/tamanho do array,
            menos 1, ja que começa com 0. e pegar depois da interrogacao, que quer dizer Parametro.*/
            var url = location.href.split('/');
            var curPage = url[url.length-1].split('?');
       
			//se depois da interrogacao, nao for indefinido for igual a contato
            if(curPage[1] != undefined && curPage[1] == 'contato'){
			//la em cima e la embaixo fica tudo padrao			
              $('header nav a').css('color','black');
              $('footer nav a').css('color','white');
			  //porem no goto-contato, fica desse desse jeito
              $('[goto=contato]').css('color','#EB2D2D');
			  //e alem disso, animar o scroll.
              $('html,body').animate({'scrollTop':$('#contato').offset().top});
            }

        }

		/*
            menu responsivo
        */

        //menu respoonsivo, no click, pega esse selecionado, procura a ul e da slidetoggle
        $('.mobile').click(function(){
            $(this).find('ul').slideToggle();
        })

		/*
          Sistema de navegacao nos depoimentos da index.html
        */

		  //pegando a quantidade de paragrafos
		  var amtDepoimento = $('.depoimento-single p').length;
		  var curIndex = 0;
  
		  iniciarDepoimentos();
		  navegarDepoimentos();
  
		  //antes de fazer pra navegar, vamos criar uma funcao para mostrar apenas o primeiro slide e esconder o resto.
		  function iniciarDepoimentos(){
			  $('.depoimento-single p').hide();
			  $('.depoimento-single p').eq(0).show();
		  }
  
		  function navegarDepoimentos(){
			  $('[next]').click(function(){
				   curIndex++;
				   if(curIndex >= amtDepoimento)
					  curIndex = 0;
					  /*vai aparecendo o slide seguinte e ocultando o resto,
					  até a quantidade de CLIQUES for maior ou igual à quantidade de DEPOIMENTOS.
					  quando chegar no limite, o contador volta à zero pra repetir os slides
					  (se nao tivesse isso, iria travar, ja que o numero de cliques iria exceder e pararia de sincronizar com o lenght.*/
				  $('.depoimento-single p').hide();
				  $('.depoimento-single p').eq(curIndex).show();
				  
			  })
  
			  $('[prev]').click(function(){
				  curIndex--;
				   if(curIndex < 0)
				   /*o contrario, vai diminuindo e sincronizando de tras pra frente com o length, 
				   quando for menor que o minimo de length(0), vai voltar pro tamanho MAXIMO
				   do length, que é amtDepoimento - 1, menos 1 porque o lenght comeca a contar a partir do 0*/
				   
					  curIndex = amtDepoimento-1;
				  $('.depoimento-single p').hide();
				  $('.depoimento-single p').eq(curIndex).show();
			  })
		  }
})