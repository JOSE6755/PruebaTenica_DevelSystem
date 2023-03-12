using System.ComponentModel.DataAnnotations.Schema;

namespace PruebaTecnica_devsystem.Models
{
    public class Tipo_campo
    {
        public int idTipo_campo { get; set; }
        public string tipo { get; set; }
        [ForeignKey("idTipo_campo")]
        public List<Campo> campos { get; set; }
    }
}
