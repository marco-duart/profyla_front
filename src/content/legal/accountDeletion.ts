// Orientações públicas para pedir a exclusão da conta (a loja de apps exige uma página pública com isso).
// Markdown restrito: títulos, listas e parágrafos (ver utils/markdown.ts). Os fatos aqui vêm de
// profyla_api/app/services/account/{delete_account,anonymize_user}.rb: se a exclusão mudar, atualize este texto.
export const ACCOUNT_DELETION_UPDATED_AT = "1 de novembro de 2026";

export const accountDeletionContent = `# Exclusão de conta no Profyla

Última atualização: ${ACCOUNT_DELETION_UPDATED_AT}.

Você pode pedir a exclusão da sua conta e dos seus dados no Profyla quando quiser, de três formas: pelo aplicativo, pelo site ou por e-mail.

## 1. Pelo aplicativo (mais rápido)

- Abra o app Profyla e entre na sua conta.
- Toque na aba Perfil e depois em "Privacidade e e-mails".
- Role até o fim da tela e toque em "Excluir minha conta".
- Digite EXCLUIR e a sua senha para confirmar, e toque em "Excluir para sempre".

## 2. Pelo site

- Entre na sua conta em profyla.app.br.
- Abra a página Conta e vá até a seção "Privacidade e dados".
- Clique em "Excluir minha conta", digite a sua senha e confirme.

## 3. Por e-mail

Use esta opção se você não consegue entrar (esqueceu a senha, perdeu o acesso ao app) ou se prefere pedir a um atendente.

- Escreva para [maaxis.tech@gmail.com](mailto:maaxis.tech@gmail.com) com o assunto "Exclusão de conta Profyla".
- Envie o pedido a partir do e-mail cadastrado na sua conta. É assim que confirmamos que a conta é sua. Se o e-mail for outro, podemos pedir uma confirmação adicional.
- Informe o seu nome completo, como está no cadastro.
- Nunca envie a sua senha por e-mail. Nós não pedimos senha.
- Respondemos em até 15 dias, confirmando a exclusão ou explicando o que falta.

## 4. O que acontece com os seus dados

Apagamos:

- o seu perfil e o currículo, incluindo o arquivo em PDF, a foto e os documentos anexados;
- experiências, formação, habilidades, conhecimentos e links;
- os resultados dos testes DISC e Eneagrama;
- as notificações;
- os textos livres das suas candidaturas: comentários de recrutadores, mensagens de entrevista e respostas de formulários.

Anonimizamos: o seu nome, e-mail, CPF, telefone e demais dados de identificação deixam de existir na conta, que passa a se chamar "Usuário anonimizado".

Mantemos, sem identificar você: apenas o histórico numérico das candidaturas (etapa, datas e resultado), para estatísticas do processo seletivo. Registros de acesso podem ser guardados pelo prazo exigido em lei (Marco Civil da Internet).

## 5. Antes de pedir

- A exclusão é definitiva: não dá para desfazer nem recuperar a conta.
- As candidaturas em andamento deixam de ter os seus dados, e os recrutadores não conseguem mais falar com você por elas.
- Se quiser guardar uma cópia, use antes "Exportar meus dados" em "Privacidade e e-mails" (no app) ou em "Privacidade e dados" (no site).
- Você pode usar o mesmo e-mail e CPF para criar uma nova conta depois.
- Contas de recrutadores e da equipe do Profyla só podem ser removidas pela equipe técnica: peça por e-mail.

## 6. Dúvidas

Fale com a gente em [maaxis.tech@gmail.com](mailto:maaxis.tech@gmail.com). Para saber como tratamos os seus dados, leia a [Política de Privacidade](/privacidade).
`;
