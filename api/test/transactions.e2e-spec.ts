import { Test, TestingModule }  from '@nestjs/testing';
import { INestApplication }     from '@nestjs/common';
import { getRepositoryToken }   from '@nestjs/typeorm';
import * as request             from 'supertest';
import { OwnersModule }         from '../src/owners/owners.module';
import { Owner }                from '../src/owners/entities/owner.entity';

describe('CarsController (e2e)', () => {
  let app: INestApplication;
  let newOwner: Owner;
  let owners: Owner[] = [];

  beforeEach(async () => {
    owners = [];

    newOwner = {
      id: "3",
      name: "Erizon",
      lastName: "Encina",
      documentNumber: 94059500
    }
  
    owners.push(
      {
        id: "1",
        name: "Elon",
        lastName: "Musk",
        documentNumber: null
      },
      {
        id: "2",
        name: "Bill",
        lastName: "Gates",
        documentNumber: null
      }
    )

    const moduleFixture: TestingModule = await Test.createTestingModule(
    {
      imports: [OwnersModule] 
    })
    .overrideProvider(getRepositoryToken(Owner))
    .useFactory({
      factory: () => ({
        find: jest.fn(() => new Promise((resolve) => resolve(owners))),
        findOne: jest.fn(
          ({ id, documentNumber }) =>
              new Promise((resolve) => {
                  const owner = owners.find(owner => (owner.documentNumber === documentNumber || owner.id === id));
                  if (owner)
                  {
                    resolve(owner);
                  }
                  resolve(null);
              })
        ),
        create: jest.fn(() => new Promise((resolve) => resolve(newOwner))),
        save: jest.fn((currentOwner: Owner) => new Promise((resolve) => resolve(currentOwner))),
        merge: jest.fn((currentOwner: Owner, newCarData: Owner) => new Promise((resolve) => {
          const ownerIndex = owners.findIndex(function (owner) {
              return owner.id === currentOwner.id;
            })
          owners[ownerIndex] = {
            ...currentOwner,
            ...newCarData
          }

          resolve(owners[ownerIndex])
        })),
        remove: jest.fn((currentOwner: Owner) => new Promise((resolve) => resolve(currentOwner)))
      })
    })
    .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/owners (GET)', () => {
    return request(app.getHttpServer())
      .get('/owners')
      .expect(200)
      .expect(owners);
  });

  it('/owners (POST)', () => {
    return request(app.getHttpServer())
      .post('/owners')
      .send(newOwner)
      .expect(201)
      .expect(newOwner);
  });

  /* it('/owners (POST) - duplicate documentNumber', () => {
    return request(app.getHttpServer())
      .post('/owners')
      .send(owners[0])
      .expect(function(res){
        res.body.message = "document number should be unique"
      })
      .expect(400);
  }); */

  it('/owners/:id (GET)', () => {
    return request(app.getHttpServer())
      .get('/owners/' + owners[1].id)
      .expect(owners[1])
      .expect(200);
  });

  it('/owners/:id (PATCH)', () => {
    const ownerForUpdate: Owner = {
      ...owners[0],
      name: "Elon Reeve"
    }

    return request(app.getHttpServer())
      .patch('/owners/' + owners[0].id)
      .send({ name: "Elon Reeve"})
      .expect(ownerForUpdate)
      .expect(200);
  });

  it('/owners/:id (DELETE)', () => {
    return request(app.getHttpServer())
      .delete('/owners/' + owners[0].id)
      .expect(owners[0])
      .expect(200);
  });
});
