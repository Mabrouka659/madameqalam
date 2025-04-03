import supertest from "supertest";
import { describe, it, expect } from "vitest";
import Server from "../../src/core/server";
import jwt from "jsonwebtoken";

describe("artwork controller tests suite", () => {
	const admin = {
		id: 1,
		firstname: "ali",
		lastname: "rabi",
		phone: "0796875021",
		email: "rabiali@gmail.com",
		password:
			"e8ef444da7a47526e6e99295ec7718653ceddf9ca4059bff43c463c8ad0fe2564p/IukXOMto/QCkJ60JAMw==51f74fa3d17ee3771a42d506f0617b35b66849db12915e3fd17bd1c8fc27f075",
		role_id: 1,
		role: {
			id: 1,
			name: "admin",
		},
		key: "e454fb40413a76d47e3785fb999dd6ff",
	};

	const token = jwt.sign({ user: admin }, process.env.JWT_KEY as string, {
		expiresIn: 30,
	});
	const values = {
		name: "inspiration",
		description: "calligraphie arabe",
		price: "50",
		image: "Mabrouka_photo_1.jpg",
		category_id: "2",
	};

	it("should responds with 200 code status", async () => {
		//arrange
		const expected = 200;

		// act
		const sut = await supertest(new Server().create()).get("/artwork");
		const actual = sut.status;
		console.log(sut);

		// assert
		expect(actual).toBe(expected);
	});

	it("should get one student ", async () => {
		//arrange
		const expected = 2;

		//act
		const sut = await supertest(new Server().create()).get("/artwork/2");
		// console.log(sut);

		const actual = sut.body.data.id;

		//assert
		expect(actual).toBe(expected);
	});

	it("should create a artwork", async () => {
		//arrange
		const expected = 201;
		//act
		/*si la formulaire posséde un fichier : utiliser les méthodes field et attach 
si le formulaire ne possede pas de fichier : utiliser la méthode send 
*/

		const sut = await supertest(new Server().create())
			.post("/artwork")
			.auth(token, { type: "bearer" })
			//   .sens(values)  // sans fichier
			.field("name", values.name)
			.field(" description", values.description)
			.field("price", values.price)
			.attach("image", `${process.env.ASSET_DIR}/img/${values.image}`)
			.field("category_id", values.category_id);
		// .field(" email", values.email)
		//  const actual = sut.status;
		console.log(sut);

		//assert
		//expect(actual).toBe(expected);
	});
});
