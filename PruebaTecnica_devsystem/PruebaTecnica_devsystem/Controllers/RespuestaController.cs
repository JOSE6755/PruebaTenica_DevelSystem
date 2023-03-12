using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PruebaTecnica_devsystem.Data;
using PruebaTecnica_devsystem.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace PruebaTecnica_devsystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RespuestaController : ControllerBase
    {
        private readonly DataBase context;

        public RespuestaController(DataBase context)
        {
            this.context = context;
        }
        // GET: api/<RespuestaController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<RespuestaController>/5
        [HttpGet("/response/{id}")]
        public IActionResult Get(int id)
        {
            var busqueda=context.Encuesta_campo.Include(b=>b.encuesta).Include(c=>c.campo).Where(row=>row.idEncuesta==id).ToList();
            if(busqueda.Count() > 0)
            {
                return Ok(new { datos = busqueda });
            }
            return BadRequest(new { message = "No existe la encuesta" });
            
        }

        // POST api/<RespuestaController>
        [HttpPost("CrearRespuesta",Name ="CrearRespuesta")]
        public IActionResult Post([FromBody] NuevaRespuesta respuesta)
        {
            var busqueda=context.Encuesta_campo.FirstOrDefault(row=>row.idEncuesta==respuesta.idEncuesta && row.idCampo==respuesta.idCampo);
            if (busqueda != null)
            {
                
                var nuevaRespuesta = new Respuesta()
                {
                    respuesta=respuesta.valor,
                    idEncuesta_campo=busqueda.idEncuesta
                };
                context.respuesta.Add(nuevaRespuesta);
                context.SaveChanges();
                
                return Ok(new { message = "Respuesta guardada con existo!", data = nuevaRespuesta });
                
            }
            return BadRequest(new { message = "La encuesta solicitada no existe" });
        }

        // PUT api/<RespuestaController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<RespuestaController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
