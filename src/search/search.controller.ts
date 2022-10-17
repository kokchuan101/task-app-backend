import { Body, Controller, Param, ParseEnumPipe, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { QueryFilterDto } from './dto/queryFilter.dto';
import { SearchResponseDto } from './dto/searchResponse.dto';
import { SearchableModule } from './enum/searchableModule.enum';
import { SearchService } from './search.service';

@ApiTags('search')
@Controller('search')
export class SearchController {
    constructor(private searchService: SearchService) {}

    @Post(':module')
    async search(
        @Param('module', new ParseEnumPipe(SearchableModule))
        module: SearchableModule,
        @Body() queryFilterDto: QueryFilterDto,
    ): Promise<SearchResponseDto> {
        return this.searchService.search(module, queryFilterDto);
    }
}
