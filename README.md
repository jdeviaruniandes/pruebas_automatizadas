## Issues:
1. Se puede crear una locación númerica, se espera que sea al menos letras.
2. Cuando se agrega una locación con más de 200 caracteres sale el error "Location is too long" pero no se retroalimenta el número máximo de caracteres. 
3. Cuando se intenta agregar una contraseña con solo números, se obtiene el error "Sorry, you cannot use an insecure password" pero no se retroalimenta al usuario qué es una contraseña insegura. 
4. Cuando se intenta agregar un nombre de más de 200 caracteres se obtiene el error "Name is too long" pero no se retroalimenta el número máximo de caracteres. 
5. Cuando intento cambiar el nombre del blog por uno mayor a 200 caracteres se cambia el header de la página así haya salido el error de que el nombre es muy alrgo generando confusión. 

## Descripción de generación de datos:
1. pool de datos a-priori: Usando el json generado del mockaroo.
2. pool de datos (pseudo): Usando la api de mockaroo a un esquema creado.
3. aleatorio dinámico: Usando la librería faker.js con sus métodos.


## Descripción de las funcionalidades de GHOST que se incluyen en las pruebas de esta semana.
1. Cambios asociados al perfil como:
    - Nombre
    - Bio
    - Contraseña
    - Página web
    - Locación
2. Cambios asociados al website:
   - Cambiar el titulo
   - Agregar y eliminar un menú
   - Enviar y eliminar una invitación al staff
3. Cambios asociados a la funcianlidad de Post (publicaciones) en la aplicación:
    - Crear un nuevo post
    - Editar un post existente que se encunetre publicado
    
4. Cambios asociados a la funcianlidad de Tags(Etiquetas) que permite clasificar publicaciones por categoria:
    - Crear un nuevo Tag
    - Editar un tag Existente
    - Eliminar un tag luego de crearlo

## Cómo ejecutar las pruebas:

 1. Cabe aclarar que tenemos ghost en una instancia en internet para correrlo desde cualquier navegador.
     - Endpoint: http://uniandes.ingenio.com.co:2368
 2. Hacer `npm install` dentro de la carpeta raíz. (recomendada versión de node v14.15.1)
 3. Ejecutar el comando npm run cypress para inciar pruebas de cypress.
 4. Seleccionar pruebas e2e y seleccionar en el navegador el archivo a correr.


## Información del ghost
Si bien el ghost que se encuentra publicado es de pruebas y se es libre de ejecutar las pruebas sobre este, si se desea hacer
pruebas locales replicando la maquina virtual, las carácteristicas de esta son:

- Procesador: 12 x Intel(R) Xeon(R) CPU E5-1650 v4 @ 3.60GHz (1 Socket)
- RAM: 64GB
- SSD: 1TB
- OS: CentOS Linux release 8.3.2011



### GHOST:

    Version: 5.19.0
    Environment: production
    Database: sqlite3
    Mail: Direct
    Ghost-CLI version: 1.23.1
    NodeJS v16.18.0
    Docker version 20.10.21

## Funcionalidades contempladas
* Iniciar sesión
* Entrar al perfil
* Cambiar nombre 
* Cambiar contraseña
* Cambiar biografia
* Cambiar el titulo de la página
* Crear un menú en la página
* Eliminar último menú en la página
* Invitación y eliminación de invitación al staff
* Invitación al staff de un usuario registrado
* Crear boletin
* Cancelar creacion de boletin
* Crear pagina
* Cancelar creacion de pagina
* Editar pagina
* Crear Post
* Editar Post 
* Crear Tag
* Editar Tag
* Eliminar Tag



