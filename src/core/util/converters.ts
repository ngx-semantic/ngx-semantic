/**
 * Created by bolorundurowb on 2/4/2021
 */

import {coerceBooleanProperty} from '@angular/cdk/coercion';
import {SuiAny} from 'ngx-semantic/core/types';

export function toBoolean(value: boolean | string): boolean {
  return coerceBooleanProperty(value);
}

function propDecoratorFactory<T, D>(name: string, fallback: (v: T) => D): (target: SuiAny, propName: string) => void {
  function propDecorator(target: SuiAny, propName: string, originalDescriptor?: TypedPropertyDescriptor<SuiAny>): SuiAny {
    const privatePropName = `$$__${propName}`;

    if (Object.prototype.hasOwnProperty.call(target, privatePropName)) {
      console.warn(`The prop "${privatePropName}" already exists, it will be overridden by ${name} decorator.`);
    }

    Object.defineProperty(target, privatePropName, {
      configurable: true,
      writable: true
    });

    return {
      get(): string {
        return originalDescriptor && originalDescriptor.get ? originalDescriptor.get.bind(this)() : this[privatePropName];
      },
      set(value: T): void {
        if (originalDescriptor && originalDescriptor.set) {
          originalDescriptor.set.bind(this)(fallback(value));
        }
        this[privatePropName] = fallback(value);
      }
    };
  }

  return propDecorator;
}

export function InputBoolean(): SuiAny {
  return propDecoratorFactory('InputBoolean', toBoolean);
}
