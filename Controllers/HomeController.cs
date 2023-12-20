using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using FrontAstro.Models;
using FrontAstro.Data;

namespace FrontAstro.Controllers;

public class HomeController : Controller
{
    private readonly ILogger<HomeController> _logger;

    private readonly ApplicationDbContext _context;

    public HomeController(ILogger<HomeController> logger, ApplicationDbContext context)
    {
        _context = context;
        _logger = logger;
    }
    

    public IActionResult Index()
    {
        return View();
    }

    public IActionResult Privacy()
    {       
        var listaPerguntas = _context.Perguntas.ToList();

        return View(listaPerguntas);
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}
