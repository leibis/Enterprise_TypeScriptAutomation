import test from "node:test";
import { LoanDataBuilder } from "../../src/data/loanBuilder";



test('Probar préstamo con datos personalizados a travez de Buider', async () => {
 const customLoan = new LoanDataBuilder()
   .withLoanId('LN-12345')
   .withAmount(25000)
   .withApplicant('John Doe')
   .withTermMonths(36)
   .build();

console.log(customLoan);

});