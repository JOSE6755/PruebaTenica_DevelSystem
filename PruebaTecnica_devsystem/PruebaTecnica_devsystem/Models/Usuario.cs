using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PruebaTecnica_devsystem.Models
{
    public class Usuario
    {
        [Key]
        public int idUsuario { get; set; }

        [Required]
        public string correo { get; set; }

        [Required]
        public string contasenia { get; set; }

        public string nombre { get; set; }
        [ForeignKey("idUsuario")]
        public List<Encuesta> encuesta { get; set; }


    }
}
