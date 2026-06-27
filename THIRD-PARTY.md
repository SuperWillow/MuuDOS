# Сторонние компоненты GitDOS

**Автор GitDOS (веб-обёртки): Sementsul Maxim.**

GitDOS — это веб-обёртка (интерфейс) вокруг эмулятора DOSBox в браузере. Сам эмулятор не наш.

## js-dos (DOSBox в WebAssembly)
- Автор: Alexander Guryanov (caiiiycuk) — https://js-dos.com
- Версия 8.3.20, лежит в `vendor/js-dos/` **без изменений**.
- Ядро DOSBox — лицензия **GPL-2.0**; JS-обвязка js-dos — **MIT**.
- Исходники: js-dos — https://github.com/caiiiycuk/js-dos ; DOSBox — https://www.dosbox.com

## Про название «GitDOS» и лицензию
- **«GitDOS»** — название нашей обёртки (UI вокруг эмулятора). Так называть своё приложение можно.
- Мы **не переименовываем DOSBox** и не убираем его авторство: на старте DOS показывается
  баннер «powered by DOSBox / js-dos», и есть этот файл с атрибуцией.
- При публикации GitDOS нужно сохранять лицензии DOSBox/js-dos (GPL-2.0/MIT) и давать ссылку
  на их исходники. DOSBox распространяется и используется **без модификаций бинарника**.
