using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class BaseController<T> : ControllerBase
{
    private readonly BaseService<T> _baseService;
 
    public BaseController(BaseService<T> baseService)
    {
        _baseService = baseService;
    }

    [HttpPost]
    [Route("create")]
    public async Task<IActionResult> Create([FromQuery] string tableName, [FromBody] T payload)
    {
        if (string.IsNullOrEmpty(tableName))
        {
            return BadRequest("Table name must be provided.");
        }

        var result = await _baseService.Create(tableName, payload);
        return Ok(result);
    }

    // Aggiungi altri endpoint CRUD simili, usando il tableName nei metodi
}
