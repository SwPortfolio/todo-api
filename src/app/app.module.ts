import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from "../core/core.module";
import { FeatureModule } from "../feature/feature.module";
import { SharedModule } from "../shared/shared.module";

@Module({
  imports: [CoreModule, FeatureModule, SharedModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
