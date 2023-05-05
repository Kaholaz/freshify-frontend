import type { Ref } from "vue";
import { ref } from "vue";

import type { AxiosResponse } from "axios";

export type ComposableResult<T> = {
  data: Ref<T | null>;
  error: Ref<Error | null>;
};

export function runApiRequest<T>(promise: Promise<AxiosResponse<T>>): ComposableResult<T> {
  const data = ref<T | null>(null) as Ref<T | null>;
  const error = ref<Error | null>(null) as Ref<Error | null>;

  promise
    .then((response) => response.data)
    .then((responseData) => {
      data.value = responseData;
    })
    .catch((err) => {
      error.value = err;
    });

  return {
    data,
    error,
  };
}
