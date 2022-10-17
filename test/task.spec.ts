import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskModule } from '../src/task/task.module';
import { faker } from '@faker-js/faker';
import { CreateTaskDto } from '../src/task/dto/createTask.dto';
import { ConfigModule } from '@nestjs/config';
import { Task } from '../src/task/entities/task.entity';

describe('Tasks Module Test', () => {
    const expectedTask: CreateTaskDto = {
        name: faker.random.words(3),
        description: faker.lorem.sentence(),
        dueDate: new Date(),
    };

    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [
                ConfigModule.forRoot(),
                TypeOrmModule.forRoot({
                    type: 'mysql',
                    dropSchema: true,
                    host: process.env.DB_HOST,
                    port: parseInt(process.env.DB_PORT),
                    username: process.env.DB_USERNAME,
                    password: process.env.DB_PASSWORD,
                    entities: [Task],
                    database: 'test',
                    synchronize: true,
                }),
                TaskModule,
            ],
        }).compile();

        app = moduleFixture.createNestApplication();
        app.useGlobalPipes(new ValidationPipe());
        await app.init();
    });

    it('Successfully create task [POST /task]', () => {
        return request(app.getHttpServer())
            .post('/task')
            .send(expectedTask)
            .expect(201)
            .then(({ body }) => {
                expect(body.name).toEqual(expectedTask.name);
                expect(body.description).toEqual(expectedTask.description);
                expect(body.dueDate).toEqual(
                    expectedTask.dueDate.toISOString(),
                );
            });
    });

    it('Return 400 status code for validation error [POST /task]', () => {
        return request(app.getHttpServer())
            .post('/task')
            .send({ name: 1 })
            .expect(400);
    });

    it('Successfully find task by id [GET /task/:id]', () => {
        return request(app.getHttpServer())
            .get('/task/1')
            .expect(200)
            .then(({ body }) => {
                expect(body).toBeDefined();
            });
    });

    it('Return 404 not found for non existent id [GET /task/:id]', () => {
        return request(app.getHttpServer()).get('/task/2').expect(404);
    });

    it('Return 400 for invalid id param [GET /task/:id]', () => {
        return request(app.getHttpServer()).get('/task/asd').expect(400);
    });

    const updatedDescription = { description: faker.lorem.sentence() };
    it('Successfully update task [PUT /task/:id]', () => {
        return request(app.getHttpServer())
            .put('/task/1')
            .send(updatedDescription)
            .expect(200)
            .then(({ body }) => {
                expect(body.name).toEqual(expectedTask.name);
                expect(body.description).toEqual(
                    updatedDescription.description,
                );
            });
    });

    it('Return 400 status code for validation error [PUT /task/:id]', () => {
        return request(app.getHttpServer())
            .put('/task/1')
            .send({ dueDate: 'abc' })
            .expect(400);
    });

    it('Delete one user [DELETE /task/:id]', () => {
        return request(app.getHttpServer()).delete('/task/1').expect(200);
    });

    afterAll(async () => {
        await app.close();
    });
});
