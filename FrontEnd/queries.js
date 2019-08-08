let myData = {};
var addMovieDivHTML = document.getElementById("movieContainer").innerHTML;
function makeQuery( cat, query ){
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

function getMovie( id ){
	var movie = {};
	$.ajax({
		url: "https://localhost:44375/api/movie/" + id,
		type: 'GET',
		dataType: 'json',
		success: function( data ){
			movie = data;
			$("#movieContainer").html(
			'<div class="card movie" id="movie'+ movie.Id +'" style="width: 18rem;">\
			  <div> <h4 style="text-align: center" class="title">'+ movie.Title + '</h4></div>\
			 div class="card-body">\
			 <p class="card-text">Director: <span class="director">' + movie.Director +' </span><br/>Genre: <span class="genre">' + x.Genre + '</span></p>\
			<a id="'+ i++ + '" href="#" class="btn btn-primary editMovie">Edit</a>\
			  </div>\
			</div>' + addMovieDivHTML);
		}
	})
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

	$("#movieContainer").append(addMovieDivHTML);

	var queried = $(".editMovie");
	var editorList = [];
	$(".editMovie").on("click", function(e){
		e.preventDefault();
		editMovie(this.id);
	})

	console.log(queried);
}

$("#enterQuery").on('click', function(){
	//alert("This works");
	var query = $("#query").val();
	var selected  = $("#querySelect option:selected").val();
	makeQuery( selected, query );
	//if(query.)
});

$("#addMovieBtn").on("click", function(e){
	e.preventDefault();
	var movieDiv = document.getElementById("addMovie");
	var titleDiv = movieDiv.getElementsByClassName("title")[0];
	var genreDiv = movieDiv.getElementsByClassName("genre")[0];
	var directorDiv = movieDiv.getElementsByClassName("director")[0];

	var addDirector = directorDiv.getElementsByTagName("input")[0].value;
	var addGenre = genreDiv.getElementsByTagName("input")[0].value;
	var addTitle = titleDiv.getElementsByTagName("input")[0].value;

	console.log(addGenre);
	console.log(addTitle);
	$.ajax({
		type: "POST",
		url: "https://localhost:44375/api/movie/",
		data:{
			"Title": addTitle,
			"Director": addDirector,
			"Genre": addGenre
		},
		success: function(){
			populateTable( [] );
		}
	})
});

function editMovie( id ){
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
	 	director = this.value;
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
					makeQuery(id);
				}
			})
	});
}