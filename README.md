# Pickit Challenge

## Installation

Levantar contenedores

```bash
docker-compose up -d
```

Correr migraciones para generar estructura de base de datos y cargar datos semilla

```bash
docker-compose exec api bash
npm run migrations:run
```

## Servicios disponibles
El frontend corre en: [http://localhost:8080](http://localhost:8080)

El backend corre en: [http://localhost:8000](http://localhost:8000)


## Notas
* Debes tener instalado docker en tu pc y los puertos mencionados en el punto anterior deben estar disponibles

* Las imágenes de los servicios están pensadas para el desarrollo local y se ha compartido el archivo