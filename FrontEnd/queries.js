let myData = {};
function makeQuery( cat, query){
	let ourDat
	$.ajax({
		url: "https://localhost:44375/api/movie/?Category=" +  cat + "&Query=" + query,
		type: 'GET',
		dataType: 'json',
		success: function( data ){
			alert(data);
			myData = data;
			console.log(data.Title);
		}
	});
}

$("#enterQuery").on('click', function(){
	//alert("This works");
	var query = $("#query").val();
	var selected  = $("#querySelect option:selected").val();
	makeQuery( selected, query );
	//if(query.)
});