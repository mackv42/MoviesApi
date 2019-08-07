function makeQuery( query, fir){
	$.ajax({
		type: 'POST',
		
	})
}

$("#enterQuery").on('click', function(){
	//alert("This works");
	var query = $("#query").val();
	var selected  = $("#querySelect option:selected").val();
	makeQuery( query );
	//if(query.)
});