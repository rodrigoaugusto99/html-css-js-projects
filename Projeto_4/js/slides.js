$(function(){
	$('.mosaico .container .mosaico-wraper').slick({//abrir e fechar chaves p passar parametros de configuracao.
		centerMode: false,
		slidesToShow:6,
		arrow:false,
		responsive:[//UM OBJETO QUE TEM VARIOS OBJETOS(media queries.)

		{//um media query
			breakpoint:920,
			settings:{
				arrows:false,
				centerMode:true,//permite que a gente veja parte do anterior e posterior.
				slidesToShow:3
			}
		},

		{
			breakpoint:768,
			settings:{
				arrows:false,
				centerMode:true,
				slidesToShow:2
			}
		},
		{
			breakpoint:380,
			settings:
			{
				arrows:false,
				centerMode:true,
				slidesToShow:1
			}
		}


		]
	});
//se a gente fez o slick, tem apenas 3 elementos, os 3 aparecem mas nós conseguimos dar scroll, tem algo errado
//verificar se tem clear both no css, pois o plugin ja faz isso automaticamente pra gente.
//e nois tinhamos feito sem o plugin antes

	$('.tratamentos .container').slick({
			centerMode:false,
			slidesToShow:3,
			arrows:false,
			infinite:false,
			responsive:[

				{
					breakpoint:1024,
					settings:{
						arrows:false,
						dots:true,
						infinite:false,
						centerMode:false,
						slidesToShow:2
					}
				},
				{
					breakpoint:680,
					settings:{
						arrows:false,
						dots:true,
						infinite:false,
						centerMode:false,
						slidesToShow:1
					}
				}

			]
	});
//botando slick no que ta container do depoimento, os filhos serao arrastados.
	$('.depoimentos .container').slick({
			centerMode:false,
			slidesToShow:1,
			arrows:false,
			dots:true,
			infinite:false,
	});
})