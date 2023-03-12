using System.ComponentModel.DataAnnotations;

namespace PruebaTecnica_devsystem.Models
{
    public class NuevoCampo
    {
        [Required]
        public string nombre { get; set; }
        [Required]
        public string titulo { get; set; }
        [Required]
        public int requerido { get; set; }
        [Required]
        public int idTipo { get; set; }
        [Required]
        public int idEncuesta { get; set; }
        [Required]
        public int idUsuario { get; set; }
    }
}
