//1. Tipos de datos
export type LoanType = "AUTO" | "MORTAGE" | "PERSONAL" ;
export type UserRole = "ADMIN" | "VIEWER";


//2. Interfaz principal
export interface LoanTestData {
    title: string;
    amount: number;
    type: LoanType;
    requiresApproval: boolean;
}


// 3.  EL PATRÓN SENIOR: Usando Record para mapear datos exactos
// Record<K, V> obliga a que TODAS las llaves de LoanType existan en el objeto.
// Si mañana agregas "STUDENT" a LoanType, TypeScript marcará error aquí hasta que agregues los datos.
export const loanData: Record<LoanType, LoanTestData> = {
    AUTO: {
        title: "Auto Loan",
        amount: 15000,
        type: "AUTO",
        requiresApproval: true
    },
    MORTAGE: {
        title: "Mortgage Loan",
        amount: 250000,
        type: "MORTAGE",
        requiresApproval: true
    },
    PERSONAL: {
        title: "Personal Loan",
        amount: 5000,
        type: "PERSONAL",
        requiresApproval: false
    }
};