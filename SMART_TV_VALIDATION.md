# 📺 Guia de Validação em Smart TV

## 🎯 Objetivo
Validar que a aplicação funciona corretamente em Smart TVs institucionais sem erros de `RelativeTimeFormat`.

---

## 📋 Pré-requisitos

### Smart TV
- [ ] Acesso à internet (WiFi ou Ethernet)
- [ ] Navegador ou WebView capaz de acessar HTTPS
- [ ] Controle remoto (ou mouse/teclado via Bluetooth)

### Servidor
- [ ] Aplicação deployada em HTTPS (não HTTP)
- [ ] URL acessível via Smart TV
- [ ] CORS configurado se necessário

### Ferramentas
- [ ] Browser desktop para testes iniciais
- [ ] Console para verificar logs (F12)

---

## 🚀 Passo 1: Teste em Desktop (Antes de colocar na TV)

### 1.1 Executar localmente
```bash
npm run dev
```

Acesse: `http://localhost:5173`

### 1.2 Verificar Console (F12)
Abra DevTools (F12) → Console

**Procure por:**
```
[Intl Compat] Suporte do Navegador
✓ Intl disponível: true
✓ RelativeTimeFormat: SUPORTADO
```

### 1.3 Validar Funcionalidades
- [ ] Página carrega sem erro
- [ ] Sidebar mostra hora atualizada
- [ ] Data em formato PT-BR (DD/MM/YYYY)
- [ ] Sem erros vermelhos no console

---

## 🏗️ Passo 2: Build para Produção

```bash
npm run build
```

**Verificar sucesso:**
```
✓ 253 modules transformed
✓ dist/assets/intl-relativetimeformat-*.js  38.44 kB
✓ built in 801ms
```

### Arquivos gerados
- `dist/index.html`
- `dist/assets/index-*.js`
- `dist/assets/intl-relativetimeformat-*.js` ← **Polyfill (importante!)**
- `dist/assets/index-*.css`
- `dist/assets/*.png` (imagens/favicon)

---

## 🌐 Passo 3: Deploy em Servidor

### 3.1 Copiar arquivos
```bash
# Copie a pasta 'dist/' completa para seu servidor
# Estrutura final:
# /painel/
#   ├── index.html
#   ├── assets/
#   │   ├── intl-relativetimeformat-*.js
#   │   ├── index-*.js
#   │   ├── index-*.css
#   │   └── ... (imagens)
```

### 3.2 Configurar HTTPS
- ✅ Certificado SSL válido
- ✅ URL: `https://seu-dominio.com/painel/`
- ✅ Porta 443 aberta
- ✅ CORS headers configurados (se necessário)

### 3.3 Testar via Desktop (antes de TV)
```bash
# De outro computador
curl -I https://seu-dominio.com/painel/
# Deve retornar: HTTP/1.1 200 OK
```

---

## 📺 Passo 4: Testar em Smart TV

### 4.1 Acessar URL na TV

**LG WebOS:**
1. Abra navegador (Safari/Chrome)
2. Vá para: `https://seu-dominio.com/painel/`
3. Pressione Enter

**Samsung Tizen:**
1. Abra Internet (ícone do navegador)
2. Digite URL: `https://seu-dominio.com/painel/`
3. Pressione Enter

**Philco/TCL:**
1. Abra navegador padrão
2. Digite: `https://seu-dominio.com/painel/`
3. Pressione Enter

### 4.2 Verificar Carregamento
- [ ] Página começa a carregar (mostra logo/elementos)
- [ ] Sem tela branca / erro de conexão
- [ ] Página está responsiva

### 4.3 Validar Funcionalidades (sem console)

#### Sidebar (lado esquerdo)
- [ ] "Horário em tempo real" aparece
- [ ] Hora atualiza a cada segundo
  - Exemplo: `10:30:45` → `10:30:46` → `10:30:47`
- [ ] Data aparece em formato BR
  - Exemplo: `30/11/2024`
- [ ] Botão de refresh funciona
- [ ] Histórico de atualizações carrega

#### Navbar (topo)
- [ ] Turnos aparecem (Matutino/Vespertino/Noturno)
- [ ] Modo turno funciona (automático/manual)
- [ ] Data/hora visível

#### Dashboard
- [ ] Conteúdo carrega
- [ ] Widgets renderizam
- [ ] Navegação funciona

