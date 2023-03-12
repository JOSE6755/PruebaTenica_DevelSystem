using System.ComponentModel.DataAnnotations;

namespace PruebaTecnica_devsystem.Models
{
    public class NuevaEncuesta
    {
        [Required]
        public string nombre { get; set; }
        [Required]
        public string descripcion { get; set; }
        [Required]
        public int idUsuario { get; set; }
    }
}
