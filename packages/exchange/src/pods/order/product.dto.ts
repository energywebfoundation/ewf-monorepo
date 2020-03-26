// eslint-disable-next-line max-classes-per-file
import { DeviceVintage, Operator, Product } from '@energyweb/exchange-core';
import { Min, ValidateNested, IsDateString } from 'class-validator';

export class DeviceVintageDTO {
    @Min(1900)
    public year: number;

    public operator?: Operator;
}

export class ProductDTO {
    public deviceType?: string[];

    public location?: string[];

    @ValidateNested()
    public deviceVintage?: DeviceVintageDTO;

    @IsDateString()
    public generationFrom?: string;

    @IsDateString()
    public generationTo?: string;

    public static toProduct(dto: ProductDTO): Product {
        return {
            ...dto,
            deviceVintage: dto.deviceVintage
                ? new DeviceVintage(dto.deviceVintage.year, dto.deviceVintage.operator)
                : null,
            generationTime:
                dto.generationFrom && dto.generationTo
                    ? { from: new Date(dto.generationFrom), to: new Date(dto.generationFrom) }
                    : null
        };
    }
}
