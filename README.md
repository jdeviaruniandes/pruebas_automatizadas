## Descripción de las funcionalidades de GHOST que se incluyen en las pruebas de esta semana.
1. Cambios asociados al perfil como:
    - Nombre
    - Bio
    - Contraseña
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

 1. Cabe aclarar que tenemos dos versiones de ghost en una instancia en internet para correrlo desde cualquier navegador.
     - Endpoint primera versión: http://uniandes.ingenio.com.co:2368
     - Endpoint segunda versión: http://uniandes.ingenio.com.co:2367
 2. Hacer `npm install` dentro de la carpeta raíz. (recomendada versión de node v14.15.1)
 3. Ejecutar el comando npm run kraken para iniciar pruebas de kraken.
 4. Ejecutar el comando npm run cypress para inciar pruebas de cypress.
     - Nota: Si se quieren ejecutar las pruebas de cypress con la primera versión de ghost, se debe usar el puerto: 2368
             Si se quieren ejecutar las pruebas de cypress con la segunda versión de ghost, se debe usar el puerto: 2367
             Cambiando la variable en cada archivo de cypress ghost versión old/new según corresponda.
 5. Seleccionar pruebas e2e y seleccionar en el navegador el archivo a correr.


## Información del ghost
Si bien el ghost que se encuentra publicado es de pruebas y se es libre de ejecutar las pruebas sobre este, si se desea hacer
pruebas locales replicando la maquina virtual, las carácteristicas de esta son:

- Procesador: 12 x Intel(R) Xeon(R) CPU E5-1650 v4 @ 3.60GHz (1 Socket)
- RAM: 64GB
- SSD: 1TB
- OS: CentOS Linux release 8.3.2011

### GHOST OLD: 

    Version 3.42.9
    Environment production
    Database sqlite3
    Mail Direct
    Ghost-CLI version: 1.23.1
    NodeJS v14.17.0
    Docker version 20.10.21

### GHOST NEW:

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

# Reportes
## Reporte con Backstop
### Requisitos
    - BackstopJS v6.1.4
    - Node 16.18.0
    - Navegador web
### Pasos a seguir
1. El reporte ya esta generado, se puede consultar desde la carpeta raiz, dirigiendose a "backstop_data/html_report/index.html" abriendo el archivo con el navegador de su preferencia
2. En la carpeta raiz del proyecto ejecutar ```backstop test```
3. El programa ejecutará el reporte y automaticamente te mostrará las diferencias, puedes volver al paso 1 si tu navegador no se abrio solo


## Como ejecutar el Visual Regression Testing con Resemble
### Requisitos
    - Resemble v4.1.0
    - Node 14.21.0
    - Navegador web
### Pasos a seguir
1. El reporte ya esta generado, se puede consultar desde la carpeta raiz, dirigiendose a "results_resemble/report.html" abriendo el archivo con el navegador de su preferencia
2. Es importante tener todos los paquetes del proyecto para esto ejecute **"npm install"**
3. Se crearon varios scripts en el packaje.json para automatizar el proceso **que se ejecutan desde la carpeta principal del repo**

    - **npm run resemble** -> Ejecuta la comparación de las imagenes y crear un reporte en la carpeta results_resemble 
    - **npm run resemble_results** -> Abre el reporte generado en HTMl (se probo en Mac posiblemente no funcione en windows)
    - **npm run resemble_all** -> combina los dos anterioes, hace la comparación, crear el reporte y lo abre. (se probo en Mac posiblemente no funcione en windows)
    
4. Ejecute los comandos segun su conveniencia si esta en mac se recomienda ejecutar **'npm run resemble_all'** ya que se ejecutara el proceso completo. Puede que en windows toque ejecutar **'npm run resemble'** y luego abrir el reporte manualmente con el explorador de archivos 

