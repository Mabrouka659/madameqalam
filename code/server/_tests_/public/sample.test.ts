/*describe permet de regrouper des tests 

it  permet de'écrire un test 
except permet de crééer une assertion (affirmation)
*/ 

import { describe, it, expect } from 'vitest';

// créer une suite de tests 
describe('tests suite', () => {
    // créer un test 
    it("my addition works", () => {
        //assert
        expect(1 + 1).toBe(2);
        expect(1 + 1).not.toBe(3);

     });

})