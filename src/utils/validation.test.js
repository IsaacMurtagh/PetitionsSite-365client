import validation from "./Validation";

/* Due to fucking up my package.json, I had to reset it and i can't be bothered finding out what
    dev dependencies i need to make this run again.
 */
describe("check email", () => {

    const goodEmails = [
        "example@gmail.com",
        "example1@gmail.com",
        "example@gmail.co.nz",
        "a@b.c",
        "a_c@gmail.com",
        "a.b.c@gmail.com"
    ];

    const badEmails = [
        "a@a@",
        "email",
        "@com",
        "",
        "email withspace@gmail.com"
    ];

    for (const email of goodEmails) {
        it('should return true given ' + email, function () {
            expect(validation.validEmail(email)).toBeTruthy();
        });
    }

    for (const email of badEmails) {
        it('should return true given ' + email, function () {
            expect(validation.validEmail(email)).toBeFalsy();
        });
    }
})