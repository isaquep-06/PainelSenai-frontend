# Migração Frontend: Upload via Backend

## Status: Ajustes aplicados

### Fluxo final

```text
Frontend -> FormData
Backend -> Supabase Storage
Resposta: { url: "https://..." }
Frontend -> salva/renderiza a URL publica
```

### Pontos atualizados

1. `uploadService.js`
   - Mantem envio com `FormData`
   - Normaliza o retorno para consumir `url`

2. `uploadAnuncio.jsx`
   - Continua usando o backend existente
   - Repassa a resposta do upload para a tela de gerenciamento

3. `Anuncio/index.jsx`
   - Renderiza a midia diretamente com `midia.url`
   - Mantem slideshow simples e estavel para TVs

4. `pages/anuncio/index.jsx`
   - Usa `item.url` para preview e gerenciamento
   - Evita recarga completa quando o upload ja devolve item utilizavel

5. `pages/dashboard/index.jsx`
   - Consome uploads normalizados
   - Preserva a midia atual quando a lista e atualizada
   - Mantem URLs estaveis sem cache busting

### Validacoes

- Sem dependencia de Cloudinary no frontend
- Sem campos legados de URL no codigo de producao
- Sem transformacoes dinamicas na URL de imagem
- Upload continua centralizado no backend
- Renderizacao direta com URL publica
