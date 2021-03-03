import { ISmartMeterReadingsAdapter } from '@energyweb/origin-backend-core';
import { ConfigurationModule } from '@energyweb/origin-backend';
import { DynamicModule, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DeviceController } from './device.controller';
import { Device } from './device.entity';
import { DeviceService, SM_READS_ADAPTER } from './device.service';
import { ValidateDeviceOwnershipQueryHandler } from './handlers/validate-device-ownership.handler';

@Module({})
export class DeviceModule {
    static register(smartMeterReadingsAdapter: ISmartMeterReadingsAdapter): DynamicModule {
        return {
            module: DeviceModule,
            imports: [TypeOrmModule.forFeature([Device]), ConfigurationModule, CqrsModule],
            providers: [
                {
                    provide: SM_READS_ADAPTER,
                    useValue: smartMeterReadingsAdapter
                },
                DeviceService,
                ValidateDeviceOwnershipQueryHandler
            ],
            controllers: [DeviceController],
            exports: [DeviceService]
        };
    }
}
