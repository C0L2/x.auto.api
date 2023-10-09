import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Furnizori } from './furnizor.entity';

@Injectable()
export class FurnizorService {

    constructor(@InjectRepository(Furnizori) private repo: Repository<Furnizori>) { }

    async create(
        provider_name: string,
        provider_adress: string,
        provider_email: string,
        provider_phone: string
    ) {
        const provider = this.repo.create({
            provider_name,
            provider_adress,
            provider_email,
            provider_phone,
        });
        return this.repo.save(provider);
    }
}
