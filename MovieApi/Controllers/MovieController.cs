using MovieApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Helpers;
using Newtonsoft.Json.Linq;
using System.Web.Http.Cors;

namespace MovieApi.Controllers
{
    public class MovieController : ApiController
    {
        // GET: Movie
        private ApplicationDbContext context;
        public MovieController()
        {
            context = new ApplicationDbContext();
        }
        [HttpGet]
        public List<Movie> Get()
        {
            return context.Movies.ToList();
        }


        public List<Movie> Get(string Category, string Query)
        {
            List<Movie> movieList = new List<Movie>();
            switch( Category )
            {
                case "Director":
                    movieList = context.Movies.Where(x => x.Director == Query).ToList();
                    break;
                case "Title":
                    movieList = context.Movies.Where(x => x.Title == Query).ToList();
                    break;
                case "Genre":
                    movieList = context.Movies.Where(x => x.Genre == Query).ToList();
                    break;
            }

            return movieList;
        }

       
        // GET: Movie/Details/5
        public Movie Get(int id)
        {
            var movie = context.Movies.Where(x => x.Id == id).FirstOrDefault();
            //Gets 
            return movie;
        }

        [HttpPost]
        public void Post([FromBody]JObject value)
        {
            JToken token = value;
            Movie add = new Movie();
            add.Director = (string)token.SelectToken("Director");
            add.Title = (string)token.SelectToken("Title");
            add.Genre = (string)token.SelectToken("Genre");
            context.Movies.Add(add);
            context.SaveChanges();
        }

        // PUT api/values/5
        public void Put(int id, [FromBody]JObject value)
        {
            var found = context.Movies.Where(x => x.Id == id).FirstOrDefault();
            JToken token = value;
            string Director = (string)token.SelectToken("Director");
            string Title = (string)token.SelectToken("Title");
            string Genre = (string)token.SelectToken("Genre");
            if (!String.IsNullOrEmpty(Director))
            {
                found.Director = Director;
            }
            if (!String.IsNullOrEmpty(Title))
            {
                found.Title = Title;
            }
            if (!String.IsNullOrEmpty(Genre))
            {
                found.Genre = Genre;
            }

            context.SaveChanges();
            // Update movie in db logic
        }
    }
}
