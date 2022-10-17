import * as moment from 'moment';
import { Task } from '../../task/entities/task.entity';
import { setSeederFactory } from 'typeorm-extension';

export default setSeederFactory(Task, (faker) => {
    const task: Task = new Task();

    task.name = faker.random.words(3);
    task.description = faker.lorem.sentence();

    const date = faker.date.between(
        moment().subtract(1, 'month').toISOString(),
        moment().add(1, 'month').toISOString(),
    );

    task.dueDate = moment(date).startOf('day').toDate();

    return task;
});
