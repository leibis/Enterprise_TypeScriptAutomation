export interface LoanData {
    loanId: string;
    amount: number;
    termMonths: number;
    applicantName: string;
}


export class LoanDataBuilder {
    // Valores por defecto seguros para evitar nulos
    private loan: LoanData = {
        loanId: "LN-DEFAULT",
        amount: 10000,
        termMonths: 36,
        applicantName: "John Doe"
    };

    withLoanId(id: string): this {
        this.loan.loanId = id;
        return this;// Retornamos 'this' para encadenar métodos
    } 

    withAmount(amount: number): this {
        this.loan.amount = amount;
        return this;
    }

    withApplicant(name: string): this {
        this.loan.applicantName = name;
        return this;
    }

    withTermMonths(termMonths: number): this {
        this.loan.termMonths = termMonths;
        return this;
    }
 // Método final que construye y devuelve el objeto limpio
    build(): LoanData {
        return this.loan;
    }

}