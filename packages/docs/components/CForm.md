# CForm
`CForm` — это контейнер формы, который объединяет дочерние поля в единый контекст валидации.

Компонент не управляет значениями полей, не хранит состояние формы и не выполняет отправку данных. Его задача — предоставить API регистрации валидаторов дочерним компонентам и дать единый метод `validate()` для проверки всей формы целиком.

`CForm` особенно полезен как инфраструктурная обертка для компонентов, которые умеют самостоятельно регистрироваться в форме через `provide/inject`.

---

## Базовое использование

```vue

<script setup lang="ts">
  import { ref } from 'vue'

  const name = ref('')
  const email = ref('')

  function required(value: string) {
    return {
      valid: !!value,
      message: 'Поле обязательно',
    }
  }

  function emailRule(value: string) {
    return {
      valid: /.+@.+\..+/.test(value),
      message: 'Введите корректный email',
    }
  }

  async function submit(validate: () => Promise<boolean>) {
    const isValid = await validate()

    if (!isValid) return

    console.log('Форма валидна')
  }
</script>

<template>
  <c-form v-slot="{ validate }">
    <c-text-field
      v-model="name"
      label="Имя"
      :rules="[required]"
    />

    <c-text-field
      v-model="email"
      label="Email"
      :rules="[required, emailRule]"
    />

    <c-btn @click="submit(validate)">
      Отправить
    </c-btn>
  </c-form>
</template>
```

---

## Назначение

`CForm` нужен для следующих задач:

- объединить несколько полей в одну форму
- централизованно запускать валидацию всех подключенных полей
- предоставить единый метод `validate()` через `ref`
- предоставить тот же метод через slot props
- избежать ручной передачи валидаторов между уровнями компонентов

---

## Состав компонентов

`CForm` сам по себе состоит из одного корневого элемента:

- корневой `<form class="c-form">`
- default slot для содержимого формы
- slot prop `validate`
- expose API `validate`

Сам компонент не содержит подкомпонентов.

---

## Примеры

## Проверка через slot

```vue

<script setup lang="ts">
  import { ref } from 'vue'

  const value = ref('')

  function required(value: string) {
    return {
      valid: !!value,
      message: 'Обязательное поле',
    }
  }
</script>

<template>
  <c-form v-slot="{ validate }">
    <c-text-field
      v-model="value"
      label="Название"
      :rules="[required]"
    />

    <c-btn @click="validate">
      Проверить
    </c-btn>
  </c-form>
</template>
```

## Проверка через template ref

```vue

<script setup lang="ts">
  import { ref } from 'vue'

  const formRef = ref<InstanceType<typeof CForm> | null>(null)
  const login = ref('')
  const password = ref('')

  function required(value: string) {
    return {
      valid: !!value,
      message: 'Поле обязательно',
    }
  }

  async function submit() {
    const isValid = await formRef.value?.validate()

    if (!isValid) return

    console.log('submit')
  }
</script>

<template>
  <c-form ref="formRef">
    <c-text-field
      v-model="login"
      label="Логин"
      :rules="[required]"
    />

    <c-text-field
      v-model="password"
      label="Пароль"
      :rules="[required]"
    />

    <c-btn @click="submit">
      Войти
    </c-btn>
  </c-form>
</template>
```

## Динамические поля

```vue

<script setup lang="ts">
  import { ref } from 'vue'

  const mainValue = ref('')
  const extraValue = ref('')
  const showExtra = ref(false)

  function required(value: string) {
    return {
      valid: !!value,
      message: 'Поле обязательно',
    }
  }
</script>

<template>
  <c-form v-slot="{ validate }">
    <c-text-field
      v-model="mainValue"
      label="Основное поле"
      :rules="[required]"
    />

    <c-checkbox v-model="showExtra">
      Показать дополнительное поле
    </c-checkbox>

    <c-text-field
      v-if="showExtra"
      v-model="extraValue"
      label="Дополнительное поле"
      :rules="[required]"
    />

    <c-btn @click="validate">
      Проверить форму
    </c-btn>
  </c-form>
</template>
```

---

## Props

У компонента `CForm` нет собственных props.

| Prop | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| — | — | — | Собственные props отсутствуют |

---

## Slots

## default

Основной слот формы.

Через него передается объект с методом `validate`.

### Slot props

| Имя | Тип | Описание |
| --- | --- | --- |
| `validate` | `() => Promise<boolean>` | Проверяет все зарегистрированные в форме валидаторы |

### Пример

```vue
<template>
  <c-form v-slot="{ validate }">
    <c-text-field v-model="value"/>
    <c-btn @click="validate">
      Проверить
    </c-btn>
  </c-form>
</template>
`````

---

## Events

`CForm` не эмитит собственных событий.

| Event | Payload | Описание |
| --- | --- | --- |
| — | — | У компонента нет custom events |

Важно: нативный `submit` у корневого `<form>` перехватывается через `@submit.prevent`.

---

## CSS классы

| Класс | Описание |
| --- | --- |
| `.c-form` | Корневой элемент формы |

---

## DOM структура

```html
<form
    class="c-form"
    @submit.prevent
>
    <slot :validate />
</form>
```

---

## Особенности

- `CForm` не хранит `modelValue` и не управляет данными полей
- `CForm` не делает submit сам по себе
- `CForm` нужен именно как контейнер общей валидации
- форма предоставляет дочерним компонентам API регистрации валидаторов
- метод `validate()` доступен и через `slot`, и через `ref`
- нативная отправка формы по `submit` отключена через `prevent`

---

## Рекомендации

- используйте `CForm`, когда нужно валидировать несколько полей как единое целое
- вызывайте `validate()` перед submit-логикой
- не рассчитывайте на автоматическую HTML-отправку формы
- не используйте `CForm` как менеджер состояния формы, так как он не хранит значения и ошибки на уровне формы
- оборачивайте в `CForm` только те поля, которые действительно должны участвовать в общей проверке

---

## Пример полного использования

```vue

<script setup lang="ts">
  import { shallowRef } from 'vue'

  const formRef = shallowRef<InstanceType<typeof CForm> | null>(null)

  const name = shallowRef('')
  const email = shallowRef('')
  const phone = shallowRef('')

  function required(value: string) {
    return {
      valid: !!value,
      message: 'Поле обязательно',
    }
  }

  function emailRule(value: string) {
    return {
      valid: /.+@.+\..+/.test(value),
      message: 'Некорректный email',
    }
  }

  async function submit() {
    const isValid = await formRef.value?.validate()

    if (!isValid) return

    console.log({
      name: name.value,
      email: email.value,
      phone: phone.value,
    })
  }
</script>

<template>
  <c-form ref="formRef">
    <c-text-field
      v-model="name"
      label="Имя"
      :rules="[required]"
    />

    <c-text-field
      v-model="email"
      label="Email"
      :rules="[required, emailRule]"
    />

    <c-text-field
      v-model="phone"
      label="Телефон"
      :rules="[required]"
    />

    <c-btn @click="submit">
      Отправить
    </c-btn>
  </c-form>
</template>
```
