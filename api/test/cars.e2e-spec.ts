import { Test, TestingModule }  from '@nestjs/testing';
import { INestApplication }     from '@nestjs/common';
import { getRepositoryToken }   from '@nestjs/typeorm';
import * as request             from 'supertest';
import { CarsModule }           from '../src/cars/cars.module';
import { Car }                  from '../src/cars/entities/car.entity';

describe('CarsController (e2e)', () => {
  let app: INestApplication;
  let newCar: Car;
  let cars: Car[] = [];

  beforeEach(async () => {
    cars = [];

    newCar = {
      id: "ghi789",
      patent: "456DEF",
      model: "Corolla",
      brand: "Toyota",
      ownerId: "1",
      ownerName: "Test",
      year: 2012,
      color: "white",
      createAt: (new Date),
      updateAt: (new Date)
    }
  
    cars.push(
      {
        id: "abc123",
        patent: "HMX463",
        brand: "Fiat",
        model: "Punto",
        year: 2008,
        color: "Negro",
        ownerId: "1",
        ownerName: "Test",
        createAt: (new Date),
        updateAt: (new Date)
      },
      {
        id: "def456",
        patent: "AAA111",
        brand: "Fiat",
        model: "Punto",
        year: 2009,
        color: "Negro",
        ownerId: "1",
        ownerName: "Test",
        createAt: (new Date),
        updateAt: (new Date)
      }
    )

    const moduleFixture: TestingModule = await Test.createTestingModule(
    {
      imports: [CarsModule] 
    })
    .overrideProvider(getRepositoryToken(Car))
    .useFactory({
      factory: () => ({
        find: jest.fn(() => new Promise((resolve) => resolve(cars))),
        findOne: jest.fn(
          ({ id, patent }) =>
              new Promise((resolve) => {
                  const car = cars.find(car => (car.patent === patent || car.id === id));
                  if (car)
                  {
                    resolve(car);
                  }
                  resolve(null);
              })
        ),
        create: jest.fn(() => new Promise((resolve) => resolve(newCar))),
        save: jest.fn((currentCar: Car) => new Promise((resolve) => resolve(currentCar))),
        merge: jest.fn((currentCar: Car, newCarData: Car) => new Promise((resolve) => {
          const carIndex = cars.findIndex(function (car) {
              return car.id === currentCar.id;
            })
          cars[carIndex] = {
            ...currentCar,
            ...newCarData
          }

          resolve(cars[carIndex])
        })),
        remove: jest.fn((currentCar: Car) => new Promise((resolve) => resolve(currentCar)))
      })
    })
    .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/cars (GET)', () => {
    return request(app.getHttpServer())
      .get('/cars')
      .expect(200)
      .expect(cars);
  });

  it('/cars (POST)', () => {
    return request(app.getHttpServer())
      .post('/cars')
      .send(newCar)
      .expect(201)
      .expect(newCar);
  });

  it('/cars (POST) - duplicate patent', () => {
    return request(app.getHttpServer())
      .post('/cars')
      .send(cars[0])
      .expect(function(res){
        res.body.message = "patent should be unique"
      })
      .expect(400);
  });

  it('/cars/:id (GET)', () => {
    return request(app.getHttpServer())
      .get('/cars/' + cars[1].id)
      .expect(cars[1])
      .expect(200);
  });

  it('/cars/:id (PATCH)', () => {
    const carForUpdate = {
      ...cars[0],
      color: "Blanco"
    }

    return request(app.getHttpServer())
      .patch('/cars/' + cars[0].id)
      .send({ color: "Blanco"})
      .expect(carForUpdate)
      .expect(200);
  });

  it('/cars/:id (DELETE)', () => {
    return request(app.getHttpServer())
      .delete('/cars/' + cars[0].id)
      .expect(cars[0])
      .expect(200);
  });
});
