# Certified Tech Dev - Proyecto Integrador

# INTEGRANTES
>-Brenda Calzada
>-Fernando Castillo
>-Jorge Corredor
-Joan Gonzalez
-Santino Lamberti
-Gonzalo Sibona

## TECNOLOGÍAS
-Visual Studio Code
-IntelliJ IDEA
-Spring boot
-React
-React-Testing Library
-Postman
-Enzyme
-Jest
-MySql
-Gitlab
-Amazon Web Services
-Swagger
-JsonWebToken

# SCRIPT
Pasos para poder correr el proyecto:
-git clone https://gitlab.com/proyecto-integrador-0321/camada-4/grupo-3.git
-cd grupo-3

Front-end
-cd Frontend/auto-app
-npm install
-npm start

Back-end
-cd Backend/Proyecto.Integrador.Grupo3
-mvn clean
-mvn package
-cd target
-java -jar Proyecto.Integrador-0.0.1-SNAPSHOT.jar

Testing
Para correr todos los tests ejecutamos: npm run test.
Coverage: npm test -- --coverage --watchAll


# USO
El proyecto consiste en una  página web con el fin de reservar autos por fecha en determinada ciudad. Lo primero que debemos hacer es dirigirnos al siguiente link: http://www.digitalcars.com.s3-website.us-east-2.amazonaws.com/. Para esto, incluímos un sistema de filtro basado en fechas y en ciudades. Una vez que filtramos, podemos elegir la opción que más nos guste. Lo bueno de los filtros es que también sacan los autos que ya están reservados en las fechas que seleccionaste. Una vez encontrado el producto, dandole click en "Ver detalle", nos llevara a la página del producto donde podremos encontrar su información, los detalles, como cuantas personas entran e incluso las políticas del mismo. También nos aparecerá un mapa con las fechas en las que el vehículo ya está reservado y un mapa de la ciudad en la que se encuentra. Una vez que estemos seguros del prodcuto, podremos darle al botón de "iniciar reserva", el cual nos redirigirá a la página para completar los datos y hacer la reserva o en caso de no estar logueado te pedirá que inices sesión o de registrarse si no cuentas con una cuenta ya creada, ya que no es posible hacer una reserva si no estamos con la sesión inciada. Cuando estamos en la página de reserva, nos aparecerán 4 campos, 3 ya rellenados con la info dada al registrarte y otro para rellenar que es la ciudad en la que está actualmente. Además abajo tendrá un calendario a su disposición para seleccionar el rango de fechas en el que va a solicitar la reserva del auto y por último un campo de selección, donde tendremos que elegir el horario en el que queremos que esté disponible el vehículo. Si todo está correcto, su reserva se creará exitosamente y le aparecerá un cartel de éxito, que al clickear el boton de confirmar, lo llevará a la página principal, donde en la esquina superior derecha podrá ver un botón que dice "mis reservas" y podrá visualizar ahí las mismas. Es obligatorio llenar todos los campos, sino no podrá hacer la reserva.

# Testing
Si nos dirigimos a la carpeta de testing, veremos que se encuentran unos archivos. 1 es un PDF con el Testing exploratorio completo, otro es un archivo con el siguiente link: https://docs.google.com/spreadsheets/d/1AtMytvk5z6y-1y9_Nag1CNSlAjbJQYvEZvcdEfQHAuI/edit#gid=1844193097. Este link nos lleva a un archivo de google sheets en el que se encuentran todos los defectos y los casos de prueba que fuimos escribiendo a lo largo de los 4 sprints más todas las tablas que pedía el informe. Además contamos con un informe general del testing: https://docs.google.com/document/d/1TIpQ_tEpAozsHe-KEXfSIA4k4NdJgNr_hBrwHok_me4/edit#.
En el VS Code, si queremos implementar los tests y ver el porcentaje de cobertura, podemos ejecutar el siguiente comando: npm test -- --coverage --watchAll

# Links
-Página hosteada: http://www.digitalcars.com.s3-website.us-east-2.amazonaws.com/
-Informe Testing: https://docs.google.com/document/d/1TIpQ_tEpAozsHe-KEXfSIA4k4NdJgNr_hBrwHok_me4/edit#
-Casos de prueba y defectos: https://docs.google.com/spreadsheets/d/1AtMytvk5z6y-1y9_Nag1CNSlAjbJQYvEZvcdEfQHAuI/edit#gid=1844193097
-Swagger: http://localhost:8080/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/
