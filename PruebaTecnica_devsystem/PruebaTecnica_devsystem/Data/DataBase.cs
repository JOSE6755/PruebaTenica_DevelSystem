using Microsoft.EntityFrameworkCore;
using PruebaTecnica_devsystem.Models;

namespace PruebaTecnica_devsystem.Data
{
    public class DataBase :DbContext
    {
        public DataBase(DbContextOptions<DataBase> options) : base(options)
        {
            
        }
        public DbSet<Respuesta> respuesta { get; set; }
        public DbSet<Encuesta_campo> Encuesta_campo { get; set; }
        public DbSet<Campo> campo { get; set; }
        public DbSet<Encuesta> encuesta { get; set; }
        public DbSet<Usuario> usuario { get; set; }
        

    }
}
