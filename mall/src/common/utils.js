export function debonce(func, delay) {
    let timer = null;
    return function(...args) {
      if (timer) clearTimeout();
      timer = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  }
