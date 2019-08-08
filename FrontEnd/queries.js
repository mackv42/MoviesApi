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
			myData.map(x => {
				console.log(x.Title + " " + x.Director + " " +  x.Genre);
			});
			populateTable( myData );
		}
	}).then(null, function(){
		
	});
}

function editTable( id ){
	//<input type="text-box" value='+x.Title+' style="border: none; width: 100%; height: 50px; text-align:center"/>
	$(".movie #"+id + " " + title).html = "";
	
}

function populateTable( data ){
	$("#movieContainer").html = "";
	data.map( x => {
			$("#movieContainer").append(
			'<div class="card movie" id="movie'+ x.Id +'" style="width: 18rem;">\
			   <h4 style="text-align: center" id="title">'+ x.Title + '</h4>\
			  <img class="card-img-top" src="..." alt="Card image cap">\
			  <div class="card-body">\
			    <h5 class="card-title">Card title</h5>\
			    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the cards content.</p>\
			    <a href="#" class="btn btn-primary">Go somewhere</a>\
			  </div>\
			</div>')
	});
}

$("#enterQuery").on('click', function(){
	//alert("This works");
	var query = $("#query").val();
	var selected  = $("#querySelect option:selected").val();
	makeQuery( selected, query );
	//if(query.)
});