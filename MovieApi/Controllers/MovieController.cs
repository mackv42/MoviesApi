using MovieApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace MovieApi.Controllers
{
    public class MovieController : ApiController
    {
        // GET: Movie
        public List<Movie> Get()
        {
            return new List<Movie>();
        }
        // GET: Movie/Details/5
        public string Get(int id)
        {
            //Gets 
            return "";
        }

        public void Post([FromBody]Movie value)
        {
            // Create movie in db logic
        }

        // PUT api/values/5
        public void Put(int id, [FromBody]string value)
        {
            // Update movie in db logic
        }
    }
}
