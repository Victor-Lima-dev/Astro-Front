using FrontAstro.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace FrontAstro.Data;

public class ApplicationDbContext : IdentityDbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<Requisicao> Requisicoes { get; set; }

    public DbSet<Pergunta> Perguntas { get; set; }

    public DbSet<TextoBase> TextosBase { get; set; }

    public DbSet<Resposta> Respostas { get; set; }

    public DbSet<TAG> TAGs { get; set; }
}
