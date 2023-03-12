using Microsoft.AspNetCore.Mvc;
using PruebaTecnica_devsystem.Data;
using PruebaTecnica_devsystem.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace PruebaTecnica_devsystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly DataBase context;
        public UserController(DataBase context)
        {
            this.context = context;
        }
        // GET: api/<UserController>
        [HttpGet]
        public IEnumerable<Usuario> Get()
        {
            return context.usuario;
        }

        // GET api/<UserController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<UserController>
        [HttpPost("Login",Name ="Login")]
        public IActionResult Login([FromBody] LoginUsuario usuario)
        {
            var busqueda=context.usuario.FirstOrDefault(row => row.correo == usuario.correo && row.contasenia == usuario.contrasenia);

            if (busqueda!=null)
            {
                return Ok(new {nombre=busqueda.nombre,id=busqueda.idUsuario});
            }

            

            return BadRequest(new { message = "Usuario incorrecto" });
        }

        [HttpPost("Register", Name = "Register")]
        public IActionResult Register([FromBody] Register register)
        {
            var busqueda = context.usuario.FirstOrDefault(row => row.correo == register.correo);

            if (busqueda != null)
            {
                
                return BadRequest(new { message = "Usuario ya existente" });
            }

            var user = new Usuario()
            {
                nombre = register.nombre,
                correo = register.correo,
                contasenia = register.contasenia
            };

            context.usuario.Add(user);
            context.SaveChanges();

            return Ok(new { message = "Usuario registrado!" });


            
        }

        // PUT api/<UserController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<UserController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