#### Geral
- [ ] Sem congelamentos
- [ ] Sem lag ao navegar
- [ ] Touch/controle remoto funciona
- [ ] Sem tela branca durante uso

---

## 🔍 Passo 5: Verificar Console (se disponível)

### Acessar Console na TV

**LG WebOS 3+:**
1. Pressione **Ctrl+Shift+I** (ou menu Developer)
2. Aba: Console

**Samsung Tizen 2+:**
1. Pressione **Ctrl+Alt+I** (ou Developer Tools)
2. Aba: Console

**Outras TVs:**
- Geralmente via menu Settings → Developer Mode

### Logs Esperados

#### ✅ Esperado (tudo OK)
```
[Intl Compat] Módulo carregado...
[Intl Compat] Polyfill @formatjs/intl-relativetimeformat carregado com sucesso
[Intl Compat] Suporte do Navegador
🌍 Navegador: WebOS/Tizen/etc
✓ Intl disponível: true
✓ RelativeTimeFormat: SUPORTADO
✓ Polyfill carregado: SIM
[GlobalErrorBoundary] Componente montado
```

#### ⚠️ Esperado (navegador antigo)
```
[Intl Compat] Módulo carregado...
[Intl Compat] Polyfill não disponível: ...
[Intl Compat] Suporte do Navegador
✓ Intl disponível: false
✓ RelativeTimeFormat: NÃO SUPORTADO
✓ Polyfill carregado: NÃO
[Sidebar] Erro ao formatar tempo relativo: ...
[Intl Compat] Ativando fallback...
```

**ISSO É OK!** A aplicação funcionará com fallback manual.

#### ❌ Não Deve Aparecer
```
RangeError: Internal error. Icu error at RelativeTimeFormat
```

Se aparecer isso, verificar:
1. Polyfill foi incluído no bundle? (verificar `dist/assets/`)
2. URL em `index.html` aponta para arquivos corretos?
3. HTTPS está funcionando?

---

## 🧪 Passo 6: Testes Específicos

### Teste 1: Hora Atualiza
**O que fazer:** Observar a hora na Sidebar  
**Esperado:** Incrementa a cada segundo  
**Duração:** 10 segundos  
**Resultado:** ✅ PASSOU / ❌ FALHOU

### Teste 2: Data em Português
**O que fazer:** Ver data na Sidebar e Navbar  
**Esperado:** Formato DD/MM/YYYY (ex: 30/11/2024)  
**Resultado:** ✅ PASSOU / ❌ FALHOU

### Teste 3: Navegação
**O que fazer:** Clicar em diferentes seções  
**Esperado:** Páginas carregam sem erro  
**Duração:** 1 minuto  
**Resultado:** ✅ PASSOU / ❌ FALHOU

### Teste 4: Responsividade
**O que fazer:** Redimensionar tela (se possível)  
**Esperado:** Layout ajusta corretamente  
**Resultado:** ✅ PASSOU / ❌ FALHOU

### Teste 5: Sem Erro Branco
**O que fazer:** Usar app normalmente por 5 minutos  
**Esperado:** Nenhuma tela branca / crash  
**Duração:** 5 minutos  
**Resultado:** ✅ PASSOU / ❌ FALHOU

---

## 📊 Checklist de Validação

### Pré-Deploy
- [ ] `npm run dev` funciona localmente
- [ ] Console mostra logs corretos
- [ ] Build completa sem erros
- [ ] Arquivo `intl-relativetimeformat-*.js` existe em `dist/`

### Deploy
- [ ] Arquivos em servidor HTTPS
- [ ] URL acessível de fora
- [ ] CORS configurado (se necessário)
- [ ] Certificado SSL válido

### Smart TV - Funcionalidade
- [ ] Página carrega (não trava)
- [ ] Hora atualiza em tempo real
- [ ] Data em formato PT-BR
- [ ] Sem tela branca
- [ ] Navegação funciona
- [ ] Sem lag visível

### Smart TV - Console (se disponível)
- [ ] `[Intl Compat] Polyfill` carregado
- [ ] `✓ RelativeTimeFormat: SUPORTADO` (ou NÃO SUPORTADO com fallback)
- [ ] Sem erro `RangeError: Icu error`
- [ ] `[GlobalErrorBoundary] Componente montado`

