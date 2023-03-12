using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PruebaTecnica_devsystem.Models
{
    public class Encuesta_campo
    {
        [Key]
        public int idEncuesta_campo { get; set; }
        public int idEncuesta { get; set; }
        [ForeignKey("idEncuesta")]
        public Encuesta encuesta { get; set; }
        public int idCampo { get; set; }
        [ForeignKey("idCampo")]
        public Campo campo { get; set; }
        [ForeignKey("idEncuesta_campo")]
        public List<Respuesta> respuestas { get; set; }

    }
}
