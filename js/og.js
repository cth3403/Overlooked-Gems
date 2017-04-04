$(document).ready(function(){


	query('book','here',0);

});


$('#media').find('.dropdown-item').click(function() {

	$(this).closest('.dropdown').attr('data-val', $(this).data('mat-code') );
	
	$('#media').find('button').text( 'Media: ' + $(this).text() );
	
	
	query( $(this).data('mat-code'), $('#in_lib').closest('.dropdown').attr('data-val'), $('#patron_id').closest('.dropdown').attr('data-val' ) );
	
	

});


$('#in_lib').find('.dropdown-item').click(function() {

	$(this).closest('.dropdown').attr('data-val', $(this).text().toLowerCase() );
	
	$('#in_lib').find('button').text( 'You are ' + $(this).text().toLowerCase() + '.');
	
	query( $('#media').closest('.dropdown').attr('data-val'), $(this).text().toLowerCase(), $('#patron_id').closest('.dropdown').attr('data-val' ) );
	

});



$('#patron_id').find('.dropdown-item').click(function() {

	$(this).closest('.dropdown').attr('data-val', $(this).data('pat-id') );
	
	$('#patron_id').find('button').text( 'Hello, ' + $(this).text().toLowerCase() + '.');
	
	query( $('#media').closest('.dropdown').attr('data-val'), $('#in_lib').closest('.dropdown').attr('data-val'), $(this).data('pat-id') );


});



/*

$('#media .dropdown-item').click(function() {

console.log($('#in-lib  .dropdown-item').text());

	query( $(this).data('mat-code') );
  		
});
*/


function query(mat, loc, pat) {


console.log(mat + ' - ' + loc  + ' - ' +pat)


$('#og-list').empty();



	$.ajax({
  			method: "GET",
  			url: "test.json?v=1.1", 
 			data: { mat_type: mat, in_lib: loc, patron_id: pat  }
		})
  		.done(function( books_json ) {

			$.each(books_json, function( index, value ) {
			
			
			var bib_record_num = value['bib_record_num'].substring(0,value['bib_record_num'].length - 1)
			
			
				var img = new Image();
				img.onload = function() {
  					if (this.width > 1) {
  						$('<li><a href="http://encore.wblib.org/iii/encore/record/C__R' + bib_record_num + '"><img src="' + img.src + '" alt="" /></a><a href="http://encore.wblib.org/iii/encore/record/C__R' + bib_record_num + '" class="details"><span class="title">' + value['title'] + '</span><span class="author">' + value['author'] + '</span></a></li>').appendTo('#og-list');
  					} else {
  						$('<li class="no-img"><a href="http://encore.wblib.org/iii/encore/record/C__R' + bib_record_num+ '"><span class="title">' + value['title'] + '</span><span class="author">' + value['author'] + '</span></a></li>').appendTo('#og-list');
  					}			
  				}
			
				//img.src = 'http://images.amazon.com/images/P/' + value['ident'] + '.01.TZZZZZZZ.jpg';
				
				img.src = 'http://www.syndetics.com/index.aspx?isbn=' + value['ident'] + '/MC.GIF&client=arfayetteville&type=xw10\" alt=\"\"';

			});
  			
		});
	



}