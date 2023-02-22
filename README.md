
# Декоратор для заполнения свойст через ENV-переменные


## Пример легаси использования

```typescript
import { EnvProperty, StringValue } from '@wspro/env';

class EnvConfig {
  @EnvProperty('ENV_STRING', StringValue)
  public strValue!: string;
}

const config = new EnvConfig();

config.strValue; // значение из ENV-переменой
config.strValue = 'new value'; // Error
```

## Вариант с @wspro/di

```typescript
// файл config.ts

import { Injectable } from '@wspro/di';
import { EnvProperty, StringValue } from '@wspro/env';

@Injectable()
export class EnvConfig {
  @EnvProperty('ENV_STRING', StringValue)
  public strValue!: string;
}
```

```typescript
// файл application.ts

import { Application } from '@wspro/di';
import { EnvConfig } from './config';

@Application()
export class AppService {
  constructor(private config: EnvConfig) {}

  // Рабочие методы класса приложения
  public startApplication(): void {
    this.config.strValue; // значение из ENV-переменой
    ...
  }
}
```

```typescript
// файл main.ts

import { AppFactory } from '@wspro/di';
import { AppService } from './application';

async function bootstrap(): Promise<void> {
  const app = await AppFactory.create<AppService>(AppService);
  app.startApplication();
}

bootstrap().catch((error) => console.error(error));

```
