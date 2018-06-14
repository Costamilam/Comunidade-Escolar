# Comunidade-Escolar
Projeto final S2B Desenvolvimento Web com JavaScript - criação de API com Node.js e MongoDB baseada no dataPOA consumida com AngularJS

Antes de começar verifique se o servidor de banco de dados MongoDB está inicializado e funcionando

Para importar os dados:

    - Entre na pasta '/importExportData';
    - Execute o arquivo 'importData.js' com o comando 'node importData.js';
    - Após a importação, se tudo ocorrer bem, os dados que estavam nos arquivos serão importados para o banco MongoDB.

Para iniciar o projeto:

    - Entre na pasta '/backend';
    - Execute o arquivo 'router.js' com o comando 'node router.js';
    - Após a inicialização, se tudo ocorrer bem, o sistema estará funcionando localmente na porta 3000 ('localhost:3000').

Para exportar os dados:

    - Entre na pasta '/importExportData';
    - Execute o arquivo 'exportData.js' com o comando 'node exportData.js';
    - Após a exportação, se tudo ocorrer bem, os arquivos 'dataEvent.josn', 'dataUser.josn' e 'dataTeachingInstitute.josn' terão os dados do banco salvos no formato JSON.
