# Integração OpenAI para gerar imagem do personagem

Este projeto usa a API da OpenAI diretamente no navegador para gerar a imagem final do personagem. As informações digitadas no bloco de integração ficam apenas em memória durante a sessão: ao atualizar a página, você precisará informar tudo novamente.

> **Atenção:** usar a chave de API no navegador expõe a chave para quem estiver usando a aplicação. Para produção, prefira criar um backend próprio que receba o prompt do frontend e chame a OpenAI pelo servidor.

## 1. Criar ou acessar sua conta

1. Acesse <https://platform.openai.com/>.
2. Faça login ou crie uma conta.
3. Configure uma forma de pagamento, se necessário, em **Billing**.
4. Confira se sua organização/projeto tem permissão para usar modelos de imagem. Alguns modelos GPT Image podem exigir verificação da organização.

## 2. Gerar a chave de API

1. Acesse <https://platform.openai.com/api-keys>.
2. Clique em **Create new secret key**.
3. Dê um nome identificável, por exemplo `ficha-personagem-local`.
4. Copie a chave exibida. Ela normalmente começa com `sk-`.
5. Guarde a chave em um local seguro. A OpenAI não exibirá a chave completa novamente depois que você fechar a tela.

## 3. Preencher o bloco inicial da aplicação

Ao abrir a página, preencha:

- **Chave da API OpenAI:** sua chave secreta criada no painel da OpenAI.
- **Modelo de imagem:** por padrão, use `gpt-image-2`. Se sua conta não tiver acesso, tente outro modelo GPT Image disponível para seu projeto.
- **Tamanho:** escolha a proporção desejada. `1024x1024` gera uma imagem quadrada; `1024x1536` favorece retratos verticais.
- **Qualidade:** `high` prioriza qualidade; `medium` e `low` podem reduzir custo/tempo; `auto` deixa a API decidir.

Clique em **OK**. O bloco some e só volta se você atualizar a página.

## 4. Gerar imagem

1. Complete raça, classe, habilidades, aparência e história.
2. Na aba **História**, revise o campo **Equipamento**. A geração usa este campo, não a lista padrão da raça ou classe.
3. Clique em **GERAR IMAGEM** no final da aba História.
4. Aguarde o loader terminar. A imagem será renderizada na própria página.

## 5. Segurança e boas práticas

- Não publique sua chave em repositórios, prints, vídeos ou mensagens.
- Se suspeitar que a chave vazou, revogue-a em <https://platform.openai.com/api-keys> e crie uma nova.
- Em produção, não chame a OpenAI diretamente do navegador. Use um servidor intermediário para proteger a chave.
- Monitore custos e limites no painel da OpenAI.
