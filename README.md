# Radio Avalancha

### Aplicación para la gestión de emision de radio

Requiere que se esté emitiendo radio desde otra plataforma de streaming para consumir los datos desde ahi

## Elementos de la aplicación:

- Reproductor
- Acceso mediante loggeo con Google
- Chat
- Slider de banners
- Panel de Administración:
  - Contador de visitas con boton de resetéo
  - Acceso restringido
  - CRUD para gestion del contenido del sitio: Slider, Chat, Informacion del programa
  - Boton switch para intercambiar la emisora de radio
- Todos los datos persisten a traves del uso de Firebase

_Para probar la aplicacion se requiere tener iniciado NPM y contar con las dependencias:_

- Bootstrap
- Firebase
- React
- React Bootstrap
- React Bootstrap Icons

_existe un archivo en "public" denominado REDIRECTS que sire para el caso en que se requiera hacer deploy en netlify y dicha plataforma no permita el consumo de recursos que no sean "https", es decir que no cuenten con certificado SSL como por ejemplo la radio para la cual fue pensada ésta aplicacion. En dicho caso habria que igualar el "src" de la etiqueta "audio" a "/api/" y en el archivo REDIRECTS reemplazar la URL por la que se desee utilizar, de ésta manera netlify no impedirá el consumo del recurso "http" sin la S del certificado SSL_
