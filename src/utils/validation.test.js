import validation from "./Validation";

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