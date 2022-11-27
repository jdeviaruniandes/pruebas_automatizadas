## Issues:
Se han encontrado un total de 13 Issues reportadas en el [repositorio](https://github.com/jdeviaruniandes/pruebas_automatizadas/issues)


## [Descripción de generación de datos](https://github.com/jdeviaruniandes/pruebas_automatizadas/wiki/Generaci%C3%B3n-de-datos)
1. [Pool de datos a-priori](https://github.com/jdeviaruniandes/pruebas_automatizadas/wiki/Estrategia-A-priori)
2. [Pool de datos (pseudo aleatorios)](https://github.com/jdeviaruniandes/pruebas_automatizadas/wiki/Psudo-Aleatorio-Dinamico)
3. [Datos aleatorios dinámicos](https://github.com/jdeviaruniandes/pruebas_automatizadas/wiki/Aleatorios)



## Cómo ejecutar las pruebas:

 1. Cabe aclarar que tenemos ghost en una instancia en internet para correrlo desde cualquier navegador.
     - Endpoint: http://uniandes.ingenio.com.co:2368
 2. Hacer `npm install` dentro de la carpeta raíz. (recomendada versión de node v14.15.1)
 3. Ejecutar el comando `npm run cypress` para inciar pruebas de cypress.
 4. Seleccionar pruebas e2e y seleccionar en el navegador el archivo a correr.
 
 Nota: Se puede ejecutar `npm run test` directamente


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
* Cambiar información de la metadata de la p
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



