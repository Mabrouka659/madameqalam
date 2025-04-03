import { describe, it, expect } from "vitest";
import RegisterFormValidator from "../../src/validator/register_form_validator";

describe("register form validator tests suite", () => {
	it("should be valid", async () => {
		// arrange
		const sut = new RegisterFormValidator();
		// sut = système underscore test
		const expected = {
			firstname: "ali",
			lastname: "rabi",
			phone: "796875021",
			email: "rabiali@gmail.com",
			password: "admin",
		};
		const body = {
			firstname: "ali",
			lastname: "rabi",
			phone: "796875021",
			email: "rabiali@gmail.com",
			password: "admin",
		};

		// act
		const actual = await sut.isValid(body);

		// assert
		expect(actual).toEqual(expected);
	});

	it("should be unvalid", async () => {
		// arrange
		const sut = new RegisterFormValidator();
		// sut = système underscore test
		const body = {
			firstname: "ali",
			lastname: "rabi",
			phone: "796875021",
			email: "rabialigmail.com",
			password: "admin",
		};

		// act
		const actual = await sut.isValid(body);

		// assert
		expect(actual).toBeInstanceOf(Error);
	});
});
