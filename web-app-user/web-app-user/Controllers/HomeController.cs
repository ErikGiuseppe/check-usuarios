using Dapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.Sqlite;
using System.Data;
using web_app_user.Entidades;

namespace web_app_user.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsuarioController : ControllerBase
    {
        private readonly string? _connectionString;

        public UsuarioController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");

        }

        private IDbConnection OpenConnection()
        {
            IDbConnection dbConnection = new SqliteConnection(_connectionString);
            dbConnection.Open();
            return dbConnection;
        }

        private void Validar(Usuario usuario)
        {
            if (string.IsNullOrEmpty(usuario.Senha) || string.IsNullOrEmpty(usuario.Nome))
            {
                throw new Exception("Campos inválidos");
            }
        }

        [HttpGet("")]
        public async Task<IActionResult> ObterTodos()
        {
            using IDbConnection dbConnection = OpenConnection();
            var result = await dbConnection.QueryAsync<Usuario>("select * from Usuario;");
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            using IDbConnection dbConnection = OpenConnection();

            string sql = @"select * from Usuario where Id = @id";
            var usuario = await dbConnection.QueryFirstOrDefaultAsync<Usuario>(sql, new { id });
            if (usuario == null)
            {
                return NotFound();
            }
            return Ok(usuario);
        }

        [HttpPost("")]
        public async Task<IActionResult> Post([FromBody] Usuario usuario)
        {
            try
            {
                Validar(usuario);
                using IDbConnection dbConnection = OpenConnection();
                dbConnection.Execute("insert into Usuario (Nome, Senha) values (@Nome, @Senha)", usuario);
                return Ok();
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("")]
        public IActionResult Put([FromBody] Usuario usuario)
        {
            try
            {
                Validar(usuario);
                using IDbConnection dbConnection = OpenConnection();

                var query = @"update Usuario SET Nome = @Nome, Senha = @Senha WHERE Id = @id";

                dbConnection.Execute(query, usuario);

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            using IDbConnection dbConnection = OpenConnection();

            var usuario = await dbConnection.QueryAsync<Usuario>("delete from Usuario where Id = @id;", new { id });
            return Ok();
        }
    }
}
