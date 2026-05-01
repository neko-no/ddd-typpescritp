import { sayHello } from "./sayHello";

test("sayHello", () => {
    expect(sayHello("DDD TypeScript")).toBe("Hello, DDD TypeScript!");
});