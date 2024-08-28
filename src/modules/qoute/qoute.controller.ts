import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Put,
  Query,
} from '@nestjs/common';
import { QouteService } from './qoute.service';
import { CreateQouteDto } from './dto/create-qoute.dto';
import { UpdateQouteDto } from './dto/update-qoute.dto';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
import { JwtAuthCheckRoleGuard } from 'src/guard/jwt-check-role.guard';
import { QouteEntity } from 'src/config/database/entities/qoute.entity';
import { VoteQouteDto } from './dto/vote-qoute.dto';

@Controller('qoute')
export class QouteController {
  constructor(private readonly qouteService: QouteService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(
    @Query('sortBy') sortBy: string = 'id',
    @Query('sortOrder') sortOrder: 'ASC' | 'DESC' = 'ASC',
    @Query('filter') filter: string = '{}',
    @Query('search') search: string = '',
  ) {
    let parsedFilter;
    try {
      parsedFilter = JSON.parse(filter);
    } catch (error) {
      parsedFilter = {};
    }

    return this.qouteService.findQoute(sortBy, sortOrder, parsedFilter, search);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createQouteDto: CreateQouteDto) {
    return this.qouteService.create(createQouteDto);
  }

  @Post('vote')
  @UseGuards(JwtAuthGuard)
  vote(@Body() voteQouteDto: VoteQouteDto, @Request() req) {
    const userId = req.user.userId;
    voteQouteDto.user_id = userId;
    return this.qouteService.voteQoute(voteQouteDto);
  }
  @Put(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateQouteDto: UpdateQouteDto) {
    return this.qouteService.updateQoute(id, updateQouteDto);
  }
  @Delete(':id')
  @UseGuards(JwtAuthCheckRoleGuard)
  delteQoute(@Param('id') id: string) {
    return this.qouteService.deleteQoute(id);
  }
}