### Performance
- [ ] Carregamento inicial < 3 segundos
- [ ] Interações sem lag
- [ ] Memória estável (não cresce indefinidamente)
- [ ] Sem travamentos após 30+ minutos de uso

---

## 🆘 Troubleshooting

### Problema 1: Tela Branca / Não Carrega
**Possíveis Causas:**
- [ ] URL incorreta
- [ ] HTTPS não funciona
- [ ] Servidor está offline
- [ ] Erro crítico na app

**Solução:**
1. Verificar URL no navegador da TV
2. Testar URL em desktop: `https://seu-dominio.com/painel/`
3. Verificar console se disponível
4. Se tela branca: `[GlobalErrorBoundary]` deve mostrar tela amigável

### Problema 2: Erro "Não consegue conectar"
**Possíveis Causas:**
- [ ] WiFi desconectado
- [ ] Firewall bloqueando
- [ ] DNS não resolvendo

**Solução:**
1. Verificar WiFi na TV
2. Testar ping: `ping seu-dominio.com`
3. Testar em outro dispositivo na rede
4. Contatar suporte de rede

### Problema 3: Hora Não Atualiza
**Possíveis Causas:**
- [ ] Sidebar carregou com erro
- [ ] JavaScript desabilitado
- [ ] Erro de renderização

**Solução:**
1. Recarregar página (F5)
2. Verificar console para erros
3. Verificar se outra funcionalidade funciona
4. Se nada funciona: pode ser erro crítico

### Problema 4: Erro "Icu error" Aparece
**IMPORTANTE:** Isso NÃO deve acontecer com nossa solução!

**Se aparecer:**
1. Verificar se `intl-relativetimeformat-*.js` está em `dist/assets/`
2. Verificar se arquivo foi copiado para servidor
3. Verificar se arquivo não está minificado incorretamente
4. Tentar limpar cache: Ctrl+Shift+Delete

### Problema 5: Console Vazio / Sem Logs
**Isso é Normal!** Smart TVs antigas não expõem console.

**O que fazer:**
1. App funciona? → Tudo bem, sem problema
2. App não funciona? → Testar em desktop
3. Se erro em desktop: ver logs lá

---

## 📈 Métrica de Sucesso

✅ **Sucesso:** Quando você vir isso
```
✓ Página carrega sem erro
✓ Hora atualiza a cada segundo
✓ Data em formato PT-BR
✓ Sem tela branca / crash
✓ Navegação funciona
✓ Console (se disponível) mostra [Intl Compat] OK
```

❌ **Falha:** Se aparecer isso
```
✗ Tela branca / erro
✗ RangeError: Icu error
✗ Página não responde
✗ Hora não atualiza
✗ Navegação quebrada
```

---

## 📞 Suporte

Se encontrar problemas:

1. **Verifique desktop primeiro:**
   ```bash
   npm run dev
   # F12 → Console
   # Procure por erros
   ```

2. **Verifique build:**
   ```bash
   npm run build
   # Procure por "intl-relativetimeformat"
   ```

3. **Verifique servidor:**
   - URL acessível?
   - HTTPS válido?
   - Arquivos copiados corretamente?

4. **Verifique TV:**
   - WiFi conectado?
   - URL correta?
   - Se console disponível, procure por logs

5. **Se tudo falhar:**
   - Tomar screenshot/video do erro
   - Verificar logs do servidor
   - Contatar desenvolvedor

---

## 📝 Relatório de Teste

Use este template para documentar o teste:

```
Data: __/__/____
Smart TV: __________ (LG/Samsung/Philco/etc)
WebOS/Tizen: ________
URL: https://seu-dominio.com/painel/

FUNCIONALIDADE       | RESULTADO | NOTAS
---------------------|-----------|----------------
Página Carrega       | ✓/✗       | 
Hora Atualiza        | ✓/✗       | 
Data em PT-BR        | ✓/✗       | 
Sem Erro Branco      | ✓/✗       | 
Navegação            | ✓/✗       | 
Console Disponível   | ✓/✗       | 
Logs Corretos        | ✓/✗       | 

OBSERVAÇÕES:
_________________________________________
_________________________________________

CONCLUSÃO: ✅ PASSOU / ❌ FALHOU
```

---

**Pronto para testar!** 🚀  
**Última atualização:** 2024
