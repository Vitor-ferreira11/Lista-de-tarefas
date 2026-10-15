# Lista de tarefas

**[Abrir demonstração](https://vitor-ferreira11-tarefas.cozyseed5.chatgpt.site)**

Projeto educacional em HTML, CSS e JavaScript para adicionar e excluir tarefas com persistência local no navegador.

## Executar

Abra `index.html` em um navegador ou sirva a pasta por hospedagem estática. Não há dependências de aplicação nem etapa de compilação.

Digite uma tarefa e use Registrar ou Enter. Tarefas com o mesmo texto são permitidas e podem ser excluídas individualmente. Campos vazios ou só com espaços são rejeitados.

## Dados salvos

A lista usa a chave `@listaTarefas` no localStorage. Dados inválidos não impedem abrir a página. Se o navegador bloquear a gravação, aparece um aviso e a lista continua apenas na sessão atual. Não há conta, sincronização ou backend.

## Testes

Com Node.js 22 ou superior, execute `node --test script.test.cjs`. Os três testes usam um DOM simulado e verificam exclusão de duplicados, JSON inválido, entrada pelo teclado, espaços e armazenamento bloqueado. As verificações também rodam no GitHub em PRs e mudanças em main.

## Estrutura

- `index.html`: página e campo rotulado.
- `style.css`: aparência.
- `script.js`: renderização, eventos e armazenamento.
- `script.test.cjs`: regressões do comportamento.

A revisão visual em dispositivos diferentes complementa os testes de comportamento.
