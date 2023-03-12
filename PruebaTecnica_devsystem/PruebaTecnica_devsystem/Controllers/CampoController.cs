using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PruebaTecnica_devsystem.Data;
using PruebaTecnica_devsystem.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace PruebaTecnica_devsystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CampoController : ControllerBase
    {
        private readonly DataBase context;
        public CampoController(DataBase context)
        {
            this.context = context;
        }
        // GET: api/<CampoController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<CampoController>/5
        [HttpGet("{id}")]
        public IEnumerable<Encuesta_campo> Get(int id)
        {
            var busqueda = context.Encuesta_campo.Include(c=>c.campo).Include(b=>b.encuesta).Where(row=>row.idEncuesta==id).ToList();
            return busqueda;
        }

        // POST api/<CampoController>
        [HttpPost("CreateCampo",Name ="CreateCampo")]
        public IActionResult Post([FromBody] NuevoCampo campo)
        {
            var busqueda = context.usuario.FirstOrDefault(row=>row.idUsuario == campo.idUsuario);
            var encuesta = context.encuesta.FirstOrDefault(row => row.idEncuesta == campo.idEncuesta);

            if(busqueda != null && encuesta != null)
            {
                var nuevoCampo = new Campo()
                {
                    idTipo_campo = campo.idTipo,
                    nombre=campo.nombre,
                    requerido=campo.requerido,
                    titulo=campo.titulo,
                };
                context.campo.Add(nuevoCampo);
                context.SaveChanges();
                var nuevocampo = new Encuesta_campo()
                {
                    idCampo = nuevoCampo.idCampo,
                    idEncuesta = campo.idEncuesta,
                    

                };
                context.Encuesta_campo.Add(nuevocampo);
                context.SaveChanges();
                return Ok(new { message = "Se creo el campo correctamente!", campo = nuevocampo });

            }
            return BadRequest(new { message = "La encuesta no existe" });
        }

        // PUT api/<CampoController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] NuevoCampo campo)
        {
            var busqueda = context.usuario.FirstOrDefault(row => row.idUsuario == campo.idUsuario);
            var encuesta = context.encuesta.FirstOrDefault(row => row.idEncuesta == campo.idEncuesta);
            var campoEncuesta = context.campo.FirstOrDefault(row => row.idCampo == id);

            if(busqueda==null || encuesta==null || campoEncuesta == null)
            {
                return BadRequest(new { message = "No se pudo actualizar el campo" });
            }
            campoEncuesta.titulo = campo.titulo;
            campoEncuesta.requerido = campo.requerido;
            campoEncuesta.nombre = campo.nombre;
            campoEncuesta.idTipo_campo = campo.idTipo;

            context.campo.Update(campoEncuesta);
            context.SaveChanges();
            return Ok(new { message = "Campo actualizado!" });

        }

        // DELETE api/<CampoController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
           
            var campoEncuesta = context.campo.FirstOrDefault(row => row.idCampo == id);
            if (campoEncuesta == null)
            {
                return BadRequest(new { message = "No se pudo actualizar el campo" });
            }
            context.campo.Remove(campoEncuesta);
            context.SaveChanges();
            return Ok(new { message = "Se borro el campo!" });
        }
    }
}
