
	$(function(){
	$('nav a').click(function(){
		//no link do nav, algo clicar, faça essa funcao
		var href = $(this).attr('href'); 
		//pegando o atributo p saber em qual div estamos
		var offSetTop = $(href).offset().top;
		//
		$('html,body').animate({'scrollTop':offSetTop});
		//html body, se for só o body, talvez alguns navegadores nao funciona
//scrollTop - animacao que faz com que o scroll desca sozinho
		return false;
	})
})
