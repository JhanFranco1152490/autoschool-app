# Funcionalidades Implementadas

## Backend

Se creó el endpoint para realizar todas las funcionalidadas CRUD al apartado de Cursos, para esto se modifico su serializer para agregarle las validaciones propuestas, se agregaron nuevos campos en el modelo que luego fueron migrados a la base de datos, se creó la viewSet de Cursos con filtros, busqueda y ordenamiento, y se registro en el router la ruta de courses para que se pudiera acceder a todos los endpoints, todo esto se vio reflejando en la documentacion automatica de drf-spectacular con Swagger.

## Frontend

Se creó un dashboard para cursos basandonos en el que habia para estudiantes con el cual podiamos ver reflejado el resultado de los endpoints de obtener y crear para el listado total de cursos, se crearón varios componentes nuevos (Input, Select, Form, Table, Dialog) para poder implementar los metodos de actualizar y borrar cursos especificos, para esto se creó un nuevo servicio para acceder a los endpoints de courses en la que agregamos los metodos de GET, POST, PATCH y DELETE. Tambien se modifico el layout y el lobby de dashboard para poder acceder a la nueva page de cursos, se usaron iconos de la libreria de lucide-react y se refactorizo gran parte del codigo en page para modularizarlo y crear componentes reutilizables y menos manuales para futuros dashboards.
