using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PruebaTecnica_devsystem.Models
{
    
    public class Encuesta
    {
        [Key]
        public int idEncuesta { get; set; }
        [Required]
        public string nombre { get; set; }
        [Required]
        public string descripcion { get; set; }
        
        [Required]
        public int idUsuario { get; set; }


        

    }
}
