using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PruebaTecnica_devsystem.Data;
using PruebaTecnica_devsystem.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace PruebaTecnica_devsystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EncuestaController : ControllerBase
    {
        private readonly DataBase context;
        public EncuestaController(DataBase context)
        {
            this.context = context;
        }
        // GET: api/<EncuestaController>
        [HttpGet("{idUsuario}")]
        public IEnumerable<Encuesta> Get(int idUsuario)
        {
            var busqueda = context.encuesta.Where(row=>row.idUsuario==idUsuario).ToList();
            return busqueda;
        }

        
        [HttpGet("{idUsuario}/{idEncuesta}",Name ="EncuestaIndividual")]
        public IEnumerable<Encuesta_campo> Get(int idUsuario,int idEncuesta)
        {
            var busqueda = context.Encuesta_campo.Include(c => c.campo).Include(b => b.encuesta).Where(row => row.idEncuesta == idEncuesta).ToList();
            if (busqueda.Count == 0)
            {
                var encuesta = context.encuesta.Where(row => row.idUsuario == idUsuario && row.idEncuesta == idEncuesta).ToList();
                var nueva = new Encuesta_campo()
                {
                    idEncuesta = idEncuesta,
                    encuesta = encuesta[0]
                };
                IEnumerable<Encuesta_campo> lista = new Encuesta_campo[] {nueva};
                
                return lista;
            }
            return busqueda;
        }

        // GET api/<EncuestaController>/5


        // POST api/<EncuestaController>
        [HttpPost("Create",Name ="Create")]
        public IActionResult Post([FromBody] NuevaEncuesta encuesta)
        {
            var busqueda = context.usuario.FirstOrDefault(row=>row.idUsuario==encuesta.idUsuario);
            if (busqueda != null) {
                var nueva = new Encuesta()
                {
                    idUsuario=encuesta.idUsuario,
                    descripcion=encuesta.descripcion,
                    nombre=encuesta.nombre
                };

                context.encuesta.Add(nueva);
                context.SaveChanges();
                
                
                return Ok(new {message="Encuesta creada correctamente!",id=nueva.idEncuesta});
            }
            return BadRequest(new { message = "El usuario indicado no existe" });
            
        }

        // PUT api/<EncuestaController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] NuevaEncuesta encuesta)
        {
            var busqueda = context.encuesta.FirstOrDefault(row => row.idEncuesta == id && row.idUsuario == encuesta.idUsuario);
            if (busqueda == null)
            {
                return BadRequest(new { message = "La encuesta no existe" });
            }
            busqueda.descripcion = encuesta.descripcion;
            busqueda.nombre = encuesta.nombre;
            context.encuesta.Update(busqueda);
            context.SaveChanges();

            return Ok(new { message = "Encuesta actualizada!" });
        }

        // DELETE api/<EncuestaController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var busqueda = context.encuesta.FirstOrDefault(row => row.idEncuesta == id);
            //var encuestas=context.Encuesta_campo.Where(row=>row.idEncuesta==id).ToList();
            
            if (busqueda==null)
            {
                return BadRequest(new { message = "No existe esa encuesta" });
            }
            
            context.encuesta.Remove(busqueda);
            context.SaveChanges();
            return Ok(new { message = "La encuesta fue eliminada!" });
            
        }
    }
}
