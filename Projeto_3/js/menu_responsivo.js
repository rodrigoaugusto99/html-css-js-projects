//evento de carregamento do jquery
$(function(){
    $('.mobile-menu').click(function(){
        $(this).find('ul').slideToggle();
    })
})