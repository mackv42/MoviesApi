let myData = {};
function makeQuery( cat, query ){
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
	})
}

function editMovie( id ){
	//<input type="text-box" value='+x.Title+' style="border: none; width: 100%; height: 50px; text-align:center"/>
	var movieDiv = document.getElementById("movie" + myData[id].Id);
	var titleDiv = movieDiv.getElementsByClassName("title")[0];
	var genreDiv = movieDiv.getElementsByClassName("genre")[0];
	var directorDiv = movieDiv.getElementsByClassName("director")[0];

	titleDiv.innerHTML = '<input type="text-box" value="'+myData[id].Title+'" style="border: none; width: 100%; height: 50px; text-align:center"/>';
	directorDiv.innerHTML =  '<input type="text-box" value="'+myData[id].Director+'" style="border: none; width: 100%; height: 50px; text-align:center"/>';
	genreDiv.innerHTML =  '<input type="text-box" value="'+myData[id].Genre+'" style="border: none; width: 100%; height: 50px; text-align:center"/>';

	var title = titleDiv.getElementsByTagName("input")[0].value;
	var director =  directorDiv.getElementsByTagName("input")[0].value;
	var genre =  genreDiv.getElementsByTagName("input")[0].value;
	 $(".title input").on("change", function(){
	 	title = this.value;
	 });
	 $(".genre input").on("change", function(){
	 	genre = this.value;
	 });
	 $(".director input").on("change", function(){
	 	genre = this.value;
	 });
	$("#"+id).html("Update");
	$("#"+id).on("click", function(){
			$.ajax({
				url: "https://localhost:44375/api/movie/" + myData[id].Id,
				type: "PUT",
				data:{
					"Title": title,
					"Director": director,
					"Genre": genre
				},
				success: function(){
					//makeQuery()
				}
			})
	});
	//$("#movie" + id + " .title").html('<input type="text-box" value='+myData[id].Title+' style="border: none; width: 100%; height: 50px; text-align:center"/>');
}

function populateTable( data ){
	$("#movieContainer").html("");
	var i =0;
	data.map( x => {
			$("#movieContainer").append(
			'<div class="card movie" id="movie'+ x.Id +'" style="width: 18rem;">\
			  <div> <h4 style="text-align: center" class="title">'+ x.Title + '</h4></div>\
			  <div class="card-body">\
			    <p class="card-text">Director: <span class="director">' + x.Director +' </span><br/>Genre: <span class="genre">' + x.Genre + '</span></p>\
			    <a id="'+ i++ + '" href="#" class="btn btn-primary editMovie">Edit</a>\
			  </div>\
			</div>')
	});

	var queried = $(".editMovie");
	var editorList = [];
	$(".editMovie").on("click", function(e){
		e.preventDefault();
		editMovie(this.id);
	})
	/*
	for(var i=0; i<queried.length; i++){
		$(queried[i]).on("click", function(){
				editorList[i] = i-1;
				console.log(i-1);
				yield editMovie(editorList[i-1]);
		});
	}*/
	console.log(queried);
	/*
	$(".editMovie").on("click", function(){
			console.log(this.id);
			editTable(this.id);
	});*/
}

$("#enterQuery").on('click', function(){
	//alert("This works");
	var query = $("#query").val();
	var selected  = $("#querySelect option:selected").val();
	makeQuery( selected, query );
	//if(query.)
});

