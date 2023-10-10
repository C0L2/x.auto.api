import { BadGatewayException, BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Furnizori } from './furnnizori.entity';

@Injectable()
export class FurnizorService {

    constructor(@InjectRepository(Furnizori) private repo: Repository<Furnizori>) { }

    async create(
        provider_name: string,
        provider_adress: string,
        provider_email: string,
        provider_phone: string
    ) {
        const check = await this.repo.findOne({ where: { provider_name } })
        if (check) throw new BadRequestException('Thi provider already exists')

        const provider = this.repo.create({
            provider_name,
            provider_adress,
            provider_email,
            provider_phone,
        });
        return this.repo.save(provider);
    }

    async getAllProviders(): Promise<Furnizori[]> {
        return await this.repo.find();
    }

    async getProviderByName(provider_name: string) {
        const provider = await this.repo.findOne({ where: { provider_name } })
        return provider
    }

    async updateProviderById(
        id: number,
        updatedProviderData: Partial<Furnizori>
    ): Promise<Furnizori> {
        const existingProvider = await this.repo.findOne(id);

        if (!existingProvider) {
            throw new NotFoundException(`Provider with id ${id} not found`);
        }

        this.repo.merge(existingProvider, updatedProviderData);

        return this.repo.save(existingProvider);
    }

    async remove(provider_id: number) {
        const provider = await this.repo.findOne({ where: { provider_id } });
        if (!provider) {
            throw new Error('This provider was not found');
        }
        return this.repo.remove(provider);
    }
}
