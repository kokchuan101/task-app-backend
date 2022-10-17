import { Module } from '@nestjs/common';
import { TaskModule } from 'src/task/task.module';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';

@Module({
    imports: [TaskModule],
    controllers: [SearchController],
    providers: [SearchService],
})
export class SearchModule {}
