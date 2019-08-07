using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.Owin;
using Owin;
using MovieApi.Models;
[assembly: OwinStartupAttribute(typeof(MovieApi.Startup))]

namespace MovieApi
{

    public partial class Startup
    {
        public void Configuration()
        {
            ApplicationDbContext context = new ApplicationDbContext();
            if (context.Movies.Count() == 0)
            {
                context.Movies.AddRange(
                    new List<Movie>() {
                    new Models.Movie { Title = "The Departed", Genre = "Drama", Director = "Martin Scorsese" },
                    new Models.Movie { Title = "The Dark Knight", Genre = "Drama", Director = "Christopher Nolan" },
                    new Models.Movie { Title = "Inception", Genre = "Drama", Director = "Christopher Nolan" },
                    new Models.Movie { Title = "Pineapple Express", Genre = "Comedy", Director = "David Gordon Green" },
                    new Models.Movie { Title = "Die Hard", Genre = "Action", Director = "John McTiernan" }}
                );
                
            }
            context.SaveChanges();
        }
    }
}