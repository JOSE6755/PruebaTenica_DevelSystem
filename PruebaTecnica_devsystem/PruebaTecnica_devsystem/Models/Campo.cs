using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PruebaTecnica_devsystem.Models
{
    public class Campo
    {
        [Key]
        public int idCampo { get; set; }
        [Required]
        public string nombre { get; set; }
        [Required]
        public string titulo { get; set; }
        [Required]
        public int requerido { get; set; }
        [Required]
        public int idTipo_campo { get; set; }
        
    }
}
