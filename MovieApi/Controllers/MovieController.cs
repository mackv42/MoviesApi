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
            //int totalPages = (int)token.SelectToken("total_pages");
            /*
            Movie add = new Movie();
            add.Director = value.Value(new Movie());
            add.Title = value[0]["Title"];
            add.Genre = value[0]["Genre"];

            context.Movies.Add(add);
            context.SaveChanges();*/
        }

        // PUT api/values/5
        public void Put(int id, [FromBody]string value)
        {
            // Update movie in db logic
        }
    }
}
