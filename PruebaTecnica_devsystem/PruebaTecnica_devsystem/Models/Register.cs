using System.ComponentModel.DataAnnotations;

namespace PruebaTecnica_devsystem.Models
{
    public class Register
    {
        [Required]
        public string correo { get; set; }

        [Required]
        public string contasenia { get; set; }

        [Required]
        public string nombre { get; set; }
    }
}
