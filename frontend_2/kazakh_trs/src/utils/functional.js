export const compose = (...fns) => arg => fns.reduce((composed, f) => f(composed), arg);
