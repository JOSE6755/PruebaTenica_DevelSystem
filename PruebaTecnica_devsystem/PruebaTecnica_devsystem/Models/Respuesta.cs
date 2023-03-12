using System.ComponentModel.DataAnnotations;

namespace PruebaTecnica_devsystem.Models
{
    public class Respuesta
    {
        [Key]
        public int idRespuesta { get; set; }
        public string respuesta { get; set; }

        public int idEncuesta_campo { get; set; }

    }
}
